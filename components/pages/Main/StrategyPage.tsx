"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Award,
  Lock,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";

// New, heavier 3D entrance animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    rotateX: 8, // Subtle 3D tilt on entry
    transformPerspective: 1000,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
      mass: 1.1, // Feels heavier landing
    },
  },
  hover: {
    y: -4, // Subtle lift on hover
    scale: 1.005,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export default function ContentStrategiesPage() {
  const router = useRouter();

  const filterTabs = [
    { name: "Engagement", icon: <TrendingUp size={14} strokeWidth={2.5} /> },
    { name: "Network", icon: <Users size={14} strokeWidth={2.5} /> },
    { name: "Authority", icon: <Award size={14} strokeWidth={2.5} /> },
  ];

  const pageFeatures = [
    "Define your target audience and specific goals.",
    "Generate automated content pillars and silos.",
    "Map posts to a strategic, high-converting timeline.",
  ];

  return (
    // 1. Structural Lock: h-full and flex-col ensure it never exceeds the viewport
    <div className="w-full max-w-[1200px] mx-auto flex flex-col h-full pt-2 pb-6">
      {/* ─── HEADER (Compact & Direct) ─── */}
      <div className="shrink-0 mb-6">
        <h1 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-2">
          Content Strategies
        </h1>
        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">
          Create, manage, and align your LinkedIn content with specific growth
          goals.
        </p>
      </div>

      {/* ─── TACTICAL FILTERS (Visual Tease) ─── */}
      <div className="shrink-0 flex items-center gap-3 mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white opacity-40">
          Filter by Goal
        </span>
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <div
              key={tab.name}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A]/10 dark:border-white/5 rounded-lg opacity-50 cursor-not-allowed"
            >
              <span className="text-slate-500">{tab.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A0A0A] dark:text-white">
                {tab.name}
              </span>
              <Lock size={10} className="text-slate-400 ml-1" strokeWidth={3} />
            </div>
          ))}
        </div>
      </div>

      {/* ─── PREMIUM UPGRADE CARD (Centered, Dotted, Animated) ─── */}
      {/* Flex-1 forces centering in remaining space */}
      <div className="flex-1 flex items-center justify-center min-h-0 perspective-1000">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          whileHover="hover"
          className="relative w-full max-w-2xl bg-[#FAFAFA] dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-[6px_6px_0px_0px_#FBBF24] dark:shadow-[6px_6px_0px_0px_#FBBF24] flex flex-col items-center text-center overflow-hidden group"
        >
          {/* COOL DOTTED MATRIX BACKGROUND */}
          <div className="absolute inset-0 z-0 opacity-[0.07] dark:opacity-[0.05] bg-[radial-gradient(#0A0A0A_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] bg-[length:24px_24px] pointer-events-none" />

          {/* Subtle Ambient Gold Glow on hover */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FBBF24]/5 rounded-full blur-[60px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />

          {/* Content Container (z-10 to sit above dots) */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Premium Icon */}
            <div className="w-14 h-14 bg-[#FBBF24] rounded-xl border-[3px] border-[#0A0A0A] flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#0A0A0A] -rotate-3 group-hover:rotate-0 transition-transform">
              <Lock className="w-6 h-6 text-[#0A0A0A]" strokeWidth={2.5} />
            </div>

            {/* Clear, Direct Copy */}
            <h2 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-3">
              Upgrade to Unlock Strategies
            </h2>
            <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
              Stop posting randomly. Build a structured, data-driven content
              plan that targets your specific audience and converts.
            </p>

            {/* Actual Page Features */}
            <div className="flex flex-col gap-3 mb-8 w-full max-w-sm mx-auto text-left">
              {pageFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <CheckCircle2
                      size={16}
                      className="text-[#FBBF24]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0A0A0A] dark:text-white/80 uppercase tracking-wider leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Actionable CTA */}
            <button
              onClick={() => router.push("/pricing")}
              className="w-full sm:w-auto group/btn relative flex items-center justify-center gap-2.5 bg-[#FBBF24] text-[#0A0A0A] px-10 py-4 rounded-xl border-[3px] border-[#0A0A0A] font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] cursor-pointer hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all active:bg-[#f5b316]"
            >
              <Zap
                className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                strokeWidth={2.5}
              />
              Upgrade Now
              <ArrowRight
                className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                strokeWidth={3}
              />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
