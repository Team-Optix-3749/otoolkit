import { getOutreachMinutesCutoff } from "@/lib/db/outreach.server";

import OutreachPage from "./OutreachPage";

export default async function OutreachServerPage() {
  const outreachMinutesCutoff = await getOutreachMinutesCutoff();

  return (
    <OutreachPage
      {...{
        outreachMinutesCutoff
      }}
    />
  );
}
