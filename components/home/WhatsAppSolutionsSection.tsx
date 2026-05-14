"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ── data — matched to your WHATSAPP_SOLUTIONS nav config ─────

const FEATURES = [
  {
    href:    "/services/whatsapp-business-api",
    tag:     "WhatsApp API",
    title:   "Official API. Unlimited Scale.",
    desc:    "Connect the official WhatsApp Business API to your CRM, website or app. Send verified messages to millions — broadcasts, OTP, order alerts — with a green tick your customers trust.",
    bullets: [
      "Green verified badge on every message",
      "Unlimited broadcast audience",
      "99.9% delivery rate SLA",
      "CRM & Shopify native integration",
    ],
    stat:    { value: "12M+", label: "Messages delivered" },
    color:   "#25D366",
  },
  {
    href:    "/services/chatbot-automation",
    tag:     "Chatbot Automation",
    title:   "Your best agent. Works 24 / 7.",
    desc:    "An intelligent WhatsApp chatbot that qualifies leads, answers FAQs, collects payments and books appointments — all without human intervention. Hands off to a live agent the moment it matters.",
    bullets: [
      "Lead qualification on autopilot",
      "Payment collection inside chat",
      "Smart live-agent handoff",
      "Multi-language support",
    ],
    stat:    { value: "3 min", label: "Avg. response time" },
    color:   "#f97316",
  },
  {
    href:    "/services/crm-integration",
    tag:     "CRM Integration",
    title:   "Every chat. One dashboard.",
    desc:    "Sync WhatsApp conversations, contacts and deal stages directly into your CRM. No copy-pasting, no lost leads. Every interaction tracked, tagged and ready for follow-up automatically.",
    bullets: [
      "HubSpot, Zoho & custom CRM sync",
      "Auto-tag leads by intent",
      "Deal pipeline from chat",
      "Full conversation history",
    ],
    stat:    { value: "68%",  label: "Faster lead response" },
    color:   "#fb923c",
  },
];

const STATS = [
  { value: "98%",  label: "Open rate vs 22% email" },
  { value: "5×",   label: "Higher conversion than SMS" },
  { value: "200+", label: "Brands on our platform" },
  { value: "30d",  label: "Avg. time to first results" },
];

// ── intersection hook ─────────────────────────────────────────

function useInView(ref: React.RefObject<Element>, threshold = 0.08) {
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

// ── main component ────────────────────────────────────────────

export default function WhatsAppSolutions() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const visible     = useInView(sectionRef as React.RefObject<Element>);
  const [active, setActive] = useState(0);
  const feat = FEATURES[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] overflow-hidden py-28 border-t border-white/4"
    >
      {/* Hex grid background */}
      <HexGrid />

      {/* Dual ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-0 right-0 w-150 h-150 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 65%)",
            transform: "translate(20%, -20%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-125 h-125 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 65%)",
            transform: "translate(-20%, 20%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div
          className="mb-20 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "#25D366" }} />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold"
              style={{ color: "#25D366", fontFamily: "'DM Sans', sans-serif" }}
            >
              WhatsApp Solutions
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2
              className="text-5xl md:text-[64px] font-black text-white leading-[0.9] max-w-xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
            >
              The channel your<br />
              customers{" "}
              <span
                style={{
                  WebkitTextStroke: "2px #25D366",
                  color: "transparent",
                }}
              >
                already use.
              </span>
            </h2>

            <p
              className="text-white/35 text-sm max-w-sm leading-relaxed lg:text-right"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              WhatsApp has a 98% open rate. Your emails have 22%.
              We build the infrastructure to make every message count.
            </p>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-5 py-4 text-center"
              style={{
                background:  "rgba(37,211,102,0.04)",
                border:      "0.5px solid rgba(37,211,102,0.12)",
              }}
            >
              <p
                className="font-black mb-0.5"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "28px",
                  letterSpacing: "-0.02em",
                  color:         "#25D366",
                }}
              >
                {s.value}
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Feature panel ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-16"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.25s, transform 0.7s 0.25s",
          }}
        >
          {/* Left: feature selector tabs */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col gap-3">
            {FEATURES.map((f, i) => (
              <button
                key={f.tag}
                onClick={() => setActive(i)}
                className="flex-1 lg:flex-none text-left rounded-2xl px-5 py-5 border transition-all duration-300 group"
                style={{
                  background:  active === i ? "rgba(37,211,102,0.06)"  : "rgba(255,255,255,0.02)",
                  borderColor: active === i ? "rgba(37,211,102,0.35)"  : "rgba(255,255,255,0.06)",
                }}
              >
                {/* Tag pill */}
                <span
                  className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full mb-3 tracking-wider uppercase"
                  style={{
                    background: active === i ? "rgba(37,211,102,0.15)" : "rgba(255,255,255,0.05)",
                    color:      active === i ? "#25D366"               : "rgba(255,255,255,0.2)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {f.tag}
                </span>

                <p
                  className="font-black leading-tight text-white"
                  style={{
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    fontSize:      "16px",
                    letterSpacing: "-0.01em",
                    opacity:       active === i ? 1 : 0.35,
                  }}
                >
                  {f.title}
                </p>

                {/* Stat pill */}
                <div
                  className="mt-3 flex items-baseline gap-1.5 transition-opacity duration-300"
                  style={{ opacity: active === i ? 1 : 0 }}
                >
                  <span
                    className="font-black"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize:   "22px",
                      color:      "#f97316",
                    }}
                  >
                    {f.stat.value}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {f.stat.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: feature detail */}
          <div
            key={active}
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{
              background:  "rgba(255,255,255,0.02)",
              border:      "0.5px solid rgba(255,255,255,0.07)",
              animation:   "fadeSlideIn 0.35s ease-out",
            }}
          >
            {/* Top colored bar */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${feat.color}, transparent)`,
              }}
            />

            <div className="p-8 h-full flex flex-col">
              {/* Tag + title */}
              <span
                className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: feat.color, fontFamily: "'DM Sans', sans-serif" }}
              >
                {feat.tag}
              </span>

              <h3
                className="font-black text-white mb-4 leading-tight"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "32px",
                  letterSpacing: "-0.02em",
                }}
              >
                {feat.title}
              </h3>

              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {feat.desc}
              </p>

              {/* Bullet list */}
              <ul className="space-y-3 mb-8 flex-1">
                {feat.bullets.map((b, bi) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm"
                    style={{
                      fontFamily:      "'DM Sans', sans-serif",
                      color:           "rgba(255,255,255,0.6)",
                      animationDelay:  `${bi * 60}ms`,
                    }}
                  >
                    <span
                      className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                      style={{
                        background: `${feat.color}22`,
                        color:      feat.color,
                        border:     `0.5px solid ${feat.color}55`,
                      }}
                    >
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <Link
                  href={feat.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background:    "#f97316",
                    color:         "#fff",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.07em",
                    fontSize:      "14px",
                  }}
                >
                  GET STARTED →
                </Link>
                <Link
                  href={feat.href}
                  className="text-sm font-semibold transition-colors duration-200 hover:opacity-100"
                  style={{
                    color:      feat.color,
                    opacity:    0.7,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Learn more ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── WhatsApp mock phone ── */}
        <div
          className="relative rounded-2xl overflow-hidden p-8 md:p-12 transition-all duration-700 delay-400"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "translateY(0)" : "translateY(20px)",
            background: "rgba(37,211,102,0.03)",
            border:     "0.5px solid rgba(37,211,102,0.12)",
          }}
        >
          {/* Background WA icon */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 select-none text-[180px] leading-none"
            style={{ opacity: 0.04 }}
          >
            📱
          </div>

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* Chat bubble mockup */}
            <div className="flex flex-col gap-2 shrink-0 w-full max-w-xs">
              <ChatBubble
                from="brand"
                text="👋 Hey! You left something in your cart. Complete your order now and get 10% off!"
                time="10:42 AM"
                color="#25D366"
              />
              <ChatBubble
                from="user"
                text="Yes! Apply the discount please"
                time="10:43 AM"
                color="#f97316"
              />
              <ChatBubble
                from="brand"
                text="✅ Done! Your 10% discount has been applied. Click here to complete checkout 👇"
                time="10:43 AM"
                color="#25D366"
              />
              <div
                className="self-start mt-1 text-xs px-4 py-2 rounded-xl font-bold"
                style={{
                  background: "#25D366",
                  color:      "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Complete Order →
              </div>
            </div>

            {/* Right: callout text */}
            <div className="flex-1">
              <p
                className="font-black text-white mb-3 leading-tight"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "clamp(28px, 4vw, 44px)",
                  letterSpacing: "-0.02em",
                }}
              >
                This is a real conversation.<br />
                <span style={{ color: "#25D366" }}>This is your revenue.</span>
              </p>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", maxWidth: "360px" }}
              >
                Abandoned cart recovery, flash sale alerts, appointment reminders — all delivered where your customer is already looking: WhatsApp.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services/whatsapp-business-api"
                  className="px-7 py-3 rounded-xl font-black text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background:    "#f97316",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.07em",
                    fontSize:      "14px",
                  }}
                >
                  SEE LIVE DEMO →
                </Link>
                <Link
                  href="/contact"
                  className="px-7 py-3 rounded-xl font-black border transition-all duration-200 hover:border-white/25"
                  style={{
                    color:         "rgba(255,255,255,0.4)",
                    border:        "0.5px solid rgba(255,255,255,0.1)",
                    fontFamily:    "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.07em",
                    fontSize:      "14px",
                  }}
                >
                  TALK TO US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// ── sub-components ────────────────────────────────────────────

function ChatBubble({
  from, text, time, color,
}: {
  from:  "brand" | "user";
  text:  string;
  time:  string;
  color: string;
}) {
  const isBrand = from === "brand";
  return (
    <div className={`flex ${isBrand ? "justify-start" : "justify-end"}`}>
      <div
        className="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed"
        style={{
          background:          isBrand ? "rgba(255,255,255,0.06)" : `${color}18`,
          border:              `0.5px solid ${isBrand ? "rgba(255,255,255,0.08)" : `${color}35`}`,
          color:               isBrand ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.75)",
          fontFamily:          "'DM Sans', sans-serif",
          borderBottomLeftRadius:  isBrand ? "4px" : "16px",
          borderBottomRightRadius: isBrand ? "16px" : "4px",
        }}
      >
        {text}
        <span
          className="block text-right mt-1"
          style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)" }}
        >
          {time} {isBrand ? "✓✓" : ""}
        </span>
      </div>
    </div>
  );
}

function HexGrid() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.025 }}
    >
      <defs>
        <pattern
          id="hex"
          x="0" y="0"
          width="56" height="48"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="28,2 52,14 52,34 28,46 4,34 4,14"
            fill="none"
            stroke="#25D366"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}