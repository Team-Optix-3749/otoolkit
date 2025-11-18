import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { createServerClient } from "@supabase/ssr";
import { assertEnv } from "../utils";

export const getSBServerClient = (cookieStore: ResponseCookies) => {
  const url = assertEnv("NEXT_PUBLIC_SUPABASE_URL", process.env);
  const anonKey = assertEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env);

  return createServerClient(url, anonKey, {
    cookies: cookieStore
  });
};
