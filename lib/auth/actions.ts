"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { z } from "zod";
import { hashPassword, verifyPassword } from "./passwords";
import { signAccessToken, signRefreshToken, generateRefreshToken } from "./tokens";
import { setAuthCookies, clearAuthCookies, getRefreshToken } from "./cookies";
import { createSession, rotateSession, deleteSession } from "./sessions";
import { getSession } from "./session";
import { Role } from "@/generated/prisma/client";

// ── Validation Schemas ────────────────────────────────────────
const RegisterSchema = z.object({
  name: z.string().min(2).max(64).trim(),
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

const LoginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1),
});

export type AuthResult =
  | { success: true }
  | { success: false; error: string; fields?: Record<string, string[]> };

// ── Register ──────────────────────────────────────────────────
export async function registerAction(_prevState: AuthResult, formData: FormData): Promise<AuthResult> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = RegisterSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fields: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "An account with this email already exists." };
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, hashedPassword },
  });

  await issueTokensAndSession(user.id, user.email, user.role);
  redirect("/dashboard");
}

// ── Login ─────────────────────────────────────────────────────
export async function loginAction(_prevState: AuthResult, formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Invalid email or password." };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Constant-time: still hash even on miss to prevent timing attacks
    await hashPassword(password);
    return { success: false, error: "Invalid email or password." };
  }

  const valid = await verifyPassword(password, user.hashedPassword);
  if (!valid) {
    return { success: false, error: "Invalid email or password." };
  }

  await issueTokensAndSession(user.id, user.email, user.role);
  redirect("/dashboard");
}

// ── Logout ────────────────────────────────────────────────────
export async function logoutAction(): Promise<void> {
  const rawRefresh = await getRefreshToken();
  if (rawRefresh) await deleteSession(rawRefresh);
  await clearAuthCookies();
  redirect("/login");
}

// ── Logout All Devices ────────────────────────────────────────
export async function logoutAllAction(): Promise<void> {
  const session = await getSession();
  if (session) await deleteSession(session.sessionId);
  await clearAuthCookies();
  redirect("/login");
}

// ── Internal Helper ───────────────────────────────────────────
async function issueTokensAndSession(userId: string, email: string, role: Role) {
  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") ?? undefined;
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  const accessToken = signAccessToken({ sub: userId, email, role });
  const rawRefresh = generateRefreshToken();
  const refreshJwt = signRefreshToken(userId);

  await createSession({ userId, rawRefreshToken: rawRefresh, userAgent, ipAddress: ip });
  await setAuthCookies(accessToken, refreshJwt + "." + rawRefresh);
  // Cookie = JWT part + raw token part, validated separately
}