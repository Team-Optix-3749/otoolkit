import { useEffect, useMemo, useState } from "react";
import { getSBBrowserClient } from "@/lib/sbClient";

import { User } from "@/lib/types/supabase";

export function useUser() {
  const supabase = useMemo(() => getSBBrowserClient(), []);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userRes = await supabase.auth.getUser();
      setUser(userRes.data.user);

      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
    })();
  }, [supabase, setUser]);

  return { user } as const;
}
