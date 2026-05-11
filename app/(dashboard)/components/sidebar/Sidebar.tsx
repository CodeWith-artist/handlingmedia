"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import { cn } from "@/lib/cn";
import { NavItem } from "./NavItem";
import { navConfig } from "./nav-config";
import { logoutAction } from "@/lib/auth/actions";
import { filterNavByRole } from "@/lib/filter-nav";
import { Role } from "@/generated/prisma/client";
interface SidebarProps {
  className?: string;
  session: {
    email: string;
    role: string;
  } | null;
}

function getIcon(name: string, className?: string) {
  const Icon = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}





export  function  Sidebar({ className , session }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { email, role } = session || { email: "Guest", role: "Visitor" };

  const handleLogout = async () => {
    await logoutAction();
  };
  const filteredNav = navConfig
  .filter((group) => {
    // If group has no role restriction
    if (!group.role) return true;

    // Check group access
    return group.role.includes(role as Role);
  })
  .map((group) => ({
    ...group,

    // Filter items recursively
    items: filterNavByRole(group.items, role),
  }))
  .filter((group) => group.items.length > 0);
  
  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-[#0d1117] border-r border-white/5 transition-[width] duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* ── Logo ───────────────────────────────────────────── */}
      <div className="flex items-center h-16 px-4 border-b border-white/5 shrink-0 gap-3 overflow-hidden">
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
            {getIcon("Waves", "w-4 h-4 text-cyan-400")}
          </div>
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <p className="text-sm font-bold text-white truncate leading-tight">HandlingMedia</p>
              <p className="text-[10px] text-slate-500 truncate leading-tight">Ultrasound Training</p>
            </div>
          )}
        </Link>
      </div>

      {/* ── Nav ────────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {filteredNav.map((group, gi) => (
          <div key={gi}>
            {group.groupLabel && !collapsed && (
              <p className="px-3 mb-1 text-[10px] uppercase tracking-[0.12em] font-semibold text-slate-600">
                {group.groupLabel}
              </p>
            )}
            {group.groupLabel && collapsed && (
              <div className="mx-auto mb-1 w-6 h-px bg-slate-700/60" />
            )}
            <ul className="space-y-0.5 relative">
              {group.items.map((item) => (
                collapsed ? (
                  /* collapsed: icon only with tooltip */
                  
                  <li key={item.id} className="group relative">
                    <Link
                      href={item.href ?? "#"}
                      className="flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150"
                      title={item.label}
                    >
                      {getIcon(item.icon, "w-[18px] h-[18px]")}
                    </Link>
                    {/* Tooltip */}
                    <span className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 whitespace-nowrap rounded-md bg-slate-800 border border-white/10 px-2.5 py-1.5 text-xs font-medium text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-xl">
                      {item.label}
                    </span>
                  </li>
                ) : (
                  <NavItem key={item.id} item={item} depth={0} />
                )
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User footer ────────────────────────────────────── */}
      <div className="shrink-0 border-t border-white/5 p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors duration-150",
            collapsed && "justify-center"
          )}
        >
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
              M
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#0d1117]" />
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">{email}</p>
              <p className="text-[10px] text-slate-500 truncate">{role}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={handleLogout} className="text-slate-600 hover:text-slate-300 cursor-pointer shrink-0 transition-colors duration-150">
              {getIcon("LogOut", "w-3.5 h-3.5")}
            </button>
          )}
        </div>
      </div>

      {/* ── Collapse toggle ────────────────────────────────── */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-20 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-white/10 text-slate-400 hover:text-slate-100 hover:bg-slate-700 shadow-lg transition-all duration-150"
        aria-label="Toggle sidebar"
      >
        {getIcon(collapsed ? "ChevronRight" : "ChevronLeft", "w-3 h-3")}
      </button>
    </aside>
  );
}