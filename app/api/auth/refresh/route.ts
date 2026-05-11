// app/api/auth/refresh/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getRefreshToken } from "@/lib/auth/cookies";
import { rotateSession } from "@/lib/auth/sessions";
import { signAccessToken, generateRefreshToken, verifyRefreshToken } from "@/lib/auth/tokens";
import { setAuthCookies } from "@/lib/auth/cookies";
import { prisma } from "@/lib/prisma";
  
export async function POST(req: NextRequest) {
  try {
    const rawRefresh = req.cookies.get("refresh_token")?.value;
    if (!rawRefresh) return NextResponse.json({ error: "No token" }, { status: 401 });

    const session = await rotateSession(rawRefresh, generateRefreshToken());
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    const newAccess = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const newRefresh = generateRefreshToken();

    const res = NextResponse.json({ ok: true });
    // Set new cookies on the response
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}