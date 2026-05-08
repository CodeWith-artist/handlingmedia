import { NavGroup } from "./nav";

export const navConfig: NavGroup[] = [
  {
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
            label: "All Posts",
            icon: "List",
            href: "/dashboard/blog",
          },
          {
            id: "blog-create",
            label: "Create Post",
            icon: "PlusCircle",
            href: "/dashboard/blog/new",
          },
        ],
      },
    ],
  },
  {
    groupLabel: "Users",
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
          },
          
        ],
      },
    ],
  },
    
];