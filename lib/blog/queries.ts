// lib/blog/queries.ts

import { prisma } from "@/lib/prisma";
import { PostStatus } from "@/generated/prisma/client";

export async function getAllPostsForDashboard(userId?: string, role?: string) {
  return prisma.post.findMany({
    where: role === "ADMIN" ? undefined : { authorId: userId },
    include: {
      author:     { select: { name: true, email: true } },
      categories: { include: { category: true } },
      tags:       { include: { tag: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: {
      author:     { select: { name: true } },
      categories: { include: { category: true } },
      tags:       { include: { tag: true } },
    },
  });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: {
      author:     { select: { name: true } },
      categories: { include: { category: true } },
      tags:       { include: { tag: true } },
    },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      categories: { include: { category: true } },
      tags:       { include: { tag: true } },
    },
  });
}