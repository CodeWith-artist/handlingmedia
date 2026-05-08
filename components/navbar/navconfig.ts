export type NavLink = {
  label: string;
  href: string;
};

export type NavItemConfig = NavLink & {
  hasDropdown?: boolean;
  children?: NavLink[];
};

export const PRODUCTS: NavLink[] = [
  { label: "Prisma ORM", href: "#" },
  { label: "Prisma Postgres", href: "#" },
  { label: "Accelerate", href: "#" },
  { label: "Pulse", href: "#" },
];

export const DESKTOP_NAV_ITEMS: NavItemConfig[] = [
  { label: "Products", href: "/products", hasDropdown: true, children: PRODUCTS },
  { label: "Pricing", href: "/pricing" },
  { label: "Partners", href: "/partners" },
  { label: "Blog", href: "/blog" },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Pricing", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "/blog" },
];