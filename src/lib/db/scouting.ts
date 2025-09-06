import {
  ScoutingQuestionConfig,
  ScoutingSubmission,
  SelectOption
} from "../types/scoutingTypes";
import { pb } from "@/lib/pbaseClient";
import { toast } from "sonner";

/**
 * Handles form submission - placeholder implementation
 * TODO: Implement actual submission logic
 */
export async function handleFormSubmission(
  submission: ScoutingSubmission
): Promise<{
  success: boolean;
  error?: string;
  data?: any;
}> {
  try {
    console.log("Form submission data:", submission);

    // TODO: Replace this with actual database submission
    // Example implementation would look like:
    // const record = await pb.collection("ScoutingData").create(submission);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      data: submission
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Submission failed"
    };
  }
}

/**
 * Fetches team options for select fields
 */
export async function fetchSelectOptions(key: string): Promise<SelectOption[]> {
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
    toast.error(`Failed to load options for '${key}'`);
    return [];
  }
}

/**
 * Validates if a value is empty for form validation
 */
export function isEmpty(value: any): boolean {
  return value === undefined || value === null || value === "";
}
