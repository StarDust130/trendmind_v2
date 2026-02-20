"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  LayoutTemplate,
  TrendingUp,
  Send,
  Save,
  CheckCircle2,
  AlertTriangle,
  Calendar as CalendarIcon,
  Copy,
  Clock,
  Check,
} from "lucide-react";
import { generateLinkedInPost } from "@/actions/generate";

// ─── ANIMATION ORCHESTRATION ───
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// ─── CUSTOM TYPEWRITER HOOK ───
// This forces the text to reveal sequentially, creating the "Live Generation" feel.
function useTypewriter(text: string, speed: number = 15) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let i = 0;
    setDisplayedText(""); // Reset before typing new text

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return { displayedText, setDisplayedText, isTyping };
}

function GenerateEngine() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"form" | "templates" | "trends">(
    "form",
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("Actionable Advice");
  const [industry, setIndustry] = useState("Technology / SaaS");
  const [tone, setTone] = useState("Direct & Hacker");

  const urlDate = searchParams.get("date");
  const [scheduleDate, setScheduleDate] = useState(
    urlDate || new Date().toISOString().split("T")[0],
  );
  const [scheduleTime, setScheduleTime] = useState("09:00");

  // Raw API output state
  const [rawPost, setRawPost] = useState("");

  // Animated output state (Intercepts rawPost and animates it)
  const { displayedText, setDisplayedText, isTyping } = useTypewriter(rawPost);

  // Live Telemetry Math (Calculated from the fully generated string, not the animating one)
  const charCount = rawPost.length;
  const wordCount =
    rawPost.trim() === "" ? 0 : rawPost.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setIsSaved(false);
    setRawPost(""); // Clear previous text instantly

    const response = await generateLinkedInPost({
      topic,
      contentType,
      industry,
      tone,
    });

    if (response.success && response.content) {
      setRawPost(response.content); // This triggers the useTypewriter hook
    } else {
      alert(response.error || "Generation failed.");
    }

    setIsGenerating(false);
  };

  const handleSaveToCalendar = () => {
    // Only save if text exists and it has finished typing out
    if (!rawPost || isTyping) return;

    const existing = JSON.parse(
      localStorage.getItem("trendmind_posts") || "[]",
    );
    const newPost = {
      id: crypto.randomUUID(),
      title: topic.substring(0, 35) + "...",
      date: scheduleDate,
      time: scheduleTime,
      type: contentType,
      // Save the editable displayed text in case the user tweaked it after animation
      content: displayedText,
    };

    localStorage.setItem(
      "trendmind_posts",
      JSON.stringify([...existing, newPost]),
    );
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCopy = () => {
    if (!displayedText) return;
    navigator.clipboard.writeText(displayedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const useTemplate = (templateTopic: string) => {
    setTopic(templateTopic);
    setActiveTab("form");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col  pb-6"
    >
      {/* ─── HEADER ─── */}
      <div className="shrink-0 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-2">
            Create a New Post
          </h1>
          <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">
            Deploy TrendMind AI to construct viral-ready LinkedIn content.
          </p>
        </motion.div>

        {/* Tactical Tabs */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex bg-[#FAFAFA] dark:bg-[#111] p-1.5 rounded-xl border-[3px] border-[#0A0A0A] dark:border-white/10 shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_#2563EB] w-full md:w-auto shrink-0"
        >
          {["form", "templates", "trends"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`relative flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-black text-[10px] md:text-xs uppercase tracking-wider transition-all ${activeTab === tab ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A]" : "text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#0A0A0A] dark:hover:text-white hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5"}`}
            >
              {tab === "form" && <Sparkles size={14} strokeWidth={3} />}
              {tab === "templates" && (
                <LayoutTemplate size={14} strokeWidth={3} />
              )}
              {tab === "trends" && <TrendingUp size={14} strokeWidth={3} />}
              {tab === "trends" && (
                <span className="text-[8px] bg-[#FBBF24] text-[#0A0A0A] px-1 py-0.5 rounded -ml-1">
                  BETA
                </span>
              )}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* ─── LEFT COLUMN: INPUT / TABS ─── */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col min-h-0 overflow-y-auto custom-scrollbar p-1">
          <AnimatePresence mode="wait">
            {activeTab === "form" && (
              <motion.div
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                className="flex flex-col gap-5 bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-none"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-3 border-b-[3px] border-[#0A0A0A]/10 dark:border-white/10 pb-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB] border-[2px] border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A]">
                    <Sparkles
                      className="text-white"
                      size={18}
                      strokeWidth={3}
                    />
                  </div>
                  <div>
                    <h2 className="font-black uppercase text-sm text-[#0A0A0A] dark:text-white">
                      TrendMind AI Engine
                    </h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Configure parameters
                    </p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white">
                      Content Type
                    </label>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="w-full bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl p-3 text-sm font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_#2563EB] transition-all appearance-none cursor-pointer"
                    >
                      <option>Actionable Advice</option>
                      <option>Personal Story / Lesson</option>
                      <option>Controversial Opinion</option>
                      <option>Industry Analysis</option>
                    </select>
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white">
                      Tone of Voice
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl p-3 text-sm font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_#2563EB] transition-all appearance-none cursor-pointer"
                    >
                      <option>Direct & Hacker</option>
                      <option>Professional & Academic</option>
                      <option>Empathetic & Inspirational</option>
                      <option>Data-Driven & Blunt</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-2"
                >
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white">
                    Topic / Core Idea
                  </label>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="E.g., Why most SaaS startups fail before hitting $10k MRR because they focus on code instead of distribution..."
                    className="w-full h-32 bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl p-4 text-sm font-semibold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_#2563EB] transition-all resize-none custom-scrollbar"
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: topic ? 1.01 : 1 }}
                  whileTap={{ scale: topic ? 0.98 : 1 }}
                  onClick={handleGenerate}
                  disabled={isGenerating || isTyping || !topic}
                  className="group w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-4 rounded-xl border-[3px] border-[#0A0A0A] font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-[6px_6px_0px_0px_#0A0A0A] transition-all disabled:opacity-50 disabled:hover:shadow-[4px_4px_0px_0px_#0A0A0A] disabled:cursor-not-allowed active:bg-[#1d4ed8]"
                >
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles
                        size={18}
                        strokeWidth={3}
                        className="group-hover:rotate-12 transition-transform"
                      />{" "}
                      Generate Content
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}

            {/* TAB: TEMPLATES */}
            {activeTab === "templates" && (
              <motion.div
                key="templates"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                {[
                  {
                    title: "The 'Contrarian' Framework",
                    desc: "Start with an unpopular opinion, back it up with data, provide a solution.",
                  },
                  {
                    title: "The 'Failure to Success' Story",
                    desc: "Detail a massive failure, the dark moment, the pivot, and the resulting success.",
                  },
                  {
                    title: "The 'Actionable Listicle'",
                    desc: "5 rapid-fire tips to solve a highly specific industry problem.",
                  },
                ].map((tpl, i) => (
                  <motion.div
                    variants={itemVariants}
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-none hover:-translate-y-1 hover:border-[#2563EB] transition-all group"
                  >
                    <div>
                      <h3 className="font-black uppercase text-sm text-[#0A0A0A] dark:text-white group-hover:text-[#2563EB] transition-colors">
                        {tpl.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 mt-1">
                        {tpl.desc}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        useTemplate(
                          `Write a post using the ${tpl.title} framework. The core topic is: [INSERT TOPIC HERE]`,
                        )
                      }
                      className="shrink-0 px-4 py-2 bg-[#FBBF24] text-[#0A0A0A] border-[2px] border-[#0A0A0A] rounded-lg font-black text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none transition-all"
                    >
                      Use Template
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* TAB: TRENDS */}
            {activeTab === "trends" && (
              <motion.div
                key="trends"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col gap-4"
              >
                <motion.div
                  variants={itemVariants}
                  className="bg-[#E64833]/10 border-[2px] border-[#E64833]/30 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertTriangle
                    className="text-[#E64833] shrink-0 mt-0.5"
                    size={16}
                    strokeWidth={3}
                  />
                  <p className="text-xs font-bold text-[#E64833]">
                    Beta Feature: Live trends are simulated. Connect your X
                    (Twitter) or Google News API in settings to pull real-time
                    data.
                  </p>
                </motion.div>
                {[
                  {
                    category: "Technology",
                    headline:
                      "AI Agent adoption in enterprise software grows 300% in Q1.",
                  },
                  {
                    category: "Marketing",
                    headline:
                      "LinkedIn algorithm update shifts priority from images to text-heavy carousels.",
                  },
                ].map((trend, i) => (
                  <motion.div
                    variants={itemVariants}
                    key={i}
                    className="flex flex-col gap-3 bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-none hover:-translate-y-1 hover:border-[#10B981] transition-all group"
                  >
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#10B981]">
                      {trend.category}
                    </span>
                    <h3 className="font-bold text-sm text-[#0A0A0A] dark:text-white leading-relaxed">
                      {trend.headline}
                    </h3>
                    <button
                      onClick={() =>
                        useTemplate(
                          `Write an analytical post discussing this recent trend: "${trend.headline}"`,
                        )
                      }
                      className="self-start px-4 py-2 mt-2 bg-[#FAFAFA] dark:bg-[#111] text-[#0A0A0A] dark:text-white border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-none active:translate-y-0.5 active:translate-x-0.5 transition-all"
                    >
                      Create Post
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── RIGHT COLUMN: UNIFIED PREVIEW & SCHEDULER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-6 xl:col-span-5 flex flex-col h-full min-h-[550px] bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[0_0_20px_rgba(37,99,235,0.05)] relative"
        >
          <div className="bg-[#FAFAFA] dark:bg-[#111] border-b-[3px] border-[#0A0A0A] dark:border-white/10 p-3 flex items-center justify-between shrink-0 z-10 relative">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E64833] border-[2px] border-[#0A0A0A]" />
                <div className="w-3 h-3 rounded-full bg-[#FBBF24] border-[2px] border-[#0A0A0A]" />
                <div className="w-3 h-3 rounded-full bg-[#10B981] border-[2px] border-[#0A0A0A]" />
              </div>
              <div className="w-[2px] h-3 bg-[#0A0A0A]/20 dark:bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Post_Editor.md
              </span>
            </div>

            <button
              onClick={handleCopy}
              disabled={!displayedText}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0A0A0A] border-[2px] border-[#0A0A0A] dark:border-white/20 text-[#0A0A0A] dark:text-white hover:shadow-[2px_2px_0px_0px_#0A0A0A] dark:hover:shadow-[2px_2px_0px_0px_#2563EB] transition-all disabled:opacity-30 disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              {isCopied ? (
                <Check size={14} className="text-[#10B981]" strokeWidth={3} />
              ) : (
                <Copy
                  size={14}
                  strokeWidth={2.5}
                  className="group-hover:scale-110 transition-transform"
                />
              )}
              <span className="text-[9px] font-black uppercase tracking-widest">
                {isCopied ? "Copied!" : "Copy"}
              </span>
            </button>
          </div>

          <div className="flex-1 relative flex flex-col bg-[#FAFAFA]/50 dark:bg-[#0A0A0A]/50 z-0">
            {rawPost ? (
              <>
                <textarea
                  value={displayedText}
                  onChange={(e) => setDisplayedText(e.target.value)}
                  // Disable editing while the typewriter effect is still running
                  disabled={isTyping}
                  className="flex-1 w-full p-6 pb-16 bg-transparent text-base md:text-lg text-[#0A0A0A] dark:text-white leading-[1.8] font-medium resize-none focus:outline-none custom-scrollbar disabled:opacity-90 disabled:cursor-text"
                  placeholder="Your generated post will appear here. Edit before scheduling..."
                />

                {/* ─── RESTORED: CLEAN TELEMETRY DOCK ─── */}
                <AnimatePresence>
                  {!isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 flex items-center justify-center bg-white dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/10 p-2.5 rounded-xl shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] pointer-events-none"
                    >
                      <div className="flex gap-4 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#2563EB]">{charCount}</span>{" "}
                          Chars
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-[#10B981]">{wordCount}</span>{" "}
                          Words
                        </span>
                        <span className="flex items-center gap-1.5 hidden sm:flex">
                          <span className="text-[#FBBF24]">
                            ~{readingTime}m
                          </span>{" "}
                          Read
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 opacity-40">
                <Send
                  className="w-12 h-12 text-slate-400 mb-4"
                  strokeWidth={1.5}
                />
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Awaiting Generation
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#FAFAFA] dark:bg-[#111] border-t-[3px] border-[#0A0A0A] dark:border-white/10 p-3 flex flex-col sm:flex-row gap-3 shrink-0 z-10 relative">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 group">
                <CalendarIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors"
                />
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-white dark:bg-[#0A0A0A] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-lg pl-9 pr-2 py-2.5 text-xs font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-0.5 focus:shadow-[2px_2px_0px_0px_#2563EB] transition-all cursor-pointer"
                />
              </div>
              <div className="relative flex-1 group">
                <Clock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors"
                />
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-white dark:bg-[#0A0A0A] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-lg pl-9 pr-2 py-2.5 text-xs font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-0.5 focus:shadow-[2px_2px_0px_0px_#2563EB] transition-all cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSaveToCalendar}
              disabled={!displayedText || isTyping || isSaved}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#FBBF24] text-[#0A0A0A] px-4 sm:px-6 py-2.5 rounded-lg border-[2px] border-[#0A0A0A] font-black uppercase text-[10px] tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A] hover:translate-y-[3px] hover:translate-x-[3px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed active:bg-[#f5b316] mb-1 mr-1 shrink-0"
            >
              {isSaved ? (
                <CheckCircle2 size={16} strokeWidth={3} />
              ) : (
                <Save size={16} strokeWidth={3} />
              )}
              <span>
                {isSaved ? "Saved" : ""}
                <span className="hidden sm:inline">{!isSaved && " Post"}</span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-[4px] border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] animate-pulse">
            Initializing Canvas...
          </span>
        </div>
      }
    >
      <GenerateEngine />
    </Suspense>
  );
}
