import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { ACCESS_COOKIE } from "@/lib/auth/constants";

// Routes that require authentication
const PROTECTED_PREFIXES = ["/dashboard", "/settings", "/admin"];
// Routes only for guests
const GUEST_ONLY = ["/login", "/register"];
// Admin-only routes
const ADMIN_PREFIXES = ["/admin"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  let session = null;

  if (accessToken) {
    try {
      session = verifyAccessToken(accessToken);
    } catch {
      // Expired or tampered — treat as logged out
    }
  }

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isGuestOnly = GUEST_ONLY.some((p) => pathname.startsWith(p));
  const isAdminRoute = ADMIN_PREFIXES.some((p) => pathname.startsWith(p));

  // Not logged in → redirect to login
  if (isProtected && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Logged in → don't show login/register
  if (isGuestOnly && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Non-admin on admin route
  if (isAdminRoute && session?.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};