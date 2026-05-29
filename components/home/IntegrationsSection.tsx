// components/sections/IntegrationsSection.tsx
"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hook/useInView";

const INTEGRATIONS = [
  { name: "WhatsApp",     cat: "Messaging",    icon: "💬", border: "border-green-500/20",  glow: "from-green-500/10"  },
  { name: "Instagram",    cat: "Social",       icon: "📸", border: "border-pink-500/20",   glow: "from-pink-500/10"   },
  { name: "Meta",         cat: "Social",       icon: "🌐", border: "border-blue-500/20",   glow: "from-blue-500/10"   },
  { name: "Shopify",      cat: "E-commerce",   icon: "🛍️", border: "border-green-500/20",  glow: "from-green-500/10"  },
  { name: "WooCommerce",  cat: "E-commerce",   icon: "🛒", border: "border-purple-500/20", glow: "from-purple-500/10" },
  { name: "Razorpay",     cat: "Payments",     icon: "💳", border: "border-blue-500/20",   glow: "from-blue-500/10"   },
  { name: "Zoho CRM",     cat: "CRM",          icon: "👥", border: "border-red-500/20",    glow: "from-red-500/10"    },
  { name: "HubSpot",      cat: "CRM",          icon: "🧲", border: "border-orange-500/20", glow: "from-orange-500/10" },
  { name: "Salesforce",   cat: "CRM",          icon: "☁️", border: "border-blue-500/20",   glow: "from-blue-500/10"   },
  { name: "Zapier",       cat: "Automation",   icon: "⚡", border: "border-orange-500/20", glow: "from-orange-500/10" },
  { name: "Google Sheets",cat: "Productivity", icon: "📊", border: "border-green-500/20",  glow: "from-green-500/10"  },
  { name: "Gmail",        cat: "Productivity", icon: "📧", border: "border-red-500/20",    glow: "from-red-500/10"    },
  { name: "Slack",        cat: "Messaging",    icon: "💼", border: "border-purple-500/20", glow: "from-purple-500/10" },
  { name: "Wix",          cat: "E-commerce",   icon: "🔷", border: "border-blue-500/20",   glow: "from-blue-500/10"   },
  { name: "Magento",      cat: "E-commerce",   icon: "📦", border: "border-orange-500/20", glow: "from-orange-500/10" },
  { name: "Pabbly",       cat: "Automation",   icon: "🔀", border: "border-amber-500/20",  glow: "from-amber-500/10"  },
  { name: "Make",         cat: "Automation",   icon: "⚙️", border: "border-purple-500/20", glow: "from-purple-500/10" },
  { name: "Twilio",       cat: "Messaging",    icon: "📞", border: "border-red-500/20",    glow: "from-red-500/10"    },
  { name: "Typeform",     cat: "Productivity", icon: "📋", border: "border-zinc-500/20",   glow: "from-zinc-500/10"   },
  { name: "Calendly",     cat: "Productivity", icon: "📅", border: "border-blue-500/20",   glow: "from-blue-500/10"   },
];

const CATS = ["All", "Messaging", "Social", "CRM", "E-commerce", "Payments", "Automation", "Productivity"];

const STATS = [
  { value: "50+",   label: "Platforms" },
  { value: "5 min", label: "Avg. setup" },
  { value: "99.9%", label: "Uptime SLA" },
];

export default function IntegrationsSection() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? INTEGRATIONS
    : INTEGRATIONS.filter((i) => i.cat === active);

  return (
    <section ref={ref} className="py-24 px-6 bg-white/1 border-t border-white/4">
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <div className={`flex items-center justify-center gap-3 mb-5 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
          <div className="h-px w-10 bg-orange-500" />
          <span className="text-[10px] tracking-[0.28em] uppercase font-bold text-orange-500">Integrations</span>
          <div className="h-px w-10 bg-orange-500" />
        </div>

        {/* Heading */}
        <h2
          className={`font-black text-white text-4xl text-center leading-[0.9] mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          
        >
          Seamlessly integrate with<br />
          <span className="text-orange-500">your favorite tools.</span>
        </h2>

        {/* Sub */}
        <p className={`text-sm text-white/40 text-center max-w-xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Connect with 50+ platforms to automate your workflow and streamline your business operations.
        </p>

        {/* Stats bar */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-10 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/3 border border-white/[0.07]">
              <span className="font-black text-orange-500 text-base">
                
                {s.value}
              </span>
              <span className="text-xs text-white/35">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200
                ${active === cat
                  ? "bg-orange-500/20 border border-orange-500/40 text-orange-400"
                  : "bg-white/3 border border-white/[0.07] text-white/35 hover:border-white/15 hover:text-white/55"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((item, i) => (
            <div
              key={item.name}
              className={`group flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl
                border ${item.border} bg-linear-to-b ${item.glow} to-white/1
                hover:-translate-y-1 transition-all duration-300 cursor-default
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 40 + 300}ms` }}
            >
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                {item.icon}
              </span>
              <span className="text-xs font-bold text-white/70 text-center leading-tight">
                
                {item.name}
              </span>
              <span className="text-[10px] text-white/25">{item.cat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}