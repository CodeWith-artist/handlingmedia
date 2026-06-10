"use client";

import { useActionState, useState, useRef, useCallback, useEffect } from "react";
import type { BlogResult  } from "@/lib/blog/actions";
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

function getStats(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return { words, minutes };
}

// Deep HTML-to-Markdown converter for Google Docs / rich paste
function htmlToMarkdown(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent || "")
        .replace(/\u00A0/g, " ")  // non-breaking space
        .replace(/\u200B/g, "");  // zero-width space
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const children = Array.from(el.childNodes).map(processNode).join("");

    // Block-level elements
    switch (tag) {
      case "h1": return `# ${children.trim()}\n\n`;
      case "h2": return `## ${children.trim()}\n\n`;
      case "h3": return `### ${children.trim()}\n\n`;
      case "h4": return `#### ${children.trim()}\n\n`;
      case "h5": return `##### ${children.trim()}\n\n`;
      case "h6": return `###### ${children.trim()}\n\n`;

      case "p": {
        const text = children.trim();
        if (!text) return "\n";
        return `${text}\n\n`;
      }

      case "br": return "\n";

      case "strong":
      case "b": {
        const inner = children.trim();
        return inner ? `**${inner}**` : "";
      }

      case "em":
      case "i": {
        const inner = children.trim();
        return inner ? `*${inner}*` : "";
      }

      case "u": {
        const inner = children.trim();
        return inner ? `<u>${inner}</u>` : "";
      }

      case "s":
      case "strike":
      case "del": {
        const inner = children.trim();
        return inner ? `~~${inner}~~` : "";
      }

      case "code": {
        const inner = children.trim();
        return inner ? `\`${inner}\`` : "";
      }

      case "pre": {
        // Check if Google Docs code block
        const codeEl = el.querySelector("code");
        const text = (codeEl?.textContent || el.textContent || "").trim();
        return `\`\`\`\n${text}\n\`\`\`\n\n`;
      }

      case "blockquote": {
        const lines = children.trim().split("\n");
        return lines.map((l) => `> ${l}`).join("\n") + "\n\n";
      }

      case "a": {
        const href = el.getAttribute("href") || "#";
        // Google Docs sometimes wraps links in redirect URLs — try to extract real URL
        let cleanHref = href;
        try {
          const url = new URL(href);
          if (url.hostname === "www.google.com" && url.pathname === "/url") {
            cleanHref = url.searchParams.get("q") || href;
          }
        } catch {}
        const inner = children.trim();
        return inner ? `[${inner}](${cleanHref})` : cleanHref;
      }

      case "img": {
        const src = el.getAttribute("src") || "";
        const alt = el.getAttribute("alt") || "";
        return src ? `![${alt}](${src})\n\n` : "";
      }

      case "ul": {
        const items = Array.from(el.children).map((li) => {
          const depth = getListDepth(li);
          const indent = "  ".repeat(Math.max(0, depth - 1));
          const text = processNode(li).replace(/^[-*]\s*/, "").trim();
          return `${indent}- ${text}`;
        });
        return items.join("\n") + "\n\n";
      }

      case "ol": {
        const items = Array.from(el.children).map((li, i) => {
          const depth = getListDepth(li);
          const indent = "  ".repeat(Math.max(0, depth - 1));
          const text = processNode(li).replace(/^\d+\.\s*/, "").trim();
          return `${indent}${i + 1}. ${text}`;
        });
        return items.join("\n") + "\n\n";
      }

      case "li": {
        // Recursively process but skip nested ul/ol (handled by parent)
        const parts: string[] = [];
        for (const child of Array.from(el.childNodes)) {
          const childEl = child as HTMLElement;
          if (childEl.tagName?.toLowerCase() === "ul" || childEl.tagName?.toLowerCase() === "ol") {
            parts.push("\n" + processNode(child).trim().split("\n").map((l) => "  " + l).join("\n"));
          } else {
            parts.push(processNode(child));
          }
        }
        return parts.join("").trim();
      }

      case "table": {
        return processTable(el) + "\n\n";
      }

      case "thead":
      case "tbody":
      case "tfoot":
      case "tr":
      case "th":
      case "td": {
        return children; // handled in processTable
      }

      case "hr": return "---\n\n";

      case "span": {
        // Detect inline code from Google Docs (monospace font family)
        const fontFamily = el.style?.fontFamily || "";
        if (fontFamily.includes("Courier") || fontFamily.includes("monospace") || fontFamily.includes("Consolas")) {
          const inner = children.trim();
          return inner ? `\`${inner}\`` : "";
        }
        return children;
      }

      case "div":
      case "section":
      case "article":
      case "main":
      case "header":
      case "footer":
      case "aside":
      case "figure":
      case "figcaption":
      case "nav": {
        const text = children.trim();
        return text ? `${text}\n\n` : "";
      }

      case "sup": return `<sup>${children}</sup>`;
      case "sub": return `<sub>${children}</sub>`;

      // Ignore decorative / non-content tags
      case "style":
      case "script":
      case "head":
      case "meta":
      case "link":
      case "noscript": return "";

      default: return children;
    }
  }

  function getListDepth(el: Element): number {
    let depth = 0;
    let parent = el.parentElement;
    while (parent) {
      const t = parent.tagName?.toLowerCase();
      if (t === "ul" || t === "ol") depth++;
      parent = parent.parentElement;
    }
    return depth;
  }

  function processTable(table: HTMLElement): string {
    const rows = Array.from(table.querySelectorAll("tr"));
    if (!rows.length) return "";

    const data = rows.map((row) =>
      Array.from(row.querySelectorAll("th, td")).map((cell) =>
        (cell.textContent || "").replace(/\n/g, " ").trim()
      )
    );

    if (!data.length) return "";
    const colCount = Math.max(...data.map((r) => r.length));

    const padded = data.map((row) => {
      while (row.length < colCount) row.push("");
      return row;
    });

    const header = padded[0];
    const separator = header.map(() => "---");
    const body = padded.slice(1);

    const lines = [
      `| ${header.join(" | ")} |`,
      `| ${separator.join(" | ")} |`,
      ...body.map((row) => `| ${row.join(" | ")} |`),
    ];
    return lines.join("\n");
  }

  const body = doc.body;
  let result = processNode(body);

  // Normalize whitespace
  result = result
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  return result;
}

// ────────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

export default function PostEditor({ action, categories, defaultValues = {} }: Props) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [showPreview, setShowPreview] = useState(false);
  const [splitView, setSplitView] = useState(false);
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
  const [pasteToast, setPasteToast] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showFindReplace, setShowFindReplace] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const inlineImgRef = useRef<HTMLInputElement>(null);
  const toastTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

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

  function showPasteNotice() {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setPasteToast(true);
    toastTimeout.current = setTimeout(() => setPasteToast(false), 3000);
  }

  const insertAt = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
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
    },
    [content]
  );

  // Wrap selected lines with a line prefix (for blockquotes, lists, etc.)
  const wrapLines = useCallback(
    (prefix: string) => {
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const before = content.slice(0, start);
      const selected = content.slice(start, end) || "text";
      const after = content.slice(end);
      const wrapped = selected
        .split("\n")
        .map((line) => `${prefix}${line}`)
        .join("\n");
      const newVal = before + wrapped + after;
      setContent(newVal);
      setTimeout(() => el.focus(), 0);
    },
    [content]
  );

  function handleFindReplace() {
    if (!findText) return;
    const updated = content.split(findText).join(replaceText);
    setContent(updated);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const meta = e.ctrlKey || e.metaKey;
    if (!meta) {
      // Tab inserts 2 spaces instead of changing focus
      if (e.key === "Tab") {
        e.preventDefault();
        insertAt("  ", "");
      }
      return;
    }
    switch (e.key.toLowerCase()) {
      case "b": e.preventDefault(); insertAt("**", "**", "bold text"); break;
      case "i": e.preventDefault(); insertAt("*", "*", "italic text"); break;
      case "u": e.preventDefault(); insertAt("<u>", "</u>", "underlined text"); break;
      case "k": e.preventDefault(); insertAt("[", "](https://)", "link text"); break;
      case "`": e.preventDefault(); insertAt("`", "`", "code"); break;
      case "h": e.preventDefault(); showFindReplace ? setShowFindReplace(false) : setShowFindReplace(true); break;
      case "p": e.preventDefault(); setSplitView((v) => !v); break;
    }
  }

  // ── toolbar config ──────────────────────────────────────────────────────────
  const toolbar = [
    {
      group: "format",
      items: [
        { label: "B", title: "Bold (Ctrl+B)", action: () => insertAt("**", "**", "bold text"), cls: "font-bold" },
        { label: "I", title: "Italic (Ctrl+I)", action: () => insertAt("*", "*", "italic text"), cls: "italic" },
        { label: "U", title: "Underline (Ctrl+U)", action: () => insertAt("<u>", "</u>", "underlined text"), cls: "underline" },
        { label: "S̶", title: "Strikethrough", action: () => insertAt("~~", "~~", "text"), cls: "line-through" },
      ],
    },
    {
      group: "headings",
      items: [
        { label: "H1", title: "Heading 1", action: () => insertAt("\n# ", "\n", "Heading 1"), cls: "" },
        { label: "H2", title: "Heading 2", action: () => insertAt("\n## ", "\n", "Heading 2"), cls: "" },
        { label: "H3", title: "Heading 3", action: () => insertAt("\n### ", "\n", "Heading 3"), cls: "" },
      ],
    },
    {
      group: "blocks",
      items: [
        { label: "❝", title: "Blockquote", action: () => wrapLines("> "), cls: "" },
        { label: "</> ", title: "Inline code", action: () => insertAt("`", "`", "code"), cls: "font-mono text-xs" },
        { label: "```", title: "Code block", action: () => insertAt("\n```\n", "\n```\n", "code block"), cls: "font-mono text-xs" },
      ],
    },
    {
      group: "lists",
      items: [
        { label: "• List", title: "Bullet list", action: () => wrapLines("- "), cls: "" },
        { label: "1. List", title: "Numbered list", action: () => wrapLines("1. "), cls: "" },
        { label: "☑ Task", title: "Task list", action: () => wrapLines("- [ ] "), cls: "" },
      ],
    },
    {
      group: "inserts",
      items: [
        { label: "🔗 Link", title: "Link (Ctrl+K)", action: () => insertAt("[", "](https://)", "link text"), cls: "" },
        { label: "—", title: "Horizontal rule", action: () => insertAt("\n\n---\n\n", ""), cls: "" },
        { label: "Table", title: "Insert table", action: () => insertAt("\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n", ""), cls: "" },
      ],
    },
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

  // Inline image upload
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

  // Smart paste: HTML → Markdown
  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const html = e.clipboardData.getData("text/html");
    if (!html) return;
    e.preventDefault();

    const md = htmlToMarkdown(html);

    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newVal = content.slice(0, start) + md + content.slice(end);
    setContent(newVal);
    showPasteNotice();
    setTimeout(() => {
      el.focus();
      const pos = start + md.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  }

  // ── Drag & drop images into editor ─────────────────────────────────────────
  async function handleDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    e.preventDefault();
    setImgUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) insertAt(`![${file.name}](${data.url})`, "");
    } catch {
      alert("Image upload failed.");
    } finally {
      setImgUploading(false);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0f1117] text-gray-100">
      <form action={formAction}>
        {/* ── Header bar ──────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 flex items-center gap-3 px-5 py-3
                           bg-[#161b22] border-b border-[#30363d] shadow-lg">
          {/* Title input */}
          <input
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!defaultValues.slug) setSlug(autoSlug(e.target.value));
            }}
            placeholder="Post title…"
            className="flex-1 min-w-0 bg-transparent text-xl font-semibold text-white
                       placeholder:text-gray-600 focus:outline-none"
          />
          {err("title") && (
            <span className="text-xs text-red-400">{err("title")}</span>
          )}

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              title="Toggle sidebar"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#21262d] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <line x1="15" y1="3" x2="15" y2="21"/>
              </svg>
            </button>
            <button
              type="submit"
              disabled={pending}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50
                         text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {pending ? "Saving…" : "Save post"}
            </button>
          </div>
        </header>

        {/* ── Global error ──────────────────────────────────────────── */}
        {!state.success && !state.fields && (
          <div className="mx-5 mt-4 rounded-lg bg-red-950 border border-red-800 px-4 py-3 text-sm text-red-300">
            {state.error}
          </div>
        )}
        {state.success && state.message && (
          <div className="mx-5 mt-4 rounded-lg bg-emerald-950 border border-emerald-800 px-4 py-3 text-sm text-emerald-300">
            {state.message}
          </div>
        )}

        {/* ── Body layout ───────────────────────────────────────────── */}
        <div className="flex" style={{ height: "calc(100vh - 57px)" }}>

          {/* ── Editor column ──────────────────────────────────────── */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

            {/* Toolbar row */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2
                            bg-[#161b22] border-b border-[#30363d] shrink-0">
              {toolbar.map((group, gi) => (
                <div key={gi} className="flex items-center gap-0.5 pr-2 mr-1 border-r border-[#30363d] last:border-0 last:pr-0 last:mr-0">
                  {group.items.map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      title={btn.title}
                      onClick={btn.action}
                      className={`px-2 py-1 text-xs text-gray-300 rounded
                                  hover:bg-[#21262d] hover:text-white
                                  transition-colors ${btn.cls}`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              ))}

              {/* Inline image */}
              <button
                type="button"
                title="Insert image (or drag & drop)"
                onClick={() => inlineImgRef.current?.click()}
                disabled={imgUploading}
                className="px-2 py-1 text-xs text-gray-300 rounded hover:bg-[#21262d] hover:text-white transition-colors disabled:opacity-40"
              >
                {imgUploading ? "Uploading…" : "🖼 Img"}
              </button>
              <input ref={inlineImgRef} type="file" accept="image/*" className="hidden" onChange={handleInlineImgUpload} />

              {/* Find & Replace */}
              <button
                type="button"
                title="Find & Replace (Ctrl+H)"
                onClick={() => setShowFindReplace((v) => !v)}
                className={`px-2 py-1 text-xs rounded transition-colors
                  ${showFindReplace ? "bg-indigo-800 text-indigo-200" : "text-gray-300 hover:bg-[#21262d] hover:text-white"}`}
              >
                🔍 Find
              </button>

              {/* Split view / Preview */}
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  title="Split view (Ctrl+P)"
                  onClick={() => { setSplitView(true); setActiveTab("write"); }}
                  className={`px-2 py-1 text-xs rounded transition-colors
                    ${splitView ? "bg-[#30363d] text-white" : "text-gray-400 hover:bg-[#21262d] hover:text-white"}`}
                >
                  Split
                </button>
                <button
                  type="button"
                  title="Preview only"
                  onClick={() => { setActiveTab("preview"); setSplitView(false); }}
                  className={`px-2 py-1 text-xs rounded transition-colors
                    ${!splitView && activeTab === "preview" ? "bg-[#30363d] text-white" : "text-gray-400 hover:bg-[#21262d] hover:text-white"}`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  title="Write only"
                  onClick={() => { setActiveTab("write"); setSplitView(false); }}
                  className={`px-2 py-1 text-xs rounded transition-colors
                    ${!splitView && activeTab === "write" ? "bg-[#30363d] text-white" : "text-gray-400 hover:bg-[#21262d] hover:text-white"}`}
                >
                  Write
                </button>
              </div>
            </div>

            {/* Find & Replace bar */}
            {showFindReplace && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1c2128] border-b border-[#30363d] shrink-0">
                <input
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  placeholder="Find…"
                  className="w-40 bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  placeholder="Replace with…"
                  className="w-44 bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
                />
                <button type="button" onClick={handleFindReplace}
                  className="px-3 py-1 text-xs bg-indigo-700 hover:bg-indigo-600 text-white rounded transition-colors">
                  Replace all
                </button>
                <button type="button" onClick={() => setShowFindReplace(false)}
                  className="ml-auto text-gray-500 hover:text-gray-300 text-xs">✕</button>
              </div>
            )}

            {/* Paste toast */}
            {pasteToast && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none
                              bg-emerald-900 border border-emerald-700 text-emerald-300 text-xs
                              px-4 py-2 rounded-full shadow-lg">
                ✓ Pasted and converted to Markdown
              </div>
            )}

            {/* Editor area */}
            <div className={`flex flex-1 min-h-0 ${splitView ? "divide-x divide-[#30363d]" : ""}`}>

              {/* Textarea pane */}
              {(activeTab === "write" || splitView) && (
                <div className="relative flex-1 min-w-0 flex flex-col">
                  <textarea
                    ref={textareaRef}
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    placeholder={`Write your post in Markdown…\n\n• Paste from Google Docs — auto-converted\n• Drag & drop images\n• Ctrl+B bold, Ctrl+I italic, Ctrl+K link, Tab indent`}
                    className="flex-1 w-full bg-[#0d1117] text-gray-200 font-mono text-sm
                               p-5 leading-7 focus:outline-none resize-none
                               placeholder:text-gray-700 placeholder:font-sans placeholder:not-italic"
                    style={{ tabSize: 2 }}
                  />
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 py-1.5
                                  bg-[#161b22] border-t border-[#30363d] text-xs text-gray-500 shrink-0">
                    <span>Markdown</span>
                    <span>{stats.words} words · {stats.minutes} min read</span>
                    <span>{content.length} chars</span>
                  </div>
                </div>
              )}

              {/* Preview pane */}
              {(activeTab === "preview" || splitView) && (
                <div className="flex-1 min-w-0 overflow-y-auto bg-[#0d1117]">
                  <div className="prose prose-invert prose-sm max-w-3xl mx-auto px-8 py-6
                                  prose-headings:text-gray-100
                                  prose-p:text-gray-300
                                  prose-strong:text-white
                                  prose-code:text-emerald-300 prose-code:bg-[#1c2128] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                  prose-pre:bg-[#1c2128] prose-pre:border prose-pre:border-[#30363d]
                                  prose-blockquote:border-indigo-500 prose-blockquote:text-gray-400
                                  prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                                  prose-hr:border-[#30363d]
                                  prose-th:text-gray-200 prose-td:text-gray-300
                                  prose-li:text-gray-300">
                    {content.trim() ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                    ) : (
                      <p className="text-gray-600 italic text-sm mt-8 text-center">
                        Preview will appear here as you write…
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ────────────────────────────────────────────── */}
          {sidebarOpen && (
            <aside className="w-72 shrink-0 flex flex-col gap-0 overflow-y-auto
                              bg-[#161b22] border-l border-[#30363d]">

              {/* Excerpt */}
              <Section label="Excerpt">
                <textarea
                  name="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="Short description for post listings…"
                  className={inputCls + " resize-none"}
                />
              </Section>

              {/* Slug */}
              <Section label="Slug">
                <div className="flex items-center gap-1.5 bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
                  <span className="pl-3 text-xs text-gray-500 whitespace-nowrap">/blog/</span>
                  <input
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(autoSlug(e.target.value))}
                    placeholder="auto-generated"
                    className="flex-1 min-w-0 bg-transparent text-sm text-gray-200 py-2 pr-3 focus:outline-none placeholder:text-gray-600"
                  />
                </div>
              </Section>

              {/* Cover image */}
              <Section label="Cover Image">
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={coverUploading}
                  className="w-full mb-2 px-3 py-2 text-sm bg-[#21262d] border border-[#30363d]
                             text-gray-300 rounded-lg hover:border-indigo-500 hover:text-white
                             transition-colors disabled:opacity-50 font-medium text-left"
                >
                  {coverUploading ? "⏳ Uploading…" : "📁 Upload cover image"}
                </button>
                <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
                <input
                  name="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="or paste image URL…"
                  className={inputCls}
                />
                {coverImage && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-[#30363d]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={coverImage} alt="Cover" className="w-full h-28 object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="w-full py-1 text-xs text-gray-500 hover:text-red-400 hover:bg-[#21262d] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </Section>

              {/* Categories */}
              <Section label="Categories">
                <input type="hidden" name="categories" value={selectedCats.join(",")} />
                {categories.length === 0 ? (
                  <p className="text-xs text-gray-600">No categories yet.</p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCats.includes(cat.id)}
                          onChange={() => toggleCat(cat.id)}
                          className="w-4 h-4 rounded border-[#30363d] bg-[#0d1117] text-indigo-600
                                     focus:ring-indigo-500 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                          {cat.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </Section>

              {/* Tags */}
              <Section label="Tags">
                <input
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="marketing, tips, social (comma-separated)"
                  className={inputCls}
                />
                {tags && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[#21262d] text-xs text-indigo-300 rounded-full border border-[#30363d]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Section>

              {/* SEO */}
              <Section label="SEO">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Meta title
                      <span className={`ml-1 ${metaTitle.length > 55 ? "text-amber-400" : "text-gray-600"}`}>
                        {metaTitle.length}/60
                      </span>
                    </label>
                    <input
                      name="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      maxLength={60}
                      placeholder="Leave blank to use post title"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Meta description
                      <span className={`ml-1 ${metaDescription.length > 145 ? "text-amber-400" : "text-gray-600"}`}>
                        {metaDescription.length}/160
                      </span>
                    </label>
                    <textarea
                      name="metaDescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      maxLength={160}
                      rows={3}
                      placeholder="Leave blank to use excerpt"
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  {/* SERP preview */}
                  {(metaTitle || title || metaDescription || excerpt) && (
                    <div className="mt-2 p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
                      <p className="text-[11px] text-gray-500 mb-1">SERP preview</p>
                      <p className="text-sm text-blue-400 truncate">{metaTitle || title || "Post title"}</p>
                      <p className="text-xs text-emerald-600 truncate">yoursite.com/blog/{slug || "post-slug"}</p>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{metaDescription || excerpt || "Meta description will appear here."}</p>
                    </div>
                  )}
                </div>
              </Section>

              {/* Keyboard shortcuts reference */}
              <Section label="Shortcuts">
                <div className="space-y-1 text-xs text-gray-500">
                  {[
                    ["Ctrl+B", "Bold"],
                    ["Ctrl+I", "Italic"],
                    ["Ctrl+U", "Underline"],
                    ["Ctrl+K", "Insert link"],
                    ["Ctrl+`", "Inline code"],
                    ["Ctrl+H", "Find & Replace"],
                    ["Ctrl+P", "Split view"],
                    ["Tab", "Indent 2 spaces"],
                    ["Paste HTML", "Auto → Markdown"],
                    ["Drag image", "Upload & insert"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <kbd className="font-mono text-gray-600">{k}</kbd>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </Section>

            </aside>
          )}
        </div>
      </form>
    </div>
  );
}

// Shared input class
const inputCls =
  "w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-gray-200 " +
  "placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#30363d] px-4 py-4">
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-3">{label}</p>
      {children}
    </div>
  );
}