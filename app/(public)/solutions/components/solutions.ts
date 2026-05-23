
import {
  Building2,
  CalendarDays,
  Dumbbell,
  GraduationCap,
  Stethoscope,
  ShoppingCart,
  UtensilsCrossed,
    Car,
    HardHat,
    Plane,
    School,
    Scissors,
    Hotel,
    Scale,
    Truck,
    Megaphone,
    Briefcase,
    HeartHandshake,
    Camera,
    Newspaper,
    Store,
    Users,
    Wallet,
    ShieldCheck,
    PawPrint,
    Sofa,
    Factory,
    Cloud,
    Bitcoin,
    MessageCircle,
} from "lucide-react";

const solutions = [
  {
    title: "Gym & Fitness Website",
    description:
      "Modern fitness websites with membership plans, trainer profiles, class booking, and lead generation.",
    icon: Dumbbell,
    features: [
      "Online Membership",
      "Class Scheduling",
      "Trainer Showcase",
      "Lead Collection",
    ],
  },
  {
    title: "Doctor Consultation App",
    description:
      "Healthcare consultation platforms with appointment booking, patient dashboard, and secure communication.",
    icon: Stethoscope,
    features: [
      "Appointment Booking",
      "Patient Dashboard",
      "Video Consultation",
      "Admin Panel",
    ],
  },
  {
    title: "E-Commerce Store",
    description:
      "Scalable online stores with product management, payment integration, and mobile-first shopping experience.",
    icon: ShoppingCart,
    features: [
      "Product Management",
      "Secure Payments",
      "Order Tracking",
      "Inventory System",
    ],
  },
  {
    title: "Online Learning Platform",
    description:
      "Educational platforms for courses, live classes, student management, and progress tracking.",
    icon: GraduationCap,
    features: [
      "Course System",
      "Student Dashboard",
      "Live Classes",
      "Progress Tracking",
    ],
  },
  {
    title: "Restaurant Ordering System",
    description:
      "Food ordering and restaurant management systems with online menu, table booking, and delivery tracking.",
    icon: UtensilsCrossed,
    features: [
      "Online Orders",
      "Table Booking",
      "Delivery Tracking",
      "Menu Management",
    ],
  },
  {
    title: "Real Estate Platform",
    description:
      "Property listing platforms with virtual tours, inquiry systems, and property management dashboards.",
    icon: Building2,
    features: [
      "Property Listings",
      "Lead Management",
      "Virtual Tours",
      "Agent Dashboard",
    ],
  },
  {
    title: "Salon & Spa Booking App",
    description:
      "Beauty and wellness booking platforms with appointment scheduling and customer management.",
    icon: Scissors,
    features: [
      "Appointment Booking",
      "Staff Management",
      "Customer Profiles",
      "Online Payments",
    ],
  },
  {
    title: "Hotel Booking Website",
    description:
      "Hotel reservation systems with room booking, payment integration, and guest management.",
    icon: Hotel,
    features: [
      "Room Booking",
      "Guest Dashboard",
      "Payment Gateway",
      "Availability Calendar",
    ],
  },
  {
    title: "Travel Agency Website",
    description:
      "Travel booking platforms with tour packages, itinerary management, and customer inquiries.",
    icon: Plane,
    features: [
      "Tour Packages",
      "Booking System",
      "Inquiry Forms",
      "Travel Management",
    ],
  },
  {
    title: "School Management System",
    description:
      "Digital school platforms with attendance tracking, fee management, and parent communication.",
    icon: School,
    features: [
      "Attendance Tracking",
      "Student Records",
      "Fee Management",
      "Parent Portal",
    ],
  },
  {
    title: "Construction Company Website",
    description:
      "Professional websites for builders and contractors with portfolio showcase and project tracking.",
    icon: HardHat,
    features: [
      "Project Showcase",
      "Quote Requests",
      "Team Profiles",
      "Lead Forms",
    ],
  },
  {
    title: "Car Rental Platform",
    description:
      "Vehicle rental systems with booking management, fleet tracking, and payment solutions.",
    icon: Car,
    features: [
      "Vehicle Booking",
      "Fleet Management",
      "Online Payments",
      "Customer Dashboard",
    ],
  },
  {
    title: "Event Management Platform",
    description:
      "Platforms for organizing events with ticket booking, attendee management, and live updates.",
    icon: CalendarDays,
    features: [
      "Event Booking",
      "Ticket System",
      "Attendee Management",
      "Live Notifications",
    ],
  },
  {
    title: "Law Firm Website",
    description:
      "Professional legal websites with appointment booking and case inquiry systems.",
    icon: Scale,
    features: [
      "Consultation Booking",
      "Case Inquiry",
      "Lawyer Profiles",
      "Secure Contact Forms",
    ],
  },
  {
    title: "Logistics & Delivery System",
    description:
      "Shipment and logistics management platforms with order tracking and fleet monitoring.",
    icon: Truck,
    features: [
      "Live Tracking",
      "Order Management",
      "Fleet Monitoring",
      "Delivery Dashboard",
    ],
  },
  {
    title: "Digital Marketing Agency Website",
    description:
      "Agency websites with portfolio showcase, lead capture, and service management.",
    icon: Megaphone,
    features: [
      "Portfolio Showcase",
      "Lead Generation",
      "Service Packages",
      "Analytics Dashboard",
    ],
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio websites for creators, freelancers, and professionals.",
    icon: Briefcase,
    features: [
      "Project Showcase",
      "Contact Forms",
      "Resume Section",
      "Client Testimonials",
    ],
  },
  {
    title: "NGO & Charity Platform",
    description:
      "Donation and awareness platforms for non-profit organizations.",
    icon: HeartHandshake,
    features: [
      "Donation System",
      "Campaign Management",
      "Volunteer Registration",
      "Impact Reports",
    ],
  },
  {
    title: "Photography Website",
    description:
      "Modern portfolio and booking websites for photographers and studios.",
    icon: Camera,
    features: [
      "Gallery Showcase",
      "Booking System",
      "Client Delivery",
      "Photo Albums",
    ],
  },
  {
    title: "News & Media Portal",
    description:
      "Content publishing platforms with article management and advertising integration.",
    icon: Newspaper,
    features: [
      "Article Publishing",
      "Admin CMS",
      "Ad Management",
      "User Subscriptions",
    ],
  },
  {
    title: "Multi-Vendor Marketplace",
    description:
      "Marketplace platforms where multiple sellers can manage products and orders.",
    icon: Store,
    features: [
      "Vendor Dashboard",
      "Commission System",
      "Product Listings",
      "Order Management",
    ],
  },
  {
    title: "HR & Recruitment Platform",
    description:
      "Hiring systems for job listings, applicant tracking, and employee management.",
    icon: Users,
    features: [
      "Job Listings",
      "Applicant Tracking",
      "Interview Scheduling",
      "HR Dashboard",
    ],
  },
  {
    title: "Finance & Accounting App",
    description:
      "Financial management platforms for invoices, expenses, and analytics.",
    icon: Wallet,
    features: [
      "Invoice System",
      "Expense Tracking",
      "Financial Reports",
      "Analytics Dashboard",
    ],
  },
  {
    title: "Insurance Company Website",
    description:
      "Insurance platforms with quote calculators and policy management systems.",
    icon: ShieldCheck,
    features: [
      "Policy Management",
      "Quote Calculator",
      "Claims Tracking",
      "Customer Portal",
    ],
  },
  {
    title: "Pet Care & Veterinary Platform",
    description:
      "Veterinary appointment and pet management systems for clinics and pet services.",
    icon: PawPrint,
    features: [
      "Pet Profiles",
      "Appointment Booking",
      "Vaccination Tracking",
      "Online Consultation",
    ],
  },
  {
    title: "Interior Design Website",
    description:
      "Creative websites for interior designers with project galleries and consultations.",
    icon: Sofa,
    features: [
      "Project Gallery",
      "Consultation Booking",
      "Service Showcase",
      "Lead Forms",
    ],
  },
  {
    title: "Manufacturing Management System",
    description:
      "Industrial management platforms for inventory, production, and workforce monitoring.",
    icon: Factory,
    features: [
      "Inventory Tracking",
      "Production Reports",
      "Employee Management",
      "Supply Monitoring",
    ],
  },
  {
    title: "Subscription SaaS Platform",
    description:
      "Software-as-a-service platforms with subscriptions, dashboards, and user billing.",
    icon: Cloud,
    features: [
      "Subscription Billing",
      "User Dashboard",
      "Analytics",
      "Role Management",
    ],
  },
  {
    title: "Crypto & Fintech Platform",
    description:
      "Modern fintech apps for transactions, analytics, and digital wallet systems.",
    icon: Bitcoin,
    features: [
      "Wallet System",
      "Transaction Tracking",
      "Analytics Dashboard",
      "Secure Authentication",
    ],
  },
  {
    title: "Community & Social Platform",
    description:
      "Online communities with profiles, messaging, and content sharing.",
    icon: MessageCircle,
    features: [
      "User Profiles",
      "Messaging System",
      "Content Sharing",
      "Community Groups",
    ],
  },
];

export default solutions;