import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const getSBServerClient = (cookieStore: ResponseCookies) => {
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: cookieStore
  });
};
