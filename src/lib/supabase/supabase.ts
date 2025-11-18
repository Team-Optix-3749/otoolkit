import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { getSBBrowserClient } from "./sbClient";
import { logger } from "../logger";

type SBRequestCallback<T, U extends PostgrestSingleResponse<T>> = (
  sb: ReturnType<typeof getSBBrowserClient>
) => Promise<U>;

export async function makeSBRequest<T, U extends PostgrestSingleResponse<T>>(
  fn: SBRequestCallback<T, U>
) {
  const sb = getSBBrowserClient();

  const ret = await fn(sb);

  if (ret.error) {
    logger.error({ ret }, "[SBRequest] Request Failed");
    return ret;
  }

  return ret;
}
