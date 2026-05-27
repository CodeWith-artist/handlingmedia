export type NavLink = {
  label: string;
  href: string;
};

export type NavItemConfig = NavLink & {
  hasDropdown?: boolean;
  children?: NavLink[];
};







export const DESKTOP_NAV_ITEMS: NavItemConfig[] = [

 
 
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
 
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];