import { useState, useEffect, useCallback } from "react";

import { registerAuthCallback } from "@/lib/db/user";
import type { User } from "@/lib/types/pocketbase";
import { PBBrowser } from "@/lib/pb";
import { OnStoreChangeFunc } from "pocketbase";

export function useUser() {
  const pb = PBBrowser.getInstance();
  const [user, setUser] = useState<User | null>(null);

  const callback: OnStoreChangeFunc = useCallback(
    (token, record) => {
      setUser(record as User | null);
    },
    [pb]
  );

  useEffect(() => {
    return registerAuthCallback(callback, pb);
  }, [pb, callback]);

  return { user, setUser } as const;
}
