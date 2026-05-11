// app/api/auth/refresh/route.ts

import { NextRequest, NextResponse } from "next/server";
import { rotateSession } from "@/lib/auth/sessions";
import { signAccessToken, generateRefreshToken } from "@/lib/auth/tokens";
import { setNewAuthCookies } from "@/lib/auth/cookies";
import { prisma } from "@/lib/prisma";
  
export async function POST(req: NextRequest) {
  try {
    const rawRefresh = req.cookies.get("refresh_token")?.value;
    if (!rawRefresh) return NextResponse.json({ error: "No token" }, { status: 401 });
    const newRefresh = generateRefreshToken();
    const session = await rotateSession(rawRefresh, newRefresh);
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    const newAccess = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    

    const res = NextResponse.json({ ok: true });
    setNewAuthCookies( res,  newAccess, newRefresh);

    
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
} 