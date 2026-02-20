"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Image as ImageIcon,
  Video,
  Zap,
  Lock,
  Hammer,
  Sparkles,
} from "lucide-react";

// ─── HEAVY KINETIC ORCHESTRATION ───
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    rotateX: 10,
    transformPerspective: 1000,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 200, damping: 20, mass: 1.2 },
  },
};

export default function ToolsClient() {
  const tools = [
    {
      id: "carousel",
      title: "Carousel Designer",
      desc: "Architect professional carousels with multi-slide formats and high-fidelity exports.",
      icon: <Layers size={20} strokeWidth={2.5} />,
      color: "bg-[#2563EB]", // Blue
      shadow: "shadow-[5px_5px_0px_0px_#2563EB]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#2563EB]",
      features: [
        "5 Slide Formats",
        "Professional Templates",
        "Dynamic Layouts",
        "High-Quality Export",
      ],
    },
    {
      id: "images",
      title: "Post Images",
      desc: "Generate feed-stopping visuals calibrated specifically for LinkedIn's algorithm.",
      icon: <ImageIcon size={20} strokeWidth={2.5} />,
      color: "bg-[#FBBF24]", // Yellow/Gold
      shadow: "shadow-[5px_5px_0px_0px_#FBBF24]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#FBBF24]",
      features: [
        "LinkedIn Optimized",
        "Brand Templates",
        "AI Generation",
        "Multiple Formats",
      ],
    },
    {
      id: "video",
      title: "Thumbnail Creator",
      desc: "Design aggressive, high-CTR video thumbnails to boost video completion rates.",
      icon: <Video size={20} strokeWidth={2.5} />,
      color: "bg-[#10B981]", // Green
      shadow: "shadow-[5px_5px_0px_0px_#10B981]",
      hoverShadow: "hover:shadow-[8px_8px_0px_0px_#10B981]",
      features: [
        "Video Thumbnails",
        "Engagement Focused",
        "Template Library",
        "LinkedIn Specs",
      ],
    },
  ];

  return (
    // 1. justify-center perfectly centers the grid vertically. overflow-y-auto saves mobile.
    <div className="w-full h-screen flex flex-col  relative   py-6 md:py-0 px-2 md:px-4">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ─── HEADER (Squished Vertically) ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 md:mb-10 relative z-10 shrink-0"
      >
        <div className="w-12 h-12 bg-[#0A0A0A] dark:bg-white rounded-xl border-[2px] md:border-[3px] border-[#0A0A0A] dark:border-white flex items-center justify-center mb-4 shadow-[3px_3px_0px_0px_#2563EB] -rotate-3 hover:rotate-6 transition-transform cursor-crosshair">
          <Sparkles
            className="text-white dark:text-[#0A0A0A] w-6 h-6"
            strokeWidth={2.5}
          />
        </div>
        <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-2 leading-none">
          Creator Studio
        </h1>
        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 max-w-lg px-4">
          Heavy-duty design utilities to dominate the feed. Assets are strictly
          optimized for LinkedIn's visual dimensions.
        </p>
      </motion.div>

      {/* ─── TOOLS GRID (Compressed Cards) ─── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-[1100px] mx-auto w-full relative z-10 shrink-0"
      >
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            variants={cardVariants}
            className={`group relative flex flex-col bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-3 ${tool.shadow} ${tool.hoverShadow} cursor-default`}
          >
            {/* Hazard Striping Top Banner */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(45deg,#0A0A0A,#0A0A0A_8px,transparent_8px,transparent_16px)] opacity-10 dark:opacity-30 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity" />

            <div className="p-5 md:p-6 flex flex-col flex-1">
              {/* Icon & Status Badge */}
              <div className="flex items-start justify-between mb-4 md:mb-5">
                <div
                  className={`w-12 h-12 rounded-xl border-[2px] md:border-[3px] border-[#0A0A0A] flex items-center justify-center text-[#0A0A0A] shadow-[3px_3px_0px_0px_#0A0A0A] -rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-400 ${tool.color}`}
                >
                  {tool.icon}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-md shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-none group-hover:border-[#FBBF24] transition-colors">
                  <Hammer
                    size={10}
                    className="text-slate-500 group-hover:text-[#FBBF24] group-hover:animate-pulse transition-colors"
                    strokeWidth={3}
                  />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 group-hover:text-[#FBBF24] transition-colors">
                    In Dev
                  </span>
                </div>
              </div>

              {/* Copy (Squished text size and margins) */}
              <h2 className="font-display text-lg md:text-xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-2">
                {tool.title}
              </h2>
              <p className="text-[11px] md:text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                {tool.desc}
              </p>

              {/* Kinetic Feature Checklist */}
              <div className="flex flex-col gap-2.5 mb-6">
                {tool.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 transform transition-transform duration-300 group-hover:translate-x-2"
                    style={{ transitionDelay: `${i * 50}ms` }} // Staggers the slide-in on hover
                  >
                    <Zap
                      size={12}
                      className="text-[#10B981] shrink-0"
                      strokeWidth={3}
                    />
                    <span className="text-[10px] font-bold text-[#0A0A0A] dark:text-white/80 uppercase tracking-wider">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Aggressive Reactive Locked Button */}
              <div className="relative pt-4 border-t-[2px] border-[#0A0A0A]/10 dark:border-white/10">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 bg-[#FAFAFA] dark:bg-[#111] text-slate-400 dark:text-slate-500 py-3 md:py-3.5 rounded-xl border-[2px] border-slate-300 dark:border-white/10 font-black uppercase text-[10px] tracking-widest cursor-not-allowed transition-all duration-300 group-hover:bg-[#E64833]/10 group-hover:border-[#E64833]/50 group-hover:text-[#E64833]"
                >
                  <Lock
                    size={14}
                    strokeWidth={2.5}
                    className="group-hover:animate-pulse"
                  />
                  Coming Soon ✌️
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
