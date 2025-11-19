import { getOutreachMinutesCutoff } from "@/lib/db/outreach";

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
