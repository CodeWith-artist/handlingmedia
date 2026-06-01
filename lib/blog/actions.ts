// lib/blog/actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { canCreate, canEdit, canDelete, canChangeStatus } from "./permissions";
import { PostStatus } from "@/generated/prisma/client";

// ── Helpers ───────────────────────────────────────────────────

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function requireBlogActor() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role === "USER") redirect("/unauthorized");
  return { userId: session.userId, role: session.role };
}

export type BlogResult =
  | { success: true; postId?: string; error?: string; message?: string }
  | { success: false; error: string; fields?: Record<string, string[]> };

// ── Validation ────────────────────────────────────────────────

const PostSchema = z.object({
  title:           z.string().min(3).max(200).trim(),
  slug:            z.string().min(3).max(200).trim().optional(),
  excerpt:         z.string().max(500).trim().optional(),
  content:         z.string().min(10, "Content is too short"),
  coverImage:      z.string().optional().or(z.literal("")),
  metaTitle:       z.string().max(60).trim().optional(),
  metaDescription: z.string().max(160).trim().optional(),
  categories:      z.string().optional(), // comma-separated IDs
  tags:            z.string().optional(), // comma-separated names
});

// ── Create Post ───────────────────────────────────────────────

export async function createPostAction(
  _prev: BlogResult,
  formData: FormData
): Promise<BlogResult> {
   try {
        const actor = await requireBlogActor();
        if (!canCreate(actor)) return { success: false, error: "Permission denied." };

        const raw = Object.fromEntries(formData.entries());
        const parsed = PostSchema.safeParse(raw);

        if (!parsed.success) {
          return {
            success: false,
            error: "Validation failed",
            fields: parsed.error.flatten().fieldErrors,
          };
        }

        const { title, excerpt, content, coverImage, metaTitle, metaDescription, categories, tags } =
          parsed.data;

        const baseSlug = parsed.data.slug || slugify(title);
        // Ensure unique slug
        const existingCount = await prisma.post.count({ where: { slug: { startsWith: baseSlug } } });
        const slug = existingCount === 0 ? baseSlug : `${baseSlug}-${existingCount}`;

        // Upsert tags by name
        const tagNames = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
        const tagRecords = await Promise.all(
          tagNames.map((name) =>
            prisma.tag.upsert({
              where: { slug: slugify(name) },
              create: { name, slug: slugify(name) },
              update: {},
            })
          )
        );

        const categoryIds = categories
          ? categories.split(",").map((c) => c.trim()).filter(Boolean)
          : [];

        const post = await prisma.post.create({
          data: {
            title,
            slug,
            excerpt,
            content,
            coverImage: coverImage || null,
            metaTitle,
            metaDescription,
            authorId: actor.userId,
            status: "DRAFT",
            categories: {
              create: categoryIds.map((id) => ({ categoryId: id })),
            },
            tags: {
              create: tagRecords.map((t) => ({ tagId: t.id })),
            },
          },
        });

        revalidatePath("/dashboard/blog");
        return { success: true, postId: post.id, message: "Post created successfully." };
  } catch (error) {
  console.error("Error creating post:", error);
   return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create post",
    };
}

}

// ── Update Post ───────────────────────────────────────────────

export async function updatePostAction(
  postId: string,
  _prev: BlogResult,
  formData: FormData
): Promise<BlogResult> {
  const actor = await requireBlogActor();

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return { success: false, error: "Post not found." };
  if (!canEdit(actor, post.authorId)) return { success: false, error: "Permission denied." };

  const raw = Object.fromEntries(formData.entries());
  const parsed = PostSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Validation failed", fields: parsed.error.flatten().fieldErrors };
  }

  const { title, slug, excerpt, content, coverImage, metaTitle, metaDescription, categories, tags } =
    parsed.data;

  const tagNames = tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const tagRecords = await Promise.all(
    tagNames.map((name) =>
      prisma.tag.upsert({
        where: { slug: slugify(name) },
        create: { name, slug: slugify(name) },
        update: {},
      })
    )
  );

  const categoryIds = categories
    ? categories.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      slug: slug || slugify(title),
      excerpt,
      content,
      coverImage: coverImage || null,
      metaTitle,
      metaDescription,
      categories: {
        deleteMany: {},
        create: categoryIds.map((id) => ({ categoryId: id })),
      },
      tags: {
        deleteMany: {},
        create: tagRecords.map((t) => ({ tagId: t.id })),
      },
    },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath(`/blog/${post.id}`);
  return { success: true, postId: post.id, message: "Post updated successfully." };
}

// ── Change Status ─────────────────────────────────────────────

export async function changePostStatusAction(
  postId: string,
  to: PostStatus
): Promise<BlogResult> {
  const actor = await requireBlogActor();

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return { success: false, error: "Post not found." };
  if (!canChangeStatus(actor, post.status, to)) {
    return { success: false, error: "You cannot make this status change." };
  }

  await prisma.post.update({
    where: { id: postId },
    data: {
      status: to,
      publishedAt: to === "PUBLISHED" ? new Date() : undefined,
    },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { success: true };
}

// ── Delete Post ── ADMIN only ─────────────────────────────────

export async function deletePostAction(postId: string): Promise<BlogResult> {
  const actor = await requireBlogActor();
  if (!canDelete(actor)) return { success: false, error: "Only admins can delete posts." };

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return { success: false, error: "Post not found." };

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath("/dashboard/blog");
  revalidatePath(`/blog/${post.slug}`);
  return { success: true, message: "Post deleted successfully." };
}

// ── Category Actions ──────────────────────────────────────────

export async function createCategoryAction(
  _prev: BlogResult,
  formData: FormData
): Promise<BlogResult> {
  const actor = await requireBlogActor();
  if (actor.role !== "ADMIN") return { success: false, error: "Admin only." };

  const name = formData.get("name") as string;
  if (!name) return { success: false, error: "Name is required." };

  await prisma.category.upsert({
    where: { slug: slugify(name) },
    create: { name: name.trim(), slug: slugify(name) },
    update: {},
  });

  revalidatePath("/dashboard/blog");
  return { success: true  };
}

