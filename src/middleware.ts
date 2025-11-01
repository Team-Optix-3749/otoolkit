import { NextRequest, NextResponse } from "next/server";
import { PBServer } from "./lib/pb";
import { getPBAuthCookieWithGetter } from "./lib/pbServerUtils";

const adminOnlyRoutes = ["/admin", "/testing", "/outreach/manage"];
const authedOnlyRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/outreach",
  "/build",
  "/scouting"
];
// const publicPaths = ["/auth/unauthorized", "/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();

  // if (publicPaths.includes(nextUrl.pathname)) {
  //   return NextResponse.next();
  // }

  if (![...authedOnlyRoutes, ...adminOnlyRoutes].includes(nextUrl.pathname))
    return NextResponse.next();

  const pbAuthCookie = await getPBAuthCookieWithGetter((key: string) =>
    request.cookies.get(key)
  );

  const pb = new PBServer(pbAuthCookie || "");
  const record = pb.authStore.record;

  if (!record) {
    nextUrl.searchParams.set("redirect", nextUrl.pathname);
    nextUrl.pathname = "/auth/login";

    return NextResponse.redirect(nextUrl);
  }

  const role = record?.role || "guest";

  if (role === "admin") {
    return NextResponse.next();
  }

  if (adminOnlyRoutes.includes(nextUrl.pathname)) {
    nextUrl.searchParams.set("page", nextUrl.pathname);
    nextUrl.pathname = "/auth/unauthorized";

    return NextResponse.redirect(nextUrl);
  }

  return NextResponse.next();
}
