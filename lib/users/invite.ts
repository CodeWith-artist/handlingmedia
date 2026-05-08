// lib/users/invite.ts
"use server";

import { z }             from "zod";
import { prisma }        from "@/lib/prisma";
import { hashPassword }  from "@/lib/auth/passwords";
import { redirect }      from "next/navigation";

const Schema = z.object({
  name:     z.string().min(2).max(64).trim(),
  password: z.string().min(8)
    .regex(/[A-Z]/, "Needs uppercase")
    .regex(/[0-9]/, "Needs number"),
});

export type InviteResult =
  | { success: true }
  | { success: false; error: string };

export async function acceptInviteAction(
  token: string,
  _prev: InviteResult,
  formData: FormData
): Promise<InviteResult> {
  const invite = await prisma.inviteToken.findUnique({ where: { token } });

  if (!invite || invite.usedAt || invite.expiresAt < new Date()) {
    return { success: false, error: "This invite link is invalid or has expired." };
  }

  const parsed = Schema.safeParse({
    name:     formData.get("name"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  const hashedPassword = await hashPassword(parsed.data.password);

  await prisma.$transaction([
    prisma.user.create({
      data: {
        name:          parsed.data.name,
        email:         invite.email,
        role:          invite.role,
        hashedPassword,
        emailVerified: true,
      },
    }),
    prisma.inviteToken.update({
      where: { token },
      data:  { usedAt: new Date() },
    }),
  ]);

  redirect("/login?invited=true");
}