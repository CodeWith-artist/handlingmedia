
import { MessageSquare, Users, Bot, ShoppingCart, Megaphone, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

const UseCaseCard = ({
  icon: Icon,
  title,
  description,
  serviceType = "default",
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  serviceType?: string;
}) => {
  const getServiceColors = (type: string) => {
    switch (type) {
      case "ecommerce":
        return {
          gradient: "from-green-400/30 via-green-500/20 to-transparent",
          icon: "text-green-400",
        };
      case "service":
        return {
          gradient: "from-blue-400/30 via-blue-500/20 to-transparent",
          icon: "text-blue-400",
        };
      case "lead":
        return {
          gradient: "from-purple-400/30 via-purple-500/20 to-transparent",
          icon: "text-purple-400",
        };
      case "analytics":
        return {
          gradient: "from-indigo-400/30 via-indigo-500/20 to-transparent",
          icon: "text-indigo-400",
        };
      case "ai":
        return {
          gradient: "from-pink-400/30 via-pink-500/20 to-transparent",
          icon: "text-pink-400",
        };
      default:
        return {
          gradient: "from-brand-orange/30 via-brand-orange/20 to-transparent",
          icon: "text-brand-orange",
        };
    }
  };

  const colors = getServiceColors(serviceType);

  return (
    <div className="group relative">
      {/* Glow border */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100`}
      />

      <div className="relative h-full rounded-2xl border border-white/10 bg-gray-900/60 p-6 backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/20 group-hover:shadow-2xl">
        {/* Icon */}
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 shadow-inner">
          <Icon
            size={26}
            className={`${colors.icon} drop-shadow-[0_0_12px_currentColor]`}
          />
        </div>

        <h3 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};


const UseCasesSection = () => {
  return (
    <section
      id="use-cases"
      className="relative overflow-hidden bg-black py-28"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Accent blobs */}
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Use Cases
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Business{" "}
            <span className="bg-gradient-to-r from-brand-orange to-orange-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-gray-400">
            Discover how businesses across industries leverage our AI automation
            to streamline operations, engage customers, and drive revenue
            growth.
          </p>
        </div>

        {/* Cards */}
        {/** Define useCases array */}
        {(() => {
          const useCases = [
            {
              icon: ShoppingCart,
              title: "E-commerce Automation",
              description: "Automate order processing, customer support, and personalized recommendations to boost sales and efficiency.",
              serviceType: "ecommerce",
            },
            {
              icon: Users,
              title: "Lead Generation",
              description: "Capture, qualify, and nurture leads with AI-driven chatbots and automated workflows.",
              serviceType: "lead",
            },
            {
              icon: MessageSquare,
              title: "Customer Support",
              description: "Provide instant, 24/7 support to customers with intelligent virtual assistants.",
              serviceType: "service",
            },
            {
              icon: Megaphone,
              title: "Marketing Campaigns",
              description: "Automate outreach, segmentation, and engagement for higher conversion rates.",
              serviceType: "service",
            },
            {
              icon: PieChart,
              title: "Analytics & Insights",
              description: "Gain actionable insights from customer interactions and business data.",
              serviceType: "analytics",
            },
            {
              icon: Bot,
              title: "AI Integration",
              description: "Integrate advanced AI solutions to optimize business processes and decision-making.",
              serviceType: "ai",
            },
          ];
          return (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase, index) => (
                <UseCaseCard key={index} {...useCase} />
              ))}
            </div>
          );
        })()}
      </div>
    </section>
  );
};


export default UseCasesSection;