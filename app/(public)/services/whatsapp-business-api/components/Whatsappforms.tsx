"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ── intersection hook ─────────────────────────────────────────

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

// ── data ──────────────────────────────────────────────────────

const USE_CASES = [
  { icon: "🎯", label: "Lead capture"         },
  { icon: "💬", label: "Feedback forms"       },
  { icon: "📊", label: "User surveys"         },
  { icon: "🛍️", label: "Order preferences"   },
  { icon: "📅", label: "Appointment booking"  },
  { icon: "🔔", label: "Event registration"   },
];

const CATEGORIES = [
  { label: "Mobile phones",          checked: true  },
  { label: "Televisions",            checked: false },
  { label: "Home audio",             checked: false },
  { label: "Headphones & earphones", checked: false },
  { label: "eBook readers",          checked: false },
  { label: "Cameras",                checked: true  },
  { label: "Accessories",            checked: false },
];

// ── main ──────────────────────────────────────────────────────

export default function WhatsAppForms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible    = useInView(sectionRef as React.RefObject<Element>);
  const [step, setStep] = useState<"category" | "form">("category");

  // auto-flip between form views
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setStep((s) => s === "category" ? "form" : "category"), 3500);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950 overflow-hidden py-24 border-t border-white/4"
    >
      {/* Ambient blurs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-green-500/6 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-125 h-125 rounded-full bg-orange-500/6 blur-3xl" />
      </div>

      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ════════ LEFT: phone mockups ════════ */}
          <div
            className={`flex items-center justify-center relative
              transition-all duration-1000
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Glow behind phones */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-green-500/9 blur-3xl" />
            </div>

            <div className="relative flex items-end justify-center gap-0">

              {/* Back phone — category selection */}
              <div
                className={`absolute -left-4 bottom-4 w-52 rounded-[28px] overflow-hidden
                  bg-zinc-900 border border-white/10
                  shadow-[0_24px_60px_rgba(0,0,0,0.5)]
                  transition-all duration-700 z-10
                  ${step === "category"
                    ? "scale-100 opacity-100 rotate-0 translate-y-0"
                    : "scale-95 opacity-50 -rotate-3 translate-y-2"
                  }`}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 bg-zinc-950">
                  <span className="text-white text-[10px] font-bold">11:59</span>
                  <div className="flex items-center gap-1">
                    <span className="text-white/60 text-[9px]">▲▼ ▓▓</span>
                  </div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-zinc-950 border-b border-white/6">
                  <span className="text-white/40 text-xs">✕</span>
                  <span className="text-white text-xs font-semibold">Join now</span>
                  <span className="text-white/30 text-xs">⋮</span>
                </div>

                {/* Form body */}
                <div className="px-3 py-3 bg-zinc-950">
                  <p className="text-white text-[11px] font-bold leading-tight mb-3">
                    Let us know which category you're interested in?
                  </p>
                  <p className="text-white/35 text-[9px] mb-2.5 tracking-wide uppercase">
                    Select categories
                  </p>

                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat, i) => (
                      <div
                        key={cat.label}
                        className="flex items-center justify-between py-1.5 border-b border-white/4"
                      >
                        <span className="text-[10px] text-white/65">{cat.label}</span>
                        <div
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0
                            ${cat.checked
                              ? "bg-green-500 border-green-500"
                              : "border-white/25 bg-transparent"
                            }`}
                        >
                          {cat.checked && (
                            <span className="text-white text-[8px] leading-none font-black">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Confirm button */}
                  <button className="w-full mt-4 py-2.5 rounded-xl bg-green-500 text-white text-[11px] font-bold tracking-wide">
                    Confirm
                  </button>
                  <p className="text-center mt-2 text-[8px] text-white/20">
                    🟢 Managed by EcoShop. Learn more
                  </p>
                </div>
              </div>

              {/* Front phone — lead form */}
              <div
                className={`relative w-52 rounded-[28px] overflow-hidden
                  bg-zinc-900 border border-white/10
                  shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]
                  transition-all duration-700 z-20 ml-16
                  ${step === "form"
                    ? "scale-100 opacity-100 rotate-0 translate-y-0"
                    : "scale-[0.97] opacity-70 rotate-1 translate-y-1"
                  }`}
              >
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5 bg-zinc-950">
                  <span className="text-white text-[10px] font-bold">11:59</span>
                  <div className="w-12 h-3.5 rounded-full bg-black border border-white/10" />
                  <span className="text-white/60 text-[9px]">▓▓</span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 bg-zinc-950 border-b border-white/6">
                  <span className="text-white/40 text-xs">✕</span>
                  <span className="text-white text-xs font-semibold">Join now</span>
                  <span className="text-white/30 text-xs">⋮</span>
                </div>

                {/* Form body */}
                <div className="px-3 py-3 bg-zinc-950">
                  <p className="text-white text-[11px] font-bold leading-tight mb-4">
                    Get early access to our Black Friday deals. Register now!
                  </p>

                  {/* Name field */}
                  <div className="mb-2.5">
                    <p className="text-white/35 text-[9px] mb-1 tracking-wide">Name</p>
                    <div className="w-full px-2.5 py-2 rounded-lg bg-zinc-800 border border-white/10
                      text-[10px] text-white/70">
                      Ayesha Pwar
                    </div>
                  </div>

                  {/* Email field */}
                  <div className="mb-3">
                    <p className="text-white/35 text-[9px] mb-1 tracking-wide">Email</p>
                    <div className="w-full px-2.5 py-2 rounded-lg bg-zinc-800 border border-white/10
                      text-[10px] text-white/50">
                      ayesha_49952@mymail.com
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-sm border border-white/25 mt-0.5 shrink-0" />
                      <p className="text-[9px] text-white/45 leading-relaxed">
                        I agree to the terms.{" "}
                        <span className="text-green-400">Read more</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-sm border border-white/25 mt-0.5 shrink-0" />
                      <p className="text-[9px] text-white/45 leading-relaxed">
                        Keep me up to date about EcoShop's offers and promotions
                      </p>
                    </div>
                  </div>

                  {/* Continue button */}
                  <button className="w-full py-2.5 rounded-xl bg-green-500 text-white text-[11px] font-bold tracking-wide">
                    Continue
                  </button>
                  <p className="text-center mt-2 text-[8px] text-white/20">
                    🟢 Managed by EcoShop. Learn more
                  </p>
                </div>
              </div>
            </div>

            {/* Step toggle dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {(["category", "form"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`rounded-full transition-all duration-300
                    ${step === s
                      ? "w-5 h-1.5 bg-orange-500"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/35"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ════════ RIGHT: text ════════ */}
          <div>

            {/* Eyebrow */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">
                WhatsApp Forms
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`font-black text-white leading-[0.9] mb-5
                transition-all duration-700 delay-100
                text-5xl md:text-6xl lg:text-[60px]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ letterSpacing: "-0.025em" }}
            >
              Build WhatsApp<br />
              <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
                Forms
              </span>{" "}
              that<br />
              <span className="text-white">convert.</span>
            </h2>

            {/* Sub */}
            <p
              className={`text-sm text-white/40 leading-relaxed mb-4 max-w-md
                transition-all duration-700 delay-200
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Capture leads & collect useful information{" "}
              <strong className="text-white/80 font-semibold">
                directly in WhatsApp Chats
              </strong>{" "}
              with WhatsApp Forms.
            </p>

            <p
              className={`text-sm text-white/35 leading-relaxed mb-10 max-w-md
                transition-all duration-700 delay-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              From feedback to gathering user insights — collect it all on WhatsApp
              without making users leave the app.
            </p>

            {/* Use-case pills */}
            <div
              className={`flex flex-wrap gap-2 mb-10
                transition-all duration-700 delay-400
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {USE_CASES.map((uc) => (
                <span
                  key={uc.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    bg-white/4 border border-white/8
                    text-xs text-white/45
                    hover:border-orange-500/35 hover:bg-orange-500/6 hover:text-white/70
                    transition-all duration-200 cursor-default"
                >
                  <span>{uc.icon}</span>
                  {uc.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`flex flex-wrap items-center gap-4
                transition-all duration-700 delay-500
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Link
                href="/services/whatsapp-business-api"
                className="group relative overflow-hidden inline-flex items-center gap-2
                  rounded-xl px-8 py-3.5 font-black text-white
                  bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5
                  transition-all duration-200
                  shadow-[0_6px_28px_rgba(249,115,22,0.35)]"
                style={{ letterSpacing: "0.08em", fontSize: "15px" }}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                  transition-transform duration-700 ease-in-out
                  bg-linear-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative">EXPLORE FORMS</span>
                <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/contact"
                className="text-sm font-semibold text-white/30 hover:text-orange-400 transition-colors duration-150"
              >
                See a live demo ↗
              </Link>
            </div>

            {/* Social proof line */}
            <div
              className={`mt-10 flex items-center gap-3
                transition-all duration-700 delay-600
                ${visible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex -space-x-2">
                {["🟠", "🔵", "🟢", "🟡"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-zinc-950
                      bg-zinc-800 flex items-center justify-center text-xs"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/25">
                <strong className="text-white/50">200+ brands</strong> collecting leads via WhatsApp Forms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}