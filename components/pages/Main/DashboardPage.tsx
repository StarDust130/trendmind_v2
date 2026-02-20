"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Target,
  Bot,
  CalendarClock,
  Rocket,
  ArrowRight,
  Zap,
  Plus,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const workflowSteps = [
    {
      id: 1,
      icon: <Target className="w-6 h-6 text-[#2563EB]" strokeWidth={2.5} />,
      title: "Create Strategy",
      desc: "Define your audience and set aggressive growth goals.",
      bg: "bg-[#2563EB]/10",
      border: "border-[#2563EB]/30",
      shadowFocus: "hover:shadow-[4px_4px_0px_0px_#2563EB]",
    },
    {
      id: 2,
      icon: <Bot className="w-6 h-6 text-[#9333EA]" strokeWidth={2.5} />,
      title: "AI Generates Plan",
      desc: "TrendMind constructs a data-backed content matrix.",
      bg: "bg-[#9333EA]/10",
      border: "border-[#9333EA]/30",
      shadowFocus: "hover:shadow-[4px_4px_0px_0px_#9333EA]",
    },
    {
      id: 3,
      icon: (
        <CalendarClock className="w-6 h-6 text-[#10B981]" strokeWidth={2.5} />
      ),
      title: "Schedule Content",
      desc: "Automate delivery for maximum algorithmic impact.",
      bg: "bg-[#10B981]/10",
      border: "border-[#10B981]/30",
      shadowFocus: "hover:shadow-[4px_4px_0px_0px_#10B981]",
    },
    {
      id: 4,
      icon: <Rocket className="w-6 h-6 text-[#E64833]" strokeWidth={2.5} />,
      title: "Review & Publish",
      desc: "Approve the drafts and dominate your feed.",
      bg: "bg-[#E64833]/10",
      border: "border-[#E64833]/30",
      shadowFocus: "hover:shadow-[4px_4px_0px_0px_#E64833]",
    },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col pt-2 pb-12">
      {/* ─── HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-14 text-center md:text-left"
      >
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white leading-[1.1]">
          Welcome, <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#9333EA]">
            {isLoaded ? user?.firstName || "Muzan" : "..."}
          </span>
        </h1>
        <p className="mt-4 text-sm md:text-base font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border-l-[3px] border-[#FBBF24] pl-3 md:inline-block">
          System Initialized. Awaiting your first command.
        </p>
      </motion.div>

      {/* ─── PROTOCOL GRID ─── */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
          <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A0A0A] dark:text-white opacity-60">
            The TrendMind Protocol
          </h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 relative"
        >
          {workflowSteps.map((step) => (
            <motion.button
              key={step.id}
              onClick={() => router.push("/strategy")}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`relative z-10 w-full text-left bg-[#FAFAFA] dark:bg-gradient-to-b dark:from-[#111] dark:to-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-5 lg:p-6 transition-all duration-300 flex flex-col gap-4 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-none ${step.shadowFocus}`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-[2px] ${step.bg} ${step.border}`}
                >
                  {step.icon}
                </div>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Step 0{step.id}
                </span>
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-wide text-[#0A0A0A] dark:text-white mb-1.5 flex items-center justify-between">
                  {step.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ─── MASSIVE CTA ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full bg-[#0A0A0A] dark:bg-gradient-to-br dark:from-[#111] dark:to-[#050505] border-[3px] lg:border-[4px] border-[#0A0A0A] dark:border-white/10 rounded-[2rem] p-8 md:p-14 overflow-hidden shadow-[8px_8px_0px_0px_#2563EB] dark:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
      >
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2563EB]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#2563EB] rounded-2xl border-[3px] border-[#0A0A0A] dark:border-[#2563EB] flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[0_0_20px_rgba(37,99,235,0.4)] rotate-3">
            <Zap className="w-8 h-8 text-white" strokeWidth={3} />
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Ready to Dominate?
          </h2>
          <p className="text-sm md:text-base font-bold text-white/60 max-w-xl mx-auto mb-10">
            Stop staring at a blank screen. Let TrendMind's AI engine construct
            your first high-converting LinkedIn post sequence in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary Action -> Routes to /strategy */}
            <button
              onClick={() => router.push("/strategy")}
              className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-[#FBBF24] text-[#0A0A0A] px-8 py-4 rounded-xl border-[3px] border-[#0A0A0A] font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] cursor-pointer hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all active:bg-[#f5b316]"
            >
              Create Strategy
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                strokeWidth={3}
              />
            </button>

            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mx-2">
              OR
            </span>

            {/* Secondary Action -> Routes to /generate */}
            <button
              onClick={() => router.push("/generate")}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#111] text-white px-8 py-4 rounded-xl border-[3px] border-white/20 font-black uppercase text-sm tracking-widest hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer"
            >
              <Plus
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
              Quick Post
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
