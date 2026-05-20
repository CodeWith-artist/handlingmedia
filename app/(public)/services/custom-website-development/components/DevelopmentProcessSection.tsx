"use client";

import {
  SearchCheck,
  Lightbulb,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  LifeBuoy,
} from "lucide-react";

const PROCESS_STEPS = [
  {
    icon: SearchCheck,
    step: "01",
    title: "Discovery",
    description:
      "We understand your business goals, audience, challenges, and technical requirements.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Strategy & Planning",
    description:
      "We create a clear roadmap, architecture, feature structure, and development strategy.",
  },
  {
    icon: PenTool,
    step: "03",
    title: "UI/UX Design",
    description:
      "Modern interfaces focused on usability, conversions, responsiveness, and brand identity.",
  },
  {
    icon: Code2,
    step: "04",
    title: "Development",
    description:
      "Scalable frontend and backend development using modern technologies and best practices.",
  },
  {
    icon: ShieldCheck,
    step: "05",
    title: "Testing",
    description:
      "Performance, responsiveness, security, and functionality testing across all devices.",
  },
  {
    icon: Rocket,
    step: "06",
    title: "Deployment",
    description:
      "Optimized deployment with production setup, monitoring, and launch preparation.",
  },
  {
    icon: LifeBuoy,
    step: "07",
    title: "Support & Scaling",
    description:
      "Long-term maintenance, updates, scaling, monitoring, and feature improvements.",
  },
];

export default function DevelopmentProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0301] py-28 px-4 sm:px-6 lg:px-8">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[42px_42px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-24 max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-orange-300">
            <span className="size-1.5 rounded-full bg-orange-400" />
            Our Workflow
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Our Development
            <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
              {" "}Process
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-orange-100/55">
            A streamlined development process designed to deliver
            scalable, high-performance digital solutions efficiently.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent lg:block" />

          <div className="space-y-10 lg:space-y-16">

            {PROCESS_STEPS.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8`}
                >

                  {/* Content */}
                  <div className="w-full lg:w-1/2">

                    <div className="group relative overflow-hidden rounded-[2rem] border border-orange-500/10 bg-[#140803]/70 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/30 hover:bg-[#1a0b04]">

                      {/* Hover Glow */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_55%)]" />

                      {/* Top Border */}
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative">

                        {/* Top */}
                        <div className="flex items-center justify-between gap-4">

                          {/* Icon */}
                          <div className="inline-flex rounded-2xl border border-orange-500/15 bg-orange-500/10 p-4 shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300 group-hover:scale-105 group-hover:border-orange-400/40">
                            <Icon className="size-6 text-orange-400" />
                          </div>

                          {/* Step Number */}
                          <span className="text-5xl font-black tracking-tight text-orange-500/10">
                            {item.step}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-6 text-2xl font-black tracking-tight text-white">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-4 text-sm sm:text-[0.96rem] leading-relaxed text-orange-100/55">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>

                  {/* Timeline Center Dot */}
                  <div className="relative hidden lg:flex items-center justify-center">

                    <div className="absolute h-16 w-px bg-orange-500/20" />

                    <div className="relative z-10 flex size-16 items-center justify-center rounded-full border border-orange-500/20 bg-[#120602] shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                      <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-700 text-sm font-bold text-white">
                        {item.step}
                      </div>
                    </div>
                  </div>

                  {/* Empty Space */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-24 overflow-hidden rounded-[2rem] border border-orange-500/15 bg-[#140803]/70 backdrop-blur-xl p-8 sm:p-10 text-center">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_60%)]" />

          <div className="relative">

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Built With Strategy,
              <span className="block bg-gradient-to-r from-orange-300 to-orange-600 bg-clip-text text-transparent">
                Delivered With Precision
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-orange-100/55 leading-relaxed">
              Every project follows a structured workflow focused on
              quality, scalability, performance, and long-term success.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}