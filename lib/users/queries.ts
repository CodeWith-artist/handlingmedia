// lib/users/queries.ts

import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma/client";

const PAGE_SIZE = 10;

export interface UserListParams {
  search?: string;
  role?:   string;
  page?:   number;
}

export async function getUserList({ search, role, page = 1 }: UserListParams) {
  const where = {
    AND: [
      search
        ? {
            OR: [
              { name:  { contains: search } },
              { email: { contains: search } },
            ],
          }
        : {},
      role && role !== "ALL" ? { role: role as Role } : {},
    ],
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id:           true,
        name:         true,
        email:        true,
        role:         true,
        suspended:    true,
        emailVerified:true,
        createdAt:    true,
      },
      orderBy: { createdAt: "desc" },
      skip:  (page - 1) * PAGE_SIZE,
      take:  PAGE_SIZE,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    total,
    totalPages: Math.ceil(total / PAGE_SIZE),
    page,
  };
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id:        true,
      name:      true,
      email:     true,
      role:      true,
      suspended: true,
      createdAt: true,
    },
  });
}

export async function getPendingInvites() {
  return prisma.inviteToken.findMany({
    where:   { usedAt: null, expiresAt: { gt: new Date() } },
    include: { createdBy: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}