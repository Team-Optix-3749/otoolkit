import { redirect } from "next/navigation";
import { getUserRole, hasPermission } from "@/lib/permissions";
import { getOutreachMinutesCutoff } from "@/lib/db/outreach";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server";
import { mapProfileToUser } from "@/lib/supabase/mappers";

import OutreachPage from "./OutreachPage";
import { getUserData } from "@/lib/db/user";
import ServerToaster from "@/components/ServerToaster";
import { ErrorToString } from "@/lib/types/states";
import { getSearchParamsString } from "@/lib/utils";
import type { User } from "@/lib/types/models";

export default async function OutreachServerPage() {
  const supabase = createSupabaseServerComponentClient();

  const {
    data: { user: authUser }
  } = await supabase.auth.getUser();

  const profileRow = authUser
    ? await supabase
        .from("profiles" as const)
        .select("*")
        .eq("id", authUser.id)
        .maybeSingle()
    : { data: null };

  const profile = profileRow.data ? mapProfileToUser(profileRow.data) : null;

  const [error, userData] = authUser
    ? await getUserData(authUser.id, supabase)
    : ["01x404", null];
  const userRole = getUserRole(profile) || "guest";

  if (error && error !== "01x02") {
    return (
      <ServerToaster
        message={`01x02: ${ErrorToString["01x02"]} - Refresh the page to try again.`}
        type="error"
      />
    );
  }

  const outreachMinutesCutoff = await getOutreachMinutesCutoff(supabase);
  const canManage = hasPermission(userRole, "outreach:manage");

  return (
    <OutreachPage
      {...{
        canManage,
        user: profile,
        userData: userData || undefined,
        outreachMinutesCutoff
      }}
    />
  );
}
