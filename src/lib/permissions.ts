import type { UserData } from "./types/db";

type UserRole = UserData["role"];

const guest = ["outreach:view", "scouting:view", "scouting:submit"] as const;
const member = [
  ...guest,
  "settings:view",
  "scouting:view_submissions"
] as const;
const admin = [...member, "outreach:manage", "settings:manage"] as const;

const ROLES: Record<UserRole, readonly string[]> = {
  guest,
  member,
  admin
} as const;

type Permission = (typeof ROLES)[UserRole][number];

export function hasPermission(
  userRole: UserRole | null | undefined,
  flag: Permission
) {
  if (!userRole || !flag) return false;

  return (ROLES[userRole] as readonly Permission[]).includes(flag);
}

export function getUserRole(
  user?: { role?: UserRole | null } | null
): UserRole | null {
  return user?.role ?? null;
}
