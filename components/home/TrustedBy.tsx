"use client";

import { useEffect, useRef } from "react";

const clients = [
  { name: "BharatGramUdhyogSangh",       abbr: "BGUS" },
  { name: "SampuranSwadeshi",     abbr: "SS" },
  { name: "Haleqad",       abbr: "HQ" },
  { name: "BilmedGroup",        abbr: "BG" },
  { name: "Docconsulto",      abbr: "DC" },
  { name: "Aics",        abbr: "AI" },
  
];

const stats = [
  { value: "200+", label: "Clients served" },
  { value: "98%",  label: "Retention rate" },
  { value: "4.9★", label: "Avg. rating"    },
  { value: "12M+", label: "Messages sent"  },
];

// Duplicate for seamless infinite scroll
const track = [...clients, ...clients];

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);

  // Pause on hover
  const pause  = () => ref.current?.style.setProperty("animation-play-state", "paused");
  const resume = () => ref.current?.style.setProperty("animation-play-state", "running");

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden py-20 border-t border-white/5">

      {/* Ambient glow — matches site palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(220,80,20,0.12) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.25em] uppercase text-orange-500/80 font-medium mb-3">
            Trusted by
          </p>
          <h2
            className="text-3xl md:text-4xl font-black text-white leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}
          >
            Brands that chose{" "}
            <span className="text-orange-500">results</span>
          </h2>
        </div>

        {/* Scrolling logo strip */}
        <div
          className="relative overflow-hidden mb-16"
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* Left + right fade masks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10"
            style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10"
            style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
          />

          <div
            ref={ref}
            className="flex gap-5 w-max"
            style={{ animation: "scroll-x 28s linear infinite" }}
          >
            {track.map((client, i) => (
              <LogoCard key={`${client.name}-${i}`} name={client.name} abbr={client.abbr} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>

        {/* Bottom trust line */}
        <p className="text-center text-sm text-white/25 mt-12 tracking-wide">
          Trusted by startups, D2C brands & enterprises across India
        </p>
      </div>

      {/* Keyframe injected via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&display=swap');

        @keyframes scroll-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .logo-card {
          transition: border-color 0.2s, background 0.2s;
        }
        .logo-card:hover {
          border-color: rgba(249, 115, 22, 0.5) !important;
          background:   rgba(249, 115, 22, 0.06) !important;
        }
        .logo-card:hover .logo-abbr {
          color: rgb(249, 115, 22);
        }
        .logo-card:hover .logo-name {
          color: rgba(255,255,255,0.9);
        }
      `}</style>
    </section>
  );
}

function LogoCard({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div
      className="logo-card flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        background:  "rgba(255,255,255,0.03)",
        minWidth:    "160px",
      }}
    >
      {/* Avatar / logo placeholder */}
      <div
        className="logo-abbr w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-colors duration-200"
        style={{
          background: "rgba(249,115,22,0.12)",
          color:      "rgba(249,115,22,0.7)",
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.05em",
        }}
      >
        {abbr}
      </div>
      <span
        className="logo-name text-sm font-semibold transition-colors duration-200"
        style={{ color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}
      >
        {name}
      </span>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="group relative rounded-2xl p-6 border overflow-hidden text-center"
      style={{
        borderColor: "rgba(255,255,255,0.07)",
        background:  "rgba(255,255,255,0.02)",
      }}
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(220,80,20,0.15), transparent 70%)" }}
      />

      <p
        className="text-4xl font-black text-orange-500 mb-1 relative"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      <p className="text-xs text-white/40 uppercase tracking-widest font-medium relative">
        {label}
      </p>
    </div>
  );
}