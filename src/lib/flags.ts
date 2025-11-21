"use server";

import murmur from "murmurhash";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/lib/types/supabase";
import { getSBServerClient } from "./supabase/sbServer";

import { EvalRet, FeatureFlag, FlagNames, FlagParams } from "./types/flags";

type FeatureFlagRow = Database["public"]["Tables"]["FeatureFlags"]["Row"];

let FLAG_TTL_MS = 60000;

const flagsCache: Record<string, { flag: FeatureFlag; storedAt: number }> = {};

export async function runFlag(
  flagName: FlagNames,
  client: SupabaseClient,
  params?: FlagParams
): Promise<EvalRet> {
  const flag = await fetchFlag(
    flagName,
    client || getSBServerClient(await cookies())
  );

  if (flag === undefined) {
    return { enabled: false, value: undefined, exists: false };
  }

  const evaluation = validateFlag(flag, params);
  return { ...evaluation, exists: true };
}

async function fetchFlag(
  flagName: FlagNames,
  client: SupabaseClient
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
): Omit<EvalRet, "exists"> {
  if (typeof flag === "boolean") {
    return { enabled: flag };
  }

  const ret = {} as Omit<EvalRet, "exists">;

  if (typeof flag.enabled === "boolean") {
    ret.enabled = flag.enabled;
  }

  if (["string", "number"].includes(typeof flag.value)) {
    ret.value = flag.value;
  }

  if (typeof flag.list === "object" && flag.list?.length) {
    ret.list = flag.list;
  }

  if (!flag.percentEvalMethod && !flag.paramEvalMethod) {
    return ret;
  }

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

  if (flag.roles) {
    conditions.push(flag.roles.includes(params?.userRole || ""));
  }

  switch (flag.paramEvalMethod) {
    case "OR":
      return {
        ...ret,
        enabled: conditions.some(Boolean)
      };
    case "AND":
    default:
      return {
        ...ret,
        enabled: conditions.every(Boolean)
      };
  }
}

runFlag("flag_ttl_ms", getSBServerClient(await cookies())).then((res) => {
  if (res.exists && res.enabled && typeof res.value === "number") {
    FLAG_TTL_MS = res.value;
    console.warn(`[Flags] Using flag TTL of ${FLAG_TTL_MS} ms`);
  } else {
    console.warn(`[Flags] Using default flag TTL of ${FLAG_TTL_MS} ms`);
  }
});
