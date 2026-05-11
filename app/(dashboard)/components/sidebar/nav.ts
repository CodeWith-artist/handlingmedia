import { Role } from "@/generated/prisma/client";

export interface NavItem {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  href?: string;
  badge?: string | number;
  badgeVariant?: "default" | "success" | "warning" | "danger";
  children?: NavItem[];
  disabled?: boolean;
  role?: Role[] | "ALL"; // Optional array of roles that can access this item
}

export interface NavGroup {
  groupLabel?: string;
  role?: Role[] | "ALL"; // Optional array of roles that can access this group  
  items: NavItem[];
}