"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ── data ──────────────────────────────────────────────────────

const FEATURES = [
  {
    id:    "categories",
    icon:  "⚡",
    title: "8+ Powerful Messaging Categories",
    tag:   "8+ Categories",
    desc:  "Send Promotions, Offers, Coupon codes, Carousels and more — all Risk-Free with official API compliance.",
  },
  {
    id:    "cta",
    icon:  "🎯",
    title: "Add CTAs. Drive 3× Conversions",
    tag:   "3× Conversion",
    desc:  "Turn conversations into conversions with eye-catching CTA buttons and Quick Reply flows that sell.",
  },
  {
    id:    "schedule",
    icon:  "🗓️",
    title: "Schedule Your WhatsApp Messages",
    tag:   "2 Months Ahead",
    desc:  "Schedule broadcasts up to 2 months ahead with auto-retry on failure — zero missed sends.",
  },
];

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

// ── main ──────────────────────────────────────────────────────

export default function WhatsAppBroadcast() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible    = useInView(sectionRef as React.RefObject<Element>);
  const [active,  setActive]  = useState(0);
  const [msgStep, setMsgStep] = useState(0);

  // Auto-cycle features
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setActive((a) => (a + 1) % FEATURES.length), 3000);
    return () => clearInterval(t);
  }, [visible]);

  // Stagger messages in
  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setMsgStep(1), 600),
      setTimeout(() => setMsgStep(2), 1300),
      setTimeout(() => setMsgStep(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);       
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950 overflow-hidden  border-t border-white/4"
    >
      {/* Ambient blurs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-125 h-125 rounded-full bg-green-500/6 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-105 h-105 rounded-full bg-orange-500/[0.07] blur-3xl" />
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

      <div className="relative max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ════════ LEFT ════════ */}
          <div>

            {/* Eyebrow */}
            <div className={`flex items-center gap-3 mb-6 transition-all duration-700
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">
                WhatsApp Broadcasting
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`font-black text-white leading-none mb-5
                transition-all duration-700 delay-100
                text-5xl md:text-6xl lg:text-[64px]
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ letterSpacing: "-0.025em" }}
            >
              Broadcast Promo<br />
              Messages on{" "}
              {/* WebkitTextStroke has no Tailwind equivalent — kept as inline */}
              <span style={{ WebkitTextStroke: "2px #22c55e", color: "transparent" }}>
                WhatsApp
              </span>
              <br />
              <span className="text-orange-500">Officially.</span>
            </h2>

            {/* Sub */}
            <p className={`text-sm text-white/40 leading-relaxed mb-10 max-w-md
              transition-all duration-700 delay-200
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Enjoy a limitless broadcasting experience on WhatsApp — verified,
              scalable and built for brands that mean business.
            </p>

            {/* Feature rows */}
            <div className="space-y-3 mb-10">
              {FEATURES.map((feat, i) => (
                <button
                  key={feat.id}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left
                    transition-all duration-300
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}
                    ${active === i
                      ? "border-orange-500/40 bg-orange-500/5"
                      : "border-white/4 bg-white/2 hover:border-white/10 hover:bg-white/3"
                    }`}
                  style={{ transitionDelay: visible ? `${i * 100 + 300}ms` : "0ms" }}
                >
                  {/* Icon box */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
                    shrink-0 transition-all duration-300
                    ${active === i
                      ? "bg-orange-500/20 border border-orange-500/40 scale-110 -rotate-3"
                      : "bg-white/4 border border-white/8"
                    }`}>
                    {feat.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`font-black leading-tight text-[17px]
                        ${active === i ? "text-white" : "text-white/80"}`}
                        style={{ letterSpacing: "-0.01em" }}>
                        {feat.title}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                        transition-all duration-300
                        ${active === i
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-white/5 text-white/25"
                        }`}>
                        {feat.tag}
                      </span>
                    </div>
                    <p className="text-xs text-white/38 leading-relaxed">{feat.desc}</p>
                  </div>

                  {/* Side accent bar */}
                  <div className={`w-1 self-stretch rounded-full shrink-0 transition-all duration-300
                    ${active === i ? "bg-orange-500" : "bg-transparent"}`} />
                </button>
              ))}
            </div>

           
            
          </div>

          {/* ════════ RIGHT: Phone ════════ */}
          <div className={`flex items-center justify-center
            transition-all duration-1000 delay-300
            ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>

            <div className="relative">

              {/* Outer glow */}
              <div className="absolute -inset-10 rounded-[60px] bg-green-500/[0.07] blur-2xl pointer-events-none" />

              {/* Phone shell */}
              <div className="relative w-64 rounded-[40px] overflow-hidden
                bg-zinc-900
                border border-white/12
                shadow-[0_32px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.07)]">

                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-2 bg-zinc-950">
                  <span className="text-white text-xs font-bold">3:35</span>
                  <div className="w-16 h-4 rounded-full bg-black border border-white/10" />
                  <span className="text-white/70 text-[10px]">5G ▓▓</span>
                </div>

                {/* Chat header */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5
                  bg-zinc-950 border-b border-white/6">
                  <span className="text-white/35 text-xs">←</span>
                  <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center
                    justify-center text-white text-xs font-black shrink-0"
                    style={{ letterSpacing: "0.05em" }}>
                    H
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold flex items-center gap-1">
                      Handlingmedia
                      <span className="text-green-400 text-[9px]">✓</span>
                    </p>
                    <p className="text-white/25 text-[9px]">Official Business Account</p>
                  </div>
                  <span className="text-white/25 text-xs ml-auto">⋮</span>
                </div>

                {/* Chat body */}
                <div className="px-2.5 py-3 bg-zinc-950/80 min-h-66 flex flex-col gap-2.5">

                  {/* Message 1 — product card */}
                  <div className={`max-w-48.75 rounded-2xl rounded-bl-48.75 overflow-hidden
                    bg-white/5 border border-white/8
                    transition-all duration-500
                    ${msgStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <div className="w-full h-20 flex items-center justify-center text-3xl
                      bg-linear-to-br from-green-500/10 to-orange-500/8">
                      🎧
                    </div>
                    <div className="p-2.5">
                      <p className="text-[10px] text-white/65 leading-relaxed">
                        Your Order{" "}
                        <strong className="text-white">Rockway 450 Headphones</strong>{" "}
                        will be delivered by{" "}
                        <strong className="text-white">21st January, Tuesday</strong>
                      </p>
                      <p className="text-[8px] text-white/20 text-right mt-1">3:35 PM ✓✓</p>
                    </div>
                  </div>

                  {/* Message 2 — outgoing */}
                  <div className={`flex justify-end transition-all duration-500 delay-200
                    ${msgStep >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <div className="px-3 py-2 rounded-2xl rounded-br-[3px]
                      bg-green-500/18 border border-green-500/30
                      text-[10px] font-semibold text-white/80 max-w-[75%]">
                      Thank You! 🙏
                      <p className="text-[8px] text-white/20 text-right mt-1">3:36 PM ✓✓</p>
                    </div>
                  </div>

                  {/* Message 3 — promo + CTA button */}
                  <div className={`max-w-50 rounded-2xl rounded-bl-sm overflow-hidden
                    bg-white/5 border border-white/8
                    transition-all duration-500 delay-300
                    ${msgStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <div className="p-2.5">
                      <p className="text-[10px] text-white/60 leading-relaxed mb-2">
                        🎉 Flash Sale! Get{" "}
                        <strong className="text-orange-400">30% OFF</strong> on all
                        orders above ₹999. Use code:{" "}
                        <strong className="text-orange-400">FLASH30</strong>
                      </p>
                      <div className="w-full text-center py-1.5 rounded-lg
                        bg-orange-500/20 border border-orange-500/40
                        text-orange-400 text-[10px] font-bold">
                        Shop Now →
                      </div>
                      <p className="text-[8px] text-white/20 text-right mt-1.5">3:38 PM ✓✓</p>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex items-center gap-1 px-2 py-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 px-3 py-2.5
                  bg-zinc-950 border-t border-white/6">
                  <div className="flex-1 rounded-full px-4 py-1.5
                    bg-white/5 border border-white/8
                    text-[10px] text-white/20">
                    Message…
                  </div>
                  <div className="w-7 h-7 rounded-full bg-green-500 flex items-center
                    justify-center text-xs shrink-0">
                    🎤
                  </div>
                </div>
              </div>

              {/* Floating badge — open rate */}
              <div className="absolute -left-14 top-14
                flex flex-col items-center px-3.5 py-2 rounded-2xl min-w-18.5
                bg-zinc-950/90 border border-green-500/20 backdrop-blur-xl
                shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                animate-bounce [animation-duration:3s] [animation-delay:0s]">
                <span className="text-green-400 font-black text-xl leading-none mb-0.5"
                  style={{ letterSpacing: "-0.02em" }}>98%</span>
                <span className="text-[9px] text-white/28 whitespace-nowrap">Open rate</span>
              </div>

              {/* Floating badge — conversions */}
              <div className="absolute -right-12 top-32
                flex flex-col items-center px-3.5 py-2 rounded-2xl min-w-18.5
                bg-zinc-950/90 border border-orange-500/20 backdrop-blur-xl
                shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                animate-bounce [animation-duration:3s] [animation-delay:400ms]">
                <span className="text-orange-400 font-black text-xl leading-none mb-0.5"
                  style={{ letterSpacing: "-0.02em" }}>3×</span>
                <span className="text-[9px] text-white/28 whitespace-nowrap">Conversions</span>
              </div>

              {/* Floating badge — delivered */}
              <div className="absolute -left-12 bottom-20
                flex flex-col items-center px-3.5 py-2 rounded-2xl min-w-18.5
                bg-zinc-950/90 border border-orange-500/20 backdrop-blur-xl
                shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                animate-bounce [animation-duration:3s] [animation-delay:800ms]">
                <span className="text-orange-400 font-black text-xl leading-none mb-0.5"
                  style={{ letterSpacing: "-0.02em" }}>12M+</span>
                <span className="text-[9px] text-white/28 whitespace-nowrap">Delivered</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}