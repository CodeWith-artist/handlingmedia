"use client";

import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
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
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
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
              href="https://app.handlingmedia.io"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <p className="text-sm font-semibold text-white">
                WhatsApp CRM
              </p>

              <p className="mt-1 text-xs text-white/60">
                For D2C & Other Businesses
              </p>
            </Link>

          <Link
            href="https://app.handlingmedia.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
          >
            <p className="text-sm font-semibold text-white">
              Restaurant WhatsApp Panel
            </p>

            <p className="mt-1 text-xs text-white/60">
              Only for restaurants
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}