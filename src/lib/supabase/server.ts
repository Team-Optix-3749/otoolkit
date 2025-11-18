import { cookies } from "next/headers";
import { getSBServerClient } from "./sbServer";

export function createSupabaseServerComponentClient() {
  // next/headers cookies() returns a ReadonlyRequestCookies, but our
  // internal helper expects a ResponseCookies type imported from a different
  // runtime. Cast through unknown to avoid type mismatch at compile time.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return getSBServerClient(cookies() as unknown as any);
}
