// app/dashboard/blog/new/page.tsx
import { requireSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { getAllCategories } from "@/lib/blog/queries";
import { createPostAction } from "@/lib/blog/actions";
import PostEditor from "@/components/blog/PostEditor";

export default async function NewPostPage() {
  const session = await requireSession();
  if (session.role === "USER") redirect("/unauthorized");

  const categories = await getAllCategories();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">New post</h1>
      <PostEditor action={createPostAction} categories={categories} />
    </div>
  );
}