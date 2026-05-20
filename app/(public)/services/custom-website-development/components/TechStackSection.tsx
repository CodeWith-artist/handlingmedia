"use client";

import {
  MonitorSmartphone,
  Server,
  Database,
  CloudCog,
} from "lucide-react";

const TECH_STACK = [
  {
    title: "Frontend",
    icon: MonitorSmartphone,
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    technologies: [
      "Node.js",
      "Express",
      "Prisma ORM",
      "REST APIs",
    ],
  },
  {
    title: "Database",
    icon: Database,
    technologies: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    title: "DevOps",
    icon: CloudCog,
    technologies: [
      "Docker",
      "GitHub Actions",
      "CI/CD Pipelines",
      "VPS & Cloud Deployment",
    ],
  },
];

const LOGOS = [
  "Next.js",
  "React",
  "Tailwind",
  "TypeScript",
  "Node.js",
  "Prisma",
  "Docker",
  "MySQL",
  "MongoDB",
  "GitHub Actions",
];

export default function TechStackSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b0301] py-28 px-4 sm:px-6 lg:px-8">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-size-[42px_42px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-orange-300">
            <span className="size-1.5 rounded-full bg-orange-400" />
            Technology Stack
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Modern Technologies
            <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
              {" "}We Use
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-orange-100/55">
            We use scalable, production-ready technologies to build
            fast, secure, and future-proof digital products.
          </p>
        </div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {TECH_STACK.map((group, index) => {
            const Icon = group.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[2rem] border border-orange-500/10 bg-[#140803]/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-[#1a0b04]"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_55%)]" />

                {/* Top Border */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">

                  {/* Icon */}
                  <div className="mb-6 inline-flex rounded-2xl border border-orange-500/15 bg-orange-500/10 p-4 shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300 group-hover:scale-105 group-hover:border-orange-400/40">
                    <Icon className="size-6 text-orange-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    {group.title}
                  </h3>

                  {/* Technologies */}
                  <div className="mt-6 flex flex-wrap gap-3">

                    {group.technologies.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="rounded-xl border border-orange-500/10 bg-orange-500/5 px-3 py-2 text-sm font-medium text-orange-100/75 transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Animated Tech Marquee */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-orange-500/10 bg-[#140803]/60 backdrop-blur-xl py-6">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_70%)]" />

          <div className="relative flex overflow-hidden">

            <div className="flex min-w-max animate-[marquee_25s_linear_infinite] gap-5 px-5">

              {[...LOGOS, ...LOGOS].map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-2xl border border-orange-500/10 bg-[#1a0b04] px-6 py-4 text-sm sm:text-base font-semibold tracking-wide text-orange-100/70 shadow-[0_0_20px_rgba(249,115,22,0.05)] transition-all duration-300 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-white"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-orange-500/15 bg-[#140803]/70 backdrop-blur-xl p-8 sm:p-10 text-center">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_60%)]" />

          <div className="relative">

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Built Using
              <span className="block bg-gradient-to-r from-orange-300 to-orange-600 bg-clip-text text-transparent">
                Modern Scalable Technologies
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-orange-100/55 leading-relaxed">
              Our stack is carefully selected for speed, scalability,
              developer experience, and long-term maintainability.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              Discuss Your Project
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}