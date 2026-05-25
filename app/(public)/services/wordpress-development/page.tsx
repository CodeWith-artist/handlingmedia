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

const SITE_TYPES = [
  {
    icon: "🏪",
    title: "WooCommerce Stores",
    desc: "Full D2C stores with custom product pages, checkout flows, abandoned cart recovery and deep WhatsApp integration for order updates.",
    tags: ["WooCommerce", "Custom checkout", "WhatsApp alerts"],
    border: "border-orange-500/20",
    glow: "from-orange-500/10",
  },
  {
    icon: "🏢",
    title: "Business & Corporate Sites",
    desc: "Lead-generating corporate websites with custom post types, dynamic team pages, case studies and contact systems that feed your CRM.",
    tags: ["Lead gen", "Custom CPT", "CRM connect"],
    border: "border-blue-500/20",
    glow: "from-blue-500/10",
  },
  {
    icon: "📰",
    title: "News & Magazine Sites",
    desc: "High-performance editorial platforms with custom taxonomies, ad management, subscription paywalls and AMP-ready templates.",
    tags: ["Editorial", "Paywall", "AMP ready"],
    border: "border-purple-500/20",
    glow: "from-purple-500/10",
  },
  {
    icon: "🎓",
    title: "LMS & E-learning",
    desc: "LearnDash / LifterLMS builds with drip content, course certificates, quiz engines and payment gateway integrations.",
    tags: ["LearnDash", "Drip content", "Certificates"],
    border: "border-green-500/20",
    glow: "from-green-500/10",
  },
  {
    icon: "📋",
    title: "Membership Sites",
    desc: "Gated content platforms with tiered membership, recurring Stripe/Razorpay billing and exclusive member dashboards.",
    tags: ["Gated content", "Recurring billing", "Member portal"],
    border: "border-amber-500/20",
    glow: "from-amber-500/10",
  },
  {
    icon: "🏨",
    title: "Booking & Directory Sites",
    desc: "Appointment booking, property listings, job boards and local business directories — built on WordPress, scaled for thousands of listings.",
    tags: ["Booking system", "Listings", "Search & filter"],
    border: "border-cyan-500/20",
    glow: "from-cyan-500/10",
  },
];

const PROCESS = [
  {
    num: "01",
    icon: "🔍",
    title: "Discovery & Wireframe",
    desc: "We audit your goals, competitors and content structure. Every page is wireframed so the build has zero guesswork — you approve layout before design starts.",
    tags: ["Competitor audit", "Sitemap", "Wireframes"],
  },
  {
    num: "02",
    icon: "🎨",
    title: "Design System",
    desc: "A Figma design system built on your brand — typography, colour tokens, component library. Every page designed before a single line of PHP.",
    tags: ["Figma", "Brand system", "Component kit"],
  },
  {
    num: "03",
    icon: "🔨",
    title: "Custom Theme Dev",
    desc: "We build a fully custom WordPress theme — no bloated page builders, no Elementor lock-in. Clean PHP, ACF blocks and a Gutenberg-native editing experience.",
    tags: ["Custom theme", "ACF blocks", "No page builder"],
  },
  {
    num: "04",
    icon: "🔌",
    title: "Plugin & Integration",
    desc: "WooCommerce, WhatsApp API, CRM, payment gateways, analytics and every third-party tool your business needs — integrated cleanly and tested.",
    tags: ["WooCommerce", "WhatsApp API", "CRM sync"],
  },
  {
    num: "05",
    icon: "⚡",
    title: "Performance & SEO",
    desc: "Core Web Vitals optimised — lazy loading, image compression, caching layers and schema markup. We target 90+ PageSpeed on every build.",
    tags: ["90+ PageSpeed", "Core Web Vitals", "Schema markup"],
  },
  {
    num: "06",
    icon: "🚀",
    title: "Launch & Handover",
    desc: "Staging → production migration, DNS cutover, SSL, backup schedule and a live training session so your team can manage content independently.",
    tags: ["DNS migration", "SSL setup", "Training session"],
  },
];

const FEATURES = [
  { icon: "🧱", title: "Gutenberg-native blocks",   desc: "No Elementor dependency. Your editors get a fast, clean block editor they'll actually love." },
  { icon: "⚡", title: "90+ PageSpeed score",        desc: "Performance built in from day one — not bolted on as an afterthought." },
  { icon: "📱", title: "Mobile-first responsive",    desc: "Every breakpoint tested on real devices before handover." },
  { icon: "🔒", title: "Hardened security",          desc: "Role-based access, login protection, WAF rules and daily automated backups." },
  { icon: "🔍", title: "Technical SEO foundation",   desc: "Schema, sitemaps, canonical tags, Open Graph and structured data baked into the theme." },
  { icon: "♿", title: "WCAG 2.1 accessibility",     desc: "AA-compliant markup, ARIA labels and keyboard navigation — reach every user." },
  { icon: "🌐", title: "Multilingual ready",         desc: "WPML / Polylang compatible architecture for brands targeting multiple languages." },
  { icon: "⚙️", title: "Headless-ready API",         desc: "REST and GraphQL (WPGraphQL) endpoints for decoupled or hybrid Next.js setups." },
];

const TECH = [
  { cat: "CMS",       items: ["WordPress 6.x", "Custom themes", "ACF Pro", "Gutenberg"] },
  { cat: "E-commerce",items: ["WooCommerce", "Razorpay", "Stripe", "PayU"] },
  { cat: "SEO",       items: ["Rank Math", "Schema Pro", "Core Web Vitals", "Sitemaps"] },
  { cat: "Caching",   items: ["WP Rocket", "Redis", "Cloudflare", "CDN setup"] },
  { cat: "Integrations",items:["WhatsApp API","HubSpot","Mailchimp","Zapier"] },
  { cat: "Hosting",   items: ["AWS Lightsail", "Kinsta", "Cloudways", "WP Engine"] },
];

const FAQS = [
  {
    q: "Why custom theme instead of a premium theme like Avada?",
    a: "Premium themes ship with 200+ features you'll never use, bloating load time and creating update dependency. A custom theme contains exactly what your site needs — nothing more. Result: 3× faster, 100% maintainable.",
  },
  {
    q: "Will I be able to edit content myself after launch?",
    a: "Yes — that's a core deliverable. We build a Gutenberg block editor experience so your team can create and edit pages without touching code. We also provide a live training session and documentation.",
  },
  {
    q: "Can you migrate my existing WordPress site?",
    a: "Absolutely. We handle full migrations — database, media, plugins, redirects and DNS cutover — with zero downtime using staging environments.",
  },
  {
    q: "Do you build WooCommerce stores?",
    a: "Yes, it's one of our most common builds. We do custom product pages, checkout flows, abandoned cart recovery, WhatsApp order notifications and payment gateway integrations for the Indian market.",
  },
  {
    q: "How long does a WordPress project take?",
    a: "A business website takes 4–6 weeks. A WooCommerce store is 6–10 weeks. Custom plugins or complex membership/LMS platforms are 10–16 weeks. We'll scope it precisely on the discovery call.",
  },
  {
    q: "What does it cost?",
    a: "Business websites start from ₹80,000. WooCommerce stores from ₹1.5 Lakhs. Custom platforms from ₹2.5 Lakhs. All quoted fixed-price — no hourly billing surprises.",
  },
];

const STATS = [
  { value: "80+",   label: "WordPress sites built" },
  { value: "90+",   label: "Avg. PageSpeed score"  },
  { value: "4wk",   label: "Avg. delivery time"    },
  { value: "100%",  label: "Client code ownership" },
];

// ── page ──────────────────────────────────────────────────────
export default function WordPressPage() {
  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <HeroSection />
      <StatsBar />
      <SiteTypesSection />
      <FeaturesSection />
      <ProcessSection />
      <TechSection />
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
  const [m, setM] = useState(false);
  useEffect(() => { const t = setTimeout(() => setM(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24 px-6">
      {/* Blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/[0.06] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-orange-500/[0.06] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-orange-500/[0.03] blur-3xl" />
      </div>
      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
      {/* Ghost text */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span className="font-black text-transparent whitespace-nowrap"
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(100px,20vw,280px)", WebkitTextStroke: "1px rgba(249,115,22,0.045)", letterSpacing: "-0.04em" }}>
          WORDPRESS
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Pill */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-10 transition-all duration-700 ${m ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="text-base">🔷</span>
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400">WordPress Development</span>
        </div>

        {/* H1 */}
        <h1
          className={`font-black text-white leading-[0.88] mb-8 transition-all duration-700 delay-100 ${m ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(52px,9.5vw,116px)", letterSpacing: "-0.028em" }}
        >
          WordPress that's<br />
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>fast,</span>{" "}
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>flexible</span><br />
          and <span className="text-orange-500">fully yours.</span>
        </h1>

        {/* Sub */}
        <p className={`text-base md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-200 ${m ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Custom themes, no page builder lock-in, 90+ PageSpeed and handover training included —
          WordPress done the way it was meant to be done.
        </p>

        {/* CTAs */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-14 transition-all duration-700 delay-300 ${m ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link href="/contact?service=wordpress-development"
            className="group relative overflow-hidden inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-black text-white bg-orange-500 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-200 shadow-[0_8px_32px_rgba(249,115,22,0.35)]"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "17px" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">GET A FREE QUOTE</span>
            <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link href="#process"
            className="inline-flex items-center gap-2 rounded-2xl px-10 py-4 font-black text-white/40 border border-white/10 hover:border-white/25 hover:text-white/70 hover:-translate-y-0.5 transition-all duration-200"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "17px" }}
          >
            SEE OUR PROCESS
          </Link>
        </div>

        {/* WP logo badge */}
        <div className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-400 ${m ? "opacity-100" : "opacity-0"}`}>
          {["WordPress 6.x", "WooCommerce", "ACF Pro", "Gutenberg", "Headless ready", "WhatsApp API"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs text-white/40 hover:border-orange-500/30 hover:text-white/60 transition-all duration-200">
              {tag}
            </span>
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
            style={{ transitionDelay: `${i * 100}ms` }}>
            <p className="font-black text-orange-500 leading-none mb-1"
              style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "44px", letterSpacing: "-0.02em" }}>
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
//  SITE TYPES
// ══════════════════════════════════════════════════════════════
function SiteTypesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);
  return (
    <section ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <Eyebrow label="What we build" visible={v} />
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-black text-white leading-[0.9] max-w-lg"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(38px,5.5vw,68px)", letterSpacing: "-0.025em" }}>
            Every WordPress<br />
            <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>use case.</span>{" "}
            One team.
          </h2>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed lg:text-right">
            From simple business sites to complex multi-vendor platforms — we've built them all.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITE_TYPES.map((s, i) => (
            <div key={s.title}
              className={`group relative rounded-2xl border ${s.border} bg-gradient-to-b ${s.glow} to-white/[0.01] p-7 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-default ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-4xl mb-5 block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">{s.icon}</span>
              <h3 className="font-black text-white mb-3 leading-tight"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "21px", letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/30 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 group-hover:text-orange-400 transition-all duration-300">
                    {t}
                  </span>
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
//  FEATURES
// ══════════════════════════════════════════════════════════════
function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);
  return (
    <section ref={ref} className="py-24 px-6 bg-white/[0.01] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <Eyebrow label="What's included" visible={v} />
        <h2
          className={`font-black text-white leading-[0.9] mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(38px,5.5vw,68px)", letterSpacing: "-0.025em" }}>
          Every build ships<br />
          <span className="text-orange-500">with these.</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={f.title}
              className={`group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-orange-500/35 hover:bg-orange-500/[0.04] hover:-translate-y-1 transition-all duration-300 cursor-default ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 60 + 200}ms` }}>
              <span className="text-3xl mb-4 block transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">{f.icon}</span>
              <h3 className="font-black text-white mb-2 text-[16px] leading-tight group-hover:text-orange-100 transition-colors duration-200"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "-0.01em" }}>
                {f.title}
              </h3>
              <p className="text-xs text-white/38 leading-relaxed">{f.desc}</p>
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
        <Eyebrow label="Our process" visible={v} />
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-black text-white leading-[0.9]"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(38px,5.5vw,68px)", letterSpacing: "-0.025em" }}>
            How we build your<br />
            <span className="text-orange-500">WordPress site.</span>
          </h2>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed lg:text-right">
            Transparent 6-step process — you have visibility at every stage.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PROCESS.map((step, i) => (
            <button key={step.num} onClick={() => setActive(i)}
              className={`text-left rounded-2xl border p-6 transition-all duration-300 ${active === i ? "border-orange-500/45 bg-orange-500/[0.05] -translate-y-1 shadow-[0_8px_32px_rgba(249,115,22,0.1)]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.03]"} ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}>
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${active === i ? "bg-orange-500/20 border border-orange-500/40 scale-110 -rotate-3" : "bg-white/[0.04] border border-white/[0.08]"}`}>
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
                  <span key={tag} className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all duration-300 ${active === i ? "bg-orange-500/15 text-orange-400 border border-orange-500/30" : "bg-white/[0.04] text-white/25 border border-white/[0.07]"}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="max-w-xs mx-auto text-center">
          <div className="h-px bg-white/[0.06] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-orange-500 rounded-full transition-all duration-700"
              style={{ width: `${((active + 1) / PROCESS.length) * 100}%` }} />
          </div>
          <p className="text-xs text-white/20">Step {active + 1} of {PROCESS.length}</p>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  TECH
// ══════════════════════════════════════════════════════════════
function TechSection() {
  const ref = useRef<HTMLDivElement>(null);
  const v   = useInView(ref as React.RefObject<Element>);
  return (
    <section ref={ref} className="py-24 px-6 bg-white/[0.01] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <Eyebrow label="Tech stack" visible={v} />
        <h2
          className={`font-black text-white leading-[0.9] mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(38px,5.5vw,68px)", letterSpacing: "-0.025em" }}>
          Tools we use.<br />
          <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>Outcomes</span>{" "}
          you keep.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TECH.map((cat, ci) => (
            <div key={cat.cat}
              className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-orange-500/25 hover:bg-orange-500/[0.03] transition-all duration-300 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${ci * 80 + 200}ms` }}>
              <p className="text-[10px] font-black text-orange-500/65 uppercase tracking-[0.18em] mb-4"
                style={{ fontFamily: "'Barlow Condensed',sans-serif" }}>
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
        <Eyebrow label="FAQ" visible={v} center />
        <h2
          className={`font-black text-white text-center leading-[0.9] mb-16 transition-all duration-700 delay-100 ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.025em" }}>
          The questions we<br />
          <span className="text-orange-500">always get asked.</span>
        </h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i}
              className={`rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer ${open === i ? "border-orange-500/30 bg-orange-500/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"} ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
              onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between px-6 py-4 gap-4">
                <p className={`font-semibold text-sm transition-colors duration-200 ${open === i ? "text-white" : "text-white/55"}`}>
                  {faq.q}
                </p>
                <span className={`text-orange-500 text-xl font-black flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : "rotate-0"}`}>+</span>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-56" : "max-h-0"}`}>
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
//  CTA
// ══════════════════════════════════════════════════════════════


// ── shared eyebrow ────────────────────────────────────────────
function Eyebrow({ label, visible, center }: { label: string; visible: boolean; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-6 transition-all duration-700 ${center ? "justify-center" : ""} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="h-px w-10 bg-orange-500" />
      <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">{label}</span>
      {center && <div className="h-px w-10 bg-orange-500" />}
    </div>
  );
}