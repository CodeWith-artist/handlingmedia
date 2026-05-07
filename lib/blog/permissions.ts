// lib/blog/permissions.ts

import { Role, PostStatus } from "@/generated/prisma/client";

export type BlogActor = {
  userId: string;
  role: Role;
};

// Can this actor CREATE a post?
export function canCreate(actor: BlogActor) {
  return actor.role === "ADMIN" || actor.role === "MARKETING";
}

// Can this actor EDIT a post?
export function canEdit(actor: BlogActor, authorId: string) {
  if (actor.role === "ADMIN") return true;
  if (actor.role === "MARKETING" && actor.userId === authorId) return true;
  return false;
}

// Can this actor DELETE a post? — ADMIN only
export function canDelete(actor: BlogActor) {
  return actor.role === "ADMIN";
}

// Can this actor change status?
// MARKETING: DRAFT ↔ REVIEW only
// ADMIN: any transition
export function canChangeStatus(
  actor: BlogActor,
  from: PostStatus,
  to: PostStatus
): boolean {
  if (actor.role === "ADMIN") return true;
  if (actor.role === "MARKETING") {
    const allowed: Record<PostStatus, PostStatus[]> = {
      DRAFT:     ["REVIEW"],
      REVIEW:    ["DRAFT"],
      PUBLISHED: [],  // MARKETING cannot unpublish
    };
    return allowed[from]?.includes(to) ?? false;
  }
  return false;
}