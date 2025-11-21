import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Tables } from "./supabase";

export type User = SupabaseUser;
export type UserData = Tables<"UserData">;
export type FullUserData = User & UserData;
export type OutreachEvent = Tables<"OutreachEvents">;
export type OutreachSession = Tables<"OutreachSessions">;
