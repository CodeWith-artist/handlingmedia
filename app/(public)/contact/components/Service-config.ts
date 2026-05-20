const SERVICES = [
  { value: "",                              label: "Select a service…"              },
  { value: "whatsapp-business-api",         label: "WhatsApp Business API"          },
  { value: "web-development",               label: "Custom Website Development"     },
  { value: "app-development",               label: "Mobile App Development"         },
  { value: "shopify-development",           label: "Shopify Development"            },
  { value: "wordpress-development",         label: "WordPress Development"          },
  { value: "ui-ux-design",                  label: "UI / UX Design"                 },
  { value: "crm-automation",                label: "CRM & Automation"               },
  { value: "ecommerce",                     label: "E-commerce Solutions"           },
  { value: "booking-systems",               label: "Booking & Appointment Systems"  },
  { value: "chatbot-automation",            label: "Chatbot Automation"             },
  { value: "crm-integration",               label: "CRM Integration"                },
  { value: "not-sure",                      label: "Not sure yet — need guidance"   },
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
    icon: "✉",
    label: "Email us",
    value: "hello@handlingmedia.com",
    href:  "mailto:hello@handlingmedia.com",
  },
  {
    icon: "📞",
    label: "Call us",
    value: "+91 98765 43210",
    href:  "tel:+919876543210",
  },
  {
    icon: "⚡",
    label: "Response time",
    value: "Within 4 hours",
    href:  null,
  },
];

export { SERVICES, BUDGETS, TIMELINES, CONTACT_INFO };