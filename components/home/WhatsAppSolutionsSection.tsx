export default function WhatsAppSolutionsSection() {
  const features = [
    {
      title: "Broadcast Campaigns",
      description:
        "Send high-converting promotional campaigns to thousands of users with advanced targeting and delivery insights.",
    },
    {
      title: "Automated Replies",
      description:
        "Instantly respond to customer queries using smart automations, templates, and AI-driven flows.",
    },
    {
      title: "Shared Team Inbox",
      description:
        "Manage customer conversations collaboratively with multiple agents from one dashboard.",
    },
    {
      title: "CRM Integrations",
      description:
        "Connect your existing CRM, lead systems, and workflows directly with WhatsApp.",
    },
    {
      title: "Lead Qualification",
      description:
        "Capture, qualify, and route leads automatically using conversational journeys.",
    },
    {
      title: "Analytics & Insights",
      description:
        "Track open rates, replies, conversions, and campaign performance in real time.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-orange-700/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-sm font-medium tracking-wide text-orange-400">
            WHATSAPP SOLUTIONS
          </div>

          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            Conversations.
            <br />
            <span className="text-orange-500">That Convert.</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/60 sm:text-xl">
            Build meaningful customer interactions with powerful WhatsApp
            automation, campaigns, support tools, and lead workflows — all in
            one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-orange-500/[0.05]"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-xl font-bold text-orange-400">
                  0{i + 1}
                </div>

                <h3 className="text-2xl font-bold tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center justify-center gap-5 rounded-[32px] border border-white/10 bg-white/[0.03] px-8 py-12 text-center backdrop-blur-xl">
          <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to scale on WhatsApp?
          </h3>

          <p className="max-w-2xl text-white/60">
            Launch automated customer conversations, campaigns, and support
            systems designed for modern businesses.
          </p>

          <button className="mt-2 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 px-7 py-3 text-sm font-black uppercase tracking-wide text-black transition-transform duration-200 hover:scale-[1.03] active:scale-95">
            Start Building
          </button>
        </div>
      </div>
    </section>
  );
}
