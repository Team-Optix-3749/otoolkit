import type { PostgrestError, User } from "@supabase/supabase-js";

import { getSBBrowserClient } from "../supabase/sbClient";
import { mapProfileToUser } from "@/lib/supabase/mappers";
import { logger } from "../logger";
import { makeSBRequest } from "../supabase/supabase";
import { UserData } from "../types/supabase";

type PaginatedResult<T> = {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

function isMissingRelation(error: PostgrestError | null): boolean {
  if (!error?.message) return false;
  const message = error.message.toLowerCase();
  return message.includes("relation") && message.includes("does not exist");
}

function mapToUserData(row: UserData, profile: User): UserData {
  return {
    id: "id" in row && row.id ? String(row.id) : row.user,
    userId: row.user,
    outreachMinutes: row.outreach_minutes ?? 0,
    outreachEvents: row.outreach_events ?? 0,
    lastOutreachEvent: null,
    source,
    expand: {
      user: profile
    }
  };
}

async function selectUserDataRange(
  from: number,
  to: number
): Promise<{
  rows: UserDataRowLike[];
  count: number | null;
  source: UserData["source"];
}> {
  const { data, error, count } = await makeSBRequest(async (sb) =>
    sb
      .from(USER_DATA_TABLE)
      .select("id, user, outreach_minutes, outreach_events", { count: "exact" })
      .order("outreach_minutes", { ascending: false })
      .range(from, to)
  );

  if (!error && data) {
    return {
      rows: data as UserDataTableRow[],
      count: count ?? data.length,
      source: "table"
    };
  }

  if (error) {
    throw error;
  }

  return {
    rows: (data ?? []) as UserDataTableRow[],
    count: count ?? null,
    source: "table"
  };
}

export async function fetchUserData(id: string): Promise<UserData | null> {
  const [error, data] = await getUserDataByUserId(id);
  if (error || !data) {
    return null;
  }
  return data;
}

export async function listUserData(
  page = 1,
  perPage = 25
): Promise<[string | null, PaginatedResult<UserData> | null]> {
  try {
    const supabase = getSBBrowserClient();
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { rows, count, source } = await selectUserDataRange(
      supabase,
      from,
      to
    );
    const userIds = rows.map((row) => (row as UserDataTableRow).user);
    const profileMap = await fetchProfiles(supabase, userIds);

    const items = rows.map((row) =>
      mapToUserData(
        row,
        source,
        profileMap.get((row as UserDataTableRow).user) ?? null
      )
    );

    const totalItems = count ?? items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / perPage));

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
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load user data";
    logger.error({ message, error }, "listUserData failed");
    return [message, null];
  }
}

export async function getUserDataByUserId(
  userId: string
): Promise<[string | null, UserData | null]> {
  try {
    const supabase = getSBBrowserClient();

    const tableResult = await supabase
      .from(USER_DATA_TABLE)
      .select("id, user, outreach_minutes, outreach_events")
      .eq("user", userId)
      .maybeSingle();

    let row: UserDataRowLike | null = null;
    let source: UserData["source"] = "table";

    if (!tableResult.error && tableResult.data) {
      row = tableResult.data as UserDataTableRow;
    } else if (tableResult.error) {
      return [tableResult.error.message, null];
    }

    if (!row) {
      return [null, null];
    }

    const profileMap = await fetchProfiles(supabase, [userId]);
    const mapped = mapToUserData(row, source, profileMap.get(userId) ?? null);

    return [null, mapped];
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load user data";
    return [message, null];
  }
}

export async function listAllUsers(): Promise<[string | null, User[] | null]> {
  const supabase = getSBBrowserClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("profiles")
    .select("id, email, full_name, avatar_url, role, uses_oauth")
    .order("full_name", { ascending: true });

  if (error || !data) {
    return [error?.message ?? "Failed to load users", null];
  }

  return [
    null,
    (data as ProfileRow[]).map((row: ProfileRow) => mapProfileToUser(row))
  ];
}

export async function getUserProfile(
  userId: string
): Promise<[string | null, User | null]> {
  const supabase = getSBBrowserClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("profiles")
    .select("id, email, full_name, avatar_url, role, uses_oauth")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    return [error.message, null];
  }

  if (!data) {
    return [null, null];
  }

  return [null, mapProfileToUser(data as ProfileRow)];
}
