import type { SupabaseClient, PostgrestError } from "@supabase/supabase-js";

import type { Database } from "../sbClient";
import { mapProfileToUser, mapUserOutreachStats } from "../supabase/mappers";
import type { User, UserData } from "../types/models";
import { ErrorCodes } from "../types/states";
import { logger } from "../logger";

type TypedClient = SupabaseClient<Database>;
type OutreachStatsRow =
  Database["public"]["Views"]["user_outreach_stats"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

type PaginatedResult<T> = {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

function mapPostgrestError(error?: PostgrestError | null): ErrorCodes {
  if (!error) return "01x01";

  switch (error.code) {
    case "PGRST116":
      return "01x404";
    case "42501":
      return "01x403";
    case "23514":
    case "22P02":
    case "PGRST102":
    case "PGRST100":
      return "01x400";
    default:
      break;
  }

  if (typeof error.details === "string") {
    if (error.details.includes("not found")) return "01x404";
    if (error.details.includes("permission")) return "01x403";
  }

  return "01x01";
}

function toErrorTuple(error?: PostgrestError | null): [ErrorCodes, null] {
  return [mapPostgrestError(error), null];
}

export async function listUserData(
  page: number,
  perPage: number,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, PaginatedResult<UserData>]> {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await client
    .from("user_outreach_stats")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("outreach_minutes", { ascending: false });

  if (error) {
    logger.error(
      { err: error.message, page, perPage },
      "Failed to list user outreach stats"
    );
    return toErrorTuple(error);
  }

  const rows = (data ?? []) as unknown as OutreachStatsRow[];
  const ids = rows.map((row) => row.user_id);

  const profilesMap = new Map<string, ProfileRow>();

  if (ids.length) {
    const { data: profiles, error: profileError } = await client
      .from("profiles")
      .select("*")
      .in("id", ids);

    if (profileError) {
      logger.error(
        { err: profileError.message },
        "Failed to fetch profiles for outreach stats"
      );
      return toErrorTuple(profileError);
    }

    for (const profile of (profiles ?? []) as unknown as ProfileRow[]) {
      profilesMap.set(profile.id, profile);
    }
  }

  const items = rows.map((row) =>
    mapUserOutreachStats(row, profilesMap.get(row.user_id))
  );

  const totalItems = count ?? items.length;
  const totalPages = perPage > 0 ? Math.ceil(totalItems / perPage) : 1;

  return [
    null,
    {
      items,
      page,
      perPage,
      totalItems,
      totalPages
    }
  ];
}

export async function listAllUsers(
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, User[]]> {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) {
    logger.error({ err: error.message }, "Failed to list profiles");
    return toErrorTuple(error);
  }

  return [
    null,
    ((data ?? []) as unknown as ProfileRow[]).map((profile) =>
      mapProfileToUser(profile)
    )
  ];
}

export async function getUserData(
  userId: string,
  client: TypedClient
): Promise<[ErrorCodes, null] | [null, UserData]> {
  const { data, error } = await client
    .from("user_outreach_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      return ["01x404", null];
    }

    logger.error(
      { err: error.message, userId },
      "Failed to fetch outreach stats"
    );
    return toErrorTuple(error);
  }

  if (!data) {
    return ["01x404", null];
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (profileError && profileError.code !== "PGRST116") {
    logger.error(
      { err: profileError.message, userId },
      "Failed to fetch profile"
    );
    return toErrorTuple(profileError);
  }

  return [
    null,
    mapUserOutreachStats(
      data as unknown as OutreachStatsRow,
      profile as unknown as ProfileRow | null | undefined
    )
  ];
}
