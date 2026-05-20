"use client";

import {
  Smartphone,
  Gauge,
  ShieldAlert,
  Layers3,
  Workflow,
  BarChart3,
  ServerCrash,
  Paintbrush,
  ArrowRight,
} from "lucide-react";

const PROBLEMS = [
  {
    icon: Gauge,
    title: "Slow Websites",
    description:
      "Poor performance and long loading times that drive visitors away.",
  },
  {
    icon: Smartphone,
    title: "Poor Mobile Experience",
    description:
      "Broken layouts and frustrating usability across mobile devices.",
  },
  {
    icon: BarChart3,
    title: "Low Conversions",
    description:
      "Visitors leave without taking action due to weak user experience.",
  },
  {
    icon: Workflow,
    title: "Manual Workflows",
    description:
      "Repetitive tasks wasting time because systems aren't automated.",
  },
  {
    icon: Paintbrush,
    title: "Outdated UI",
    description:
      "Old interfaces reduce trust and make your business look behind.",
  },
  {
    icon: Layers3,
    title: "No Scalability",
    description:
      "Systems break or become difficult to manage as your business grows.",
  },
  {
    icon: ShieldAlert,
    title: "Security Issues",
    description:
      "Weak architecture exposing customer data and business operations.",
  },
  {
    icon: ServerCrash,
    title: "Hard-to-Manage Systems",
    description:
      "Disconnected tools and messy admin systems slowing productivity.",
  },
];

export default function ProblemsSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-[#0b0301]">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 bg-orange-500/10 blur-3xl rounded-full" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-orange-300 font-semibold mb-5">
            <span className="size-1.5 rounded-full bg-orange-400" />
            Challenges We Solve
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Common Problems
            <span className="block bg-linear-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
              Businesses Face
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-orange-100/55">
            Most businesses struggle with outdated systems, poor performance,
            and disconnected workflows that limit growth and customer experience.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {PROBLEMS.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-orange-500/10 bg-[#140803]/70 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:border-orange-500/30 hover:bg-[#1a0b04]"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_55%)]" />

                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex gap-5">

                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center rounded-2xl border border-orange-500/15 bg-orange-500/10 p-4 shadow-[0_0_20px_rgba(249,115,22,0.08)] group-hover:scale-105 transition-transform duration-300">
                      <Icon className="size-6 text-orange-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {problem.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-[0.95rem] leading-relaxed text-orange-100/50">
                      {problem.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Statement */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-orange-500/15 bg-[#140803]/70 backdrop-blur-xl p-8 sm:p-10 text-center">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_60%)]" />

          <div className="relative">

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              We Solve All of These
              <span className="block mt-2 bg-gradient-to-r from-orange-300 to-orange-600 bg-clip-text text-transparent">
                With Custom-Built Solutions
              </span>
            </h3>

            <p className="mt-5 max-w-2xl mx-auto text-orange-100/55 leading-relaxed">
              From scalable web platforms to automated business systems,
              we create high-performance solutions tailored specifically
              to your business goals.
            </p>

            {/* CTA */}
            <button className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              Start Your Project
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}