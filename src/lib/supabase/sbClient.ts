import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/supabase";
import { assertEnv } from "../utils";

export function getSBBrowserClient() {
  const url = assertEnv("NEXT_PUBLIC_SUPABASE_URL", process.env);
  const anonKey = assertEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env);

  return createBrowserClient<Database>(url, anonKey);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getProfileImageUrl(user: any): string | undefined {
  // Accept both auth user (with user_metadata) and profile rows with avatar_url
  if (!user) return undefined;
  // Owned profile row shape: { avatar_url: string | null }
  if (typeof user.avatar_url === "string" && user.avatar_url)
    return user.avatar_url;
  // Auth user shape: user_metadata may contain avatar URL
  return user.user_metadata?.avatar_url;
}
