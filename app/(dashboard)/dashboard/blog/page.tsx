// app/dashboard/blog/page.tsx
import { requireSession } from "@/lib/auth/session";
import { getAllPostsForDashboard, getAllCategories } from "@/lib/blog/queries";
import { canDelete } from "@/lib/blog/permissions";
import BlogPostsTable from "@/components/blog/BlogPostsTable";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BlogDashboardPage() {
  const session = await requireSession();
  if (session.role === "USER") redirect("/unauthorized");

  const posts = await getAllPostsForDashboard(session.userId, session.role);

  const actor = { userId: session.userId, role: session.role };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog posts</h1>
          <p className="text-sm text-gray-400 mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                     bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
        >
          + New post
        </Link>
      </div>

      <BlogPostsTable posts={posts} actor={actor} />
    </div>
  );
}