// lib/users/actions.ts
"use server";

import { z }             from "zod";
import crypto            from "crypto";
import { revalidatePath } from "next/cache";
import { prisma }        from "@/lib/prisma";
import { getSession }    from "@/lib/auth/session";
import { hashPassword }  from "@/lib/auth/passwords";
import { redirect }      from "next/navigation";
import { Role }          from "@/generated/prisma/client";

// ── Guard ─────────────────────────────────────────────────────

async function requireAdmin() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/unauthorized");
  return session;
}

export type UserActionResult =
  | { success: true;  message?: string }
  | { success: false; error: string; fields?: Record<string, string[]> };

// ── Create User with Temp Password ───────────────────────────

const CreateUserSchema = z.object({
  name:     z.string().min(2).max(64).trim(),
  email:    z.string().email().toLowerCase(),
  role:     z.enum(["USER", "MARKETING", "ADMIN"]),
  password: z.string().min(8)
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

export async function createUserAction(
  _prev: UserActionResult,
  formData: FormData
): Promise<UserActionResult> {
  await requireAdmin();

  const parsed = CreateUserSchema.safeParse({
    name:     formData.get("name"),
    email:    formData.get("email"),
    role:     formData.get("role"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error:   "Validation failed",
      fields:  parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, role, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { success: false, error: "A user with this email already exists." };

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: { name, email, role, hashedPassword, emailVerified: true },
  });

  revalidatePath("/dashboard/users");
  return { success: true, message: `User ${email} created successfully.` };
}

// ── Create Invite Link ────────────────────────────────────────

const InviteSchema = z.object({
  email: z.string().email().toLowerCase(),
  role:  z.enum(["USER", "MARKETING", "ADMIN"]),
});

export async function createInviteAction(
  _prev: UserActionResult,
  formData: FormData
): Promise<UserActionResult> {
  const admin = await requireAdmin();

  const parsed = InviteSchema.safeParse({
    email: formData.get("email"),
    role:  formData.get("role"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error:   "Validation failed",
      fields:  parsed.error.flatten().fieldErrors,
    };
  }

  const { email, role } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { success: false, error: "A user with this email already exists." };

  // Revoke any existing unused invite for this email
  await prisma.inviteToken.deleteMany({
    where: { email, usedAt: null },
  });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

  await prisma.inviteToken.create({
    data: {
      token:       rawToken,
      email,
      role,
      expiresAt,
      createdById: admin.userId,
    },
  });

  // In production: send email with invite link
  // await sendInviteEmail(email, rawToken);

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${rawToken}`;

  revalidatePath("/dashboard/users");
  return {
    success: true,
    message: inviteUrl, // Return URL so admin can copy it
  };
}

// ── Update Role ───────────────────────────────────────────────

export async function updateUserRoleAction(
  userId: string,
  role: Role
): Promise<UserActionResult> {
  const admin = await requireAdmin();

  if (admin.userId === userId) {
    return { success: false, error: "You cannot change your own role." };
  }

  await prisma.user.update({ where: { id: userId }, data: { role } });

  revalidatePath("/dashboard/users");
  return { success: true };
}

// ── Suspend / Unsuspend ───────────────────────────────────────

export async function toggleSuspendAction(
  userId: string,
  suspend: boolean
): Promise<UserActionResult> {
  const admin = await requireAdmin();

  if (admin.userId === userId) {
    return { success: false, error: "You cannot suspend yourself." };
  }

  await prisma.user.update({
    where: { id: userId },
    data:  { suspended: suspend },
  });

  // Kill all sessions if suspending
  if (suspend) {
    await prisma.session.deleteMany({ where: { userId } });
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

// ── Delete User ───────────────────────────────────────────────

export async function deleteUserAction(userId: string): Promise<UserActionResult> {
  const admin = await requireAdmin();

  if (admin.userId === userId) {
    return { success: false, error: "You cannot delete yourself." };
  }

  await prisma.user.delete({ where: { id: userId } });

  revalidatePath("/dashboard/users");
  return { success: true };
}

// ── Revoke Invite ─────────────────────────────────────────────

export async function revokeInviteAction(inviteId: string): Promise<UserActionResult> {
  await requireAdmin();
  await prisma.inviteToken.delete({ where: { id: inviteId } });
  revalidatePath("/dashboard/users");
  return { success: true };
}