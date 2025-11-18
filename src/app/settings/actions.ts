"use server";

import { revalidatePath } from "next/cache";

import { logger } from "@/lib/logger";
import type { FeatureFlag, FlagNames } from "@/lib/types/flags";
import type { FeatureFlag as FeatureFlagModel } from "@/lib/types/supabase";
import type { User } from "@/lib/types/models";
import { mapProfileToUser } from "@/lib/supabase/mappers";

import {
  flagRoleOptions,
  updateFlagPayloadSchema,
  type UpdateFlagPayload
} from "./flag-schemas";
import { getSBBrowserClient } from "@/lib/supabase/sbClient";

export type FlagRecord = {
  id: string;
  name: FlagNames;
  flag: FeatureFlag;
  created: string;
  updated: string;
};

export type UpdateFlagActionResult =
  | { success: true; flag: FlagRecord }
  | { success: false; error: string };

export async function updateFlagAction(
  payload: unknown
): Promise<UpdateFlagActionResult> {
  const parsed = updateFlagPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    const message = parsed.error.issues
      .map((issue) => issue.message)
      .join(" ")
      .trim();

    return {
      success: false,
      error: message || "Invalid flag payload."
    };
  }

  const data: UpdateFlagPayload = parsed.data;

  const supabase = getSBBrowserClient();
  const {
    data: { user: authUser }
  } = await supabase.auth.getUser();

  let currentUser: User | null = null;

  if (authUser) {
    // profiles isn't included in the typed supabase DB map, use an
    // untyped query and silence the explicit-any rule.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: profileRow } = await (supabase as any)
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle();

    currentUser = profileRow ? mapProfileToUser(profileRow) : null;
  }

  if (!currentUser || currentUser.role !== "admin") {
    return {
      success: false,
      error: "You must be an admin to update feature flags."
    };
  }

  const normalizedFlag = normalizeFlag(data.flag);

  const { data: updated, error } = await supabase
    .from("FeatureFlags")
    .update({
      name: data.name,
      flag: normalizedFlag
    })
    .eq("id", Number(data.id))
    .select("*")
    .maybeSingle();

  if (error || !updated) {
    logger.error(
      { err: error?.message, flag: data.name, id: data.id },
      "Failed to update feature flag"
    );

    return {
      success: false,
      error: `Failed to update flag: ${error?.message ?? "Unknown error"}`
    };
  }

  revalidatePath("/settings");

  return {
    success: true,
    flag: mapModelToRecord(updated as FeatureFlagModel)
  };
}

function mapModelToRecord(model: FeatureFlagModel): FlagRecord {
  const row = model as unknown as {
    id?: number;
    name?: string | null;
    flag?: unknown;
  };
  return {
    id: String(row.id ?? ""),
    name: row.name ?? "",
    flag: row.flag as unknown as FeatureFlag,
    created: "",
    updated: ""
  };
}

function normalizeFlag(flag: FeatureFlag): FeatureFlag {
  if (typeof flag === "boolean") {
    return flag;
  }

  const cleanedRoles = Array.isArray(flag.roles)
    ? flag.roles.filter((role): role is (typeof flagRoleOptions)[number] =>
        flagRoleOptions.includes(role as (typeof flagRoleOptions)[number])
      )
    : undefined;

  const normalized: Exclude<FeatureFlag, boolean> = {
    enabled: flag.enabled,
    paramEvalMethod: flag.paramEvalMethod ?? "AND",
    percentEvalMethod: flag.percentEvalMethod ?? "RANDOM"
  };

  if (typeof flag.percent === "number") {
    normalized.percent = Number(flag.percent.toFixed(6));
  }

  if (cleanedRoles && cleanedRoles.length > 0) {
    normalized.roles = Array.from(new Set(cleanedRoles));
  }

  if (flag.value !== undefined) {
    if (typeof flag.value === "string") {
      const trimmed = flag.value.trim();
      if (trimmed.length > 0) {
        normalized.value = trimmed;
      }
    } else {
      normalized.value = flag.value;
    }
  }

  return normalized;
}
