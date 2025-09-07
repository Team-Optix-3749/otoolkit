import { Dexie, type EntityTable } from "dexie";

import { pb } from "@/lib/pbaseClient";

import {
  DexieScoutingSubmission,
  ScoutingSubmission,
  SelectOption
} from "../types/scoutingTypes";

export const dexie = new Dexie("ScoutingFormResponses") as Dexie & {
  responses: EntityTable<DexieScoutingSubmission, "id">;
};
dexie.version(1).stores({
  responses: "++id, user, data, date"
});

/**
 * Handles form submission - placeholder implementation
 * TODO: Implement actual submission logic
 */
export async function handleFormSubmission(submission: ScoutingSubmission) {
  try {
    const stringSubmission = {
      ...submission,
      data: JSON.stringify(submission.data)
    };

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

export async function fetchTeamOptions(): Promise<SelectOption[]> {
  return [];

  try {
    const record = await pb
      .collection("ScoutingSettings")
      .getFirstListItem(`key='sk_EventTeams'`)
      .catch();

    if (record && record.value) {
      return record.value as SelectOption[];
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch options for 'sk_EventTeams':`, error);
    return [];
  }
}

/**
 * Fetches team options for select fields
 */
export async function fetchSelectOptions(key: string): Promise<SelectOption[]> {
  return [];

  try {
    const record = await pb
      .collection("ScoutingSettings")
      .getFirstListItem(`key='${key}'`)
      .catch();

    if (record && record.value) {
      return record.value as SelectOption[];
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch options for '${key}':`, error);
    return [];
  }
}

/**
 * Gets all responses from IndexedDB
 */
export async function getAllResponses(): Promise<DexieScoutingSubmission[]> {
  try {
    return await dexie.responses.toArray();
  } catch (error) {
    console.error("Failed to fetch responses from IndexedDB:", error);
    return [];
  }
}

/**
 * Uploads all responses from IndexedDB
 * Formats responses as [{user, data, date}] for upload
 */
export async function uploadResponses(): Promise<void> {
  try {
    const responses = await dexie.responses.toArray();

    const formattedResponses = responses.map((response) => ({
      user: response.user,
      data: response.data, // Already stringified JSON
      date: response.date
    }));

    console.log("Formatted responses for upload:", formattedResponses);

    // TODO: Implement actual upload logic
    // This is where you'll add the upload functionality
  } catch (error) {
    console.error("Failed to upload responses:", error);
  }
}
