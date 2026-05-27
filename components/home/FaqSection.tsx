// components/sections/FaqSection.tsx
"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hook/useInView";
import Link from "next/link";

const FAQS = [
  {
    icon: "💬",
    q: "How does your AI WhatsApp automation work?",
    a: "Our AI WhatsApp automation works by integrating with the WhatsApp Business API. We train a custom AI agent on your business data, products, and common customer inquiries. This agent then handles customer conversations, provides information, captures leads, and processes orders automatically, 24/7.",
  },
  {
    icon: "🛠️",
    q: "Do I need technical knowledge to use your DIY platform?",
    a: "No technical knowledge is required. Our DIY platform has a user-friendly interface with drag-and-drop builders, pre-made templates, and guided setup wizards. You can build and deploy WhatsApp automations without coding experience.",
  },
  {
    icon: "🔀",
    q: "What's the difference between your DIY and DFY options?",
    a: "DIY (Do It Yourself) gives you access to our platform with a subscription, allowing you to build and manage your own automations. DFY (Done For You) is a full-service option where our team builds, trains, and manages the AI agents for your business, handling everything from setup to optimization.",
  },
  {
    icon: "⏱️",
    q: "How long does it take to implement your solution?",
    a: "For DIY solutions, you can be up and running within hours using our templates. For DFY solutions, implementation typically takes 1–2 weeks, depending on complexity. This includes discovery, AI training, integration setup, testing, and deployment.",
  },
  {
    icon: "🔌",
    q: "Can you integrate with our existing CRM or e-commerce platform?",
    a: "Yes, we integrate with 25+ popular platforms including Shopify, WooCommerce, HubSpot, Salesforce, and more. Our API also allows for custom integrations with proprietary systems if needed.",
  },
  {
    icon: "📈",
    q: "What kind of results can I expect?",
    a: "Our clients typically see a 30–40% increase in lead conversion rates, 60% reduction in response times, 25–35% increase in customer satisfaction scores, and significant time savings for their teams. Specific results vary by industry and use case.",
  },
];

const STATS = [
  { value: "30–40%", label: "More lead conversions" },
  { value: "60%",    label: "Faster response time"  },
  { value: "35%",    label: "Higher CSAT scores"    },
  { value: "24/7",   label: "Always-on automation"  },
];

export default function FaqSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">FAQ</span>
          <div className="h-px w-10 bg-orange-500" />
        </div>

        {/* Heading */}
        <h2
          className={`font-black text-white text-center leading-[0.9] mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(38px,5.5vw,68px)", letterSpacing: "-0.025em" }}
        >
          Frequently asked<br />
          <span className="text-orange-500">questions.</span>
        </h2>

        {/* Sub */}
        <p className={`text-sm text-white/40 text-center max-w-xl mx-auto leading-relaxed mb-14 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Everything you need to know about our AI automation solutions and how they can help your business.
        </p>

        {/* Stats bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {STATS.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-4 text-center">
              <p className="font-black text-orange-500 leading-none mb-1.5"
                style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "22px", letterSpacing: "-0.02em" }}>
                {s.value}
              </p>
              <p className="text-[10px] text-white/30 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FAQ items */}
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer
                ${open === i
                  ? "border-orange-500/30 bg-orange-500/[0.04]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
                }
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 80 + 300}ms` }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {/* Question row */}
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-all duration-300
                    ${open === i
                      ? "bg-orange-500/20 border border-orange-500/40 scale-110 -rotate-3"
                      : "bg-white/[0.04] border border-white/[0.08]"
                    }`}>
                    {faq.icon}
                  </div>
                  <p className={`font-semibold text-sm leading-snug transition-colors duration-200
                    ${open === i ? "text-white" : "text-white/55"}`}>
                    {faq.q}
                  </p>
                </div>
                <span className={`text-orange-500 text-xl font-black flex-shrink-0 transition-transform duration-300
                  ${open === i ? "rotate-45" : "rotate-0"}`}>
                  +
                </span>
              </div>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-56" : "max-h-0"}`}>
                <p className="px-5 pb-5 text-sm text-white/40 leading-relaxed
                  border-t border-white/[0.05] pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          <p className="text-sm text-white/30 mb-4">Still have questions?</p>
          <Link
            href="/contact"
            className="group relative overflow-hidden inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-black text-white bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_6px_28px_rgba(249,115,22,0.3)]"
            style={{ fontFamily: "'Barlow Condensed',sans-serif", letterSpacing: "0.08em", fontSize: "15px" }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="relative">TALK TO OUR TEAM</span>
            <span className="relative transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}