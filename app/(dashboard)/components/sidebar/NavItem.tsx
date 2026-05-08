"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { NavItem as NavItemType } from "./nav";
import { cn } from "@/lib/cn";

interface NavItemProps {
  item: NavItemType;
  depth?: number;
  defaultOpen?: boolean;
}

const badgeStyles: Record<string, string> = {
  default: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
  danger:  "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400 animate-pulse",
};

function getIcon(name: string, className?: string) {
  const Icon = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

function isAncestorOfActive(item: NavItemType, pathname: string): boolean {
  if (item.href && pathname.startsWith(item.href) && item.href !== "/dashboard") return true;
  if (item.children) return item.children.some((c) => isAncestorOfActive(c, pathname));
  return false;
} 

export function NavItem({ item, depth = 0, defaultOpen = false }: NavItemProps) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const isActive = item.href ? pathname === item.href : false;
  const isAncestor = isAncestorOfActive(item, pathname);
  

  const [open, setOpen] = useState(defaultOpen || isAncestor);
  
  const toggle = useCallback(() => {
    if (hasChildren) setOpen((o) => !o);
  }, [hasChildren]);

  const indentPx = depth * 12;

  const itemContent = (
    <span className="flex items-center gap-2.5 w-full min-w-0">
      {/* Icon */}
      <span
        className={cn(
          "shrink-0 transition-colors duration-200",
          isActive
            ? "text-cyan-400"
            : "text-slate-500 group-hover:text-slate-200"
        )}
      >
        {getIcon(item.icon, "w-[18px] h-[18px]")}
      </span>

      {/* Label */}
      <span className="shrink-0 truncate text-[13.5px] font-medium tracking-wide">
        {item.label}
      </span>

      {/* Badge */}
      {item.badge !== undefined && (
        <span
          className={cn(
            "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
            badgeStyles[item.badgeVariant ?? "default"]
          )}
        >
          {item.badge}
        </span>
      )}

      {/* Chevron for parents */}
      {hasChildren && (
        <span
          className={cn(
            "shrink-0 transition-transform duration-200 text-slate-500",
            open && "rotate-90"
          )}
        >
          {getIcon("ChevronRight", "w-3.5 h-3.5")}
        </span>
      )}
    </span>
  );

  const sharedClass = cn(
    "group relative flex w-full items-center rounded-lg px-3 py-2 cursor-pointer select-none transition-all duration-150",
    depth === 0
      ? "text-slate-300"
      : "text-slate-400",
    isActive
      ? "bg-cyan-500/10 text-cyan-300 font-semibold"
      : "hover:bg-white/5 hover:text-slate-100",
    item.disabled && "pointer-events-none opacity-40"
  );

  return (
    <li className="w-full">
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-cyan-400" />
      )}

      <div style={{ paddingLeft: `${indentPx}px` }} className="relative">
        {hasChildren ? (
          <button onClick={toggle} className={sharedClass} aria-expanded={open}>
            {itemContent}
          </button>
        ) : (
          <Link href={item.href ?? "#"} className={sharedClass}>
            {itemContent}
          </Link>
        )}
      </div>

      {/* Children — animated expand/collapse */}
      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-200 ease-in-out",
            open ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {/* Connector line */}
          <ul
            className="relative mt-0.5 space-y-0.5"
            style={{ paddingLeft: `${indentPx + 20}px` }}
          >
            <span
              className="absolute top-0 bottom-2 w-px bg-slate-700/60"
              style={{ left: `${indentPx + 14}px` }}
            />
            {item.children!.map((child) => (
              <NavItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}