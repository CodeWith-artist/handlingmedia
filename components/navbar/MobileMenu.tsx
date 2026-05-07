import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PRODUCTS, MOBILE_NAV_LINKS } from "./navconfig";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileMenu = ({ isOpen, onClose }: Props) => {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c21]/95 max-w-[90%] mx-auto
                       backdrop-blur-2xl rounded-t-3xl border-t border-white/10"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
              <span className="text-white font-semibold text-lg">Menu</span>
              <button onClick={onClose} className="text-white text-xl">
                <FaTimes />
              </button>
            </div>

            {/* Links */}
            <div className="px-6 py-4 space-y-4">
              {/* Products nested dropdown */}
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex justify-between w-full text-gray-300 text-left"
              >
                Products
                <FaChevronDown
                  className={cn("transition-transform", productsOpen && "rotate-180")}
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
                    {PRODUCTS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block text-gray-400 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {MOBILE_NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-gray-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
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
  );
};