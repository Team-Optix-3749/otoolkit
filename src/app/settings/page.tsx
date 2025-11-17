import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import FlagsTab from "./FlagsTab";
import { createSupabaseServerComponentClient } from "@/lib/supabase/server";
import { mapProfileToUser } from "@/lib/supabase/mappers";
import type { FeatureFlagModel, User } from "@/lib/types/supabase";
import type { FlagRecord } from "./actions";

export default async function SettingsPage() {
  const supabase = createSupabaseServerComponentClient();
  const {
    data: { user: authUser }
  } = await supabase.auth.getUser();

  let profile: User | null = null;

  if (authUser) {
    const { data: profileRow } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle();

    profile = profileRow ? mapProfileToUser(profileRow) : null;
  }

  const isAdmin = profile?.role === "admin";

  let flags: FlagRecord[] = [];
  let flagError: string | null = null;

  if (isAdmin) {
    const { data: rows, error } = await supabase
      .from("feature_flags")
      .select("*")
      .order("name", { ascending: true });

    if (error || !rows) {
      flagError = `Failed to fetch flags (${
        error?.message ?? "Unknown error"
      })`;
    } else {
      flags = (rows as FeatureFlagModel[]).map(mapFeatureFlagModelToRecord);
    }
  }
  const displayName =
    profile?.name || profile?.email || authUser?.email || "Unknown";

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

function mapFeatureFlagModelToRecord(model: FeatureFlagModel): FlagRecord {
  return {
    id: model.id,
    name: model.name,
    flag: model.flag,
    created: model.created,
    updated: model.updated
  };
}
