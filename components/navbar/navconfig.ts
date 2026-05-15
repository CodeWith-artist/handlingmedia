export type NavLink = {
  label: string;
  href: string;
};

export type NavItemConfig = NavLink & {
  hasDropdown?: boolean;
  children?: NavLink[];
};

export const SERVICES: NavLink[] = [
  { label: "WhatsApp Business API", href: "/services/whatsapp-business-api" },
  { label: "Custom Website Development", href: "/services/custom-website-development" },
  { label: "Mobile App Development", href: "/services/app-development" },
  { label: "Shopify Development", href: "/services/shopify-development" },
  { label: "WordPress Development", href: "/services/wordpress-development" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
];

export const SOLUTIONS: NavLink[] = [
  { label: "CRM & Automation", href: "/solutions/crm-automation" },
  { label: "E-commerce Solutions", href: "/solutions/ecommerce" },
  { label: "Booking & Appointment Systems", href: "/solutions/booking-systems" },
  { label: "Business Websites", href: "/solutions/business-websites" },
];

export const WHATSAPP_SOLUTIONS: NavLink[] = [
 
  { label: "WhatsApp API", href: "/services/whatsapp-business-api" },
  { label: "Chatbot Automation", href: "/services/chatbot-automation" },
  { label: "CRM Integration", href: "/services/crm-integration" },

];


export const DESKTOP_NAV_ITEMS: NavItemConfig[] = [
  {
    label: "Services",
    href: "",
    hasDropdown: true,
    children: SERVICES,
  },
  {
    label: "Solutions",
    href: "/solutions",
    hasDropdown: true,
    children: SOLUTIONS,
  },
  {
    label: "WhatsApp Solutions",
    href: "/whatsapp-business-api",
    hasDropdown: true,
    children : WHATSAPP_SOLUTIONS,
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];