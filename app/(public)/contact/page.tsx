
import { ContactForm } from "./components/Form";
import { CONTACT_INFO } from "./components/Service-config";


export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 overflow-hidden">

      {/* ── Hero headline ── */}
      <div className="relative pt-24 pb-16 px-6">
        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100
            rounded-full bg-orange-500/9 blur-3xl" />
        </div>

        {/* Grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-orange-500/10 border border-orange-500/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-400">
              Accepting new clients
            </span>
          </div>

          <h1
            className="font-black text-7xl text-white leading-[0.88] mb-6"
            
          >
            Let's build<br />
            something{" "}
            <span style={{ WebkitTextStroke: "2px #f97316", color: "transparent" }}>
              great
            </span>
            <br />
            together.
          </h1>

          <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-4">
            Fill in the form below — we'll review your project and get back
            within <strong className="text-white/60">4 hours</strong>.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
            {[
              "✦ Free consultation",
              "✦ No long-term lock-in",
              "✦ Results in 30 days",
              "✦ 200+ brands served",
            ].map((t) => (
              <span key={t} className="text-xs text-white/22">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form + contact info ── */}
      <div className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-8">

            {CONTACT_INFO.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-2xl
                  bg-white/2 border border-white/6
                  hover:border-orange-500/25 hover:bg-orange-500/4
                  transition-all duration-200 group"
              >
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/22 mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-white/55 group-hover:text-orange-400
                        transition-colors duration-150 font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/55 font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Why us */}
            <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20">
              <p
                className="font-black text-white mb-3 text-lg"
                
              >
                Why handlingmedia?
              </p>
              <div className="space-y-2.5">
                {[
                  "Official WhatsApp API partner",
                  "In-house dev + marketing team",
                  "Transparent pricing, no surprises",
                  "Dedicated account manager",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-orange-500/20 border border-orange-500/40
                      flex items-center justify-center text-orange-400 text-[9px] font-black shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs text-white/50 leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Form card */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

        </div>
      </div>

      {/* <style>{`
        // @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .custom-select option {
          background: #18181b;
          color: rgba(255,255,255,0.7);
        }
      `}</style> */}
    </main>
  );
}

// ═════════════════════════════════════════════════════════════
//  FORM COMPONENT
// ═════════════════════════════════════════════════════════════



// ── Field wrapper ─────────────────────────────────────────────

