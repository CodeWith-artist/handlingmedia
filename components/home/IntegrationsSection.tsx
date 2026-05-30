"use client";

import {
  MessageSquare, Instagram, Facebook, ShoppingBag, FileSpreadsheet,
  Video, Mail, Globe, Coffee, BookOpen, Headphones, CreditCard,
  Zap, ShoppingCart, Star, Hexagon, Calendar, Grid3X3, Hash,
  FileText, Table
} from "lucide-react";

interface Integration {
  icon: React.ElementType;
  name: string;
  color: string;
}

const row1Integrations: Integration[] = [
  { icon: Grid3X3, name: "Pabbly", color: "#4285F4" },
  { icon: Zap, name: "N8N", color: "#EA4B71" },
  { icon: ShoppingBag, name: "Shopify", color: "#96BF48" },
  { icon: Hexagon, name: "Make", color: "#6D3AFF" },
  { icon: FileSpreadsheet, name: "Google Sheets", color: "#34A853" },
  { icon: Star, name: "Judge.me", color: "#FFC107" },
  { icon: ShoppingCart, name: "WooCommerce", color: "#96588A" },
  { icon: Zap, name: "Zapier", color: "#FF4A00" },
];

const row2Integrations: Integration[] = [
  { icon: Facebook, name: "Meta", color: "#1877F2" },
  { icon: Instagram, name: "Instagram", color: "#E4405F" },
  { icon: Globe, name: "WordPress", color: "#21759B" },
  { icon: Mail, name: "Gmail", color: "#EA4335" },
  { icon: Video, name: "Zoom", color: "#2D8CFF" },
  { icon: CreditCard, name: "Razorpay", color: "#0C6CF2" },
  { icon: Coffee, name: "HubSpot", color: "#FF7A59" },
  { icon: MessageSquare, name: "WhatsApp", color: "#25D366" },
];

const row3Integrations: Integration[] = [
  { icon: Table, name: "Airtable", color: "#FCB400" },
  { icon: BookOpen, name: "Notion", color: "#FFFFFF" },
  { icon: Headphones, name: "Zendesk", color: "#03B0A0" },
  { icon: Hash, name: "Slack", color: "#E01E5A" },
  { icon: Mail, name: "Mailchimp", color: "#FFE01B" },
  { icon: CreditCard, name: "Stripe", color: "#635BFF" },
  { icon: FileText, name: "Typeform", color: "#FFFFFF" },
  { icon: Calendar, name: "Calendly", color: "#006BFF" },
];

const IntegrationCard = ({ icon: Icon, name, color }: Integration) => (
  <div className="shrink-0 w-35 h-35 bg-white/4 border border-white/4 rounded-2xl flex flex-col items-center justify-center gap-3 mx-3 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-white/[0.07] cursor-pointer group">
    <Icon size={48} style={{ color }} className="transition-transform duration-300 group-hover:scale-110" />
    <span className="text-sm font-medium text-white/80">{name}</span>
  </div>
);

const ScrollingRow = ({
  integrations,
  direction,
}: {
  integrations: Integration[];
  direction: "left" | "right";
}) => {
  const duplicated = [...integrations, ...integrations];
  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex ${direction === "left" ? "animate-scroll-left" : "animate-scroll-right"} hover:[animation-play-state:paused]`}
        style={{ width: "max-content" }}
      >
        {duplicated.map((item, i) => (
          <IntegrationCard key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default function IntegrationsSection() {
  return (
    <section className="py-24 px-6 border-t border-white/4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="font-black text-white text-4xl md:text-5xl mb-4">
          Seamlessly Integrate With Your{" "}
          <span className="text-orange-500">Favorite Tools</span>
        </h2>
        <p className="text-white/40 text-base max-w-xl mx-auto">
          Connect with 50+ platforms to automate your workflow and streamline your business operations.
        </p>
      </div>

      <div className="space-y-6">
        <ScrollingRow integrations={row1Integrations} direction="left" />
        <ScrollingRow integrations={row2Integrations} direction="right" />
        <ScrollingRow integrations={row3Integrations} direction="left" />
      </div>
    </section>
  );
}