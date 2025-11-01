import { redirect } from "next/navigation";

import OutreachPage from "./OutreachPage";
import { getUserRole, hasPermission } from "@/lib/permissions";
import { getOutreachMinutesCutoff } from "@/lib/db/outreach";
import { PBServer } from "@/lib/pb";
import { getUserData } from "@/lib/db/user";
import Loader from "@/components/Loader";

export default async function ServerDataFetcher() {
  const pb = await PBServer.getInstance();

  const [error, userData] = await getUserData(
    pb.authStore.record?.id || "",
    pb
  );
  const userRole = getUserRole(pb) || "guest";

  if (error && error !== "01x02") {
    console.error("Error fetching user data");
    return <Loader />;
  }
  
  if (!userData?.expand?.user?.id) {
    console.error("Error fetching user data");
    return <Loader />;
  }

  const outreachMinutesCutoff = await getOutreachMinutesCutoff(pb);
  const canManage = hasPermission(userRole, "outreach:manage");

  return (
    <OutreachPage
      {...{
        canManage,
        user: userData.expand.user,
        userData,
        outreachMinutesCutoff
      }}
    />
  );
}
