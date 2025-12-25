import { makeSBRequest } from "../supabase/supabase";
import { ActivityType } from "../types/db";
import type { Tables } from "../types/supabase";

type ActivitySummaryRow = Tables<"UserActivitySummaries">;

type PaginatedResult<T> = {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export async function fetchUserActivitySummary(
  userId: string,
  types: ActivityType[]
): Promise<[string | null, ActivitySummaryRow | null]> {
  const { data, error } = await makeSBRequest(async (sb) =>
    sb
      .from("UserActivitySummaries")
      .select("user_id,user_name,user_credited_minutes,minutes")
      .in("activity_type", types)
      .eq("user_id", userId)
      .maybeSingle()
  );

  if (error) {
    return [error.message ?? "Failed to load activity summary", null];
  }

  return [null, data as ActivitySummaryRow | null];
}

export async function fetchActivitySummariesPaginated(
  page: number,
  perPage: number,
  types: ActivityType[],
  orderBy: string = "user_credited_minutes",
  orderDirection: "asc" | "desc" = "desc"
): Promise<PaginatedResult<ActivitySummaryRow> | null> {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await makeSBRequest(async (sb) =>
    sb
      .from("UserActivitySummaries")
      .select("*", { count: "exact" })
      .in("activity_type", types)
      .order(orderBy, { ascending: orderDirection === "asc" })
      .range(from, to)
  );

  if (error || !data || count === null) {
    return null;
  }

  return {
    items: data as ActivitySummaryRow[],
    page,
    perPage,
    totalItems: count,
    totalPages: Math.ceil(count / perPage)
  };
}

export async function fetchActivitySummaryByEvent(
  eventId: number
): Promise<[string | null, ActivitySummaryRow[]]> {
  const { data, error } = await makeSBRequest(async (sb) =>
    sb
      .from("UserActivitySummaries")
      .select("minutes,user_credited_minutes")
      .eq("event_id", eventId)
  );

  if (error || !data) {
    return [error?.message ?? "Failed to load event summary", []];
  }

  return [null, data as ActivitySummaryRow[]];
}
