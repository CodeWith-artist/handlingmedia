"use client";

import { useState } from "react";

export default function QueryForm() {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!query.trim() || !name.trim() || !mobile.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setQuery("");
      setName("");
      setMobile("");
    }, 2500);
  };

  const inputClass =
    "h-11 w-full bg-white/[0.06] border border-white/10 rounded-[10px] px-4 text-white placeholder-white/30 text-sm outline-none focus:border-orange-500/70 transition-colors duration-200";

  return (
    <div className="flex flex-row items-center gap-2 w-full max-w-6xl mx-auto px-4 py-10">

      {/* Query — widest */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Your query…"
        className={`${inputClass} flex-3 shrink-0 min-w-0`}
      />

      {/* Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={`${inputClass} flex-[1.4] min-w-0`}
      />

      {/* Mobile */}
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile no."
        className={`${inputClass} flex-[1.4] min-w-0`}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        className={`
          h-11 px-5 rounded-[10px] shrink-0 text-sm font-black tracking-wide
          uppercase cursor-pointer transition-all duration-150
          active:scale-95 hover:opacity-85
          ${sent
            ? "bg-green-500/15 border border-green-400/40 text-green-400"
            : "bg-gradient-to-br from-orange-500 to-orange-700 text-black border-0"
          }
        `}
      >
        {sent ? "✓ Sent" : "Send →"}
      </button>
    </div>
  );
}