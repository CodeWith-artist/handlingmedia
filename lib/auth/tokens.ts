import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Role } from "@/generated/prisma/client";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface AccessTokenPayload {
  sub: string;   // userId
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

// ── Access Token ──────────────────────────────────────────────
export function signAccessToken(payload: Omit<AccessTokenPayload, "iat" | "exp">): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as AccessTokenPayload;
}

// ── Refresh Token ─────────────────────────────────────────────
// Raw token: cryptographically random, sent to client
// Stored in DB: hashed, so a DB breach doesn't leak live tokens
export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

export function hashRefreshToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

export function signRefreshToken(userId: string): string {
  // We still JWT-sign the refresh token so we can embed userId
  // without a DB lookup during rotation
  return jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyRefreshToken(token: string): { sub: string } {
  return jwt.verify(token, REFRESH_SECRET) as { sub: string };
}