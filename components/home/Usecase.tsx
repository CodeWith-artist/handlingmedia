// components/sections/UseCasesSection.tsx
"use client";

import { useState, useRef } from "react";
import { useInView } from "@/hook/useInView"; // your existing hook

const USE_CASES = [
  {
    icon: "🛒",
    title: "E-commerce & Retail",
    desc: "Automate product recommendations, order status updates, and abandoned cart recovery on WhatsApp.",
    tags: ["Order updates", "Cart recovery", "Recommendations"],
    badge: "Most popular",
    border: "border-amber-500/25", glow: "from-amber-500/10",
  },
  {
    icon: "🍽️",
    title: "Restaurants & Food Service",
    desc: "Automate table reservations, online orders, menu inquiries, and customer feedback on WhatsApp and Instagram.",
    tags: ["Table booking", "Menu inquiries", "Feedback"],
    border: "border-orange-500/20", glow: "from-orange-500/10",
  },
  {
    icon: "💼",
    title: "Service Businesses",
    desc: "Schedule appointments, send reminders, and handle frequently asked questions automatically.",
    tags: ["Appointments", "Auto-reminders", "FAQ handling"],
    border: "border-blue-500/20", glow: "from-blue-500/10",
  },
  {
    icon: "📣",
    title: "Lead Generation",
    desc: "Qualify leads and engage prospects with personalized automation sequences.",
    tags: ["Lead qualification", "Drip sequences", "Engagement"],
    border: "border-purple-500/20", glow: "from-purple-500/10",
  },
  {
    icon: "📊",
    title: "Analytics & Insights",
    desc: "Track customer engagement, conversion rates, and campaign performance in real-time.",
    tags: ["Real-time tracking", "Conversion rates", "Campaigns"],
    border: "border-teal-500/20", glow: "from-teal-500/10",
  },
  {
    icon: "🤖",
    title: "Custom AI Solutions",
    desc: "Build domain-specific AI agents trained for Instagram, Messenger, WhatsApp and your website.",
    tags: ["Custom AI agents", "Multi-channel", "Domain training"],
    border: "border-pink-500/20", glow: "from-pink-500/10",
  },
];

export default function UseCasesSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 px-6 border-t border-white/[0.04] bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">
            Business Solutions
          </span>
          <div className="h-px w-10 bg-orange-500" />
        </div>

        {/* Heading */}
        <h2
          className={`font-black text-white text-center leading-[0.9] mb-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-0.025em" }}
        >
          Use <span className="text-orange-500">Cases</span>
        </h2>

        {/* Subheading */}
        <p className={`text-sm text-white/40 text-center max-w-2xl mx-auto leading-relaxed mb-16 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Discover how businesses across industries leverage our AI automation to
          streamline operations, engage customers, and drive revenue growth.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((uc, i) => (
            <button
              key={uc.title}
              onClick={() => setActive(active === i ? null : i)}
              className={`group text-left relative rounded-2xl border bg-gradient-to-b ${uc.glow} to-white/[0.01]
                p-7 transition-all duration-300 overflow-hidden
                ${active === i
                  ? `${uc.border} border-2 -translate-y-1 shadow-[0_8px_32px_rgba(249,115,22,0.1)]`
                  : `border-white/[0.06] hover:${uc.border} hover:-translate-y-1`
                }
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {/* Top bar on active */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent transition-opacity duration-300 ${active === i ? "opacity-100" : "opacity-0"}`} />

              {/* Badge */}
              {uc.badge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10px] font-bold mb-4">
                  ★ {uc.badge}
                </div>
              )}

              <span className={`text-4xl mb-5 block transition-transform duration-300 ${active === i ? "scale-110 -rotate-3" : "group-hover:scale-110 group-hover:-rotate-3"}`}>
                {uc.icon}
              </span>

              <h3 className="font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "21px", letterSpacing: "-0.01em" }}>
                {uc.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-5">{uc.desc}</p>

              {/* Tags — shown when active */}
              <div className={`flex flex-wrap gap-1.5 transition-all duration-300 overflow-hidden ${active === i ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>
                {uc.tags.map((t) => (
                  <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    {t}
                  </span>
                ))}
              </div>

              {/* Click hint */}
              <div className={`mt-4 text-[11px] font-bold transition-all duration-200 ${active === i ? "text-orange-500" : "text-white/20 group-hover:text-white/40"}`}>
                {active === i ? "▲ COLLAPSE" : "▼ SEE FEATURES"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}