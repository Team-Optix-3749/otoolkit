"use server";

import { getSBServerClientWithNextJSCookies } from "../supabase/sbServer";

import type { UserData } from "../types/db";

export async function getAllUsers(): Promise<
  [string | null, UserData[] | null]
> {
  const sb = await getSBServerClientWithNextJSCookies();

  const { data, error } = await sb
    .from("UserData")
    .select("*")
    .order("user_name", { ascending: true });

  if (error || !data) {
    return [error?.message ?? "Failed to get user", null];
  }

  return [null, data];
}
