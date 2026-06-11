export const dynamic = "force-dynamic";

import { getPublishedPosts } from "@/lib/blog/queries";
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-26">
      <h1 className="text-4xl font-bold text-white mb-12">Blog</h1>

      
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-gray-800 pb-8"
            >
              {post.coverImage && (
                <div className="relative w-full mb-4">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className=" object-contain rounded-2xl"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.map(({ category }) => (
                  <span
                    key={category.name}
                    className="text-xs px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              {post.excerpt && (
                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
                <span>{post.author.name}</span>
                <span>·</span>
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </span>
              </div>
            </article>
          ))}
        </div>
      
    </div>
  );
}