import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  label: string;
  hasDropdown?: boolean;
  href?: string;
  children?: React.ReactNode;
};

export const DesktopNavItem = ({
  label,
  hasDropdown = false,
  href = "#",
  children,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="flex items-center gap-1 text-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#ff7300]/30 rounded-2xl transition px-2 py-2"
      >
        {label}
        {hasDropdown && (
          <FaChevronDown
            className={cn("text-[10px] transition-transform", open && "rotate-180")}
          />
        )}
      </Link>

      <AnimatePresence>
        {open && children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-10 w-56 rounded-xl
                       bg-[#1c1c21]/95 backdrop-blur-xl
                       border border-white/10 shadow-2xl p-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};