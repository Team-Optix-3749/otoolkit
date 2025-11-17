import { NextRequest, NextResponse } from "next/server";

import { hasPermission } from "./lib/permissions";
import { runFlag } from "./lib/flags";
import { getSBServerClient } from "./lib/sbServer";

const ROUTE_PERMISSIONS: Partial<
  Record<string, Parameters<typeof hasPermission>[1]>
> = {
  outreach: "outreach:view",
  scouting: "scouting:view",
  settings: "settings:view"
};

const FLAG_EXEMPT_PAGES = new Set(["settings"]);

export async function middleware(request: NextRequest) {
  // const originalPath = request.nextUrl.pathname;
  // const segments = originalPath.split("/").filter(Boolean);
  // const page = segments.at(0);

  // if (!page || page.startsWith("_") || page === "api") {
  //   return response;
  // }

  // let role: UserRole = "guest";
  // let userId: string | undefined;

  // const {
  //   data: { user: authUser }
  // } = await supabase.auth.getUser();

  // if (authUser) {
  //   userId = authUser.id;

  //   const { data: profile } = await supabase
  //     .from("profiles")
  //     .select("role")
  //     .eq("id", authUser.id)
  //     .maybeSingle();

  //   role = profile?.role ?? role;
  // }

  // if (!FLAG_EXEMPT_PAGES.has(page)) {
  //   const pageFlag = await runFlag(
  //     `${page}_page_enabled`,
  //     {
  //       userRole: role,
  //       userId
  //     },
  //     supabase
  //   );

  //   if (pageFlag.exists && !pageFlag.enabled) {
  //     return mwRedirect(request, "/disabled", {
  //       page: originalPath,
  //       reason: "feature_disabled"
  //     });
  //   }
  // }

  // const requiredPermission = ROUTE_PERMISSIONS[page];

  // if (requiredPermission && !hasPermission(role, requiredPermission)) {
  //   return mwRedirect(request, "/unauthorized", { page: originalPath });
  // }

  // return response;

  const response = NextResponse.next({ request });

  const supabase = getSBServerClient(response.cookies);

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // // Later, replace "true" with a flag check to see if they can view page.
  // if (!user && !request.nextUrl.pathname.startsWith("/auth")) {
  //   return mwRedirect(response, request.nextUrl.clone(), "/auth/login", {
  //     next: request.nextUrl.pathname
  //   });
  // }

  return response;
}

function mwRedirect(
  response: NextResponse,
  url: URL,
  pathname: string,
  params: Record<string, string>
) {
  if (pathname === url.pathname) {
    return response;
  }

  const searchParams = new URLSearchParams(params);
  const redirectUrl = new URL(pathname, url);
  redirectUrl.search = searchParams.toString();

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
