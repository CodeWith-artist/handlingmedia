// lib/auth/sessions.ts

import { prisma } from "@/lib/prisma";
import { hashRefreshToken } from "./tokens";
import { REFRESH_TOKEN_EXPIRY_SECONDS } from "./constants";

interface CreateSessionInput {
  userId: string;
  rawRefreshToken: string;
  userAgent?: string;
  ipAddress?: string;
}

export async function createSession({
  userId,
  rawRefreshToken,
  userAgent,
  ipAddress,
}: CreateSessionInput) {
  const hashedToken = hashRefreshToken(rawRefreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_SECONDS * 1000);

  return prisma.session.create({
    data: {
      userId,
      refreshToken: hashedToken,
      userAgent,
      ipAddress,
      expiresAt,
    },
  });
}

export async function rotateSession(oldRawToken: string, newRawToken: string) {
  const oldHashed = hashRefreshToken(oldRawToken);
  console.log("Rotating session: old hashed token", oldHashed);
  const newHashed = hashRefreshToken(newRawToken);
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_SECONDS * 1000);

  // Atomic: find old session and replace token
  const session = await prisma.session.findUnique({
    where: { refreshToken: oldHashed },
  });

  if (!session || session.expiresAt < new Date()) {
    // Potential token reuse attack — invalidate ALL sessions for this user
    if (session) {
      await prisma.session.deleteMany({ where: { userId: session.userId } });
    }
    throw new Error("INVALID_REFRESH_TOKEN");           
  }

  return prisma.session.update({
    where: { id: session.id },
    data: { refreshToken: newHashed, expiresAt },
  });
}

export async function deleteSession(rawRefreshToken: string) {
  const hashed = hashRefreshToken(rawRefreshToken);
  await prisma.session.deleteMany({ where: { refreshToken: hashed } });
}

export async function deleteAllUserSessions(userId: string) {
  await prisma.session.deleteMany({ where: { userId } });
}