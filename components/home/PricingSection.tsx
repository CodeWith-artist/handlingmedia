"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ── types ─────────────────────────────────────────────────────

type BillingCycle = "monthly" | "yearly";

interface PlanFeature {
  text:      string;
  included:  boolean;
  highlight?: boolean;
}

interface Plan {
  id:       string;
  name:     string;
  badge?:   string;
  tagline:  string;
  monthly:  number | null;  // null = custom
  yearly:   number | null;
  currency: string;
  per:      string;
  features: PlanFeature[];
  cta:      string;
  href:     string;
  featured: boolean;
}

// ── data ──────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id:       "starter",
    name:     "Starter",
    tagline:  "For brands just getting started with digital.",
    monthly:  15000,
    yearly:   12000,
    currency: "₹",
    per:      "/ month",
    featured: false,
    cta:      "Get started",
    href:     "/contact?plan=starter",
    features: [
      { text: "1 service included",              included: true  },
      { text: "Custom website (5 pages)",         included: true  },
      { text: "WhatsApp API setup",               included: true  },
      { text: "Monthly performance report",       included: true  },
      { text: "Email support (48 hr response)",   included: true  },
      { text: "Social media management",          included: false },
      { text: "Chatbot automation",               included: false },
      { text: "CRM integration",                  included: false },
      { text: "Dedicated account manager",        included: false },
      { text: "Quarterly strategy review",        included: false },
    ],
  },
  {
    id:       "growth",
    name:     "Growth",
    badge:    "Most popular",
    tagline:  "For scaling brands that need full-stack execution.",
    monthly:  35000,
    yearly:   28000,
    currency: "₹",
    per:      "/ month",
    featured: true,
    cta:      "Start growing",
    href:     "/contact?plan=growth",
    features: [
      { text: "3 services included",              included: true, highlight: true },
      { text: "Custom website (unlimited pages)", included: true  },
      { text: "WhatsApp API + Chatbot",           included: true, highlight: true },
      { text: "Social media (3 platforms)",       included: true  },
      { text: "Weekly performance reports",       included: true  },
      { text: "CRM integration",                  included: true, highlight: true },
      { text: "Priority support (4 hr response)", included: true  },
      { text: "Dedicated account manager",        included: true  },
      { text: "Quarterly strategy review",        included: false },
      { text: "Custom integrations",              included: false },
    ],
  },
  {
    id:       "enterprise",
    name:     "Enterprise",
    tagline:  "Custom scope for high-growth teams and agencies.",
    monthly:  null,
    yearly:   null,
    currency: "₹",
    per:      "",
    featured: false,
    cta:      "Talk to us",
    href:     "/contact?plan=enterprise",
    features: [
      { text: "Unlimited services",               included: true, highlight: true },
      { text: "Full product & tech team",         included: true  },
      { text: "WhatsApp API + Advanced bot",      included: true, highlight: true },
      { text: "Full social media suite",          included: true  },
      { text: "Real-time analytics dashboard",    included: true  },
      { text: "Custom CRM & ERP integrations",    included: true, highlight: true },
      { text: "24 / 7 dedicated support",         included: true  },
      { text: "Senior account director",          included: true  },
      { text: "Monthly strategy review",          included: true  },
      { text: "White-label options",              included: true  },
    ],
  },
];

const FAQS = [
  {
    q: "Is there a setup fee?",
    a: "No hidden setup fees. The monthly retainer is all-in. For Enterprise, any one-time development costs are scoped transparently upfront.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes — upgrade or downgrade anytime. We prorate the difference so you never pay for what you don't use.",
  },
  {
    q: "What's included in the yearly discount?",
    a: "Yearly billing saves you 20% vs monthly. We lock in your rate for 12 months with no mid-year increases.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Absolutely. The Starter plan is designed exactly for that. We also offer milestone-based payment structures for pre-revenue teams — just mention it on the call.",
  },
];

// ── helpers ───────────────────────────────────────────────────

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

function formatPrice(n: number): string {
  return n.toLocaleString("en-IN");
}

// ── main component ────────────────────────────────────────────

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visible    = useInView(sectionRef as React.RefObject<Element>);
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070707] overflow-hidden py-28 border-t border-white/4"
    >
      {/* Noise grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize:   "200px 200px",
        }}
      />

      {/* Radial glow centre */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Large ghost text */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 select-none leading-none"
        style={{
          fontFamily:       "'Barlow Condensed', sans-serif",
          fontSize:         "clamp(120px, 20vw, 260px)",
          fontWeight:       900,
          color:            "transparent",
          WebkitTextStroke: "1px rgba(249,115,22,0.04)",
          letterSpacing:    "-0.04em",
        }}
      >
        PRICING
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)" }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-orange-500" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-orange-500"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Pricing
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2
              className="text-5xl md:text-[64px] font-black text-white leading-[0.9] max-w-lg"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
            >
              Transparent pricing.<br />
              <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
                Zero surprises.
              </span>
            </h2>

            {/* Billing toggle */}
            <div className="flex flex-col items-start lg:items-end gap-3">
              <p
                className="text-white/35 text-sm"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                All plans include onboarding & dedicated support.
              </p>
              <div
                className="flex items-center gap-1 p-1 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)" }}
              >
                {(["monthly", "yearly"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBilling(b)}
                    className="relative px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      fontFamily:    "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.06em",
                      fontSize:      "13px",
                      background:    billing === b ? "#f97316" : "transparent",
                      color:         billing === b ? "#fff"    : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {b === "monthly" ? "MONTHLY" : "YEARLY"}
                    {b === "yearly" && (
                      <span
                        className="ml-2 text-[10px] font-black px-1.5 py-0.5 rounded"
                        style={{
                          background: billing === "yearly" ? "rgba(255,255,255,0.2)" : "rgba(249,115,22,0.2)",
                          color:      billing === "yearly" ? "#fff"                  : "#f97316",
                        }}
                      >
                        –20%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              billing={billing}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {/* ── Compare note ── */}
        <p
          className="text-center text-xs text-white/20 mb-20 transition-all duration-700 delay-500"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            opacity:    visible ? 1 : 0,
          }}
        >
          All prices in INR · GST applicable · Cancel anytime on monthly plans
        </p>

        {/* ── FAQ ── */}
        <div
          className="max-w-3xl mx-auto transition-all duration-700 delay-400"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="h-px flex-1 bg-white/5" />
            <span
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/30"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Common questions
            </span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className="mt-20 text-center transition-all duration-700 delay-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <p
            className="text-white/25 text-sm mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Not sure which plan fits?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-white transition-all duration-200 hover:-translate-y-1"
            style={{
              background:    "#f97316",
              fontFamily:    "'Barlow Condensed', sans-serif",
              letterSpacing: "0.08em",
              fontSize:      "16px",
              boxShadow:     "0 8px 32px rgba(249,115,22,0.25)",
            }}
          >
            BOOK A FREE STRATEGY CALL →
          </Link>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>
    </section>
  );
}

// ── Plan card ─────────────────────────────────────────────────

function PlanCard({
  plan, billing, index, visible,
}: {
  plan:    Plan;
  billing: BillingCycle;
  index:   number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  const isCustom = price === null;

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col transition-all duration-500"
      style={{
        opacity:            visible ? 1 : 0,
        transform:          visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        transitionDelay:    `${index * 100 + 200}ms`,
        transitionProperty: "opacity, transform, box-shadow",
        border:             plan.featured
          ? "1px solid rgba(249,115,22,0.5)"
          : "0.5px solid rgba(255,255,255,0.07)",
        background:         plan.featured
          ? "rgba(249,115,22,0.05)"
          : "rgba(255,255,255,0.02)",
        boxShadow:          plan.featured && hovered
          ? "0 20px 60px rgba(249,115,22,0.15)"
          : hovered
            ? "0 20px 40px rgba(0,0,0,0.4)"
            : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured top glow bar */}
      {plan.featured && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, transparent, #f97316, transparent)" }}
        />
      )}

      {/* Hover corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${plan.featured ? "rgba(249,115,22,0.2)" : "rgba(249,115,22,0.1)"}, transparent 70%)`,
          opacity:    hovered ? 1 : 0,
        }}
      />

      <div className="relative p-7 flex flex-col flex-1">
        {/* Badge */}
        {plan.badge && (
          <div
            className="self-start mb-4 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest"
            style={{
              background:    "rgba(249,115,22,0.15)",
              border:        "0.5px solid rgba(249,115,22,0.4)",
              color:         "#f97316",
              fontFamily:    "'Barlow Condensed', sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            ★ {plan.badge}
          </div>
        )}

        {/* Plan name */}
        <h3
          className="font-black text-white mb-1"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "26px",
            letterSpacing: "-0.01em",
          }}
        >
          {plan.name}
        </h3>

        <p
          className="text-sm mb-6 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {plan.tagline}
        </p>

        {/* Price */}
        <div className="mb-7">
          {isCustom ? (
            <p
              className="font-black text-white"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontSize:      "36px",
                letterSpacing: "-0.02em",
              }}
            >
              Custom
            </p>
          ) : (
            <div className="flex items-baseline gap-1">
              <span
                className="font-black"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "14px",
                  color:         "rgba(255,255,255,0.5)",
                  marginBottom:  "auto",
                }}
              >
                {plan.currency}
              </span>
              <span
                className="font-black text-white transition-all duration-300"
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "48px",
                  letterSpacing: "-0.03em",
                  lineHeight:    1,
                  color:         plan.featured ? "#f97316" : "#fff",
                }}
              >
                {formatPrice(price!)}
              </span>
              <span
                className="text-sm ml-1"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {plan.per}
              </span>
            </div>
          )}

          {!isCustom && billing === "yearly" && (
            <p
              className="text-xs mt-1"
              style={{ color: "#f97316", fontFamily: "'DM Sans', sans-serif" }}
            >
              Save ₹{formatPrice((plan.monthly! - plan.yearly!) * 12)} per year
            </p>
          )}
        </div>

        {/* CTA */}
        <Link
          href={plan.href}
          className="block w-full text-center py-3.5 rounded-xl font-black mb-7 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            letterSpacing: "0.07em",
            fontSize:      "14px",
            background:    plan.featured
              ? "#f97316"
              : "rgba(255,255,255,0.06)",
            color:         plan.featured
              ? "#fff"
              : "rgba(255,255,255,0.6)",
            border:        plan.featured
              ? "none"
              : "0.5px solid rgba(255,255,255,0.1)",
            boxShadow:     plan.featured
              ? "0 4px 20px rgba(249,115,22,0.3)"
              : "none",
          }}
        >
          {plan.cta.toUpperCase()} →
        </Link>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background: plan.featured
              ? "rgba(249,115,22,0.2)"
              : "rgba(255,255,255,0.06)",
          }}
        />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((feat) => (
            <li
              key={feat.text}
              className="flex items-start gap-3 text-sm"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color:      feat.included
                  ? feat.highlight
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.55)"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              {/* Tick / cross */}
              <span
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black"
                style={{
                  background: feat.included
                    ? feat.highlight
                      ? "rgba(249,115,22,0.2)"
                      : "rgba(255,255,255,0.06)"
                    : "rgba(255,255,255,0.03)",
                  color: feat.included
                    ? feat.highlight ? "#f97316" : "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.1)",
                  border: `0.5px solid ${
                    feat.included
                      ? feat.highlight ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.1)"
                      : "rgba(255,255,255,0.05)"
                  }`,
                }}
              >
                {feat.included ? "✓" : "×"}
              </span>
              <span className={feat.highlight && feat.included ? "font-semibold" : ""}>
                {feat.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── FAQ item ──────────────────────────────────────────────────

function FaqItem({
  faq, open, onToggle,
}: {
  faq:      { q: string; a: string };
  open:     boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer"
      style={{
        borderColor: open ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.06)",
        background:  open ? "rgba(249,115,22,0.04)" : "rgba(255,255,255,0.02)",
      }}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        <p
          className="font-semibold text-sm"
          style={{
            color:      open ? "#fff" : "rgba(255,255,255,0.6)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {faq.q}
        </p>
        <span
          className="text-orange-500 transition-transform duration-300 flex-shrink-0 font-black text-lg"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0px" }}
      >
        <p
          className="px-6 pb-5 text-sm leading-relaxed"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}
        >
          {faq.a}
        </p>
      </div>
    </div>
  );
}