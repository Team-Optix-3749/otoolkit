import { makeSBRequest } from "../supabase/supabase";
import { BaseStates } from "@/lib/types/states";

type UserDataRow = {
  id: number;
  outreach_minutes: number;
};

export async function manualModifyOutreachHours(
  userId: string,
  deltaMinutes: number
): Promise<BaseStates> {
  if (!userId || !Number.isFinite(deltaMinutes)) {
    return BaseStates.ERROR;
  }

  try {
    // We use makeSBRequest for queries; don't need the typed client here.
    const { data, error } = await makeSBRequest(async (sb) =>
      sb
        .from("UserData")
        .select("id, outreach_minutes")
        .eq("user", userId)
        .maybeSingle<UserDataRow>()
    );

    if (error) {
      return BaseStates.ERROR;
    }

    if (!data) {
      if (deltaMinutes < 0) {
        return BaseStates.ERROR;
      }

      const { error: insertError } = await makeSBRequest(async (sb) =>
        sb.from("UserData").insert({
          user: userId,
          outreach_minutes: deltaMinutes,
          outreach_events: 0
        })
      );

      return insertError ? BaseStates.ERROR : BaseStates.SUCCESS;
    }

    const currentMinutes = data.outreach_minutes ?? 0;
    const nextMinutes = Math.max(0, currentMinutes + deltaMinutes);

    const { error: updateError } = await makeSBRequest(async (sb) =>
      sb
        .from("UserData")
        .update({ outreach_minutes: nextMinutes })
        .eq("id", (data as unknown as UserDataRow)?.id)
    );

    return updateError ? BaseStates.ERROR : BaseStates.SUCCESS;
  } catch {
    return BaseStates.ERROR;
  }
}
