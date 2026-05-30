import { Phone, Zap } from "lucide-react";
import { MdEmail } from "react-icons/md";

const SERVICES = [
  { value: "",                              label: "Select a service…"              },
  { value: "whatsapp-panel-for-restaurants",         label: "All-in-One WhatsApp Panel for Restaurant Management"          },
  { value: "whatsapp-ai-agent-for-brands",         label: "WhatsApp AI Agent for D2C Brands & Businesses"          },
 
];

const BUDGETS = [
  { value: "",          label: "Monthly budget…"   },
  { value: "under-10k", label: "Under ₹10,000"     },
  { value: "10-25k",    label: "₹10,000 – ₹25,000" },
  { value: "25-50k",    label: "₹25,000 – ₹50,000" },
  { value: "50-100k",   label: "₹50,000 – ₹1 Lakh" },
  { value: "above-1l",  label: "Above ₹1 Lakh"     },
];

const TIMELINES = [
  { value: "",          label: "Timeline…"          },
  { value: "asap",      label: "ASAP"               },
  { value: "1-month",   label: "Within 1 month"     },
  { value: "1-3months", label: "1–3 months"         },
  { value: "3plus",     label: "3+ months"          },
  { value: "exploring", label: "Just exploring"     },
];

const CONTACT_INFO = [
  {
    icon: MdEmail,
    label: "Email us",
    value: "info@handlingmedia.io",
    href:  "mailto:info@handlingmedia.io",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 9205606143",
    href:  "tel:+919205606143",
  },
  {
    icon: Zap,
    label: "Response time",
    value: "Within 4 hours",
    href:  null,
  },
];

export { SERVICES, BUDGETS, TIMELINES, CONTACT_INFO };