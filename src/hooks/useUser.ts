import { useState, useEffect } from "react";

import { registerAuthCallback } from "@/lib/db/user";
import type { pbCol_Users } from "@/lib/types/pbTypes";

export function useUser() {
  const [user, setUser] = useState<pbCol_Users | null>(null);

  useEffect(() => {
    return registerAuthCallback(setUser);
  }, []);

  return { user, setUser } as const;
}
