const SERVICES = [
  { value: "",                              label: "Select a service…"              },
  { value: "whatsapp-business-api",         label: "WhatsApp Business API"          },
 
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
    value: "creator@handlingmedia.com",
    href:  "mailto:creator@handlingmedia.com",
  },
  {
    icon: "📞",
    label: "Call us",
    value: "+91 9205606143",
    href:  "tel:+919205606143",
  },
  {
    icon: "⚡",
    label: "Response time",
    value: "Within 4 hours",
    href:  null,
  },
];

export { SERVICES, BUDGETS, TIMELINES, CONTACT_INFO };