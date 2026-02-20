"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Bot,
  CalendarClock,
  Rocket,
  ArrowRight,
  Zap,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  TerminalSquare,
} from "lucide-react";

// ─── ANIMATION ORCHESTRATION ───
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

  // ─── LOCAL STORAGE PIPELINE STATE ───
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);

  useEffect(() => {
    // Intercept data from the generation/calendar loop
    const storedData = localStorage.getItem("trendmind_posts");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Mathematically sort them so the soonest posts appear first
        const sorted = parsed.sort((a: any, b: any) => {
          return (
            new Date(`${a.date}T${a.time}`).getTime() -
            new Date(`${b.date}T${b.time}`).getTime()
          );
        });
        setScheduledPosts(sorted);
      } catch (error) {
        console.error("Failed to parse local posts", error);
      }
    }
  }, []);

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
    <div className="w-full max-w-[1600px] mx-auto flex flex-col pt-2 pb-12 overflow-x-hidden">
      {/* ─── HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12 text-center md:text-left"
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

      {/* ─── ACTIVE PIPELINE (Dynamically mounts if posts exist) ─── */}
      <AnimatePresence>
        {scheduledPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#0A0A0A] dark:text-white">
                  Active Payload Pipeline
                </h3>
              </div>
              <button
                onClick={() => router.push("/calendar")}
                className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] hover:text-[#1d4ed8] transition-colors flex items-center gap-1"
              >
                View Full Calendar <ArrowRight size={12} strokeWidth={3} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {scheduledPosts.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => router.push("/calendar")}
                  className="group cursor-pointer flex flex-col bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl overflow-hidden shadow-[5px_5px_0px_0px_#0A0A0A] dark:shadow-none hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#10B981] dark:hover:border-[#10B981] transition-all duration-300"
                >
                  <div className="bg-[#FAFAFA] dark:bg-[#050505] border-b-[3px] border-[#0A0A0A] dark:border-white/10 p-3.5 flex items-center justify-between shrink-0">
                    <span className="px-2.5 py-1 bg-[#10B981]/10 text-[#10B981] border-[2px] border-[#10B981]/30 rounded-md text-[9px] font-black uppercase tracking-widest">
                      {post.type}
                    </span>
                    <TerminalSquare
                      size={14}
                      className="text-slate-400 group-hover:text-[#10B981] transition-colors"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h4 className="font-black text-sm text-[#0A0A0A] dark:text-white uppercase tracking-tight mb-2 line-clamp-1">
                      {post.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4 flex-1">
                      {post.content || "No preview available..."}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t-[2px] border-[#0A0A0A]/5 dark:border-white/5 mt-auto">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#0A0A0A] dark:group-hover:text-white transition-colors">
                        <CalendarIcon size={12} strokeWidth={2.5} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#0A0A0A] dark:group-hover:text-white transition-colors">
                        <Clock size={12} strokeWidth={2.5} />
                        {post.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PROTOCOL GRID ─── */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
          <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A0A0A] dark:text-white opacity-60">
            System Architecture
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
