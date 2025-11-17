import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "../supabase/types";
import { BaseStates } from "../types/states";
import { logger } from "../logger";

type TypedClient = SupabaseClient<Database>;

type IdRow = { id: string };
type SessionRow = { id: string; minutes: number };

let manualHoursEventId: string | null = null;

export async function manualModifyOutreachHours(
  userId: string,
  deltaMinutes: number,
  client: TypedClient
) {
  if (!manualHoursEventId) {
    const { data: existing, error: lookupError } = await client
      .from("outreach_events" as const)
      .select("id")
      .eq("name", "ManualHours")
      .maybeSingle();

    if (lookupError && lookupError.code !== "PGRST116") {
      logger.error(
        { err: lookupError.message },
        "Failed to lookup ManualHours event"
      );
      return BaseStates.ERROR;
    }

    const existingRow = existing as IdRow | null;

    if (!existingRow) {
      const { data: created, error: createError } = await (
        client.from("outreach_events" as const) as any
      )
        .insert({ name: "ManualHours", event_date: new Date().toISOString() })
        .select("id")
        .single();

      if (createError || !created) {
        logger.error(
          { err: createError?.message },
          "Failed to create ManualHours event"
        );
        return BaseStates.ERROR;
      }

      manualHoursEventId = (created as IdRow).id;
    } else {
      manualHoursEventId = existingRow.id;
    }
  }

  if (!manualHoursEventId) {
    return BaseStates.ERROR;
  }

  const { data: session, error: sessionError } = await client
    .from("outreach_sessions" as const)
    .select("id, minutes")
    .eq("event_id", manualHoursEventId)
    .eq("user_id", userId)
    .maybeSingle();

  if (sessionError && sessionError.code !== "PGRST116") {
    logger.error(
      { err: sessionError.message },
      "Failed to fetch manual hours session"
    );
    return BaseStates.ERROR;
  }

  const sessionRow = session as SessionRow | null;

  if (sessionRow) {
    const { error: updateError } = await (
      client.from("outreach_sessions" as const) as any
    )
      .update({ minutes: sessionRow.minutes + deltaMinutes })
      .eq("id", sessionRow.id);

    if (updateError) {
      logger.error(
        { err: updateError.message },
        "Failed to update manual hours session"
      );
      return BaseStates.ERROR;
    }
  } else {
    const { error: createError } = await (
      client.from("outreach_sessions" as const) as any
    ).insert({
      event_id: manualHoursEventId,
      user_id: userId,
      minutes: deltaMinutes
    });

    if (createError) {
      logger.error(
        { err: createError.message },
        "Failed to create manual hours session"
      );
      return BaseStates.ERROR;
    }
  }

  return BaseStates.SUCCESS;
}
