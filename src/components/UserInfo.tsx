import { useEffect, useState } from "react";

import UserAvatar from "@/components/UserAvatar";
import type { FullUserData } from "@/lib/types/db";
import { getUserDataByUserId } from "@/lib/db/user";

type MinimalUserData = Pick<FullUserData, "name" | "email" | "avatar_url">;

type UserInfoProps = Partial<{
  user: MinimalUserData;
  userId: string;
  withoutEmail?: boolean;
}>;

export function UserInfo({ user, userId, withoutEmail }: UserInfoProps) {
  const [userData, setUserData] = useState<MinimalUserData | undefined>(user);

  useEffect(() => {
    if(userId) {
      (async () => {
        const [error, fetchedUserData] = await getUserDataByUserId(userId);
        if (!error && fetchedUserData) {
          setUserData({
            name: fetchedUserData.name,
            email: fetchedUserData.email,
            avatar_url: fetchedUserData.avatar_url
          });
        }
      })()
    }
  }, [userId]);

  return (
    <div className="flex items-center gap-2">
      <UserAvatar name={userData?.name} avatarUrl={userData?.avatar_url} />
      <div>
        <div className="font-medium">{userData?.name || "Unknown User"}</div>
        {!withoutEmail && (
          <div className="text-sm text-muted-foreground">
            {userData?.email || "No Email"}
          </div>
        )}
      </div>
    </div>
  );
}
