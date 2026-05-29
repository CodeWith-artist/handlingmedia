"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../navbar/Logo";


// ── footer nav data ───────────────────────────────────────────

const FOOTER_COLS = [

 
  {
    heading: "Company",
    links: [
      { label: "About",     href: "/about"     },
      { label: "Blog",      href: "/blog"      },
      { label: "Contact",   href: "/contact"   },
    ],
  },
];



// ── intersection hook ─────────────────────────────────────────

function useInView(ref: React.RefObject<Element>, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

// ══════════════════════════════════════════════════════════════
//  CTA BANNER
// ══════════════════════════════════════════════════════════════

export function CtaBanner() {
  const ref     = useRef<HTMLDivElement>(null);
  const visible = useInView(ref as React.RefObject<Element>);

  return (
    <section
      ref={ref}
      className="relative bg-[#060606] overflow-hidden py-4 "
    >
      {/* Diagonal stripe texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        
      />

      {/* Intense orange core glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-125 rounded-full"
       
      />

      {/* Big ghost word */}
      <div
        aria-hidden
        className="pointer-events-none text-[30vh] text-stroke-2 text-stroke absolute inset-0 opacity-[0.05] flex items-center justify-center select-none overflow-hidden"
      >
        <span>
          LETS GROW
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">

        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-3 mb-8 transition-all duration-700"
         
        >
          <div className="h-px w-12 bg-orange-500/60" />
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-bold text-orange-500/80"
            
          >
            Ready when you are
          </span>
          <div className="h-px w-12 bg-orange-500/60" />
        </div>

        {/* Headline */}
        <h2
          className="font-black text-7xl text-white mb-6 leading-[0.88] transition-all duration-700 delay-100"
          
        >
          Stop planning.<br />
          <span
            
          >
            Start winning.
          </span>
        </h2>

        {/* Sub */}
        <p
          className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-200"
         
        >
          Book a free 30-minute strategy call. We'll audit your current
          marketing, map the gaps and show you exactly what we'd do differently.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300"
         
        >
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-2xl px-10 py-4 font-black bg-orange-500 text-white transition-all duration-300 hover:-translate-y-1"
            
          >
            {/* Shimmer sweep */}
            <span
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
             
            />
            <span className="relative flex items-center gap-2">
              BOOK FREE STRATEGY CALL
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </span>
          </Link>

          
        </div>

        {/* Trust row */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 transition-all duration-700 delay-400"
         
        >
          {[
            "✦ Free 30-min call",
            "✦ No commitment",
            "✦ Results in 30 days",
            "✦ 200+ brands trust us",
          ].map((t) => (
            <span
              key={t}
              className="text-xs text-white/25"
              
            >
              {t}
            </span>
          ))}
        </div>
      </div>

     
    </section>
  );
}

// ══════════════════════════════════════════════════════════════
//  FOOTER
// ══════════════════════════════════════════════════════════════

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#030303] border-t overflow-hidden border-white/9"
      
    >
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-150 h-50"
       
      />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ── Top: brand + nav cols ── */}
        <div className="pt-16 pb-12 grid grid-cols-2 md:grid-cols-6 gap-10 border-b border-white/6"
         
        >
          {/* Brand col — spans 2 on md */}
          <div className="col-span-2 md:col-span-2">
            {/* Logo */}
            <Logo src="/logo.png" />

            <p
              className="text-sm text-white/30 leading-relaxed mb-6 max-w-xs"
             
            >
              Full-service digital agency helping Indian brands grow through WhatsApp automation, custom development and performance marketing.
            </p>

           
          </div>

          {/* Nav cols */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="col-span-1">
              <p
                className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-4"
                
              >
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link ) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-orange-400 transition-colors duration-150"
                      
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Middle: contact strip ── */}
        <div
          className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/6"
          
        >
          {[
            { icon: "✉", label: "Email us", value: "creator@handlingmedia.com", href: "mailto:creator@handlingmedia.com" },
            { icon: "📞", label: "Call us",  value: "+91 9205606143",         href: "tel:+919205606143"             },
            { icon: "📍", label: "Based in", value: "India · Remote-first",   href: null                            },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 ">
              <span
                className="text-lg shrink-0 mt-0.5 "
                
              >
                {item.icon}
              </span>
              <div>
                <p
                  className="text-[10px] uppercase tracking-widest text-white/20 mb-1"
                 
                >
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-white/50 hover:text-orange-400 transition-colors duration-150"
                   
                  >
                    {item.value}
                  </a>
                ) : (
                  <p
                    className="text-sm text-white/50"
                   
                  >
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-white/18"
           
          >
            © {year} handlingmedia. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy-policy"  },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/18 hover:text-white/50 transition-colors duration-150"
                
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Orange dot badge */}
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
            />
            <span
              className="text-xs text-white/20"
              
            >
              Accepting new clients
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── default export: both together ─────────────────────────────

export default function CtaAndFooter() {
  return (
    <>
      <CtaBanner />
      <Footer />
    </>
  );
}

// ══════════════════════════════════════════════════════════════
//  SVG ICONS (inline, no extra dep)
// ══════════════════════════════════════════════════════════════

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}