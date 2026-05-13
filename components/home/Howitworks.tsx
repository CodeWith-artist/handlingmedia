"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title:  "Discovery Call",
    sub:    "We listen first.",
    desc:   "A focused 30-minute call where we map your goals, audience and current bottlenecks. No pitch decks — just honest conversation about what will actually move the needle for your business.",
    tags:   ["30 min call", "Free", "No obligations"],
    icon:   "📞",
  },
  {
    number: "02",
    title:  "Strategy & Proposal",
    sub:    "Custom-built, not copy-pasted.",
    desc:   "We build a tailored growth plan — services, timeline and budget scoped to your exact situation. You'll see the full roadmap before committing to a single rupee.",
    tags:   ["Custom roadmap", "Clear pricing", "Full transparency"],
    icon:   "🗺️",
  },
  {
    number: "03",
    title:  "Onboarding & Setup",
    sub:    "Fast start, zero friction.",
    desc:   "Access shared, tools configured, accounts connected. We handle the technical heavy-lifting so your team can stay focused on the business — not the setup.",
    tags:   ["< 48 hr setup", "Dedicated manager", "Tool integration"],
    icon:   "⚡",
  },
  {
    number: "04",
    title:  "Execution & Launch",
    sub:    "Built in sprints, shipped fast.",
    desc:   "Campaigns go live, automations activate, websites deploy. We work in short cycles with regular check-ins so you always know exactly what's shipped and what's next.",
    tags:   ["Weekly sprints", "Live updates", "Real-time reporting"],
    icon:   "🚀",
  },
  {
    number: "05",
    title:  "Optimise & Scale",
    sub:    "Results → repeat.",
    desc:   "Data reviewed every week. What's working gets doubled down on. What isn't gets cut. We compound wins month over month until your growth becomes self-sustaining.",
    tags:   ["Weekly review", "A/B testing", "Scale playbook"],
    icon:   "📈",
  },
];

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

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible    = useInView(sectionRef as React.RefObject<Element>);
  const [active, setActive] = useState(0);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060606] overflow-hidden py-28 border-t border-white/[0.04]"
    >
      {/* Diagonal stripe texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            #fff 0px, #fff 1px,
            transparent 1px, transparent 40px
          )`,
        }}
      />

      {/* Large ghost number behind section */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none"
        style={{
          fontFamily:    "'Barlow Condensed', sans-serif",
          fontSize:      "clamp(200px, 30vw, 400px)",
          fontWeight:    900,
          color:         "transparent",
          WebkitTextStroke: "1px rgba(249,115,22,0.06)",
          lineHeight:    1,
          letterSpacing: "-0.04em",
        }}
      >
        {String(active + 1).padStart(2, "0")}
      </div>

      {/* Ambient glow — moves with active step */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 w-[500px] h-[500px] rounded-full transition-all duration-700"
        style={{
          top:       `${(active / (STEPS.length - 1)) * 60 + 10}%`,
          transform: "translateY(-50%)",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div
          className="mb-20 transition-all duration-700"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-orange-500" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-orange-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The process
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2
              className="text-5xl md:text-[64px] font-black text-white leading-[0.9] max-w-lg"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              From first call<br />
              to{" "}
              <span
                style={{
                  WebkitTextStroke: "2px #f97316",
                  color:            "transparent",
                }}
              >
                full growth
              </span>
              <br />
              in 5 steps.
            </h2>

            <p
              className="text-white/35 text-sm max-w-xs leading-relaxed lg:text-right"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              A proven process refined across 200+ projects.
              No surprises — just steady, compounding results.
            </p>
          </div>
        </div>

        {/* ── Step layout: sidebar nav + content ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

          {/* Left: step nav pills */}
          <div
            className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 flex-shrink-0 transition-all duration-700 delay-200"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            {STEPS.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActive(i)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 flex-shrink-0 group"
                style={{
                  background:  active === i ? "rgba(249,115,22,0.12)" : "transparent",
                  border:      `0.5px solid ${active === i ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.06)"}`,
                  minWidth:    "160px",
                }}
              >
                <span
                  className="transition-colors duration-200 font-black"
                  style={{
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontSize:      "13px",
                    letterSpacing: "0.06em",
                    color:         active === i ? "#f97316" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {step.number}
                </span>
                <span
                  className="transition-colors duration-200 font-semibold text-sm whitespace-nowrap"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color:      active === i ? "#fff" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {step.title}
                </span>

                {/* Active indicator dot */}
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 transition-opacity duration-200 flex-shrink-0"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              </button>
            ))}
          </div>

          {/* Right: content panel */}
          <div className="flex-1 min-w-0">
            {STEPS.map((step, i) => (
              <StepPanel
                key={step.number}
                step={step}
                index={i}
                active={active === i}
                visible={visible}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div
          className="mt-16 transition-all duration-700 delay-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs text-white/25"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Step {active + 1} of {STEPS.length}
            </span>
            <span
              className="text-xs font-semibold text-orange-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {Math.round(((active + 1) / STEPS.length) * 100)}% complete
            </span>
          </div>
          <div className="h-px w-full bg-white/[0.07] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width:      `${((active + 1) / STEPS.length) * 100}%`,
                background: "linear-gradient(90deg, #ea6c0a, #f97316)",
              }}
            />
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-16 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-400"
          style={{
            opacity:     visible ? 1 : 0,
            transform:   visible ? "translateY(0)" : "translateY(20px)",
            background:  "rgba(249,115,22,0.06)",
            border:      "0.5px solid rgba(249,115,22,0.2)",
          }}
        >
          <div>
            <p
              className="text-2xl md:text-3xl font-black text-white mb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ready to start step 01?
            </p>
            <p
              className="text-white/40 text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Book your free discovery call — no commitment, just clarity.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 rounded-xl px-8 py-3.5 font-black text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background:    "#f97316",
              fontFamily:    "'Barlow Condensed', sans-serif",
              letterSpacing: "0.07em",
              fontSize:      "15px",
            }}
          >
            BOOK FREE CALL →
          </Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}

// ── Individual step panel ──────────────────────────────────────

function StepPanel({
  step,
  index,
  active,
  visible,
  onActivate,
}: {
  step:       typeof STEPS[0];
  index:      number;
  active:     boolean;
  visible:    boolean;
  onActivate: () => void;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 mb-3 last:mb-0"
      style={{
        borderColor:  active ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.05)",
        background:   active ? "rgba(249,115,22,0.04)" : "rgba(255,255,255,0.015)",
        opacity:      visible ? 1 : 0,
        transform:    visible ? "translateX(0)" : "translateX(20px)",
        transitionDelay: `${index * 80 + 250}ms`,
        transitionProperty: "opacity, transform, border-color, background",
        transitionDuration: "400ms",
      }}
      onClick={onActivate}
    >
      {/* Collapsed header — always visible */}
      <div className="flex items-center gap-4 px-6 py-5">
        {/* Number badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 transition-all duration-300"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "14px",
            letterSpacing: "0.06em",
            background:    active ? "#f97316" : "rgba(255,255,255,0.04)",
            color:         active ? "#fff"    : "rgba(255,255,255,0.2)",
            border:        `1px solid ${active ? "#f97316" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          {step.number}
        </div>

        {/* Icon */}
        <span
          className="text-xl transition-all duration-300 flex-shrink-0"
          style={{
            filter:    active ? "none" : "grayscale(1) opacity(0.3)",
            transform: active ? "scale(1.1)" : "scale(1)",
          }}
        >
          {step.icon}
        </span>

        {/* Title + sub */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-black text-white leading-tight transition-colors duration-200"
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      "20px",
              letterSpacing: "-0.01em",
            }}
          >
            {step.title}
          </h3>
          <p
            className="text-xs transition-colors duration-200"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color:      active ? "rgba(249,115,22,0.8)" : "rgba(255,255,255,0.25)",
            }}
          >
            {step.sub}
          </p>
        </div>

        {/* Chevron */}
        <span
          className="text-orange-500/50 transition-transform duration-300 flex-shrink-0 text-lg"
          style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ↓
        </span>
      </div>

      {/* Expanded body */}
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: active ? "300px" : "0px" }}
      >
        <div className="px-6 pb-6">
          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: "linear-gradient(90deg, rgba(249,115,22,0.3), transparent)",
            }}
          />

          <div className="flex flex-col md:flex-row gap-6">
            <p
              className="flex-1 text-sm leading-relaxed"
              style={{
                color:      "rgba(255,255,255,0.5)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {step.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {step.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(249,115,22,0.1)",
                    border:     "0.5px solid rgba(249,115,22,0.25)",
                    color:      "#f97316",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    className="w-1 h-1 rounded-full bg-orange-500 flex-shrink-0"
                  />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}