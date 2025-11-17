import { Dexie, type EntityTable } from "dexie";
import type { SupabaseClient } from "@supabase/supabase-js";

import {
  DexieScoutingSubmission,
  ScoutingQuestionConfig,
  ScoutingSubmission,
  SelectOption
} from "../types/scouting";
import { ErrorCodes } from "../types/states";
import { logger } from "../logger";
import type { Database } from "../supabase/types";

type ScoutingSettingRow =
  Database["public"]["Tables"]["scouting_settings"]["Row"];

export const dexie = new Dexie("ScoutingFormResponses") as Dexie & {
  responses: EntityTable<DexieScoutingSubmission, "id">;
};
dexie.version(3).stores({
  responses: "++id, user, team, data, date, uploaded"
});

/**
 * Handles form submission - placeholder implementation
 * TODO: Implement actual submission logic
 */
export async function handleFormSubmission(submission: ScoutingSubmission) {
  try {
    const stringSubmission = {
      ...submission,
      team: JSON.stringify(submission.team),
      data: JSON.stringify(submission.data),
      uploaded: false
    } satisfies Omit<DexieScoutingSubmission, "id">;

    await dexie.responses.add(stringSubmission as any);

    return {
      error: false
    };
  } catch {
    return {
      error: true
    };
  }
}

export async function getScoutingConfig(
  client: SupabaseClient<Database>
): Promise<[ErrorCodes, null] | [null, ScoutingQuestionConfig[]]> {
  const { data, error } = await client
    .from("scouting_settings" as const)
    .select("value")
    .eq("key", "ScoutingConfig")
    .maybeSingle();

  if (error) {
    logger.error(
      { key: "ScoutingConfig", err: error.message },
      "Failed to fetch scouting config"
    );
    return ["01x01", null];
  }

  const row = data as unknown as ScoutingSettingRow | null;

  const config = (row?.value as unknown as ScoutingQuestionConfig[]) ?? [];

  return [null, config.map((item) => ({ ...item }))];
}

export async function fetchTeamOptions(
  client: SupabaseClient<Database>
): Promise<[ErrorCodes, null] | [null, SelectOption[]]> {
  return fetchSelectOptions("sk_EventTeams", client);
}

export async function fetchSelectOptions(
  key: string,
  client: SupabaseClient<Database>
): Promise<[ErrorCodes, null] | [null, SelectOption[]]> {
  const { data, error } = await client
    .from("scouting_settings" as const)
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      return [null, []];
    }

    logger.error({ key, err: error.message }, "Failed to fetch select options");
    return ["01x01", null];
  }

  const row = data as unknown as ScoutingSettingRow | null;

  return [null, (row?.value as unknown as SelectOption[]) ?? []];
}

export async function getAllResponses() {
  try {
    return await dexie.responses.toArray();
  } catch (error: any) {
    logger.error(
      { err: error?.message },
      "Failed to fetch responses from IndexedDB"
    );
    return [];
  }
}

export async function uploadResponses() {
  try {
    const responses = await dexie.responses
      .where("uploaded")
      .equals("false")
      .toArray();

    const formattedResponses = responses.map((response) => ({
      id: response.id!,
      user: response.user,
      team: response.team,
      data: response.data, // Already stringified JSON
      date: response.date
    }));

    logger.info(
      { count: formattedResponses.length },
      "Prepared responses for upload"
    );

    // TODO: Implement actual upload logic
    // This is where you'll add the upload functionality
    return formattedResponses;
  } catch (error: any) {
    logger.error({ err: error?.message }, "Failed to get responses for upload");
    throw error;
  }
}

export async function markResponseAsUploaded(id: number) {
  try {
    await dexie.responses.update(id, { uploaded: true });
    logger.info({ id }, "Marked response as uploaded");
  } catch (error: any) {
    logger.error(
      { id, err: error?.message },
      "Failed to mark response uploaded"
    );
    throw error;
  }
}
