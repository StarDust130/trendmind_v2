"use client";

import { useState } from "react";
import {
  Menu,
  Bell,
  Settings,
  LogOut,
  User as UserIcon,
  CreditCard,
  Inbox,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
// import ThemeToggle from "@/components/ThemeToggle"; // Insert ThemeToggle here

export function Header({ setIsMobileOpen }: any) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);

  return (
    <header className="h-20 sm:h-24 px-4 sm:px-8 flex items-center justify-between shrink-0">
      {/* ─── LEFT ─── */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl shadow-[3px_3px_0px_0px_#0A0A0A] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
        >
          <Menu
            size={20}
            className="text-[#0A0A0A] dark:text-white"
            strokeWidth={3}
          />
        </button>

        <div className="hidden sm:block">
          <h1 className="font-display text-2xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white">
            Workspace
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2563EB]">
            System Active
          </p>
        </div>
      </div>

      {/* ─── RIGHT (Action Blocks) ─── */}
      <div className="flex items-center gap-3">
        <ThemeToggle size="lg" />

        {/* ─── KINETIC BELL ─── */}
        <div className="relative">
          <motion.button
            onClick={() => setBellOpen(!bellOpen)}
            whileHover="hover"
            className="relative w-11 h-11 flex items-center justify-center bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_#0A0A0A] dark:hover:shadow-[3px_3px_0px_0px_#E64833] transition-all"
          >
            {/* Physics-based Pendulum Swing */}
            <motion.div
              variants={{
                hover: {
                  rotate: [0, -15, 15, -10, 10, 0],
                  transition: { duration: 0.6 },
                },
              }}
              style={{ originY: 0 }} // Swings from the top ring
            >
              <Bell
                size={20}
                className="text-[#0A0A0A] dark:text-white"
                strokeWidth={2.5}
              />
            </motion.div>

            {/* Notification Badge */}
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#E64833] border-[2px] border-[#FAFAFA] dark:border-[#050505] rounded-lg" />
          </motion.button>

          <AnimatePresence>
            {bellOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setBellOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute right-0 top-full mt-3 w-72 bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_#E64833] overflow-hidden z-50 flex flex-col items-center justify-center text-center p-8 gap-3"
                >
                  <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-white/5 border-[3px] border-[#0A0A0A]/10 dark:border-white/10 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <Inbox size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-wider text-[#0A0A0A] dark:text-white">
                      Zero Notifications
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      Your queue is clear.
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* ─── PURE AVATAR BLOCK ─── */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-11 h-11 flex items-center justify-center bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#0A0A0A] dark:hover:shadow-[4px_4px_0px_0px_#2563EB] transition-all overflow-hidden"
            title="Account Menu"
          >
            {isLoaded && user ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
            )}
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-2xl shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_#2563EB] overflow-hidden z-50 flex flex-col"
                >
                  <div className="p-4 border-b-[3px] border-[#0A0A0A]/10 dark:border-white/10 bg-[#FAFAFA] dark:bg-[#111]">
                    <div className="font-black text-sm uppercase tracking-wider truncate text-[#0A0A0A] dark:text-white">
                      {user?.fullName || "TrendMind User"}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>

                  <div className="p-2 flex flex-col gap-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5 font-bold text-xs uppercase tracking-widest text-[#0A0A0A] dark:text-white transition-colors"
                    >
                      <UserIcon
                        size={16}
                        strokeWidth={2.5}
                        className="text-[#2563EB]"
                      />{" "}
                      My Profile
                    </Link>
                    <Link
                      href="/billing"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5 font-bold text-xs uppercase tracking-widest text-[#0A0A0A] dark:text-white transition-colors"
                    >
                      <CreditCard
                        size={16}
                        strokeWidth={2.5}
                        className="text-[#FBBF24]"
                      />{" "}
                      Billing
                    </Link>
                  </div>

                  <div className="p-2 border-t-[3px] border-[#0A0A0A]/10 dark:border-white/10">
                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#E64833]/10 hover:bg-[#E64833]/20 font-black text-xs uppercase tracking-widest text-[#E64833] transition-colors"
                    >
                      Sign Out <LogOut size={16} strokeWidth={3} />
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
