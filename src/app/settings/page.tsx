import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import FlagsTab from "./FlagsTab";
import type { FeatureFlag } from "@/lib/types/flags";
import type { FlagRecord } from "./actions";
import { makeSBRequest } from "@/lib/supabase/supabase";
import { UserData } from "@/lib/types/supabase";
import { getSBBrowserClient } from "@/lib/supabase/sbClient";

export default async function SettingsPage() {
  const supabase = getSBBrowserClient();
  const {
    data: { user: authUser }
  } = await supabase.auth.getUser();

  let userData: UserData | null = null;

  if (authUser) {
    const { data } = await makeSBRequest(async (sb) =>
      sb.from("UserData").select("*").eq("user", authUser.id).maybeSingle()
    );

    userData = data;
  }

  const isAdmin = userData?.role === "admin";

  let flags: FlagRecord[] = [];
  let flagError: string | null = null;

  if (isAdmin) {
    const { data: rows, error } = await supabase
      .from("FeatureFlags")
      .select("*")
      .order("name", { ascending: true });

    if (error || !rows) {
      flagError = `Failed to fetch flags (${
        error?.message ?? "Unknown error"
      })`;
    } else {
      flags = rows.map((row) => {
        return {
          id: row.id,
          name: row.name as FlagRecord["name"],
          flag: row.flag as FeatureFlag,
          created: "",
          updated: ""
        };
      });
    }
  }
  const displayName = authUser?.user_metadata?.full_name || "Unknown";

  return (
    <div className="container mx-auto max-w-5xl space-y-8 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Review personal details and manage feature flags.
        </p>
      </header>

      <Tabs defaultValue="user" className="space-y-6">
        <TabsList>
          <TabsTrigger value="user">User</TabsTrigger>
          {isAdmin && <TabsTrigger value="flags">Flags</TabsTrigger>}
        </TabsList>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User details</CardTitle>
              <CardDescription>
                Account controls and profile preferences will live here soon.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Signed in as{" "}
              <span className="text-foreground font-medium">{displayName}</span>
              .
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="flags">
            {flagError ? (
              <Card className="border-destructive/40 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">
                    Unable to load flags
                  </CardTitle>
                  <CardDescription className="text-destructive/90">
                    {flagError}
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <FlagsTab initialFlags={flags} />
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
