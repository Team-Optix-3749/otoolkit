"use server";

import { cookies } from "next/headers";
import { getSBServerClient } from "../supabase/sbServer";

import { User } from "../types/supabase";

export async function getUserWithId(
  userId: string
): Promise<[string | null, null | User]> {
  const sb = getSBServerClient(await cookies());

  const { data, error } = await sb.auth.admin.getUserById(userId);

  if (error || !data) {
    return [error?.message ?? "Failed to get user", null];
  }

  return [null, data.user];
}

export async function getAllUsers(): Promise<[string | null, null | User[]]> {
  const sb = getSBServerClient(await cookies());

  const { data, error } = await sb.auth.admin.listUsers();

  if (error || !data) {
    return [error?.message ?? "Failed to get user", null];
  }

  return [null, data.user];
}
