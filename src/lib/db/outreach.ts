import type { SupabaseClient } from "@supabase/supabase-js";
import { getSBBrowserClient } from "../supabase/sbClient";
import { makeSBRequest } from "../supabase/supabase";
import { mapProfileToUser } from "@/lib/supabase/mappers";
import { OutreachEvent } from "../types/supabase";

type BrowserClient = SupabaseClient;

type SessionInsert = {
  userId: string;
  eventId: string;
  minutes: number;
};

function mapEvent(row: OutreachEvent): OutreachEvent {
  return {
    id: String(row.id),
    name: row.name,
    date: row.date,
    created: row.created_at
  };
}

async function fetchProfiles(client: BrowserClient, ids: string[]) {
  if (ids.length === 0)
    return new Map<string, ReturnType<typeof mapProfileToUser>>();

  const { data, error } = await client
    .from("profiles")
    .select("id, email, full_name, avatar_url, role, uses_oauth")
    .in("id", ids);

  if (error || !data) {
    return new Map();
  }

  return data.reduce((map, row) => {
    map.set(row.id, mapProfileToUser(row as ProfileRow));
    return map;
  }, new Map<string, ReturnType<typeof mapProfileToUser>>());
}

export async function fetchEvents(): Promise<
  [string | null, OutreachEvent[] | null]
> {
  const { data, error } = await makeSBRequest(async (sb) =>
    sb.from("OutreachEvents").select("*").order("date", { ascending: false })
  );

  if (error || !data) {
    return [error?.message ?? "Failed to load events", null];
  }

  return [null, data.map(mapEvent)];
}

export async function createEvent(payload: {
  name: string;
  date: string;
}): Promise<[string | null, OutreachEvent | null]> {
  const eventDate = new Date(payload.date).toISOString().split("T")[0];

  const { data, error } = await makeSBRequest(async (sb) =>
    sb
      .from("OutreachEvents")
      .insert({
        name: payload.name,
        date: eventDate
      })
      .select("*")
      .maybeSingle()
  );

  if (error || !data) {
    return [error?.message ?? "Failed to create event", null];
  }

  return [null, mapEvent(data as OutreachEventRow)];
}

export async function updateEvent(
  eventId: string,
  updates: Partial<{ name: string; date: string }>
): Promise<[string | null]> {
  const payload: Partial<OutreachEventRow> = {};

  if (updates.name !== undefined) {
    payload.name = updates.name;
  }

  if (updates.date) {
    payload.date = new Date(updates.date).toISOString().split("T")[0];
  }

  const { error } = await makeSBRequest(async (sb) =>
    sb.from("OutreachEvents").update(payload).eq("id", Number(eventId))
  );

  if (error) {
    return [error.message];
  }

  return [null];
}

export async function deleteEvent(eventId: string): Promise<[string | null]> {
  const { error } = await makeSBRequest(async (sb) =>
    sb.from("OutreachEvents").delete().eq("id", Number(eventId))
  );

  if (error) {
    return [error.message];
  }

  return [null];
}

export async function fetchSessionsForEvent(
  eventId: string
): Promise<[string | null, OutreachSession[] | null]> {
  const { data, error } = await makeSBRequest(async (sb) =>
    sb
      .from("OutreachSessions")
      .select("id, user, event, minutes, created_at, metadata")
      .eq("event", eventId)
      .order("created_at", { ascending: false })
  );

  if (error || !data) {
    return [error?.message ?? "Failed to load sessions", null];
  }

  const rows = data as unknown as OutreachSessionRow[];
  const userIds = Array.from(new Set(rows.map((row) => row.user)));

  const sessions: OutreachSession[] = rows.map((typedRow) => {
    return {
      id: String(typedRow.id),
      minutes: typedRow.minutes ?? 0,
      userId: typedRow.user,
      eventId: typedRow.event,
      created: typedRow.created_at,
      metadata: null
    };
  });

  return [null, sessions];
}

export async function createSessionsBulk(
  records: SessionInsert[]
): Promise<[string | null]> {
  if (!records.length) {
    return [null];
  }

  const payload = records.map((record) => ({
    user: record.userId,
    event: record.eventId,
    minutes: record.minutes
  }));

  const { error } = await makeSBRequest(async (sb) =>
    sb.from("OutreachSessions").insert(payload)
  );

  if (error) {
    return [error.message];
  }

  return [null];
}

export async function deleteSession(
  sessionId: string
): Promise<[string | null]> {
  const supabase = getBrowserClient();
  const { error } = await makeSBRequest(async (sb) =>
    sb.from("OutreachSessions").delete().eq("id", Number(sessionId))
  );

  if (error) {
    return [error.message];
  }

  return [null];
}

type OutreachSessionEventDateRow = {
  created_at: string;
  event: { date: string | null } | null;
};

export async function fetchUserSessionEventDates(
  userId: string
): Promise<[string | null, string[] | null]> {
  const supabase = getBrowserClient();
  const { data, error } = await makeSBRequest(async (sb) =>
    sb
      .from("OutreachSessions")
      .select("created_at, event:OutreachEvents(date)")
      .eq("user", userId)
      .order("created_at", { ascending: false })
  );

  if (error || !data) {
    return [error?.message ?? "Failed to load activity", null];
  }

  const timestamps = data.map((row) => {
    const typedRow = row as unknown as OutreachSessionEventDateRow;
    const eventDate = typedRow.event?.date;
    return eventDate ?? typedRow.created_at;
  });

  return [null, timestamps];
}

const DEFAULT_MINUTES_CUTOFF = 900;
export async function getOutreachMinutesCutoff(): Promise<number> {
  const supabase = getSBBrowserClient();

  const { data, error } = await supabase
    .from("FeatureFlags")
    .select("flag")
    .eq("name", "outreach_minutes_cutoff")
    .maybeSingle();

  if (error || !data) {
    return DEFAULT_MINUTES_CUTOFF;
  }

  const flagRow = data as { flag?: unknown } | null;
  const flag = flagRow?.flag as
    | boolean
    | { enabled?: boolean; value?: number }
    | null;

  if (flag && typeof flag === "object" && typeof flag.value === "number") {
    return flag.value;
  }

  return DEFAULT_MINUTES_CUTOFF;
}
