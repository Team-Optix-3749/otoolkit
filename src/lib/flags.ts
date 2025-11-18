"use server";

import murmur from "murmurhash";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/lib/types/supabase";
import { getSBServerClient } from "./supabase/sbServer";

import { EvalRet, FeatureFlag, FlagNames, FlagParams } from "./types/flags";

type TypedClient = SupabaseClient<Database>;
type FeatureFlagRow = Database["public"]["Tables"]["FeatureFlags"]["Row"];

let FLAG_TTL_MS = 60000;

const flagsCache: Record<string, { flag: FeatureFlag; storedAt: number }> = {};

export async function runFlag(
  flagName: FlagNames,
  params?: FlagParams,
  client?: TypedClient
): Promise<EvalRet> {
  const supabase = getSBServerClient(await cookies());
  const flag = await fetchFlag(flagName, supabase);

  if (flag === undefined) {
    return { enabled: false, value: undefined, exists: false };
  }

  const evaluation = validateFlag(flag, params);
  return { ...evaluation, exists: true };
}

async function fetchFlag(
  flagName: FlagNames,
  client: TypedClient
): Promise<FeatureFlag | undefined> {
  const cache = flagsCache[flagName];

  if (cache && Date.now() - cache.storedAt < FLAG_TTL_MS) {
    return cache.flag;
  }

  const { data, error } = await client
    .from("FeatureFlags")
    .select("flag")
    .eq("name", flagName)
    .maybeSingle();

  if (error) {
    console.warn(`[Flags] Failed to fetch flag ${flagName}:`, error.message);
    return undefined;
  }

  const row = data as unknown as FeatureFlagRow | null;

  if (!row?.flag) {
    return undefined;
  }

  flagsCache[flagName] = {
    flag: row.flag as FeatureFlag,
    storedAt: Date.now()
  };
  return row.flag as FeatureFlag;
}

function validateFlag(
  flag: FeatureFlag,
  params?: FlagParams
): Pick<EvalRet, "enabled" | "value"> {
  if (typeof flag === "boolean") {
    return { enabled: flag, value: undefined };
  }

  if (!flag.enabled) return { enabled: false, value: undefined };

  const conditions: boolean[] = [];

  if (flag.percent !== undefined) {
    let rand: number | null = null;

    switch (flag.percentEvalMethod) {
      case "ID": {
        const hash = murmur.v3(params?.userId || "");
        rand = hash / 2 ** 32;
        break;
      }
      case "RANDOM":
      default: {
        rand = Math.random();
        break;
      }
    }

    if (rand !== null) {
      conditions.push(rand < flag.percent);
    }
  }

  if (flag.roles && params?.userRole) {
    conditions.push(flag.roles.includes(params.userRole));
  }

  switch (flag.paramEvalMethod) {
    case "OR":
      return {
        enabled: conditions.some(Boolean),
        value: flag.value
      };
    case "AND":
    default:
      return {
        enabled: conditions.every(Boolean),
        value: flag.value
      };
  }
}

runFlag("flag_ttl_ms").then((res) => {
  if (res.exists && res.enabled && typeof res.value === "number") {
    FLAG_TTL_MS = res.value;
    console.warn(`[Flags] Using flag TTL of ${FLAG_TTL_MS} ms`);
  } else {
    console.warn(`[Flags] Using default flag TTL of ${FLAG_TTL_MS} ms`);
  }
});
