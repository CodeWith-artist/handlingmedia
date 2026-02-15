
import { MessageSquare, Instagram, Facebook, ShoppingBag, FileSpreadsheet, Video, Mail, Globe, Coffee, BookOpen, Headphones, CreditCard, Phone } from "lucide-react";

const IntegrationLogo = ({ icon: Icon, name, serviceType = 'default' }: { icon: React.ComponentType<{ size: number; className: string }>; name: string; serviceType?: string }) => {
  // Define service-specific border colors and icon colors
  const getServiceColors = (service: string) => {
    switch (service.toLowerCase()) {
      case 'whatsapp':
        return {
          border: 'border-green-500/60 hover:border-green-500/80 hover:shadow-green-500/30',
          icon: 'text-green-400 group-hover:text-green-300',
          shadow: 'shadow-green-500/20'
        };
      case 'meta':
      case 'facebook':
        return {
          border: 'border-blue-600/60 hover:border-blue-600/80 hover:shadow-blue-600/30',
          icon: 'text-blue-400 group-hover:text-blue-300',
          shadow: 'shadow-blue-600/20'
        };
      case 'shopify':
        return {
          border: 'border-green-600/60 hover:border-green-600/80 hover:shadow-green-600/30',
          icon: 'text-green-500 group-hover:text-green-400',
          shadow: 'shadow-green-600/20'
        };
      case 'google sheets':
        return {
          border: 'border-green-500/60 hover:border-green-500/80 hover:shadow-green-500/30',
          icon: 'text-green-400 group-hover:text-green-300',
          shadow: 'shadow-green-500/20'
        };
      case 'zoom':
        return {
          border: 'border-blue-500/60 hover:border-blue-500/80 hover:shadow-blue-500/30',
          icon: 'text-blue-400 group-hover:text-blue-300',
          shadow: 'shadow-blue-500/20'
        };
      case 'instagram':
        return {
          border: 'border-pink-500/60 hover:border-pink-500/80 hover:shadow-pink-500/30',
          icon: 'text-pink-400 group-hover:text-pink-300',
          shadow: 'shadow-pink-500/20'
        };
      case 'wordpress':
        return {
          border: 'border-blue-700/60 hover:border-blue-700/80 hover:shadow-blue-700/30',
          icon: 'text-blue-500 group-hover:text-blue-400',
          shadow: 'shadow-blue-700/20'
        };
      case 'gmail':
        return {
          border: 'border-red-500/60 hover:border-red-500/80 hover:shadow-red-500/30',
          icon: 'text-red-400 group-hover:text-red-300',
          shadow: 'shadow-red-500/20'
        };
      case 'razorpay':
        return {
          border: 'border-blue-500/60 hover:border-blue-500/80 hover:shadow-blue-500/30',
          icon: 'text-blue-400 group-hover:text-blue-300',
          shadow: 'shadow-blue-500/20'
        };
      case 'hubspot':
        return {
          border: 'border-orange-500/60 hover:border-orange-500/80 hover:shadow-orange-500/30',
          icon: 'text-orange-400 group-hover:text-orange-300',
          shadow: 'shadow-orange-500/20'
        };
      case 'notion':
        return {
          border: 'border-gray-500/60 hover:border-gray-500/80 hover:shadow-gray-500/30',
          icon: 'text-gray-400 group-hover:text-gray-300',
          shadow: 'shadow-gray-500/20'
        };
      case 'zendesk':
        return {
          border: 'border-green-700/60 hover:border-green-700/80 hover:shadow-green-700/30',
          icon: 'text-green-500 group-hover:text-green-400',
          shadow: 'shadow-green-700/20'
        };
      default:
        return {
          border: 'border-brand-orange/60 hover:border-brand-orange/80 hover:shadow-brand-orange/30',
          icon: 'text-brand-orange group-hover:text-orange-300',
          shadow: 'shadow-brand-orange/20'
        };
    }
  };

  const colors = getServiceColors(name);

  return (
    <div className="flex flex-col items-center justify-center group">
      <div className={`bg-linear-to-br from-gray-900/80 via-gray-900/60 to-gray-800/40 p-5 rounded-2xl border-2 ${colors.border} transition-all duration-300 glass-card backdrop-blur-lg hover:scale-105 shadow-lg ${colors.shadow}`}>
        <div className="w-12 h-12 flex items-center justify-center">
          <Icon size={38} className={`${colors.icon} group-hover:scale-110 transition-all duration-300`} />
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-400 group-hover:text-white transition-colors">{name}</p>
    </div>
  );
};

const IntegrationsSection = () => {
  const integrations = [
    { icon: MessageSquare, name: "WhatsApp" },
    { icon: Facebook, name: "Meta" },
    { icon: ShoppingBag, name: "Shopify" },
    { icon: FileSpreadsheet, name: "Google Sheets" },
    { icon: Video, name: "Zoom" },
    { icon: Instagram, name: "Instagram" },
    { icon: Globe, name: "WordPress" },
    { icon: Mail, name: "Gmail" },
    { icon: CreditCard, name: "Razorpay" },
    { icon: Coffee, name: "HubSpot" },
    { icon: BookOpen, name: "Notion" },
    { icon: Headphones, name: "Zendesk" },
  ];

  return (
    <section id="integrations" className=" relative">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-orange text-sm uppercase tracking-wider font-semibold">Our AI Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
            Powerful <span className="text-gradient">Integrations</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We integrate our WhatsApp platform with 25+ popular services including Shopify, Razorpay, Meta, Gmail, 
            and Google Sheets to provide a comprehensive solution for your business.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {integrations.map((integration, index) => (
            <IntegrationLogo 
              key={index}
              icon={integration.icon}
              name={integration.name}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">Our platform seamlessly integrates with 25+ popular business tools and services</p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;