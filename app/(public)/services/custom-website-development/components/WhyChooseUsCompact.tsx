"use client";

import {
  Code2,
  SearchCheck,
  Zap,
  Smartphone,
  Scaling,
  Palette,
  ShieldCheck,
  LifeBuoy,
  Check,
} from "lucide-react";

const FEATURES = [
  {
    icon: Code2,
    title: "Custom Coded Solutions",
  },
  {
    icon: SearchCheck,
    title: "SEO-Friendly Architecture",
  },
  {
    icon: Zap,
    title: "Fast Loading Speed",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Development",
  },
  {
    icon: Scaling,
    title: "Scalable Systems",
  },
  {
    icon: Palette,
    title: "Clean UI/UX",
  },
  {
    icon: ShieldCheck,
    title: "Secure Backend",
  },
  {
    icon: LifeBuoy,
    title: "Long-Term Support",
  },
];

export default function WhyChooseUsCompact() {
  return (
    <section className="relative overflow-hidden bg-[#0b0301] py-20 px-4 sm:px-6 lg:px-8">

      {/* Glow */}
      <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-size-[42px_42px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Container */}
        <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/10 bg-[#140803]/70 backdrop-blur-xl p-6 sm:p-8 lg:p-10">

          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.10),transparent_60%)]" />

          <div className="relative">

            {/* Top */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              {/* Left Content */}
              <div className="max-w-xl">

                {/* Badge */}
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-orange-300">
                  <span className="size-1.5 rounded-full bg-orange-400" />
                  Why Choose Us
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Why Businesses Choose
                  <span className="block bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                    Handling Media
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-orange-100/55">
                  We build high-performance digital solutions focused on speed,
                  scalability, modern user experience, and long-term business growth.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">

                {FEATURES.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={index}
                      className="group flex items-center gap-4 rounded-2xl border border-orange-500/10 bg-[#1a0b04]/70 px-4 py-4 transition-all duration-300 hover:border-orange-500/25 hover:bg-orange-500/5"
                    >

                      {/* Icon */}
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-orange-500/15 bg-orange-500/10 transition-all duration-300 group-hover:border-orange-400/40 group-hover:scale-105">
                        <Icon className="size-5 text-orange-400" />
                      </div>

                      {/* Text */}
                      <div className="flex items-center gap-2">

                        <Check className="size-4 text-orange-500" />

                        <span className="text-sm font-medium text-orange-100/80">
                          {feature.title}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-orange-500/10 pt-8">

              {[
                { value: "50+", label: "Projects" },
                { value: "99%", label: "Uptime" },
                { value: "24/7", label: "Support" },
                { value: "Fast", label: "Delivery" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-orange-300/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}