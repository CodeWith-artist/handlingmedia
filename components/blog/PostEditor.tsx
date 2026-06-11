// components/blog/PostEditor.tsx
"use client";

import { useActionState, useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
  // Optional: pass a post id for edit pages so drafts don't collide
  draftKey?: string;
}

const initial: BlogResult = { success: true };

const toolbar = [
  { label: "B", before: "**", after: "**" },
  { label: "I", before: "*", after: "*" },
  { label: "U", before: "<u>", after: "</u>" },
  { label: "Code", before: "`", after: "`" },
  { label: "H1", before: "# ", after: "" },
  { label: "H2", before: "## ", after: "" },
  { label: "H3", before: "### ", after: "" },
  { label: "Quote", before: "> ", after: "" },
  { label: "List", before: "\n- ", after: "" },
  { label: "Link", before: "[", after: "](https://example.com)" },
  { label: "Img", before: "![Alt Text](", after: ")" },
  {
    label: "Table",
    before: "\n| Name | Age |\n|------|-----|\n| John | 25 |\n",
    after: "",
  },
];

interface DraftData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  selectedCats: string[];
  savedAt: string; // ISO timestamp
}

export default function PostEditor({
  action,
  categories,
  defaultValues = {},
  draftKey = "new",
}: Props) {
  const STORAGE_KEY = `post-draft:${draftKey}`;

  const [state, formAction, pending] = useActionState(action, initial);
  const router = useRouter();

  // ── Success popup state ───────────────────────────────────────────────────
  const [showSuccess, setShowSuccess] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // ── Draft / field state ───────────────────────────────────────────────────
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const [tab, setTab] = useState<"write" | "preview">("write");
  const [title, setTitle] = useState(defaultValues.title ?? "");
  const [slug, setSlug] = useState(defaultValues.slug ?? "");
  const [excerpt, setExcerpt] = useState(defaultValues.excerpt ?? "");
  const [content, setContent] = useState(defaultValues.content ?? "");
  const [coverImage, setCoverImage] = useState(defaultValues.coverImage ?? "");
  const [tags, setTags] = useState(defaultValues.tags ?? "");
  const [metaTitle, setMetaTitle] = useState(defaultValues.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(defaultValues.metaDescription ?? "");
  const [selectedCats, setSelectedCats] = useState<string[]>(defaultValues.categoryIds ?? []);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load draft from localStorage on mount ────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const draft: DraftData = JSON.parse(raw);
        // Only restore draft if the page has no defaultValues (new post)
        // or if the draft is newer than a manual edit — here we always offer it
        setTitle(draft.title);
        setSlug(draft.slug);
        setExcerpt(draft.excerpt);
        setContent(draft.content);
        setCoverImage(draft.coverImage);
        setTags(draft.tags);
        setMetaTitle(draft.metaTitle);
        setMetaDescription(draft.metaDescription);
        setSelectedCats(draft.selectedCats);
        setDraftSavedAt(draft.savedAt);
        setShowDraftBanner(true);
      }
    } catch {
      // Corrupt or missing draft — ignore
    }
    setDraftLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Autosave to localStorage (debounced 1.5 s) ───────────────────────────
  const saveDraft = useCallback(
    (data: Omit<DraftData, "savedAt">) => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
      autosaveTimer.current = setTimeout(() => {
        try {
          const payload: DraftData = {
            ...data,
            savedAt: new Date().toISOString(),
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
          setDraftSavedAt(payload.savedAt);
        } catch {
          // localStorage full or unavailable — silently ignore
        }
      }, 1500);
    },
    [STORAGE_KEY]
  );

  // Trigger autosave whenever any field changes (after initial load)
useEffect(() => {
  if (!draftLoaded) return;

  const hasContent =
    title.trim() ||
    content.trim() ||
    excerpt.trim() ||
    coverImage.trim() ||
    tags.trim() ||
    metaTitle.trim() ||
    metaDescription.trim() ||
    selectedCats.length > 0;

  if (!hasContent) {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setDraftSavedAt(null);
    } catch {}
    return;
  }

  saveDraft({
    title,
    slug,
    excerpt,
    content,
    coverImage,
    tags,
    metaTitle,
    metaDescription,
    selectedCats,
  });
}, [
  title,
  slug,
  excerpt,
  content,
  coverImage,
  tags,
  metaTitle,
  metaDescription,
  selectedCats,
  draftLoaded,
  saveDraft,
  STORAGE_KEY,
  setDraftSavedAt,
]);

  // ── Clear draft helper ────────────────────────────────────────────────────
  function clearDraft() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setDraftSavedAt(null);
  }

  function discardDraftAndReset() {
    clearDraft();
    setTitle(defaultValues.title ?? "");
    setSlug(defaultValues.slug ?? "");
    setExcerpt(defaultValues.excerpt ?? "");
    setContent(defaultValues.content ?? "");
    setCoverImage(defaultValues.coverImage ?? "");
    setTags(defaultValues.tags ?? "");
    setMetaTitle(defaultValues.metaTitle ?? "");
    setMetaDescription(defaultValues.metaDescription ?? "");
    setSelectedCats(defaultValues.categoryIds ?? []);
    setShowDraftBanner(false);
  }

  // ── On successful save: clear draft + show popup + redirect ──────────────
  useEffect(() => {
    if (state.success && state.message) {
      clearDraft();
      setShowSuccess(true);
      setTimeout(() => {
        setRedirecting(true);
        setTimeout(() => router.push("/dashboard/blog"), 1500);
      }, 1500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // ── Helpers ───────────────────────────────────────────────────────────────
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
    const [formattedDraftTime, setFormattedDraftTime] = useState("");

    useEffect(() => {
    if (draftSavedAt) {
        setFormattedDraftTime(
        new Date(draftSavedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        );
    }
    }, [draftSavedAt]);

  function applyFormat(before: string, after: string = "") {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const replacement = selected.length > 0 ? `${before}${selected}${after}` : `${before}${after}`;
    const newContent = content.slice(0, start) + replacement + content.slice(end);
    setContent(newContent);
    requestAnimationFrame(() => {
      textarea.focus();
      if (selected.length > 0) {
        textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
      } else {
        const pos = start + before.length;
        textarea.setSelectionRange(pos, pos);
      }
    });
  }
  const [mounted, setMounted] = useState(false);

    useEffect(() => {
    setMounted(true);
    }, []);

    if (!mounted) {
    return null; // or loading skeleton
    }

  return (
    <>
      {/* ── Success / redirect popup ─────────────────────────────────────── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center gap-5 shadow-2xl w-80">
            {!redirecting ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Post saved successfully</p>
                  <p className="text-gray-500 text-sm mt-1">Redirecting to blog dashboard…</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full border-4 border-gray-700 border-t-indigo-500 animate-spin" />
                <div className="text-center">
                  <p className="text-white font-semibold text-lg">Redirecting…</p>
                  <p className="text-gray-500 text-sm mt-1">Taking you to the dashboard</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* ── Draft restored banner ───────────────────────────────────────── */}
        {showDraftBanner && (
          <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 text-sm">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span className="text-amber-300 flex-1">
              Draft restored from{" "}
              {formattedDraftTime || "a previous session"}.
            </span>
            <button
              type="button"
              onClick={() => { setShowDraftBanner(false); }}
              className="text-amber-400 hover:text-amber-200 font-medium transition-colors"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={discardDraftAndReset}
              className="text-gray-500 hover:text-red-400 font-medium transition-colors"
            >
              Discard
            </button>
          </div>
        )}

        {/* ── Global error ────────────────────────────────────────────────── */}
        {!state.success && !state.fields && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {state.error}
          </div>
        )}

        {/* ── Title ───────────────────────────────────────────────────────── */}
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

        {/* ── Two-col layout ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Markdown toolbar + editor */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
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
                <div className="ml-auto flex items-center gap-1 px-3">
                  {toolbar.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => applyFormat(item.before, item.after)}
                      className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded hover:text-white transition-colors font-mono"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {tab === "write" ? (
                <textarea
                  ref={textareaRef}
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post in Markdown…"
                  rows={18}
                  className="w-full bg-transparent text-gray-300 text-sm p-5 font-mono
                             focus:outline-none resize-none leading-relaxed placeholder:text-gray-600"
                />
              ) : (
                <div className="prose prose-invert max-w-none p-5 min-h-125">
                  <article className="prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </article>
                </div>
              )}
            </div>
            {err("content") && <p className="text-xs text-red-400">{err("content")}</p>}

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Excerpt</label>
              <textarea
                name="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
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
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/uploads/image.jpg"
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
                value={tags}
                onChange={(e) => setTags(e.target.value)}
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
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
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
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    maxLength={160}
                    rows={3}
                    placeholder="Leave blank to use excerpt"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white
                               placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                  />
                </div>
              </div>
            </SideCard>

            {/* Submit + autosave indicator */}
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                         text-white text-sm font-semibold transition-colors"
            >
              {pending ? "Saving…" : "Save post"}
            </button>

            {/* Autosave timestamp */}
            {draftSavedAt && !showSuccess && (
              <p className="text-center text-xs text-gray-600">
                Draft autosaved at {formattedDraftTime }
              </p>
            )}
          </div>
        </div>
      </form>
    </>
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