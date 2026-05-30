"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "@/hook/useInView";
import { Cloud , Utensils } from "lucide-react";

// ── data ──────────────────────────────────────────────────────

const PRODUCTS = [
  {
    icon:  Cloud,
    tag:   "WhatsApp CRM",
    title: "WhatsApp CRM",
    desc:  "A complete WhatsApp API-powered CRM for D2C brands and growing businesses. Manage customer conversations, automate follow-ups, track orders, and close more sales — all from one platform.",
    href:  "/services/whatsapp-business-api",
  },
  {
    icon:  Utensils,
    tag:   "Restaurant OS",
    title: "Restaurant Operating System",
    desc:  "An all-in-one panel built exclusively for restaurants — combining marketing automation, customer engagement, and a full POS system. Everything a restaurant needs to run and grow, in one place.",
    href:  "/contact",
  },
];

// ══════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════

export default function AboutPage() {
  return (
    <main className="bg-zinc-950 min-h-screen overflow-x-hidden">

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── What We Offer ── */}
      <ProductsSection />

      {/* ── Who We Are ── */}
      <WhoWeAreSection />

      {/* ── Mission ── */}
      <MissionSection />

      
    </main>
  );
}

// ══════════════════════════════════════════════════════════════
//  HERO — "Built for Businesses That Mean Business"
// ══════════════════════════════════════════════════════════════

function HeroSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="relative py-32 px-6 border-b border-white/4 overflow-hidden">
      {/* Blob */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 w-150 h-150 rounded-full bg-orange-500/[0.07] blur-3xl" />
      {/* Grid */}
      
        

      <div className="relative max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">About Us</span>
        </div>

        {/* Heading */}
        <h1
          className={`font-black text-white text-8xl leading-[0.88] mb-8 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          
        >
          Built for businesses<br />
          that{" "}
          <span className="text-orange-500">mean</span>
          <span className="text-orange-500">business.</span>
        </h1>

        {/* Body */}
        <p
          className={`text-base md:text-lg text-white/45 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Handling Media is a SaaS company offering powerful software solutions for modern Indian businesses. We bring enterprise-grade tools to D2C brands, restaurants, and growing businesses — making them accessible, affordable, and easy to use.
        </p>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  WHAT WE OFFER
// ══════════════════════════════════════════════════════════════

function ProductsSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/4">
      <div className="max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">What We Offer</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.tag}
              className={`rounded-2xl border border-white/[0.07] bg-white/2 p-8
                hover:border-orange-500/30 hover:bg-orange-500/3 hover:-translate-y-1
                transition-all duration-300 group cursor-default
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 120 + 200}ms` }}
            >
              {/* Top accent line */}
              <div className="h-0.5 w-full bg-linear-to-r from-orange-500/60 to-transparent rounded-full mb-7
                scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <p.icon fill="#f97316" stroke="#fff" />
                </span>
                <h2
                  className="font-black text-white leading-tight"
                  style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "22px", letterSpacing: "-0.01em" }}
                >
                  {p.title}
                </h2>
              </div>

              <p className="text-sm text-white/45 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  WHO WE ARE
// ══════════════════════════════════════════════════════════════

function WhoWeAreSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-24 px-6 border-b border-white/4 bg-white/1">
      <div className="max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">Who We Are</span>
        </div>

        <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <p className="text-base md:text-lg text-white/45 max-w-2xl leading-relaxed">
            We are a product-first SaaS company focused on delivering software that fits the way Indian businesses actually operate. Our solutions are designed for speed, simplicity, and results — without the complexity of traditional enterprise tools.
          </p>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  MISSION
// ══════════════════════════════════════════════════════════════

function MissionSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">Our Mission</span>
        </div>

        {/* Large mission statement */}
        <h2
          className={`font-black text-6xl text-white leading-16 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          
        >
          To give every Indian business access to{" "}
          <span className="text-orange-500">software</span> that was previously only
          available to{" "}
          <span className="text-orange-500">
            large enterprises.
          </span>
        </h2>
      </div>
    </section>
  );
}