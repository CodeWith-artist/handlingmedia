// components/blog/PostEditor.tsx
"use client";

import { useActionState, useState } from "react";
import type { BlogResult } from "@/lib/blog/actions";
import { Category } from "@/generated/prisma/client";

interface Props {
  action: (_prev: BlogResult, formData: FormData) => Promise<BlogResult>;
  categories: Category[];
  defaultValues?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string;
    metaTitle?: string;
    metaDescription?: string;
    categoryIds?: string[];
    tags?: string;
  };
}

const initial: BlogResult = { success: true };

export default function PostEditor({ action, categories, defaultValues = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [content, setContent] = useState(defaultValues.content ?? "");
  const [title, setTitle] = useState(defaultValues.title ?? "");
  const [slug, setSlug] = useState(defaultValues.slug ?? "");
  const [selectedCats, setSelectedCats] = useState<string[]>(defaultValues.categoryIds ?? []);

  function autoSlug(val: string) {
    return val.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }

  function err(field: string) {
    if (!state.success && state.fields) return state.fields[field]?.[0];
  }

  function toggleCat(id: string) {
    setSelectedCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  // Simple markdown → HTML preview (no deps)
  function simpleMarkdown(md: string) {
    return md
      .replace(/^### (.+)/gm, "<h3>$1</h3>")
      .replace(/^## (.+)/gm, "<h2>$1</h2>")
      .replace(/^# (.+)/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br/>");
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Global error */}
      {!state.success && !state.fields && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {/* Title */}
      <div>
        <input
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!defaultValues.slug) setSlug(autoSlug(e.target.value));
          }}
          placeholder="Post title"
          className="w-full bg-transparent text-3xl font-bold text-white placeholder:text-gray-600 
                     border-b border-gray-800 pb-3 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        {err("title") && <p className="mt-1 text-xs text-red-400">{err("title")}</p>}
      </div>

      {/* Two-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-5">

          {/* Markdown toolbar + editor */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-800">
              {(["write", "preview"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-5 py-3 text-sm font-medium transition-colors
                    ${tab === t ? "text-white border-b-2 border-indigo-500" : "text-gray-500 hover:text-gray-300"}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
              {/* Markdown cheatsheet pills */}
              <div className="ml-auto flex items-center gap-1 px-3">
                {[["**B**", "**text**"], ["*I*", "*text*"], ["`C`", "`code`"], ["# H", "## "]].map(([label, ins]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setContent((c) => c + ins)}
                    className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded hover:text-white transition-colors font-mono"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post in Markdown…"
                rows={18}
                className="w-full bg-transparent text-gray-300 text-sm p-5 font-mono
                           focus:outline-none resize-none leading-relaxed placeholder:text-gray-600"
              />
            ) : (
              <div
                className="prose prose-invert prose-sm max-w-none p-5 min-h-[300px] text-gray-300"
                dangerouslySetInnerHTML={{ __html: simpleMarkdown(content) }}
              />
            )}
          </div>
          {err("content") && <p className="text-xs text-red-400">{err("content")}</p>}

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Excerpt</label>
            <textarea
              name="excerpt"
              defaultValue={defaultValues.excerpt}
              rows={2}
              placeholder="Short description shown in post listings…"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white
                         placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Right: meta sidebar */}
        <div className="space-y-5">

          {/* Slug */}
          <SideCard label="Slug">
            <input
              name="slug"
              value={slug}
              onChange={(e) => setSlug(autoSlug(e.target.value))}
              placeholder="auto-generated"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                         placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </SideCard>

          {/* Cover image */}
          <SideCard label="Cover image URL">
            <input
              name="coverImage"
              defaultValue={defaultValues.coverImage}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                         placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </SideCard>

          {/* Categories */}
          <SideCard label="Categories">
            <input type="hidden" name="categories" value={selectedCats.join(",")} />
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCats.includes(cat.id)}
                    onChange={() => toggleCat(cat.id)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-300">{cat.name}</span>
                </label>
              ))}
              {categories.length === 0 && (
                <p className="text-xs text-gray-600">No categories yet. Admin can create them.</p>
              )}
            </div>
          </SideCard>

          {/* Tags */}
          <SideCard label="Tags (comma-separated)">
            <input
              name="tags"
              defaultValue={defaultValues.tags}
              placeholder="ultrasound, training, radiology"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                         placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </SideCard>

          {/* SEO */}
          <SideCard label="SEO">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Meta title (max 60 chars)</label>
                <input
                  name="metaTitle"
                  defaultValue={defaultValues.metaTitle}
                  maxLength={60}
                  placeholder="Leave blank to use post title"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                             placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Meta description (max 160 chars)</label>
                <textarea
                  name="metaDescription"
                  defaultValue={defaultValues.metaDescription}
                  maxLength={160}
                  rows={3}
                  placeholder="Leave blank to use excerpt"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                             placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          </SideCard>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                       text-white text-sm font-semibold transition-colors"
          >
            {pending ? "Saving…" : "Save post"}
          </button>
        </div>
      </div>
    </form>
  );
}

function SideCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</p>
      {children}
    </div>
  );
}