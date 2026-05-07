"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ Create Category
export async function createCategory(name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  await prisma.category.create({
    data: { name, slug },
  });

  revalidatePath("/");
}

// ✅ Get Categories
export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// ✅ Create Post
export async function createPost(data: {
  title: string;
  content: string;
  categoryIds: string[];
}) {
  const slug = data.title.toLowerCase().replace(/\s+/g, "-");

  await prisma.post.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      categories: {
        create: data.categoryIds.map((id) => ({
          categoryId: id,
        })),
      },
    },
  });

  revalidatePath("/");
}

// ✅ Get Posts (with categories)
export async function getPosts() {
  return await prisma.post.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}