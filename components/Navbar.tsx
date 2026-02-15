"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  FaGithub,
  FaYoutube,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ---------------------------------- */
/* Logo */
/* ---------------------------------- */
const Logo = ({ src }: { src: string }) => (
  <Link href="/" className="flex items-center gap-2 mr-8">
    <Image
      src={src}
      alt="Vercel Logo"
      width={32}
      height={32}
    />
    <span className="text-white font-semibold text-lg font-(family-name:--font-satoshi)">handlingmedia</span>
      
  </Link>
  
);

/* ---------------------------------- */
/* Desktop Nav Item */
/* ---------------------------------- */
const DesktopNavItem = ({
  label,
  hasDropdown = false,
  children,
}: {
  label: string;
  hasDropdown?: boolean;
  children?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-[15px] font-medium text-gray-300 hover:text-white transition px-2 py-2">
        {label}
        {hasDropdown && (
          <FaChevronDown
            className={cn(
              "text-[10px] transition-transform",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {open && children}
      </AnimatePresence>
    </div>
  );
};


const PRODUCTS = [
  { label: "Prisma ORM", href: "#" },
  { label: "Prisma Postgres", href: "#" },
  { label: "Accelerate", href: "#" },
  { label: "Pulse", href: "#" },
];



/* ---------------------------------- */
/* Navbar */
/* ---------------------------------- */
export default function Navbar() {
  const { scrollY } = useScroll();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  /* Scroll behavior */
  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 50);
    if (y > 10) setMobileOpen(false);
  });

  /* Lock body scroll on mobile menu */
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
              <DesktopNavItem label="Products" hasDropdown>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-3 w-56 rounded-xl
                            bg-[#1c1c21]/95 backdrop-blur-xl
                            border border-white/10 shadow-2xl p-2"
                >
                  {PRODUCTS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm
                                text-gray-300 hover:text-white
                                hover:bg-white/5 transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              </DesktopNavItem>

              <DesktopNavItem label="Pricing" />
              <DesktopNavItem label="Partners" />
              <DesktopNavItem label="Blog" />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4">
              <FaGithub className="text-white text-xl" />
              <FaYoutube className="text-white text-xl" />
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-white text-xl p-2"
            >
              <FaBars />
            </button>

            <button className="hidden md:block text-white border border-white/20 px-3 py-1.5 rounded-lg">
              Login
            </button>
            <button className="hidden md:block bg-[#5a67d8] px-4 py-2 rounded-lg text-white">
              Get Started
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ---------------------------------- */}
      {/* MOBILE BOTTOM SHEET */}
      {/* ---------------------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 "
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c21]/95 max-w-[90%] mx-auto
                         backdrop-blur-2xl rounded-t-3xl border-t border-white/10"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
                <span className="text-white font-semibold text-lg">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Links */}
              <div className="px-6 py-4 space-y-4">
                {/* Products (Nested Dropdown) */}
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex justify-between w-full text-gray-300 text-left"
                >
                  Products
                  <FaChevronDown
                    className={cn(
                      "transition-transform",
                      productsOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 overflow-hidden space-y-2 text-sm"
                    >
                      {[
                        "Prisma ORM",
                        "Prisma Postgres",
                        "Accelerate",
                        "Pulse",
                      ].map((item) => (
                        <Link
                          key={item}
                          href="#"
                          className="block text-gray-400 hover:text-white"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {["Pricing", "Resources", "Partners", "Docs", "Blog"].map(
                  (item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block text-gray-300 hover:text-white"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>

              {/* Actions */}
              <div className="px-6 py-6 border-t border-white/10 space-y-3">
                <button className="w-full border border-white/20 py-2 rounded-lg text-white">
                  Login
                </button>
                <button className="w-full bg-[#5a67d8] py-2 rounded-lg text-white">
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
