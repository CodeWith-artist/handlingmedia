// components/blog/BlogPostsTable.tsx
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { PostStatus, Role } from "@/generated/prisma/client";
import { changePostStatusAction, deletePostAction } from "@/lib/blog/actions";
import { canDelete, canEdit, canChangeStatus } from "@/lib/blog/permissions";

type Actor = { userId: string; role: Role };

type Post = {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  authorId: string;
  author: { name: string | null; email: string };
  categories: { category: { name: string } }[];
  tags: { tag: { name: string } }[];
  updatedAt: Date;
  publishedAt: Date | null;
};

const STATUS_STYLES: Record<PostStatus, string> = {
  DRAFT:     "bg-gray-700 text-gray-300",
  REVIEW:    "bg-amber-500/20 text-amber-400",
  PUBLISHED: "bg-green-500/20 text-green-400",
};

const NEXT_STATUS: Record<PostStatus, PostStatus | null> = {
  DRAFT:     "REVIEW",
  REVIEW:    "PUBLISHED",
  PUBLISHED: null,
};

const PREV_STATUS: Record<PostStatus, PostStatus | null> = {
  DRAFT:     null,
  REVIEW:    "DRAFT",
  PUBLISHED: "REVIEW",
};

export default function BlogPostsTable({ posts, actor }: { posts: Post[]; actor: Actor }) {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<PostStatus | "ALL">("ALL");

  const filtered = filter === "ALL" ? posts : posts.filter((p) => p.status === filter);

  function handleStatusChange(postId: string, to: PostStatus) {
    startTransition(async () => {
      await changePostStatusAction(postId, to);
    });
  }

  function handleDelete(postId: string) {
    if (!confirm("Permanently delete this post?")) return;
    startTransition(async () => {
      await deletePostAction(postId);
    });
  }

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["ALL", "DRAFT", "REVIEW", "PUBLISHED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${filter === s
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
          >
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">No posts found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-4 py-4">Status</th>
                <th className="text-left px-4 py-4 hidden md:table-cell">Author</th>
                <th className="text-left px-4 py-4 hidden lg:table-cell">Categories</th>
                <th className="text-left px-4 py-4 hidden lg:table-cell">Updated</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((post) => {
                const nextS = NEXT_STATUS[post.status];
                const prevS = PREV_STATUS[post.status];
                const editable = canEdit(actor, post.authorId);

                return (
                  <tr key={post.id} className="hover:bg-gray-800/50 transition-colors">
                    {/* Title */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-white truncate max-w-50">{post.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5 truncate max-w-50">/{post.slug}</p>
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${STATUS_STYLES[post.status]}`}>
                        {post.status.charAt(0) + post.status.slice(1).toLowerCase()}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-4 py-4 hidden md:table-cell text-gray-400">
                      {post.author.name ?? post.author.email}
                    </td>

                    {/* Categories */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {post.categories.slice(0, 2).map(({ category }) => (
                          <span key={category.name} className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs">
                            {category.name}
                          </span>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="text-gray-600 text-xs">+{post.categories.length - 2}</span>
                        )}
                      </div>
                    </td>

                    {/* Updated */}
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-500 text-xs">
                      {new Date(post.updatedAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        {/* Move backward */}
                        {prevS && editable && canChangeStatus(actor, post.status, prevS) && (
                          <button
                            disabled={isPending}
                            onClick={() => handleStatusChange(post.id, prevS)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-colors disabled:opacity-40"
                          >
                            ← {prevS.charAt(0) + prevS.slice(1).toLowerCase()}
                          </button>
                        )}

                        {/* Move forward */}
                        {nextS && editable && canChangeStatus(actor, post.status, nextS) && (
                          <button
                            disabled={isPending}
                            onClick={() => handleStatusChange(post.id, nextS)}
                            className={`text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40
                              ${nextS === "PUBLISHED"
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                              }`}
                          >
                            {nextS === "PUBLISHED" ? "Publish" : "Submit"}
                          </button>
                        )}

                        {/* Edit */}
                        {editable && (
                          <Link
                            href={`/dashboard/blog/${post.id}/edit`}
                            className="text-xs px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
                          >
                            Edit
                          </Link>
                        )}

                        {/* Delete — ADMIN only */}
                        {canDelete(actor) && (
                          <button
                            disabled={isPending}
                            onClick={() => handleDelete(post.id)}
                            className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-40"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}