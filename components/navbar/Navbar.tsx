"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { FaGithub, FaYoutube, FaBars } from "react-icons/fa";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Logo } from "./Logo";
import { DesktopNavItem } from "./DesktopNavitem";
import { MobileMenu } from "./MobileMenu";
import { DESKTOP_NAV_ITEMS } from "./navconfig";
import { redirect } from "next/navigation";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 50);
    if (y > 10) setMobileOpen(false);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <>
      {/* Floating Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 pointer-events-none">
        <motion.nav
          animate={{ y: isScrolled ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "pointer-events-auto",
            "bg-[#1c1c21]/80 backdrop-blur-xl",
            "border border-white/10 rounded-full",
            "px-4 py-2.5 w-[90%] max-w-6xl",
            "flex items-center justify-between shadow-2xl"
          )}
        >
          {/* Left */}
          <div className="flex items-center">
            <Logo src="/hlogo.png" />

            <div className="hidden md:flex items-center gap-1">
              {DESKTOP_NAV_ITEMS.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  hasDropdown={item.hasDropdown}
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm
                                 text-gray-300 hover:text-white
                                 hover:bg-white/5 transition"
                    >
                      {child.label}
                    </Link>
                  ))}
                </DesktopNavItem>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <FaGithub className="text-white text-xl" />
              <FaYoutube className="text-white text-xl" />
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white text-xl p-2"
            >
              <FaBars />
            </button>

            <button onClick={() => {redirect("/login")}} className="hidden md:block cursor-pointer hover:scale-105 text-white border border-white/20 px-3 py-1.5 rounded-lg">
              Login
            </button>
            <button  className="hidden md:block bg-[#5a67d8] px-4 py-2 rounded-lg text-white">
              Get Started
            </button>
          </div>
        </motion.nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}