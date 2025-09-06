import { type RecordModel } from "pocketbase";

export interface pbCol_Users extends RecordModel {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  updated: string;
  verified: boolean;
  role: "member" | "admin" | "guest";
}

export interface pbCol_UserData extends RecordModel {
  created: string;
  updated: string;
  user: string;
  outreachMinutes: number;
  buildMinutes: number;
  lastOutreachEvent: string;
  lastBuildEvent: string;
  expand?: {
    user: pbCol_Users;
  };
}

export interface pbCol_OutreachEvents extends RecordModel {
  id: string;
  name: string;
  created: string;
  updated: string;
  date: string;
}

export interface pbCol_OutreachSessions extends RecordModel {
  id: string;
  user: string;
  minutes: number;
  created: string;
  expand?: {
    user: pbCol_Users;
    event: pbCol_OutreachEvents;
  };
}

export interface pbCol_Settings extends RecordModel {
  id: string;
  key: string;
  value: JSON;
  created: string;
  updated: string;
}

export type pb_OAuthProvider = "google" | "discord";
