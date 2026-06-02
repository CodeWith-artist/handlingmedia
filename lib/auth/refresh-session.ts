import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/lib/auth/constants";

export async function tryRefreshSession(
  req: NextRequest,
  pathname: string
): Promise<NextResponse | null> {
  try {
    const refreshRes = await fetch(
      new URL("/api/auth/refresh", req.url),
      {
        method: "POST",
        headers: {
          cookie: req.headers.get("cookie") ?? "",
        },
      }
    );

    if (!refreshRes.ok) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("callbackUrl", pathname);

      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(ACCESS_COOKIE);
      res.cookies.delete(REFRESH_COOKIE);

      return res;
    }

    const newCookies = refreshRes.headers.getSetCookie();
    const res = NextResponse.next();

    for (const cookie of newCookies) {
      res.headers.append("Set-Cookie", cookie);
    }

    return res;
  } catch (error) {
    console.error("Refresh failed:", error);

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";

    const res = NextResponse.redirect(loginUrl);
    res.cookies.delete(ACCESS_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);

    return res;
  }
}