"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  size?: "default" | "lg";
}

export const ThemeToggle = ({ size = "default" }: ThemeToggleProps) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => setMounted(true), []);

  // Structural mappings based on the size prop
  const isLg = size === "lg";
  const dims = isLg ? "w-11 h-11" : "w-9 h-9";
  const border = isLg ? "border-[3px]" : "border-[2px]";
  const iconSize = isLg ? "w-5 h-5" : "w-4 h-4";

  // Match the header's aggressive hover physics for "lg", keep default for standard
  const physics = isLg
    ? "shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[3px_3px_0px_0px_#0A0A0A] dark:hover:shadow-[3px_3px_0px_0px_#FBBF24] hover:-translate-y-1 bg-white dark:bg-[#111]"
    : "shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 bg-white dark:bg-white/10";

  // SSR Fallback
  if (!mounted) {
    return (
      <div
        className={`${dims} rounded-full ${border} border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-[#111]`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden md:block absolute top-full mt-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap pointer-events-none z-[100] border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[2px_2px_0px_0px_#2563EB]"
          >
            {isDark ? "Light Mode (Be Prepared 🫣)" : "Dark Mode"}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A0A0A] dark:bg-white rotate-45 border-l-[2px] border-t-[2px] border-[#0A0A0A] dark:border-white/20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={() => {
          toggleTheme();
          setShowTooltip(false);
        }}
        className={`relative ${dims} cursor-pointer rounded-full ${border} border-[#0A0A0A] dark:border-white/20 flex items-center justify-center ${physics} transition-all overflow-hidden group`}
        whileTap={{ scale: 0.9 }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* SUN */}
          <motion.div
            initial={false}
            animate={{
              opacity: isDark ? 1 : 0,
              rotate: isDark ? 0 : -180,
              scale: isDark ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className={`${iconSize} text-[#FBBF24]`} strokeWidth={2.5} />
          </motion.div>

          {/* MOON */}
          <motion.div
            initial={false}
            animate={{
              opacity: isDark ? 0 : 1,
              rotate: isDark ? 180 : 0,
              scale: isDark ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className={`${iconSize} text-[#2563EB]`} strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Dynamic Glow Ring */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${
              isDark
                ? "shadow-[0_0_14px_#FBBF24,inset_0_0_8px_rgba(251,191,36,0.25)]"
                : "shadow-[0_0_14px_#2563EB,inset_0_0_8px_rgba(37,99,235,0.2)]"
            }`}
          />
        </div>
      </motion.button>
    </div>
  );
};
