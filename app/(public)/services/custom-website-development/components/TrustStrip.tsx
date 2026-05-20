"use client";

import {
  Rocket,
  ShieldCheck,
  Zap,
  Code2,
  Clock3,
} from "lucide-react";

const STATS = [
  {
    icon: Rocket,
    value: "50+",
    label: "Projects Delivered",
    desc: "Custom websites & systems",
  },
  {
    icon: ShieldCheck,
    value: "99%",
    label: "Uptime",
    desc: "Reliable scalable infrastructure",
  },
  {
    icon: Code2,
    value: "Modern",
    label: "Tech Stack",
    desc: "Next.js, Node.js, Prisma & more",
  },
  {
    icon: Zap,
    value: "SEO",
    label: "Optimized",
    desc: "Fast performance & rankings",
  },
  {
    icon: Clock3,
    value: "Fast",
    label: "Delivery",
    desc: "Quick turnaround time",
  },
];

export default function TrustStrip() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 -mt-10 z-20">
      <div className="relative max-w-6xl mx-auto">

        {/* Glow */}
        <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-[2rem]" />

        {/* Container */}
        <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/15 bg-[#120602]/80 backdrop-blur-xl shadow-[0_0_60px_rgba(249,115,22,0.08)]">

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.08),transparent_55%)]" />

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[38px_38px]" />

          {/* Content */}
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-orange-500/10">

            {STATS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative bg-[#140803]/95 px-5 py-7 sm:px-6 sm:py-8 hover:bg-[#1b0b04] transition-all duration-300"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_70%)]" />

                  <div className="relative flex flex-col items-center text-center">

                    {/* Icon */}
                    <div className="mb-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-3 shadow-[0_0_20px_rgba(249,115,22,0.08)] group-hover:scale-110 group-hover:border-orange-400/40 transition-all duration-300">
                      <Icon className="size-5 text-orange-400" />
                    </div>

                    {/* Value */}
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      {item.value}
                    </h3>

                    {/* Label */}
                    <p className="mt-2 text-sm sm:text-[0.95rem] font-semibold text-orange-300">
                      {item.label}
                    </p>

                    {/* Description */}
                    <p className="mt-2 text-xs leading-relaxed text-orange-100/45 max-w-[180px]">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}