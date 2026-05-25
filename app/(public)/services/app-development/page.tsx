"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── intersection hook ─────────────────────────────────────────
function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return v;
}

// ── data ──────────────────────────────────────────────────────

const PLATFORMS = [
  { icon: "📱", label: "iOS",           sub: "Swift & SwiftUI"       },
  { icon: "🤖", label: "Android",       sub: "Kotlin & Jetpack"      },
  { icon: "⚛️",  label: "React Native", sub: "Cross-platform"        },
  { icon: "🦋", label: "Flutter",       sub: "Dart — one codebase"   },
  { icon: "🌐", label: "PWA",           sub: "Web-first apps"        },
  { icon: "🖥️", label: "Desktop",       sub: "Electron / Tauri"      },
];

const PROCESS = [
  {
    num: "01",
    title: "Discovery & Scoping",
    desc: "We map your idea into a concrete spec — user flows, core features, tech stack decision and a realistic timeline. You see the full roadmap before a single line of code.",
    icon: "🔍",
    tags: ["User flows", "Tech audit", "MVP scope"],
  },
  {
    num: "02",
    title: "UI / UX Design",
    desc: "High-fidelity Figma prototypes for every screen. Clickable, testable, stakeholder-ready. We validate before we build so you never pay for a redesign.",
    icon: "🎨",
    tags: ["Figma prototype", "Design system", "User testing"],
  },
  {
    num: "03",
    title: "Agile Development",
    desc: "2-week sprints. Working builds every fortnight. You test on your real device, give feedback, and see progress — not PowerPoint updates.",
    icon: "⚡",
    tags: ["2-week sprints", "CI/CD pipeline", "Daily standups"],
  },
  {
    num: "04",
    title: "QA & Testing",
    desc: "Automated tests, manual regression, performance profiling and real-device testing across 20+ device/OS combinations before we ship a single build.",
    icon: "🧪",
    tags: ["20+ devices", "Auto testing", "Performance QA"],
  },
  {
    num: "05",
    title: "Launch & Store",
    desc: "App Store and Play Store submission handled end-to-end — screenshots, metadata, ASO keywords and review liaison. We get it live, you take the credit.",
    icon: "🚀",
    tags: ["ASO optimised", "Store submission", "Review liaison"],
  },
  {
    num: "06",
    title: "Support & Scale",
    desc: "Post-launch monitoring, crash reporting, OS update compatibility and feature sprints. We stay on retainer so you're never blocked waiting for a dev.",
    icon: "📈",
    tags: ["Crash monitoring", "OS updates", "Feature retainer"],
  },
];

const APP_TYPES = [
  {
    icon: "🛒",
    title: "E-commerce Apps",
    desc: "Native shopping experiences with seamless checkout, push notifications for cart recovery and deep-link campaigns that convert.",
    colour: "from-orange-500/20 to-orange-500/0",
    border: "border-orange-500/25",
  },
  {
    icon: "💬",
    title: "WhatsApp-Integrated Apps",
    desc: "CRM-connected apps that trigger WhatsApp messages, chatbot flows and order alerts — your existing API investment, amplified.",
    colour: "from-green-500/15 to-green-500/0",
    border: "border-green-500/20",
  },
  {
    icon: "📅",
    title: "Booking & Appointment Apps",
    desc: "End-to-end booking with calendar sync, payment collection, automated reminders and a real-time availability engine.",
    colour: "from-blue-500/15 to-blue-500/0",
    border: "border-blue-500/20",
  },
  {
    icon: "🏋️",
    title: "D2C & Subscription Apps",
    desc: "Branded apps that lock in loyalty — subscription management, gamified streaks, referral engines and in-app purchase flows.",
    colour: "from-purple-500/15 to-purple-500/0",
    border: "border-purple-500/20",
  },
  {
    icon: "🏢",
    title: "Enterprise & Internal Tools",
    desc: "Field-force apps, internal dashboards, approval workflows and ERP extensions that replace spreadsheets and WhatsApp groups.",
    colour: "from-amber-500/15 to-amber-500/0",
    border: "border-amber-500/20",
  },
  {
    icon: "🌐",
    title: "SaaS & Marketplace Apps",
    desc: "Multi-tenant platforms with role-based access, Stripe billing, admin panels and the API infrastructure to scale from 100 to 100k users.",
    colour: "from-cyan-500/15 to-cyan-500/0",
    border: "border-cyan-500/20",
  },
];

const TECH_STACK = [
  { cat: "Mobile",   items: ["React Native", "Flutter", "Swift", "Kotlin"]            },
  { cat: "Backend",  items: ["Node.js", "Next.js", "PostgreSQL", "MySQL"]             },
  { cat: "Cloud",    items: ["AWS", "Firebase", "Supabase", "Vercel"]                 },
  { cat: "DevOps",   items: ["GitHub Actions", "Docker", "CI/CD", "Sentry"]          },
  { cat: "Payments", items: ["Razorpay", "Stripe", "PayU", "UPI Deep Links"]         },
  { cat: "Messaging",items: ["WhatsApp API", "FCM Push", "Twilio", "OneSignal"]      },
];

const FAQS = [
  {
    q: "How much does an app cost?",
    a: "A well-scoped MVP typically runs ₹3–8 Lakhs depending on features, platforms and integrations. We send a fixed-price quote after a free discovery call — no hourly billing surprises.",
  },
  {
    q: "How long does it take to build an app?",
    a: "A focused MVP is 8–14 weeks. Full-featured apps are 16–24 weeks. We'll give you a realistic timeline in the scope doc — not one designed to win the pitch.",
  },
  {
    q: "Do you build for both iOS and Android?",
    a: "Yes. For most budgets we recommend React Native or Flutter — a single codebase that ships native-quality apps on both platforms simultaneously, cutting cost by ~40%.",
  },
  {
    q: "Do I own the source code?",
    a: "100%. On project completion you receive full source code, repo access and all design files. No lock-in, no licensing fees.",
  },
  {
    q: "Can you integrate WhatsApp into our app?",
    a: "Absolutely — it's one of our specialities. We connect the official WhatsApp Business API so your app can send order alerts, OTPs, re-engagement messages and support chats natively.",
  },
  {
    q: "What happens after launch?",
    a: "We offer monthly retainer plans from ₹15,000/month covering OS compatibility updates, crash monitoring, minor feature additions and App Store / Play Store maintenance.",
  },
];

const STATS = [
  { value: "50+",   label: "Apps shipped"        },
  { value: "4.8★",  label: "Avg. store rating"   },
  { value: "99.2%", label: "Crash-free sessions"  },
  { value: "14wk",  label: "Avg. MVP timeline"    },
];

// ── page ──────────────────────────────────────────────────────

export default function AppDevelopmentPage() {
  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <HeroSection />
      <StatsBar />
      <PlatformsSection />
      <AppTypesSection />
      <ProcessSection />
      <TechStackSection />
      <FaqSection />
      

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </main>
  );
}

// ══════════════════════════════════════════════════════════════
//  HERO
// ══════════════════════════════════════════════════════════════

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 px-6">

      {/* Blurred blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-500/8 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-orange-500/8       blur-3xl" />
      </div>

      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

      {/* Ghost text */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span className="font-black text-transparent whitespace-nowrap"
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(120px,22vw,300px)", WebkitTextStroke: "1px rgba(249,115,22,0.05)", letterSpacing: "-0.04em" }}>
          BUILD
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Pill */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400">Mobile App Development</span>
        </div>

        {/* H1 */}
        <h1
          className={`font-black text-white leading-[0.88] mb-8 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(54px,10vw,120px)", letterSpacing: "-0.028em" }}
        >
          Your idea deserves<br />
          an app that{" "}
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
            actually
          </span>
          <br />
          <span className="text-orange-500">works.</span>
        </h1>

        {/* Sub */}
        <p className={`text-base md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          We design and build iOS, Android and cross-platform apps that users love and businesses rely on — from ₹3 Lakh MVPs to enterprise-scale platforms.
        </p>

        {/* CTAs */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link href="/contact?service=app-development"
            className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-black text-white bg-orange-500 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-200 shadow-[0_8px_32px_rgba(249,115,22,0.35)]"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "17px" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">GET A FREE QUOTE</span>
            <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link href="#process"
            className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-black text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70 hover:-translate-y-0.5 transition-all duration-200"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "17px" }}
          >
            SEE HOW IT WORKS
          </Link>
        </div>

        {/* Platform icons strip */}
        <div className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}>
          {PLATFORMS.map((p) => (
            <div key={p.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-orange-500/30 hover:bg-orange-500/[0.04] transition-all duration-200">
              <span className="text-lg">{p.icon}</span>
              <div>
                <p className="text-xs font-bold text-white/70 leading-none">{p.label}</p>
                <p className="text-[9px] text-white/30 mt-0.5">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  STATS BAR
// ══════════════════════════════════════════════════════════════

function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);

  return (
    <div ref={ref} className="border-y border-white/[0.05] bg-white/[0.015]">
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s, i) => (
          <div key={s.label}
            className={`text-center transition-all duration-700 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <p className="font-black text-orange-500 leading-none mb-1"
              style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "42px", letterSpacing: "-0.02em" }}>
              {s.value}
            </p>
            <p className="text-[11px] text-white/30 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  PLATFORMS
// ══════════════════════════════════════════════════════════════

function PlatformsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <SectionEyebrow label="Platforms" visible={v} />
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <h2
            className={`font-black text-white leading-[0.9] transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-0.025em" }}
          >
            One team.<br />Every platform.
          </h2>
          <p className={`text-sm text-white/35 max-w-xs leading-relaxed lg:text-right transition-all duration-700 delay-200 ${v ? "opacity-100" : "opacity-0"}`}>
            We pick the right tech for your budget and audience — not the one that's easiest for us.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PLATFORMS.map((p, i) => (
            <div key={p.label}
              className={`group flex flex-col items-center gap-3 py-8 px-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]
                hover:border-orange-500/40 hover:bg-orange-500/[0.05] transition-all duration-300 cursor-default
                ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 70 + 200}ms` }}
            >
              <span className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">{p.icon}</span>
              <div className="text-center">
                <p className="font-black text-white text-sm" style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.02em" }}>{p.label}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  APP TYPES
// ══════════════════════════════════════════════════════════════

function AppTypesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-24 px-6 bg-white/[0.01] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <SectionEyebrow label="What we build" visible={v} />
        <h2
          className={`font-black text-white leading-[0.9] mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-0.025em" }}
        >
          Apps for every<br />
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
            business model.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {APP_TYPES.map((a, i) => (
            <div key={a.title}
              className={`group relative rounded-2xl border ${a.border} bg-gradient-to-b ${a.colour} to-white/[0.01]
                p-7 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default
                ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="text-4xl mb-5 block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">{a.icon}</span>
              <h3 className="font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "22px", letterSpacing: "-0.01em" }}>
                {a.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">{a.desc}</p>

              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-orange-500/60 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                LEARN MORE →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  PROCESS
// ══════════════════════════════════════════════════════════════

function ProcessSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const v      = useInView(ref as React.RefObject<Element>);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!v) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PROCESS.length), 3200);
    return () => clearInterval(t);
  }, [v]);

  return (
    <section id="process" ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <SectionEyebrow label="How we work" visible={v} />
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <h2
            className={`font-black text-white leading-[0.9] transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-0.025em" }}
          >
            From idea to app<br />
            <span className="text-orange-500">in 6 steps.</span>
          </h2>
          <p className={`text-sm text-white/35 max-w-xs leading-relaxed lg:text-right transition-all duration-700 delay-200 ${v ? "opacity-100" : "opacity-0"}`}>
            A proven process refined across 50+ shipped apps. No black boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESS.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActive(i)}
              className={`text-left rounded-2xl border p-6 transition-all duration-300
                ${active === i
                  ? "border-orange-500/45 bg-orange-500/[0.05] -translate-y-1"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/12"
                }
                ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {/* Number + icon */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                  ${active === i ? "bg-orange-500/20 border border-orange-500/40 scale-110 -rotate-3" : "bg-white/[0.04] border border-white/[0.08]"}`}>
                  {step.icon}
                </div>
                <span className={`font-black text-sm transition-colors duration-300 ${active === i ? "text-orange-500" : "text-white/15"}`}
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em" }}>
                  {step.num}
                </span>
              </div>

              <h3 className="font-black text-white mb-2 leading-tight"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "19px", letterSpacing: "-0.01em" }}>
                {step.title}
              </h3>
              <p className="text-xs text-white/38 leading-relaxed mb-4">{step.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span key={tag} className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all duration-300
                    ${active === i ? "bg-orange-500/15 text-orange-400 border border-orange-500/30" : "bg-white/[0.04] text-white/25 border border-white/[0.07]"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-10 max-w-sm mx-auto">
          <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${((active + 1) / PROCESS.length) * 100}%` }} />
          </div>
          <p className="text-center text-xs text-white/20 mt-2">Step {active + 1} of {PROCESS.length}</p>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  TECH STACK
// ══════════════════════════════════════════════════════════════

function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-24 px-6 bg-white/[0.01] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <SectionEyebrow label="Tech stack" visible={v} />
        <h2
          className={`font-black text-white leading-[0.9] mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(40px,6vw,72px)", letterSpacing: "-0.025em" }}
        >
          Modern tools.<br />
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>Battle-tested</span> results.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECH_STACK.map((cat, ci) => (
            <div key={cat.cat}
              className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-700
                ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${ci * 80 + 200}ms` }}
            >
              <p className="text-[10px] font-black text-orange-500/70 uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.18em" }}>
                {cat.cat}
              </p>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-orange-500/50 flex-shrink-0" />
                    <span className="text-xs text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  FAQ
// ══════════════════════════════════════════════════════════════

function FaqSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const v      = useInView(ref as React.RefObject<Element>);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-3xl mx-auto">
        <SectionEyebrow label="FAQ" visible={v} center />
        <h2
          className={`font-black text-white text-center leading-[0.9] mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.025em" }}
        >
          Questions we get<br />
          <span className="text-orange-500">every week.</span>
        </h2>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={`rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer
                ${open === i ? "border-orange-500/30 bg-orange-500/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"}
                ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between px-6 py-4 gap-4">
                <p className={`font-semibold text-sm transition-colors duration-200 ${open === i ? "text-white" : "text-white/55"}`}>
                  {faq.q}
                </p>
                <span className={`text-orange-500 text-xl font-black flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : "rotate-0"}`}>+</span>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-48" : "max-h-0"}`}>
                <p className="px-6 pb-5 text-sm text-white/40 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  FINAL CTA
// ══════════════════════════════════════════════════════════════

function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-28 px-6 border-t border-white/[0.04] relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="font-black text-transparent whitespace-nowrap"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(100px,18vw,260px)", WebkitTextStroke: "1px rgba(249,115,22,0.05)", letterSpacing: "-0.04em" }}>
            SHIP IT
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-orange-500/[0.08] blur-3xl" />
      </div>

      <div className={`relative max-w-3xl mx-auto text-center transition-all duration-1000 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-orange-500/70 mb-8">
          Ready to build?
        </p>
        <h2
          className="font-black text-white leading-[0.88] mb-6"
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(52px,9vw,108px)", letterSpacing: "-0.025em" }}
        >
          Your app.<br />
          Our{" "}
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>obsession.</span>
        </h2>
        <p className="text-white/38 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12">
          Book a free 30-minute discovery call. We'll scope your project, recommend a tech stack and tell you exactly what it'll cost — no fluff.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/contact?service=app-development"
            className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-black text-white bg-orange-500 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-200 shadow-[0_8px_40px_rgba(249,115,22,0.35)]"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "17px" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">BOOK FREE DISCOVERY CALL</span>
            <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20build%20an%20app"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-black transition-all duration-200 hover:-translate-y-0.5 border border-green-500/25 bg-green-500/[0.05] text-green-400 hover:border-green-500/40 hover:bg-green-500/[0.09]"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "17px" }}
          >
            💬 WHATSAPP US
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {["✦ Free 30-min call", "✦ Fixed-price quotes", "✦ You own the code", "✦ Post-launch support"].map((t) => (
            <span key={t} className="text-xs text-white/20">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── shared eyebrow ────────────────────────────────────────────

function SectionEyebrow({ label, visible, center }: { label: string; visible: boolean; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${center ? "justify-center" : ""} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="h-px w-10 bg-orange-500" />
      <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">
        {label}
      </span>
      {center && <div className="h-px w-10 bg-orange-500" />}
    </div>
  );
}