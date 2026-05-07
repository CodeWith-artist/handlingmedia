// lib/auth/session.ts

import { cache } from "react";
import { cookies } from "next/headers";
import { verifyAccessToken, AccessTokenPayload } from "./tokens";
import { ACCESS_COOKIE } from "./constants";
import { Role } from "@/generated/prisma/client";
import { redirect as nextRedirect } from "next/navigation";

export interface SessionUser {
  userId: string;
  email: string;
  role: Role;
  sessionId: string; // convenience, not in JWT — use if needed
}

// cache() ensures this runs once per request (RSC deduplication)
export const getSession = cache(async (): Promise<SessionUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_COOKIE)?.value;
    if (!token) return null;

    const payload: AccessTokenPayload = verifyAccessToken(token);
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      sessionId: "",
    };
  } catch {
    return null;
  }
});

// Convenience guards
export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) nextRedirect("/login");
  return session;
}

export async function requireRole(role: Role): Promise<SessionUser> {
  const session = await requireSession();
  if (session.role !== role) nextRedirect("/unauthorized");
  return session;
}

