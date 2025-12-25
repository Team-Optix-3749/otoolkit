export type SettingsTabId = "profile";

export interface SettingsTabConfig {
  id: SettingsTabId;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export const settingsTabs: SettingsTabConfig[] = [
  {
    id: "profile",
    label: "Profile",
    description: "Manage your personal information and avatar"
  }
];
