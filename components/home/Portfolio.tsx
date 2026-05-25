"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

// ── types ─────────────────────────────────────────────────────

type Category = "All" | "WhatsApp" | "Web" | "E-commerce" | "App";

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  id:       string;
  client:   string;
  industry: string;
  category: Category[];
  headline: string;
  problem:  string;
  result:   string;
  metrics:  Metric[];
  tags:     string[];
  color:    string;    // accent per card
  index:    string;    // 01 02 ...
  href:     string;
  // Visual: we generate a pattern per card since no real images
  pattern:  "dots" | "lines" | "cross" | "hex" | "wave";
}

// ── data ──────────────────────────────────────────────────────

const CASES: CaseStudy[] = [
  {
    id:       "fashionkart",
    client:   "FashionKart",
    industry: "D2C Fashion",
    category: ["E-commerce", "WhatsApp"],
    headline: "340% revenue growth in 90 days via WhatsApp commerce.",
    problem:  "Huge Instagram following, zero repeat purchases. Cart abandonment at 78%.",
    result:   "WhatsApp broadcast + chatbot recovery flow cut abandonment to 19% and tripled LTV.",
    metrics:  [
      { value: "340%", label: "Revenue growth" },
      { value: "19%",  label: "Abandonment rate" },
      { value: "3.2×", label: "LTV increase"    },
    ],
    tags:     ["WhatsApp API", "Chatbot", "Shopify"],
    color:    "#f97316",
    index:    "01",
    href:     "/portfolio/fashionkart",
    pattern:  "dots",
  },
  {
    id:       "healthplus",
    client:   "HealthPlus Clinics",
    industry: "Healthcare",
    category: ["Web", "WhatsApp"],
    headline: "Appointment no-shows dropped 71% with smart WhatsApp reminders.",
    problem:  "Manual booking system, 45% no-show rate draining staff time and revenue.",
    result:   "Custom booking website + WhatsApp reminder bot automated 100% of confirmations.",
    metrics:  [
      { value: "71%",  label: "Fewer no-shows"  },
      { value: "4.8×", label: "Bookings volume"  },
      { value: "₹0",   label: "Manual effort"   },
    ],
    tags:     ["Booking System", "Next.js", "WhatsApp Bot"],
    color:    "#22d3ee",
    index:    "02",
    href:     "/portfolio/healthplus",
    pattern:  "lines",
  },
  {
    id:       "urbaneat",
    client:   "UrbanEat",
    industry: "Food & Beverage",
    category: ["App", "E-commerce"],
    headline: "Built a food ordering app in 6 weeks — ₹2.4Cr GMV in month one.",
    problem:  "Aggregator commissions eating 35% margin. No owned customer data or channel.",
    result:   "React Native app with Razorpay, loyalty points and WhatsApp order updates shipped in 42 days.",
    metrics:  [
      { value: "₹2.4Cr", label: "Month-1 GMV"    },
      { value: "42d",     label: "Time to launch"  },
      { value: "35%",     label: "Commission saved" },
    ],
    tags:     ["React Native", "Razorpay", "WhatsApp"],
    color:    "#a78bfa",
    index:    "03",
    href:     "/portfolio/urbaneat",
    pattern:  "cross",
  },
  {
    id:       "realtypro",
    client:   "RealtyPro",
    industry: "Real Estate",
    category: ["Web", "WhatsApp"],
    headline: "320 qualified leads per month from SEO + WhatsApp follow-up.",
    problem:  "Spending ₹4L/month on ads with no organic presence. Lead quality poor.",
    result:   "New Next.js website + SEO strategy + WhatsApp CRM integration delivered inbound pipeline within 60 days.",
    metrics:  [
      { value: "320",  label: "Leads / month"   },
      { value: "60d",  label: "To first results" },
      { value: "82%",  label: "Ad spend reduced" },
    ],
    tags:     ["Next.js", "SEO", "CRM Integration"],
    color:    "#34d399",
    index:    "04",
    href:     "/portfolio/realtypro",
    pattern:  "hex",
  },
  {
    id:       "edutechpro",
    client:   "EduTechPro",
    industry: "EdTech",
    category: ["Web", "App"],
    headline: "Custom LMS + mobile app replacing ₹6L/yr third-party subscription.",
    problem:  "Paying premium SaaS fees for a generic LMS that didn't fit their course model.",
    result:   "Bespoke Next.js LMS + React Native student app with live class, quizzes and WhatsApp notifications.",
    metrics:  [
      { value: "₹6L",  label: "Annual saving"   },
      { value: "12K+", label: "Active students"  },
      { value: "4.7★", label: "App store rating" },
    ],
    tags:     ["Next.js", "React Native", "Custom LMS"],
    color:    "#fb7185",
    index:    "05",
    href:     "/portfolio/edutechpro",
    pattern:  "wave",
  },
  {
    id:       "luxurycraft",
    client:   "LuxuryCraft",
    industry: "Luxury Goods",
    category: ["E-commerce", "Web"],
    headline: "Shopify store redesign — 220% increase in average order value.",
    problem:  "Generic Shopify theme underselling premium positioning. Bounce rate 74%.",
    result:   "Bespoke Shopify theme with editorial layout, luxury UX and WhatsApp concierge chat.",
    metrics:  [
      { value: "220%", label: "AOV increase"    },
      { value: "74%→31%", label: "Bounce rate"  },
      { value: "4.9★", label: "Trust score"     },
    ],
    tags:     ["Shopify", "UI/UX Design", "WhatsApp"],
    color:    "#fbbf24",
    index:    "06",
    href:     "/portfolio/luxurycraft",
    pattern:  "dots",
  },
];

const CATEGORIES: Category[] = ["All", "WhatsApp", "Web", "E-commerce", "App"];

// ── intersection hook ─────────────────────────────────────────

function useInView(ref: React.RefObject<Element>, threshold = 0.06) {
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

// ── SVG patterns ──────────────────────────────────────────────

function PatternBg({ type, color }: { type: CaseStudy["pattern"]; color: string }) {
  const id = `pat-${type}-${color.replace("#", "")}`;
  const c  = color + "18";

  const patterns: Record<CaseStudy["pattern"], React.ReactNode> = {
    dots: (
      <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill={c} />
      </pattern>
    ),
    lines: (
      <pattern id={id} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <line x1="0" y1="12" x2="12" y2="0" stroke={c} strokeWidth="0.8" />
      </pattern>
    ),
    cross: (
      <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <line x1="12" y1="4" x2="12" y2="20" stroke={c} strokeWidth="0.8" />
        <line x1="4" y1="12" x2="20" y2="12" stroke={c} strokeWidth="0.8" />
      </pattern>
    ),
    hex: (
      <pattern id={id} x="0" y="0" width="40" height="35" patternUnits="userSpaceOnUse">
        <polygon points="20,2 36,10 36,26 20,34 4,26 4,10" fill="none" stroke={c} strokeWidth="0.7" />
      </pattern>
    ),
    wave: (
      <pattern id={id} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke={c} strokeWidth="0.8" />
      </pattern>
    ),
  };

  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>{patterns[type]}</defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ── main component ────────────────────────────────────────────

export default function PortfolioSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const visible     = useInView(sectionRef as React.RefObject<Element>);
  const [filter, setFilter] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "All"
    ? CASES
    : CASES.filter(c => c.category.includes(filter));

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060606] overflow-hidden py-28 border-t border-white/4"
    >
      {/* Scan-line texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.008) 0px,
            rgba(255,255,255,0.008) 1px,
            transparent 1px,
            transparent 4px
          )`,
        }}
      />

      {/* Corner glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 left-0 w-100 h-100 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)",
            transform:  "translate(-30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-125 h-125 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 65%)",
            transform:  "translate(30%, 30%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div
          className="mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-orange-500" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-orange-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our work
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="text-5xl md:text-[64px] font-black text-white leading-[0.9] max-w-xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
            >
              Results that<br />
              <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
                speak louder.
              </span>
            </h2>
            <div className="flex flex-col items-start lg:items-end gap-2">
              <p
                className="text-white/35 text-sm max-w-xs leading-relaxed lg:text-right"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Real clients. Real numbers. No stock photos.
              </p>
              <Link
                href="/portfolio"
                className="text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View full portfolio →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Filter pills ── */}
        <div
          className="flex flex-wrap gap-2 mb-12 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setExpanded(null); }}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "0.06em",
                fontSize:      "13px",
                background:    filter === cat ? "#f97316"                   : "rgba(255,255,255,0.04)",
                color:         filter === cat ? "#fff"                      : "rgba(255,255,255,0.35)",
                border:        filter === cat ? "none"                      : "0.5px solid rgba(255,255,255,0.08)",
              }}
            >
              {cat.toUpperCase()}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-50 text-xs">
                  ({CASES.filter(c => c.category.includes(cat)).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Case study grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {filtered.map((cs, i) => (
            <CaseCard
              key={cs.id}
              cs={cs}
              index={i}
              visible={visible}
              expanded={expanded === cs.id}
              onExpand={() => setExpanded(expanded === cs.id ? null : cs.id)}
            />
          ))}
        </div>

        {/* ── Stats ticker ── */}
        <div
          className="rounded-2xl overflow-hidden mb-14 transition-all duration-700 delay-500"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            background: "rgba(255,255,255,0.02)",
            border:     "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { value: "200+", label: "Projects delivered" },
              { value: "₹50Cr+", label: "Client revenue generated" },
              { value: "98%",  label: "Client retention" },
              { value: "4.9★", label: "Average rating" },
            ].map((s) => (
              <div key={s.label} className="px-8 py-7 text-center group cursor-default">
                <p
                  className="font-black mb-1 transition-colors duration-200 group-hover:text-orange-500"
                  style={{
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontSize:      "36px",
                    color:         "#fff",
                    letterSpacing: "-0.02em",
                    lineHeight:    1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="text-center transition-all duration-700 delay-600"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <p
            className="text-white/25 text-sm mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Want results like these?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-white transition-all duration-200 hover:-translate-y-1"
              style={{
                background:    "#f97316",
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "0.08em",
                fontSize:      "15px",
                boxShadow:     "0 8px 32px rgba(249,115,22,0.25)",
              }}
            >
              START YOUR PROJECT →
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black border transition-all duration-200 hover:border-white/25 hover:text-white"
              style={{
                color:         "rgba(255,255,255,0.4)",
                border:        "0.5px solid rgba(255,255,255,0.1)",
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "0.08em",
                fontSize:      "15px",
              }}
            >
              SEE ALL WORK
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}

// ── Case card ─────────────────────────────────────────────────

function CaseCard({
  cs, index, visible, expanded, onExpand,
}: {
  cs:       CaseStudy;
  index:    number;
  visible:  boolean;
  expanded: boolean;
  onExpand: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-400 cursor-pointer"
      style={{
        borderColor:        expanded
          ? cs.color + "60"
          : hovered ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)",
        background:         expanded
          ? cs.color + "08"
          : hovered ? "rgba(249,115,22,0.03)" : "rgba(255,255,255,0.02)",
        opacity:            visible ? 1 : 0,
        transform:          visible
          ? hovered || expanded ? "translateY(-4px)" : "translateY(0)"
          : "translateY(32px)",
        transitionDelay:    `${index * 80 + 200}ms`,
        transitionProperty: "opacity, transform, border-color, background",
        transitionDuration: "400ms",
        boxShadow:          expanded ? `0 20px 60px ${cs.color}18` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onExpand}
    >
      {/* Pattern visual area */}
      <div
        className="relative overflow-hidden"
        style={{ height: "140px", background: `${cs.color}08` }}
      >
        <PatternBg type={cs.pattern} color={cs.color} />

        {/* Large ghost index number */}
        <div
          aria-hidden
          className="absolute right-4 bottom-2 select-none leading-none font-black"
          style={{
            fontFamily:       "'Barlow Condensed', sans-serif",
            fontSize:         "80px",
            color:            "transparent",
            WebkitTextStroke: `1px ${cs.color}30`,
            letterSpacing:    "-0.04em",
          }}
        >
          {cs.index}
        </div>

        {/* Category pills */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {cs.category.map(cat => (
            <span
              key={cat}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{
                background: `${cs.color}20`,
                border:     `0.5px solid ${cs.color}40`,
                color:      cs.color,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${cs.color}, transparent)`,
            opacity:    hovered || expanded ? 1 : 0,
          }}
        />

        {/* Client + industry */}
        <div className="absolute bottom-4 left-4">
          <p
            className="font-black text-white leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px" }}
          >
            {cs.client}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {cs.industry}
          </p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">

        {/* Headline */}
        <h3
          className="font-black text-white leading-tight mb-3"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "19px",
            letterSpacing: "-0.01em",
          }}
        >
          {cs.headline}
        </h3>

        {/* Metrics row */}
        <div className="flex gap-4 mb-4">
          {cs.metrics.map((m) => (
            <div key={m.label}>
              <p
                className="font-black leading-none mb-0.5 transition-colors duration-200"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "22px",
                  letterSpacing: "-0.02em",
                  color:         hovered || expanded ? cs.color : "#fff",
                }}
              >
                {m.value}
              </p>
              <p
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Expanded content */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: expanded ? "240px" : "0px", opacity: expanded ? 1 : 0 }}
        >
          <div
            className="h-px mb-4"
            style={{ background: `linear-gradient(90deg, ${cs.color}40, transparent)` }}
          />

          <div className="space-y-3 mb-4">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: cs.color, fontFamily: "'DM Sans', sans-serif" }}
              >
                Challenge
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {cs.problem}
              </p>
            </div>
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1"
                style={{ color: cs.color, fontFamily: "'DM Sans', sans-serif" }}
              >
                What we did
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {cs.result}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cs.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border:     "0.5px solid rgba(255,255,255,0.1)",
                  color:      "rgba(255,255,255,0.35)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <button
            className="text-xs font-bold transition-colors duration-200"
            style={{
              color:      expanded ? cs.color : "rgba(255,255,255,0.2)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {expanded ? "← Less detail" : "View details →"}
          </button>
          <Link
            href={cs.href}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-100"
            style={{
              background: `${cs.color}18`,
              border:     `0.5px solid ${cs.color}35`,
              color:      cs.color,
              fontFamily: "'DM Sans', sans-serif",
              opacity:    hovered || expanded ? 1 : 0.6,
            }}
          >
            Case study ↗
          </Link>
        </div>
      </div>
    </div>
  );
}