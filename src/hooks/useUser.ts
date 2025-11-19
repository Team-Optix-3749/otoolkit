import { useEffect, useState } from "react";
import { getSBBrowserClient } from "@/lib/supabase/sbClient";

import { User } from "@/lib/types/supabase";

export function useUser() {
  const supabase = getSBBrowserClient();
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
