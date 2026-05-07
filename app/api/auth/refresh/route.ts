// app/api/auth/refresh/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rotateSession } from "@/lib/auth/sessions";
import { signAccessToken, generateRefreshToken, hashRefreshToken } from "@/lib/auth/tokens";
import { REFRESH_COOKIE, ACCESS_COOKIE, ACCESS_TOKEN_EXPIRY_SECONDS, REFRESH_TOKEN_EXPIRY_SECONDS } from "@/lib/auth/constants";

const isProduction = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  try {
    const rawRefresh = req.cookies.get(REFRESH_COOKIE)?.value;
    if (!rawRefresh) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // Rotate session — this also detects reuse attacks
    const session = await rotateSession(rawRefresh, generateRefreshToken());

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Issue new tokens
    const newAccessToken  = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const newRawRefresh   = generateRefreshToken();

    // We need to store the NEW refresh token in DB
    // rotateSession already updated it — but we need to return it in cookies
    // So let's update session with the actual new raw token
    await prisma.session.update({
      where: { id: session.id },
      data:  { refreshToken: hashRefreshToken(newRawRefresh) },
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set(ACCESS_COOKIE, newAccessToken, {
      httpOnly: true,
      secure:   isProduction,
      sameSite: "lax",
      path:     "/",
      maxAge:   ACCESS_TOKEN_EXPIRY_SECONDS,
    });

    res.cookies.set(REFRESH_COOKIE, newRawRefresh, {
      httpOnly: true,
      secure:   isProduction,
      sameSite: "lax",
      path:     "/",
      maxAge:   REFRESH_TOKEN_EXPIRY_SECONDS,
    });

    return res;

  } catch (err) {
    // Token reuse detected or invalid — clear cookies
    const res = NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    res.cookies.delete(ACCESS_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    return res;
  }
}