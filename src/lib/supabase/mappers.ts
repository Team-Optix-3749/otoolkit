import type { ProfileRow, User } from "@/lib/types/models";

function fallbackName(email: string) {
  if (!email) return "Unknown";
  return email.split("@")[0];
}

export function mapProfileToUser(row: ProfileRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.full_name ?? fallbackName(row.email),
    avatar: row.avatar_url,
    role: row.role,
    usesOAuth: Boolean(row.uses_oauth)
  };
}
