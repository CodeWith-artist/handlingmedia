"use client";

import { useEffect, useRef } from "react";

const words = [
  { text: "Everything.", white: true },
  { text: "You.", white: false },
  { text: "Want.", white: false },
];

export default function HeroSection() {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 400);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">

      {/* Soft ambient glow — subtle, centered-left, not overwhelming */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 30% 65%, rgba(180,80,0,0.38) 0%, rgba(120,40,0,0.15) 50%, transparent 80%)",
        }}
      />

      {/* Hero text — perfectly centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {words.map(({ text, white }, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            className={[
              "block font-black leading-none    tracking-[-0.02em] select-none",
              "text-[clamp(4rem,12vw,10.5rem)]",
              white ? "text-white" : "text-orange-500",
            ].join(" ")}
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              opacity: 0,
              transform: "translateY(36px)",
              transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)`,
              /* Fade from bottom — mask on the text itself, not a overlay div */
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 30%)",
              maskImage: "linear-gradient(to top, transparent 0%, black 30%)",
            }}
          >
            {text} 
          </span>
        ))}
      </div>
    </section>
  );
}