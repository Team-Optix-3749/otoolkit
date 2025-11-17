import type { Database } from "../sbClient";
import type { FeatureFlag } from "./flags";

export type UserRole = Database["public"]["Enums"]["user_role"];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string | null;
  usesOAuth: boolean;
  created: string;
  updated: string;
}

export interface UserData {
  id: string;
  user: string;
  outreachMinutes: number;
  buildMinutes: number;
  lastOutreachEvent: string | null;
  lastBuildEvent: string | null;
  expand?: {
    user: User;
  };
}

export interface OutreachEvent {
  id: string;
  name: string;
  date: string;
  created: string;
  updated: string;
}

export interface OutreachSession {
  id: string;
  user: string;
  event: string;
  minutes: number;
  created: string;
  updated: string;
  metadata: Database["public"]["Tables"]["outreach_sessions"]["Row"]["metadata"];
  expand?: {
    user?: User;
    event?: OutreachEvent;
  };
}

export interface Setting {
  id: string;
  key: string;
  value: Database["public"]["Tables"]["settings"]["Row"]["value"];
  created: string;
  updated: string;
}

export interface ScoutingResponse {
  id: string;
  user: string | null;
  team_number: number | null;
  team_name: string | null;
  data: Database["public"]["Tables"]["scouting_responses"]["Row"]["response_data"];
  date: string;
  created: string;
}

export interface FeatureFlagModel {
  id: string;
  name: string;
  flag: FeatureFlag;
  created: string;
  updated: string;
  createdBy: string | null;
}

export interface OutreachSettings {
  outreachMinutesCutoff: number;
}
