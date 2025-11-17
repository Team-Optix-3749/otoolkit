import { createBrowserClient } from "@supabase/ssr";
import { User } from "./types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const getSBBrowserClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);

export function getProfileImageUrl(user: User) {
  return user.user_metadata?.avatar_url;
}
