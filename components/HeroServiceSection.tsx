"use client";

import { useEffect, useState } from "react";

const TRUST_ITEMS = [
  "Meta API Integrations",
  "Automation Workflows",
  "CRM Connected Systems",
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Keyframes injected once — only for ticker + shimmer which have no Tailwind equivalent */}
      
      <section className="relative w-full max-w-6xl my-24 mx-auto overflow-hidden min-h-[40vh] flex flex-col bg-[#0d0401] rounded-3xl border border-white/10 px-6 py-16 text-center gap-6">

        {/* Radial background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,#7c2d0a_0%,#1a0a00_55%,#0d0401_100%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />

        {/* Glow blobs */}
        <div className="absolute top-[10%] right-[12%] w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.22)_0%,transparent_70%)] animate-pulse" />
        <div className="absolute -bottom-4 left-[20%] w-36 h-36 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,transparent_70%)] animate-pulse" />

        {/* Floating dots */}
        <div className="absolute top-[18%] left-[8%] size-1 rounded-full bg-orange-500/50 animate-bounce" />
        <div className="absolute top-[65%] left-[5%] size-0.5 rounded-full bg-orange-400/40 animate-bounce [animation-delay:400ms]" />
        <div className="absolute top-[78%] left-[16%] size-1.5 rounded-full bg-orange-500/35 animate-bounce [animation-delay:800ms]" />
        <div className="absolute top-[22%] right-[9%] size-1 rounded-full bg-orange-400/45 animate-bounce [animation-delay:200ms]" />
        <div className="absolute top-[68%] right-[6%] size-0.5 rounded-full bg-orange-500/40 animate-bounce [animation-delay:1000ms]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-8 pb-0 text-center gap-4">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 border rounded-full px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest bg-orange-500/10 border-orange-500/30 text-orange-400 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <span className="size-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
            WhatsApp Business Platform
          </div>

          {/* Headline */}
          <h1 className={`font-extrabold text-white leading-tight tracking-tight max-w-2xl text-[clamp(1.65rem,4vw,2.55rem)] transition-all duration-500 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            Scale Customer{" "}
            <span className="shimmer-text">Conversations</span>{" "}
            on WhatsApp
          </h1>

          {/* Subheadline */}
          <p className={`text-orange-200/55 font-light leading-relaxed max-w-md text-[clamp(0.8rem,1.5vw,0.93rem)] transition-all duration-500 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            Build automated WhatsApp systems for sales, support, lead generation,
            and customer engagement.
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-500 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <button className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-400 hover:to-orange-600 text-white text-[0.82rem] font-semibold px-5 py-2.5 rounded-md shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 transition-all duration-200 tracking-wide">
              Book Free Consultation
            </button>
            <button className="text-orange-300 border border-orange-500/35 hover:border-orange-500/60 hover:bg-orange-500/10 hover:text-white text-[0.82rem] font-medium px-5 py-2.5 rounded-md backdrop-blur-sm transition-all duration-200 tracking-wide">
              See Pricing →
            </button>
          </div>

          {/* Trust ticker */}
          <div className={`w-full border-t border-orange-500/10 pt-3 mt-1 overflow-hidden transition-all duration-500 delay-400 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="ticker flex w-max">
              {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-[0.68rem] font-medium text-orange-200/40 uppercase tracking-[0.08em] whitespace-nowrap px-8"
                >
                  <span className="text-orange-500 text-[0.55rem]">◆</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}