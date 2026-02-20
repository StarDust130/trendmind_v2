"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  Sparkles,
  Wrench,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const Logo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0" />
  </svg>
);

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Content Strategy",
    href: "/strategy",
    icon: <BrainCircuit size={20} />,
  },
  {
    name: "Post Calendar",
    href: "/calendar",
    icon: <CalendarDays size={20} />,
  },
  { name: "Content Gen", href: "/generate", icon: <Sparkles size={20} /> },
  { name: "Creator Tools", href: "/tools", icon: <Wrench size={20} /> },
];

const upcomingItems = [
  { name: "Analytics", icon: <BarChart3 size={20} /> },
  { name: "Community", icon: <Users size={20} /> },
];

export function Sidebar({ isMobileOpen, setIsMobileOpen }: any) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? "80px" : "280px",
        x: isMobileOpen ? 0 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
        fixed inset-y-0 left-0 z-50 lg:relative
        h-screen shrink-0 bg-[#FAFAFA] dark:bg-[#050505] border-r-[3px] border-[#0A0A0A] dark:border-white/10 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* ─── DESKTOP TOGGLE BUTTON ─── */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-4 top-8 w-8 h-8 bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-full items-center justify-center hover:bg-[#FBBF24] hover:text-[#0A0A0A] transition-colors shadow-[2px_2px_0px_0px_#0A0A0A] z-[60]"
      >
        {isCollapsed ? (
          <ChevronRight size={16} strokeWidth={3} />
        ) : (
          <ChevronLeft size={16} strokeWidth={3} />
        )}
      </button>

      {/* ─── MOBILE CLOSE BUTTON ─── */}
      <button
        onClick={() => setIsMobileOpen(false)}
        className="lg:hidden absolute top-6 right-4 p-2 text-slate-500 hover:text-[#0A0A0A] dark:hover:text-white z-[60]"
      >
        <X size={24} strokeWidth={2.5} />
      </button>

      {/* ─── WRAPPER (No Overflow Hidden) ─── */}
      <div className="flex flex-col h-full">
        {/* BRANDING */}
        <div className="h-24 flex items-center px-6 shrink-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-[#2563EB]"
          >
            <Logo />
            {!isCollapsed && (
              <span className="text-[#0A0A0A] dark:text-white font-black uppercase tracking-widest text-lg whitespace-nowrap">
                TrendMind
              </span>
            )}
          </Link>
        </div>

        {/* NAVIGATION */}
        {/* Critical Fix: Removed all overflow classes so tooltips can break out */}
        <nav className="flex-1 px-4 space-y-1.5 pb-8 flex flex-col">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative block"
              >
                <div
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl border-[3px] transition-all ${
                    isActive
                      ? "bg-[#2563EB] border-[#0A0A0A] dark:border-[#2563EB] text-white shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(37,99,235,0.4)]"
                      : "bg-transparent border-transparent text-[#0A0A0A]/60 dark:text-white/50 hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`${isActive ? "text-white" : "group-hover:text-[#2563EB] transition-colors"}`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-bold text-sm uppercase tracking-wider whitespace-nowrap ${isCollapsed ? "hidden lg:hidden" : "block"}`}
                  >
                    {item.name}
                  </span>
                </div>

                {/* ANIMATED TOOLTIP (Breaks out of container) */}
                {isCollapsed && (
                  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] text-[10px] font-black uppercase tracking-widest rounded-lg border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[3px_3px_0px_0px_#2563EB] pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap w-max z-[100]">
                    {item.name}
                    <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] dark:bg-white rotate-45 border-l-[2px] border-b-[2px] border-[#0A0A0A] dark:border-white/20" />
                  </div>
                )}
              </Link>
            );
          })}

          <div className="py-4 px-4">
            <div className="h-[2px] w-full bg-[#0A0A0A]/10 dark:bg-white/10 rounded-full" />
          </div>

          {/* COMING SOON */}
          <div
            className={`px-3 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ${isCollapsed ? "hidden lg:hidden" : "block"}`}
          >
            In Development
          </div>
          {upcomingItems.map((item) => (
            <div key={item.name} className="group relative">
              <div className="flex items-center justify-between px-3 py-3 rounded-xl border-[2px] border-transparent text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span
                    className={`font-bold text-sm uppercase tracking-wider whitespace-nowrap ${isCollapsed ? "hidden lg:hidden" : "block"}`}
                  >
                    {item.name}
                  </span>
                </div>
                {!isCollapsed && (
                  <span className="px-1.5 py-0.5 bg-[#FBBF24] text-[#0A0A0A] text-[8px] font-black uppercase rounded shadow-[1px_1px_0px_0px_#0A0A0A]">
                    Coming Soon 🚧
                  </span>
                )}
              </div>

              {isCollapsed && (
                <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] text-[10px] font-black uppercase tracking-widest rounded-lg border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[3px_3px_0px_0px_#FBBF24] pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap w-max z-[100]">
                  {item.name} (Coming Soon 🚧)
                  <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] dark:bg-white rotate-45 border-l-[2px] border-b-[2px] border-[#0A0A0A] dark:border-white/20" />
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* SETTINGS (BOTTOM ANCHORED) */}
        <div className="p-4 border-t-[3px] border-[#0A0A0A]/10 dark:border-white/10 shrink-0">
          <Link href="/settings" className="group relative block">
            <div
              className={`flex items-center gap-3 px-3 py-3 rounded-xl border-[3px] transition-all ${
                pathname === "/settings"
                  ? "bg-[#2563EB] border-[#0A0A0A] dark:border-[#2563EB] text-white shadow-[3px_3px_0px_0px_#0A0A0A]"
                  : "bg-transparent border-transparent text-[#0A0A0A]/60 dark:text-white/50 hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5 hover:text-[#0A0A0A] dark:hover:text-white"
              }`}
            >
              <span
                className={`${pathname === "/settings" ? "text-white" : "group-hover:text-slate-500 transition-colors"}`}
              >
                <Settings size={20} />
              </span>
              <span
                className={`font-bold text-sm uppercase tracking-wider whitespace-nowrap ${isCollapsed ? "hidden lg:hidden" : "block"}`}
              >
                Settings
              </span>
            </div>

            {isCollapsed && (
              <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] text-[10px] font-black uppercase tracking-widest rounded-lg border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_white] pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap w-max z-[100]">
                Settings
                <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-2 h-2 bg-[#0A0A0A] dark:bg-white rotate-45 border-l-[2px] border-b-[2px] border-[#0A0A0A] dark:border-white/20" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
