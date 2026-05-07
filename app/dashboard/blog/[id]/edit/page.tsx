// app/dashboard/blog/[id]/edit/page.tsx
import { requireSession } from "@/lib/auth/session";
import { redirect, notFound } from "next/navigation";
import { getPostById, getAllCategories } from "@/lib/blog/queries";
import { updatePostAction } from "@/lib/blog/actions";
import { canEdit } from "@/lib/blog/permissions";
import PostEditor from "@/components/blog/PostEditor";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const { id } = await params;
  const session = await requireSession();
  if (session.role === "USER") redirect("/unauthorized");

  const [post, categories] = await Promise.all([
    getPostById(id),
    getAllCategories(),
  ]);

  if (!post) notFound();
  if (!canEdit({ userId: session.userId, role: session.role }, post.authorId)) {
    redirect("/unauthorized");
  }

  // Bind postId into the action
  const boundAction = updatePostAction.bind(null, id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">Edit post</h1>
      <PostEditor
        action={boundAction}
        categories={categories}
        defaultValues={{
          title:           post.title,
          slug:            post.slug,
          excerpt:         post.excerpt ?? "",
          content:         post.content,
          coverImage:      post.coverImage ?? "",
          metaTitle:       post.metaTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          categoryIds:     post.categories.map((c) => c.categoryId),
          tags:            post.tags.map((t) => t.tag.name).join(", "),
        }}
      />
    </div>
  );
}