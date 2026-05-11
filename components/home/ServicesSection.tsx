import { MessageSquare, Globe, Layers } from "lucide-react";

const services: {
  title: string;
  description: string;
  color: "green" | "purple" | "teal";
  icon: React.ComponentType<{ className: string }>;
  features: string[];
}[] = [
  {
    title: "WhatsApp AI",
    description:
      "Custom AI agents for your business, fully managed by our team.",
    color: "green",
    icon: Layers,
    features: [
      "Personalized setup",
      "Custom AI training",
      "24/7 monitoring",
      "Performance reports",
    ],
  },
  {
    title: "Social Media AI Bots",
    description:
      "AI-powered messaging bots for Instagram & Facebook that engage, qualify, and convert — all on autopilot.",
    color: "purple",
    icon: MessageSquare,
    features: [
      "Auto-reply to inquiries",
      "Product recommendations",
      "Instant query handling",
      "Customer support & lead qualification",
    ],
  },
  {
    title: "Website Bot",
    description:
      "AI-powered website chatbots for lead generation and customer support.",
    color: "teal",
    icon: Globe,
    features: [
      "24/7 availability",
      "Lead qualification",
      "Meeting scheduling",
      "Custom branding",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] ">
      {/* dotted grid background */}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest text-orange-400">
            OUR SERVICES
          </p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Advanced <span className="text-orange-500">AI Solutions</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            We create AI-powered agents to automate tasks, streamline
            operations, and enhance productivity for your business.
          </p>

          <p className="mt-10 text-lg font-semibold text-white">
            <span className="text-orange-500">Done For You</span> Solutions
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-10 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  features,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className: string }>;
  color: "green" | "purple" | "teal";
}) {
  const glow = {
    green: "from-green-500/30 to-green-500/0 border-green-500/40",
    purple: "from-purple-500/30 to-purple-500/0 border-purple-500/40",
    teal: "from-teal-500/30 to-teal-500/0 border-teal-500/40",
  }[color];

  return (
    <div
      className={`relative rounded-2xl border bg-linear-to-b ${glow} p-8 backdrop-blur`}
    >
      {/* corner lines */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />

      {/* icon */}
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
        <Icon className="h-6 w-6 text-white" />
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-gray-400">{description}</p>

      <ul className="mt-6 space-y-3 text-sm text-gray-300">
        {features.map((item: string) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
