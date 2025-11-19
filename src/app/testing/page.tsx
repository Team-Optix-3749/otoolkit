"use server";

import { getSBBrowserClient } from "@/lib/supabase/sbClient";

export default async function Testing({}) {
  const supabase = getSBBrowserClient();

  const { data, error } = await supabase
    .from("UserData")
    .select("*");

  console.log("UserData:", { data, error });

  return <div>Testing Page - Check console for UserData output</div>;
}
