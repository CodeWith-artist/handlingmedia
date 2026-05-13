"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── exact data from your nav config ──────────────────────────

const SERVICES = [
  {
    href:    "/services/web-development",
    title:   "Custom Website Development",
    icon:    "🌐",
    number:  "02",
    tagline: "Fast, modern, built to convert.",
    desc:    "Bespoke websites engineered in Next.js — pixel-perfect design, blazing performance and seamless CMS integrations.",
    pills:   ["Next.js", "CMS ready", "SEO optimised"],
  },
  {
    href:    "/services/app-development",
    title:   "Mobile App Development",
    icon:    "📱",
    number:  "03",
    tagline: "iOS & Android. One codebase.",
    desc:    "Cross-platform mobile apps with native-feel UX, offline support and backend API integration from day one.",
    pills:   ["React Native", "iOS & Android", "API-first"],
  },
  {
    href:    "/services/shopify-development",
    title:   "Shopify Development",
    icon:    "🛒",
    number:  "04",
    tagline: "Store built to sell.",
    desc:    "Custom Shopify themes, app integrations and conversion-optimised checkout flows for D2C brands.",
    pills:   ["Custom theme", "App integrations", "D2C focused"],
  },
  {
    href:    "/services/wordpress-development",
    title:   "WordPress Development",
    icon:    "✏️",
    number:  "05",
    tagline: "Flexible. Scalable. Yours.",
    desc:    "Tailored WordPress builds — custom blocks, WooCommerce, membership systems and everything in between.",
    pills:   ["WooCommerce", "Custom blocks", "Membership"],
  },
  {
    href:    "/services/ui-ux-design",
    title:   "UI / UX Design",
    icon:    "🎨",
    number:  "06",
    tagline: "Design that drives action.",
    desc:    "Research-led UI/UX — wireframes, prototypes and high-fidelity Figma designs that turn visitors into customers.",
    pills:   ["Figma", "Prototyping", "User research"],
  },
];

const SOLUTIONS = [
  {
    href:    "/solutions/crm-automation",
    title:   "CRM & Automation",
    icon:    "⚙️",
    number:  "01",
    tagline: "Automate the grind.",
    desc:    "End-to-end CRM setup and workflow automation — leads captured, nurtured and closed without manual effort.",
    pills:   ["Lead capture", "Workflows", "Auto follow-up"],
  },
  {
    href:    "/solutions/ecommerce",
    title:   "E-commerce Solutions",
    icon:    "🛍️",
    number:  "02",
    tagline: "Sell more. Return less.",
    desc:    "Full-stack e-commerce builds — catalogue, payments, logistics and post-purchase experience, all connected.",
    pills:   ["Payments", "Logistics", "Post-purchase"],
  },
  {
    href:    "/solutions/booking-systems",
    title:   "Booking & Appointment",
    icon:    "📅",
    number:  "03",
    tagline: "Zero no-shows.",
    desc:    "Smart booking platforms with automated reminders, calendar sync and payment collection built in.",
    pills:   ["Calendar sync", "Auto reminders", "Payments"],
  },
  {
    href:    "/solutions/business-websites",
    title:   "Business Websites",
    icon:    "🏢",
    number:  "04",
    tagline: "Your brand, online.",
    desc:    "Professional business websites that establish credibility, generate enquiries and rank on Google.",
    pills:   ["Lead gen", "SEO ready", "Fast delivery"],
  },
];

const WHATSAPP_SOLUTIONS = [
  {
    href:    "/services/whatsapp-business-api",
    title:   "WhatsApp Business API",
    icon:    "📱" , 
    number:  "01",
    tagline: "Connect with customers on WhatsApp.",
    desc:    "Official WhatsApp API integration for customer engagement, support and retention at scale.",
    pills:   ["Customer chat", "Notifications", "Automation"], 
  },
  {
    href:    "/services/chatbot-automation",
    title:   "Chatbot Automation",
    icon:    "🤖",
    number:  "02",
    tagline: "Automate conversations, 24/7.",
    desc:    "Intelligent WhatsApp chatbots that handle FAQs, lead qualification and customer support without human intervention.",
    pills:   ["Lead qualification", "Customer support", "24/7 availability"],
  },
  {
    href:    "/services/crm-integration",
    title:   "CRM Integration",
    icon:    "📊",
    number:  "03",
    tagline: "Sync WhatsApp with your CRM.",
    desc:    "Seamless integration of WhatsApp Business API with your CRM for unified customer data and streamlined workflows.",
    pills:   ["Unified customer data", "Streamlined workflows", "Enhanced engagement"],
  },
];

// ── intersection hook ─────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
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
  return { ref, visible };
}

// ── main export ───────────────────────────────────────────────

export default function ServicesSection() {
  const [tab, setTab] = useState<"whatsapp" | "solutions" | "services">("whatsapp");
  const { ref, visible } = useInView();
  const items = tab === "whatsapp" ? WHATSAPP_SOLUTIONS : tab === "solutions" ? SOLUTIONS : SERVICES;

  return (
    <section
      ref={ref}
      className="relative bg-[#080808] overflow-hidden py-24 border-t border-white/3"
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
      />

      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-225 h-100"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(249,115,22,0.11) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div
          className="mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-orange-500" />
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-orange-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              What we do
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl md:text-6xl font-black text-white leading-[0.93] max-w-xl"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
            >
              Everything your<br />
              brand needs to{" "}
              <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
                grow
              </span>
            </h2>
            <p
              className="text-white/35 text-sm max-w-xs leading-relaxed lg:text-right"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              From WhatsApp automation to custom apps — every service under one roof, zero handoffs.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div
          className="flex gap-2 mb-10 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
        >
          {(["whatsapp", "solutions", "services"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2.5 rounded-xl font-black transition-all duration-200"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "0.07em",
                fontSize:      "14px",
                background:    tab === t ? "#f97316"                   : "rgba(255,255,255,0.04)",
                color:         tab === t ? "#fff"                      : "rgba(255,255,255,0.35)",
                border:        tab === t ? "none"                      : "0.5px solid rgba(255,255,255,0.09)",
              }}
            >
              {
                t === "whatsapp"
                    ? "WHATSAPP SOLUTIONS"
                    : t === "services"
                    ? "SERVICES"
                    : "SOLUTIONS"
                }

                <span className="ml-1.5 opacity-60 text-xs">
                (
                {t === "whatsapp"
                    ? WHATSAPP_SOLUTIONS.length
                    : t === "services"
                    ? SERVICES.length
                    : SOLUTIONS.length}
                )
                </span>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div
          key={tab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14"
        >
          {items.map((item, i) => (
            <ServiceCard key={item.href} item={item} index={i} visible={visible} />
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="rounded-2xl border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500"
          style={{
            opacity:   visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div>
            <p
              className="text-2xl md:text-3xl font-black text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Not sure what you need?
            </p>
            <p
              className="text-white/35 text-sm mt-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Tell us your goal — we'll pick the right stack for you.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 flex-wrap">
            <Link
              href="/contact"
              className="rounded-xl px-7 py-3 font-black text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background:    "#f97316",
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "0.07em",
                fontSize:      "15px",
              }}
            >
              GET A FREE CALL →
            </Link>
            <Link
              href="/portfolio"
              className="rounded-xl px-7 py-3 font-black text-white/45 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                letterSpacing: "0.07em",
                fontSize:      "15px",
              }}
            >
              SEE OUR WORK
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}

// ── service card ──────────────────────────────────────────────

function ServiceCard({
  item,
  index,
  visible,
}: {
  item: typeof SERVICES[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      className="relative rounded-2xl border overflow-hidden block"
      style={{
        borderColor:        hovered ? "rgba(249,115,22,0.45)" : "rgba(255,255,255,0.06)",
        background:         hovered ? "rgba(249,115,22,0.045)" : "rgba(255,255,255,0.02)",
        opacity:            visible ? 1 : 0,
        transform:          visible
          ? hovered ? "translateY(-4px)" : "translateY(0px)"
          : "translateY(28px)",
        transitionDelay:    visible ? `${index * 65 + 150}ms` : "0ms",
        transitionProperty: "opacity, transform, border-color, background",
        transitionDuration: "350ms",
        transitionTimingFunction: "ease-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, #f97316, transparent)",
          opacity:    hovered ? 1 : 0,
        }}
      />

      {/* Corner glow */}
      <div
        aria-hidden
        className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.22), transparent 70%)",
          opacity:    hovered ? 1 : 0,
        }}
      />

      <div className="relative p-6">
        {/* Icon + number row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300"
            style={{
              background: hovered ? "rgba(249,115,22,0.18)" : "rgba(255,255,255,0.04)",
              border:     `1px solid ${hovered ? "rgba(249,115,22,0.45)" : "rgba(255,255,255,0.08)"}`,
              transform:  hovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)",
            }}
          >
            {item.icon}
          </div>
          <span
            className="transition-colors duration-300"
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      "12px",
              fontWeight:    900,
              letterSpacing: "0.1em",
              color:         hovered ? "#f97316" : "rgba(255,255,255,0.1)",
            }}
          >
            {item.number}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-white font-black mb-1 leading-tight"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "20px",
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </h3>

        {/* Tagline */}
        <p
          className="text-xs font-semibold mb-3 transition-colors duration-200"
          style={{
            color:         hovered ? "#f97316" : "rgba(249,115,22,0.5)",
            letterSpacing: "0.04em",
            fontFamily:    "'DM Sans', sans-serif",
          }}
        >
          {item.tagline}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {item.desc}
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.pills.map((pill) => (
            <span
              key={pill}
              className="text-xs px-3 py-1 rounded-full transition-all duration-200"
              style={{
                background: hovered ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.04)",
                border:     `0.5px solid ${hovered ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.09)"}`,
                color:      hovered ? "#f97316" : "rgba(255,255,255,0.3)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Learn more — slides in on hover */}
        <div
          className="flex items-center gap-2 text-xs font-bold transition-all duration-200 overflow-hidden"
          style={{
            color:         "#f97316",
            opacity:       hovered ? 1 : 0,
            maxHeight:     hovered ? "20px" : "0px",
            letterSpacing: "0.08em",
            fontFamily:    "'DM Sans', sans-serif",
          }}
        >
          LEARN MORE →
        </div>
      </div>
    </Link>
  );
} 