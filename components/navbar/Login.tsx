"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Login() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative  md:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger Button */}
      <button
        className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-all text-white border border-white/20 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm"
      >
        Login
        {/* <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        /> */}
      </button>

      {/* Dropdown Card */}
      <div
        className={`absolute top-12 right-0 w-64 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-3 shadow-2xl transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        }`}
      >
        <div className="space-y-2">
          <Link
            href="/login/b2b"
            className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <p className="text-sm font-semibold text-white">
              B2B Dashboard
            </p>

            <p className="mt-1 text-xs text-white/60">
              Manage clients, CRM, WhatsApp API & business tools.
            </p>
          </Link>

          <Link
            href="/login/d2c"
            className="block rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <p className="text-sm font-semibold text-white">
              D2C Portal
            </p>

            <p className="mt-1 text-xs text-white/60">
              Access customer accounts, orders & support.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}