import { type RecordModel } from "pocketbase";

export interface pb_UsersColItem extends RecordModel {
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

export interface pb_UserDataColItem extends RecordModel {
  created: string;
  updated: string;
  user: string;
  outreachMinutes: number;
  buildMinutes: number;
  lastOutreachEvent: string;
  lastBuildEvent: string;
  expand?: {
    user: pb_UsersColItem;
  };
}

export interface pb_OutreachEventsColItem extends RecordModel {
  id: string;
  name: string;
  created: string;
  updated: string;
  date: string;
}

export interface pb_OutreachSessionsColItem extends RecordModel {
  id: string;
  user: string;
  minutes: number;
  created: string;
  expand?: {
    user: pb_UsersColItem;
    event: pb_OutreachEventsColItem;
  };
}

export interface pb_SettingsItem extends RecordModel {
  id: string;
  key: string;
  value: JSON;
  created: string;
  updated: string;
}

export type OAuthProvider = "google" | "discord";
