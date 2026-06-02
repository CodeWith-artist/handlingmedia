// middleware.ts  (replace your existing file)

import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth/constants";
import { tryRefreshSession } from "@/lib/auth/refresh-session";

const PROTECTED_PREFIXES = ["/dashboard", "/settings", "/admin"];
const GUEST_ONLY         = ["/login", "/register"];
const ADMIN_PREFIXES     = ["/admin"];
const BLOG_PATHS         = ["/dashboard/blog"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken  = req.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;

  let session = null;

  // 1. Try to verify access token
  if (accessToken) {
    try {
      session = verifyAccessToken(accessToken);
    } catch {
      // Expired or invalid — will attempt refresh below
    }
  }

  const isProtected  = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isGuestOnly  = GUEST_ONLY.some((p) => pathname.startsWith(p));
  const isAdminRoute = ADMIN_PREFIXES.some((p) => pathname.startsWith(p));
  const isBlogRoute  = BLOG_PATHS.some((p) => pathname.startsWith(p));

  // 2. Access token invalid/expired — try refresh
  if (!session && refreshToken && isProtected) {
    return await tryRefreshSession(req, pathname);
  }

  // 3. No session + protected route → login
  if (isProtected && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 4. Logged in → don't show login/register
  if (isGuestOnly && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 5. Admin-only routes
  if (isAdminRoute && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // 6. Blog routes — USER role blocked
  if (isBlogRoute && session?.role === "USER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};   