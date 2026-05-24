export default function PortfolioPage() {
  const projects = [
    {
      title: "FitZone Gym Website",
      category: "Fitness Platform",
      description:
        "Modern gym website with membership plans, trainer booking, and transformation showcase.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      tech: ["Next.js", "Tailwind", "Stripe"],
    },
    {
      title: "MedCare Consultation App",
      category: "Healthcare",
      description:
        "Doctor consultation platform with appointment booking, patient dashboard, and video calls.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1200&auto=format&fit=crop",
      tech: ["React", "Node.js", "WebRTC"],
    },
    {
      title: "ShopVerse Ecommerce",
      category: "Ecommerce",
      description:
        "Fast ecommerce experience with product filtering, secure checkout, and analytics dashboard.",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
      tech: ["Next.js", "Prisma", "PostgreSQL"],
    },
    {
      title: "EduSpark Learning App",
      category: "EdTech",
      description:
        "Online learning platform with protected video streaming and student progress tracking.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      tech: ["Expo", "Firebase", "TypeScript"],
    },
  ];

  const stats = [
    {
      value: "50+",
      label: "Projects Delivered",
    },
    {
      value: "20+",
      label: "Business Clients",
    },
    {
      value: "99%",
      label: "Client Satisfaction",
    },
    {
      value: "24/7",
      label: "Support & Maintenance",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.25),transparent_45%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400 backdrop-blur-sm">
            Creative Digital Agency
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            We Build <span className="text-orange-500">Modern Websites</span>, Apps &
            Digital Experiences
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
            We help brands grow with high-performance web applications,
            mobile apps, UI/UX design, and digital solutions tailored for
            modern businesses.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-2xl bg-orange-500 px-7 py-4 text-sm font-semibold text-black transition hover:scale-105 hover:bg-orange-400">
              Start Your Project
            </button>

            <button className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-orange-500/50 hover:bg-orange-500/10">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-14 md:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-white/10 bg-zinc-950 p-8 text-center shadow-2xl shadow-orange-500/5"
          >
            <h3 className="text-4xl font-black text-orange-500">
              {item.value}
            </h3>
            <p className="mt-3 text-sm text-zinc-400">{item.label}</p>
          </div>
        ))}
      </section>

      {/* Portfolio */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Our Portfolio
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Featured Projects
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-zinc-400">
            A collection of websites and applications designed to help
            businesses scale faster and create better user experiences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 transition duration-300 hover:-translate-y-2 hover:border-orange-500/30"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 rounded-full border border-orange-500/30 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-orange-400 backdrop-blur-sm">
                  {project.category}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-white">
                  {project.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:gap-4">
                  Explore Project
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-white/10 bg-zinc-950/60 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              What We Do
            </p>

            <h2 className="text-4xl font-black md:text-6xl">
              Services That Grow Brands
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Website Development",
                desc: "Fast, scalable, and SEO-friendly websites built for conversions.",
              },
              {
                title: "Mobile App Development",
                desc: "Cross-platform apps for Android, iOS, and desktop experiences.",
              },
              {
                title: "Branding & Marketing",
                desc: "Creative branding, ad campaigns, and content strategies.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-white/10 bg-black p-8 transition hover:border-orange-500/40 hover:bg-orange-500/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-2xl text-orange-500">
                  ✦
                </div>

                <h3 className="text-2xl font-bold">{service.title}</h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      
    </main>
  );
}
 