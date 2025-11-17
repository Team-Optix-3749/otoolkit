import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "../supabase/types";
import {
  mapOutreachEvent,
  mapOutreachSession,
  mapProfileToUser
} from "../supabase/mappers";
import type { OutreachEvent, OutreachSession } from "../types/models";
import { ErrorCodes } from "../types/states";
import { logger } from "../logger";
import { runFlag } from "../flags";

type TypedClient = SupabaseClient<Database>;
type OutreachEventRow = Database["public"]["Tables"]["outreach_events"]["Row"];
type OutreachSessionRow =
  Database["public"]["Tables"]["outreach_sessions"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

function toErrorTuple(error?: any): [ErrorCodes, null] {
  if (!error) return ["01x01", null];

  if (typeof error.code === "string") {
    if (error.code === "42501") return ["01x403", null];
    if (error.code === "PGRST116") return ["01x404", null];
    if (error.code.startsWith("22") || error.code === "23514") {
      return ["01x400", null];
    }
  }

  return ["01x01", null];
}

export async function fetchEvents(
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, OutreachEvent[]]> {
  const { data, error } = await client
    .from("outreach_events" as const)
    .select("*")
    .order("event_date", { ascending: false });

  if (error) {
    logger.error({ err: error.message }, "Failed to fetch outreach events");
    return toErrorTuple(error);
  }

  const rows = (data ?? []) as unknown as OutreachEventRow[];
  return [null, rows.map((row) => mapOutreachEvent(row))];
}

export async function createEvent(
  data: { name: string; date: string },
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, OutreachEvent]> {
  const { data: inserted, error } = await (
    client.from("outreach_events" as const) as any
  )
    .insert({ name: data.name, event_date: data.date })
    .select()
    .single();

  if (error) {
    logger.error({ err: error.message }, "Failed to create outreach event");
    return toErrorTuple(error);
  }

  const row = inserted as unknown as OutreachEventRow;
  logger.info({ eventId: row.id, name: row.name }, "Outreach event created");
  return [null, mapOutreachEvent(row)];
}

export async function updateEvent(
  id: string,
  data: Partial<Pick<OutreachEvent, "name" | "date">>,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, OutreachEvent]> {
  const payload: Partial<OutreachEventRow> = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.date !== undefined) payload.event_date = data.date;

  const { data: updated, error } = await (
    client.from("outreach_events" as const) as any
  )
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    logger.error({ err: error.message, eventId: id }, "Failed to update event");
    return toErrorTuple(error);
  }

  const row = updated as unknown as OutreachEventRow;
  logger.info({ eventId: id, ...payload }, "Outreach event updated");
  return [null, mapOutreachEvent(row)];
}

export async function deleteEvent(
  id: string,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, true]> {
  const { error } = await (client.from("outreach_events" as const) as any)
    .delete()
    .eq("id", id);

  if (error) {
    logger.error({ err: error.message, eventId: id }, "Failed to delete event");
    return toErrorTuple(error);
  }

  logger.warn({ eventId: id }, "Outreach event deleted");
  return [null, true];
}

export async function fetchSessionsForEvent(
  eventId: string,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, OutreachSession[]]> {
  const { data, error } = await client
    .from("outreach_sessions" as const)
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (error) {
    logger.error({ err: error.message, eventId }, "Failed to fetch sessions");
    return toErrorTuple(error);
  }

  const rows = (data ?? []) as unknown as OutreachSessionRow[];
  const profileIds = Array.from(new Set(rows.map((row) => row.user_id)));

  const { data: profiles, error: profilesError } = await client
    .from("profiles" as const)
    .select("*")
    .in("id", profileIds);

  if (profilesError) {
    logger.error({ err: profilesError.message }, "Failed to enrich sessions");
    return toErrorTuple(profilesError);
  }

  const profileMap = new Map<string, ProfileRow>();
  for (const profile of (profiles ?? []) as unknown as ProfileRow[]) {
    profileMap.set(profile.id, profile);
  }

  const { data: eventRow } = await client
    .from("outreach_events" as const)
    .select("*")
    .eq("id", eventId)
    .maybeSingle();

  const event = eventRow
    ? mapOutreachEvent(eventRow as unknown as OutreachEventRow)
    : undefined;

  const mapped = rows.map((row) =>
    mapOutreachSession(row, {
      user: profileMap.get(row.user_id),
      event: event ? (eventRow as unknown as OutreachEventRow) : undefined
    })
  );

  return [null, mapped];
}

export async function deleteSession(
  id: string,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, true]> {
  const { error } = await (client.from("outreach_sessions" as const) as any)
    .delete()
    .eq("id", id);

  if (error) {
    logger.error(
      { err: error.message, sessionId: id },
      "Failed to delete session"
    );
    return toErrorTuple(error);
  }

  logger.warn({ sessionId: id }, "Outreach session deleted");
  return [null, true];
}

export async function createSessionsBulk(
  sessions: { userId: string; eventId: string; minutes: number }[],
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, OutreachSession[]]> {
  if (!sessions.length) {
    return [null, []];
  }

  const payload = sessions.map((session) => ({
    user_id: session.userId,
    event_id: session.eventId,
    minutes: session.minutes
  }));

  const { data, error } = await (
    client.from("outreach_sessions" as const) as any
  )
    .insert(payload)
    .select("*");

  if (error) {
    logger.error({ err: error.message }, "Failed to create outreach sessions");
    return toErrorTuple(error);
  }

  const rows = (data ?? []) as unknown as OutreachSessionRow[];
  logger.info(
    { count: rows.length, eventId: sessions[0]?.eventId },
    "Bulk outreach sessions created"
  );

  return [null, rows.map((row) => mapOutreachSession(row))];
}

export async function fetchUserSessionEventDates(
  userId: string,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, string[]]> {
  const { data: sessions, error } = await client
    .from("outreach_sessions" as const)
    .select("event_id")
    .eq("user_id", userId);

  if (error) {
    return toErrorTuple(error);
  }

  const eventIds = Array.from(
    new Set(((sessions ?? []) as { event_id: string }[]).map((s) => s.event_id))
  );

  if (!eventIds.length) {
    return [null, []];
  }

  const { data: events, error: eventsError } = await client
    .from("outreach_events" as const)
    .select("event_date")
    .in("id", eventIds);

  if (eventsError) {
    return toErrorTuple(eventsError);
  }

  const dates = ((events ?? []) as { event_date: string }[])
    .map((event) => event.event_date)
    .filter(Boolean);

  return [null, dates];
}

const DEFAULT_OUTREACH_MINUTES = 900;
export async function getOutreachMinutesCutoff(client: TypedClient) {
  const { enabled, value } = await runFlag(
    "outreach_minutes_cutoff",
    undefined,
    client
  );

  if (enabled && typeof value === "number" && value > 0) {
    return value;
  }

  return DEFAULT_OUTREACH_MINUTES;
}
