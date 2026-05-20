"use client";

import {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  PanelsTopLeft,
  Database,
  FileCode2,
  Gauge,
  RefreshCcw,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Business Websites",
    description:
      "Modern websites for agencies, startups, local businesses, and corporate brands.",
    features: [
      "Corporate Websites",
      "Agency Sites",
      "Portfolio Websites",
      "Local Business Presence",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Custom Web Applications",
    description:
      "Scalable web apps built for operations, automation, and business growth.",
    features: [
      "Admin Panels",
      "CRM Systems",
      "Dashboards",
      "SaaS Platforms",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description:
      "High-performance online stores with seamless payment and inventory systems.",
    features: [
      "Custom Stores",
      "Payment Integration",
      "Inventory Management",
      "Checkout Optimization",
    ],
  },
  {
    icon: PanelsTopLeft,
    title: "Landing Pages",
    description:
      "Conversion-focused landing pages designed for ads, launches, and campaigns.",
    features: [
      "Marketing Pages",
      "Lead Generation",
      "Sales Funnels",
      "A/B Ready Design",
    ],
  },
  {
    icon: Database,
    title: "API & Backend Systems",
    description:
      "Secure and scalable backend systems powering modern applications.",
    features: [
      "REST APIs",
      "Authentication Systems",
      "Database Architecture",
      "Server Optimization",
    ],
  },
  {
    icon: FileCode2,
    title: "CMS Development",
    description:
      "Custom content management systems tailored to your workflow.",
    features: [
      "Admin CMS",
      "Dynamic Content",
      "Media Management",
      "Custom Workflows",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "Improve speed, SEO rankings, and Core Web Vitals performance.",
    features: [
      "Speed Optimization",
      "SEO Improvements",
      "Core Web Vitals",
      "Caching & Compression",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Maintenance & Scaling",
    description:
      "Long-term updates, monitoring, scaling, and technical support.",
    features: [
      "Continuous Support",
      "Bug Fixes",
      "Infrastructure Scaling",
      "Security Updates",
    ],
  },
];

export default function ServicesSection() {
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
            Services Included
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            What
            <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
              {" "}We Build
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-orange-100/55">
            We create modern digital products, scalable systems,
            and high-performance web experiences designed to help
            businesses grow faster.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[2rem] border border-orange-500/10 bg-[#140803]/70 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-[#1a0b04]"
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.16),transparent_55%)]" />

                {/* Top Border Glow */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">

                  {/* Icon */}
                  <div className="mb-6 inline-flex rounded-2xl border border-orange-500/15 bg-orange-500/10 p-4 shadow-[0_0_20px_rgba(249,115,22,0.08)] transition-all duration-300 group-hover:scale-105 group-hover:border-orange-400/40">
                    <Icon className="size-6 text-orange-400" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black tracking-tight text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-orange-100/50">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mt-6 space-y-3">

                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="size-1.5 rounded-full bg-orange-500" />

                        <span className="text-sm text-orange-100/70">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-orange-400 transition-all duration-300 group-hover:gap-3">
                    Learn More
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-orange-500/15 bg-[#140803]/70 backdrop-blur-xl p-8 sm:p-10 text-center">

          {/* Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_60%)]" />

          <div className="relative">

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Need Something Custom?
            </h3>

            <p className="mt-5 max-w-2xl mx-auto text-orange-100/55 leading-relaxed">
              We build tailored digital solutions designed specifically
              around your business requirements, workflows, and growth goals.
            </p>

            <button className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(249,115,22,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]">
              Discuss Your Project
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}