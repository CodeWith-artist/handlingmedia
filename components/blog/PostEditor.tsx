// components/blog/PostEditor.tsx
"use client";

import { useActionState, useState, useRef, useCallback } from "react";
import type { BlogResult } from "@/lib/blog/actions";
import { Category } from "@/generated/prisma/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

// Word count + reading time
function getStats(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { words, minutes };
}

export default function PostEditor({ action, categories, defaultValues = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState(defaultValues.content ?? "");
  const [title, setTitle] = useState(defaultValues.title ?? "");
  const [slug, setSlug] = useState(defaultValues.slug ?? "");
  const [excerpt, setExcerpt] = useState(defaultValues.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(defaultValues.coverImage ?? "");
  const [tags, setTags] = useState(defaultValues.tags ?? "");
  const [metaTitle, setMetaTitle] = useState(defaultValues.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(defaultValues.metaDescription ?? "");
  const [selectedCats, setSelectedCats] = useState<string[]>(defaultValues.categoryIds ?? []);
  const [coverUploading, setCoverUploading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineImgRef = useRef<HTMLInputElement>(null);

  const stats = getStats(content);

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

  // Insert markdown at cursor position
  const insertAt = useCallback((before: string, after: string = "", placeholder: string = "") => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = content.slice(start, end) || placeholder;
    const newVal = content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(newVal);
    setTimeout(() => {
      el.focus();
      const pos = start + before.length + selected.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  }, [content]);

  // Keyboard shortcuts
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!e.ctrlKey && !e.metaKey) return;
    switch (e.key.toLowerCase()) {
      case "b":
        e.preventDefault();
        insertAt("**", "**", "bold text");
        break;
      case "i":
        e.preventDefault();
        insertAt("*", "*", "italic text");
        break;
      case "u":
        e.preventDefault();
        insertAt("<u>", "</u>", "underlined text");
        break;
      case "k":
        e.preventDefault();
        insertAt("[", "](https://)", "link text");
        break;
    }
  }

  // Toolbar buttons
  const toolbar = [
    { label: "B", title: "Bold (Ctrl+B)", action: () => insertAt("**", "**", "bold text"), style: "font-bold" },
    { label: "I", title: "Italic (Ctrl+I)", action: () => insertAt("*", "*", "italic text"), style: "italic" },
    { label: "U", title: "Underline (Ctrl+U)", action: () => insertAt("<u>", "</u>", "underlined text"), style: "underline" },
    { label: "H1", title: "Heading 1", action: () => insertAt("# ", "", "Heading"), style: "" },
    { label: "H2", title: "Heading 2", action: () => insertAt("## ", "", "Heading"), style: "" },
    { label: "H3", title: "Heading 3", action: () => insertAt("### ", "", "Heading"), style: "" },
    { label: "Link", title: "Link (Ctrl+K)", action: () => insertAt("[", "](https://)", "link text"), style: "" },
    { label: "Quote", title: "Blockquote", action: () => insertAt("> ", "", "quote"), style: "" },
    { label: "Code", title: "Inline Code", action: () => insertAt("`", "`", "code"), style: "font-mono text-xs" },
    { label: "```", title: "Code Block", action: () => insertAt("```\n", "\n```", "code block"), style: "font-mono text-xs" },
    { label: "List", title: "Bullet List", action: () => insertAt("\n- ", "", "item"), style: "" },
    { label: "1.", title: "Numbered List", action: () => insertAt("\n1. ", "", "item"), style: "" },
    { label: "---", title: "Divider", action: () => insertAt("\n---\n", ""), style: "" },
  ];

  // Cover image upload
  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setCoverImage(data.url);
    } catch {
      alert("Image upload failed. Try again.");
    } finally {
      setCoverUploading(false);
    }
  }

  // Inline image upload inside editor
  async function handleInlineImgUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) insertAt(`![${file.name}](${data.url})`, "");
    } catch {
      alert("Image upload failed. Try again.");
    } finally {
      setImgUploading(false);
      if (inlineImgRef.current) inlineImgRef.current.value = "";
    }
  }

  // Paste handler — strips HTML to markdown-friendly plain text
  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const html = e.clipboardData.getData("text/html");
    if (!html) return; // plain text paste — default behaviour
    e.preventDefault();

    // Convert common HTML tags to markdown
    let md = html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n")
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n")
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
      .replace(/<u[^>]*>(.*?)<\/u>/gi, "<u>$1</u>")
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
      .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n")
      .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
      .replace(/<[^>]+>/g, "") // strip remaining tags
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newVal = content.slice(0, start) + md + content.slice(end);
    setContent(newVal);
    setTimeout(() => {
      el.focus();
      const pos = start + md.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  }

  return (
    <form action={formAction} className="space-y-6">

      {/* Global error */}
      {!state.success && !state.fields && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
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
          className="w-full bg-white text-3xl font-bold text-gray-900 placeholder:text-gray-300
                     border-b border-gray-200 pb-3 focus:outline-none focus:border-indigo-400 transition-colors"
        />
        {err("title") && <p className="mt-1 text-xs text-red-500">{err("title")}</p>}
      </div>

      {/* Two-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-5">

          {/* Editor */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

            {/* Top bar — toolbar + preview toggle */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-gray-100 bg-gray-50">
              {toolbar.map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  title={btn.title}
                  onClick={btn.action}
                  className={`px-2 py-1 text-xs bg-white border border-gray-200 text-gray-600 rounded
                              hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700
                              transition-colors ${btn.style}`}
                >
                  {btn.label}
                </button>
              ))}

              {/* Inline image upload */}
              <button
                type="button"
                title="Insert image"
                onClick={() => inlineImgRef.current?.click()}
                disabled={imgUploading}
                className="px-2 py-1 text-xs bg-white border border-gray-200 text-gray-600 rounded
                           hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700
                           transition-colors disabled:opacity-50"
              >
                {imgUploading ? "Uploading…" : "🖼 Img"}
              </button>
              <input
                ref={inlineImgRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInlineImgUpload}
              />

              {/* Preview toggle */}
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className={`px-3 py-1 text-xs rounded border transition-colors font-medium
                    ${showPreview
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-700"
                    }`}
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
              </div>
            </div>

            {/* Editor + optional side preview */}
            <div className={`grid ${showPreview ? "grid-cols-2 divide-x divide-gray-100" : "grid-cols-1"}`}>
              {/* Textarea */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder="Write your post in Markdown… (supports Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)"
                  rows={22}
                  className="w-full bg-white text-gray-800 text-sm p-5 font-mono
                             focus:outline-none resize-none leading-relaxed placeholder:text-gray-300"
                />
                {/* Word count bar */}
                <div className="absolute bottom-2 right-3 text-xs text-gray-400 select-none">
                  {stats.words} words · {stats.minutes} min read
                </div>
              </div>

              {/* Live Preview */}
              {showPreview && (
                <div className="prose prose-sm max-w-none p-5 overflow-y-auto max-h-[540px] bg-white text-gray-800">
                  {content.trim() ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  ) : (
                    <p className="text-gray-300 italic text-sm">Preview will appear here…</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {err("content") && <p className="text-xs text-red-500">{err("content")}</p>}

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Excerpt</label>
            <textarea
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Short description shown in post listings…"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800
                         placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
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
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800
                         placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </SideCard>

          {/* Cover image */}
          <SideCard label="Cover Image">
            {/* File upload */}
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              disabled={coverUploading}
              className="w-full mb-2 px-3 py-2 text-sm bg-indigo-50 border border-indigo-200
                         text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors
                         disabled:opacity-50 font-medium"
            >
              {coverUploading ? "Uploading…" : "📁 Upload Image"}
            </button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
            {/* Or URL */}
            <input
              name="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Or paste image URL…"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800
                         placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
            {/* Preview */}
            {coverImage && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverImage} alt="Cover preview" className="w-full h-32 object-cover" />
              </div>
            )}
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
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
                  />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </label>
              ))}
              {categories.length === 0 && (
                <p className="text-xs text-gray-400">No categories yet. Admin can create them.</p>
              )}
            </div>
          </SideCard>

          {/* Tags */}
          <SideCard label="Tags (comma-separated)">
            <input
              name="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="marketing, social media, tips"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800
                         placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </SideCard>

          {/* SEO */}
          <SideCard label="SEO">
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Meta title (max 60 chars)</label>
                <input
                  name="metaTitle"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={60}
                  placeholder="Leave blank to use post title"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800
                             placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
                <p className="text-right text-xs text-gray-400 mt-0.5">{metaTitle.length}/60</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Meta description (max 160 chars)</label>
                <textarea
                  name="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={160}
                  rows={3}
                  placeholder="Leave blank to use excerpt"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800
                             placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none"
                />
                <p className="text-right text-xs text-gray-400 mt-0.5">{metaDescription.length}/160</p>
              </div>
            </div>
          </SideCard>

          {/* Submit */}
          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                       text-white text-sm font-semibold transition-colors shadow-sm"
          >
            {pending ? "Saving…" : "Save post"}
          </button>

          {state.success && state.message && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              {state.message}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function SideCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</p>
      {children}
    </div>
  );
}
