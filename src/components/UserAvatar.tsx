import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { getUserWithId } from "@/lib/db/server";
import { getProfileImageUrl } from "@/lib/supabase/supabase";

export default function UserAvatar({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const [error, user] = await getUserWithId(userId);

      if (error || !user) {
        setLoading(false);
        return;
      }

      const profileImageUrl = getProfileImageUrl(user);
      setImageSrc(profileImageUrl);
      setLoading(false);
    })();
  }, []);

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={imageSrc} />
      <AvatarFallback>{loading ? <Loader /> : "?"}</AvatarFallback>
    </Avatar>
  );
}
