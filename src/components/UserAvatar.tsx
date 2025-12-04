import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  name?: string | null;
  avatarUrl?: string | null;
  className?: string;
  fallback?: string;
};

export default function UserAvatar({
  name,
  avatarUrl,
  className,
  fallback
}: UserAvatarProps) {
  const initials = fallback ?? name?.trim().charAt(0)?.toUpperCase() ?? "?";

  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={avatarUrl ?? undefined} alt={name ?? "User avatar"} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
