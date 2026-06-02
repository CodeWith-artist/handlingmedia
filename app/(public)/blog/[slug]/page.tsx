// app/blog/[slug]/page.tsx — Public post with SEO
import { getPostBySlug } from "@/lib/blog/queries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title:       post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? "",
    openGraph: {
      title:       post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt ?? "",
      images:      post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <article className="max-w-5xl mx-auto px-6 py-26">
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-10" />
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.map(({ category }) => (
          <span key={category.name} className="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full">
            {category.name}
          </span>
        ))}
      </div>
      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-10 pb-8 border-b border-gray-800">
        <span>{post.author.name}</span>
        <span>·</span>
        <span>
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
            : ""}
        </span>
      </div>
      {/* Render content — use a proper MD library like marked/remark in production */}
      <div className="prose prose-invert max-w-none p-5 min-h-125">
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
      <div className="mt-10 flex flex-wrap gap-2">
        {post.tags.map(({ tag }) => (
          <span key={tag.name} className="text-xs px-2.5 py-1 bg-gray-800 text-gray-400 rounded-full">
            #{tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}