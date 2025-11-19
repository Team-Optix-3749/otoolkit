import UserAvatar from "@/components/UserAvatar";
import { getUserWithId } from "@/lib/db/server";
import { User } from "@/lib/types/supabase";
import { useState, useEffect } from "react";

export function UserInfo({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserWithId(userId).then(([error, user]) => {
      if (error || !user) {
        return;
      }
      setUser(user);
    });
  }, [userId]);

  return (
    <div className="flex items-center gap-2">
      <UserAvatar userId={userId} />
      <div>
        <div className="font-medium">
          {user?.user_metadata?.full_name || "Unknown User"}
        </div>
        <div className="text-sm text-muted-foreground">
          {user?.email || "No Email"}
        </div>
      </div>
    </div>
  );
}
