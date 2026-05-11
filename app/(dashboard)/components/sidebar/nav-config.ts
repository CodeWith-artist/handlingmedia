import { NavGroup } from "./nav";

export const navConfig: NavGroup[] = [
  {
    groupLabel: "Dashboard",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "LayoutDashboard",
        href: "/dashboard",
      },
    ],
  },
  {
    groupLabel: "Blog",
    items: [
      {
        id: "blog",
        label: "Blog",
        icon: "BookOpen",
        role: ["ADMIN", "MARKETING"],
        children: [
          {
            id: "blog-all",
            role: ["ADMIN", "MARKETING"],
            label: "All Posts",
            icon: "List",
            href: "/dashboard/blog",
          },
          {
            id: "blog-create",
            role: ["ADMIN", "MARKETING"],
            label: "Create Post",
            icon: "PlusCircle",
            href: "/dashboard/blog/new",
          },
          {
            id: "categories",
            role: ["ADMIN"],
            label: "Create Categories",
            icon: "Tag",
            href: "/dashboard/blog/categories",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "Users",
    role: ["ADMIN"],
    items: [
      {
        id: "users",
        label: "Users",
        icon: "Users",
        href: "/dashboard/users",
        role: ["ADMIN"],
        children: [
          {
            id: "users-all",
            label: "All Users",
            icon: "List",
            href: "/dashboard/users",
            role: ["ADMIN"],
          },
          
        ],
      },
    ],
  },
    
];