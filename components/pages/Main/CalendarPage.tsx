"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Calendar as CalendarIcon,
  List,
  Plus,
  Filter,
} from "lucide-react";

type Post = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
};

// Tooltip Utility Component
const Tooltip = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="group relative flex items-center justify-center">
    {children}
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] text-[9px] font-black uppercase tracking-widest rounded-md border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[2px_2px_0px_0px_#2563EB] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
      {label}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0A0A0A] dark:bg-white rotate-45 border-r-[2px] border-b-[2px] border-[#0A0A0A] dark:border-white/20 -mt-[1px]" />
    </div>
  </div>
);

export default function CalendarClient() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("trendmind_posts");
    if (storedData) {
      try {
        setPosts(JSON.parse(storedData));
      } catch (error) {
        console.error("Failed to parse local storage posts", error);
      }
    } else {
      localStorage.setItem("trendmind_posts", JSON.stringify([]));
    }
  }, []);

  const next = () =>
    setCurrentDate(
      view === "month" ? addMonths(currentDate, 1) : addWeeks(currentDate, 1),
    );
  const prev = () =>
    setCurrentDate(
      view === "month" ? subMonths(currentDate, 1) : subWeeks(currentDate, 1),
    );
  const goToToday = () => setCurrentDate(new Date());

  const handleNewPost = (date?: Date) => {
    if (date) {
      router.push(`/generate?date=${format(date, "yyyy-MM-dd")}`);
    } else {
      router.push("/generate");
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekStart = startOfWeek(currentDate);
  const weekEnd = endOfWeek(currentDate);
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="w-full h-full flex flex-col">
      {/* ─── CALENDAR HEADER ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 md:mb-6 shrink-0">
        <div className="flex items-center justify-between lg:justify-start gap-4">
          <h1 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white min-w-[180px] md:min-w-[200px]">
            {format(
              currentDate,
              view === "month" ? "MMMM yyyy" : "MMM d, yyyy",
            )}
          </h1>

          <div className="flex items-center gap-1 md:gap-2 bg-[#FAFAFA] dark:bg-[#111] p-1 md:p-1.5 rounded-xl border-[2px] md:border-[3px] border-[#0A0A0A] dark:border-white/10 shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_#2563EB]">
            <Tooltip label="Previous">
              <button
                onClick={prev}
                className="p-1 md:p-1.5 hover:bg-[#0A0A0A]/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft
                  size={18}
                  strokeWidth={3}
                  className="text-[#0A0A0A] dark:text-white"
                />
              </button>
            </Tooltip>
            <Tooltip label="Next">
              <button
                onClick={next}
                className="p-1 md:p-1.5 hover:bg-[#0A0A0A]/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronRight
                  size={18}
                  strokeWidth={3}
                  className="text-[#0A0A0A] dark:text-white"
                />
              </button>
            </Tooltip>
            <div className="w-[2px] h-4 bg-[#0A0A0A]/20 dark:bg-white/20 mx-1" />
            <Tooltip label="Jump to Today">
              <button
                onClick={goToToday}
                className="p-1 md:p-1.5 hover:bg-[#0A0A0A]/5 dark:hover:bg-white/10 rounded-lg transition-colors group"
              >
                <RotateCcw
                  size={16}
                  strokeWidth={3}
                  className="text-[#0A0A0A] dark:text-white group-hover:-rotate-90 transition-transform"
                />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* FIXED BUG: Added p-2 -m-2 to absorb the hover translate without triggering scrollbars */}
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto md:overflow-visible p-2 -m-2 custom-scrollbar">
          <div className="flex bg-[#FAFAFA] dark:bg-[#111] p-1.5 rounded-xl border-[2px] md:border-[3px] border-[#0A0A0A] dark:border-white/10 shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-none shrink-0">
            <button
              onClick={() => setView("month")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${view === "month" ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A]" : "text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#0A0A0A] dark:hover:text-white"}`}
            >
              <CalendarIcon
                size={14}
                strokeWidth={3}
                className="hidden sm:block"
              />{" "}
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${view === "week" ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A]" : "text-[#0A0A0A]/60 dark:text-white/60 hover:text-[#0A0A0A] dark:hover:text-white"}`}
            >
              <List size={14} strokeWidth={3} className="hidden sm:block" />{" "}
              Week
            </button>
          </div>

          <Tooltip label="Filter Strategies">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0A0A0A] dark:text-white hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5 transition-colors shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-none shrink-0">
              <Filter size={14} strokeWidth={3} /> Filter
            </button>
          </Tooltip>

          <button
            onClick={() => handleNewPost()}
            className="group relative flex items-center justify-center gap-2 bg-[#2563EB] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl border-[2px] md:border-[3px] border-[#0A0A0A] dark:border-[#2563EB] font-black uppercase text-xs md:text-sm tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-none dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:translate-y-[2px] hover:translate-x-[2px] md:hover:translate-y-[3px] md:hover:translate-x-[3px] transition-all active:bg-[#1d4ed8] shrink-0"
          >
            <Plus
              size={16}
              strokeWidth={3}
              className="group-hover:rotate-90 transition-transform"
            />
            <span className="hidden sm:inline">New Post</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>
      </div>

      {/* ─── CALENDAR BODY ─── */}
      <div className="flex-1 bg-white dark:bg-[#0A0A0A] border-[2px] md:border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl md:rounded-[2rem] shadow-[4px_4px_0px_0px_#0A0A0A] md:shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-none overflow-hidden flex flex-col min-h-0">
        <div className="grid grid-cols-7 border-b-[2px] md:border-b-[3px] border-[#0A0A0A] dark:border-white/10 bg-[#FAFAFA] dark:bg-[#111] shrink-0">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-2 md:py-3 px-1 md:px-2 text-center border-r-[2px] md:border-r-[3px] last:border-r-0 border-[#0A0A0A]/10 dark:border-white/5 text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Added overflow-x-auto to ensure Week View doesn't break on mobile */}
        <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {view === "month" ? (
              <motion.div
                key="month"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-7 h-full auto-rows-fr min-w-full"
              >
                {days.map((day, idx) => {
                  const isCurrentMonth = isSameMonth(day, monthStart);
                  const isCurrentDay = isToday(day);
                  const dayPosts = posts.filter((p) =>
                    isSameDay(new Date(p.date), day),
                  );

                  return (
                    <div
                      key={day.toString()}
                      onClick={() => handleNewPost(day)}
                      className={`
                        relative min-h-[70px] md:min-h-[100px] border-r-[2px] border-b-[2px] border-[#0A0A0A]/5 dark:border-white/5 p-1 md:p-2 transition-colors group flex flex-col cursor-pointer
                        ${isCurrentMonth ? "bg-white dark:bg-[#0A0A0A] hover:bg-[#FAFAFA] dark:hover:bg-[#111]" : "bg-slate-50 dark:bg-[#050505] opacity-50"}
                        ${(idx + 1) % 7 === 0 ? "border-r-0" : ""}
                      `}
                    >
                      <div className="flex justify-between items-start mb-1 md:mb-2 pointer-events-none">
                        <span
                          className={`
                          flex items-center justify-center w-5 h-5 md:w-7 md:h-7 rounded-md md:rounded-lg text-[10px] md:text-xs font-black transition-all shrink-0
                          ${
                            isCurrentDay
                              ? "bg-[#FBBF24] text-[#0A0A0A] shadow-[2px_2px_0px_0px_#0A0A0A] scale-110"
                              : isCurrentMonth
                                ? "text-[#0A0A0A] dark:text-white"
                                : "text-slate-300 dark:text-slate-600"
                          }
                        `}
                        >
                          {format(day, "d")}
                        </span>

                        <div className="opacity-0 group-hover:opacity-100 p-0.5 md:p-1 text-slate-400 text-[#2563EB] transition-opacity shrink-0">
                          <Plus
                            size={12}
                            strokeWidth={4}
                            className="md:w-3.5 md:h-3.5"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 md:gap-1.5 overflow-hidden flex-1 pointer-events-none">
                        {dayPosts.map((post) => (
                          <div
                            key={post.id}
                            className="px-1 md:px-2 py-0.5 md:py-1.5 bg-[#2563EB]/10 border-[1.5px] border-[#2563EB]/30 rounded md:rounded-md flex items-center md:items-start md:flex-col gap-1 md:gap-0"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] md:hidden shrink-0" />
                            <span className="hidden md:block text-[9px] font-black text-[#2563EB] uppercase tracking-wider truncate">
                              {post.title}
                            </span>
                            <span className="hidden md:block text-[8px] font-bold text-slate-500 mt-0.5">
                              {post.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              /* RESTORED: Fully Functional Week View Grid */
              <motion.div
                key="week"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-[1000px] relative min-w-[700px] md:min-w-full"
              >
                {/* Horizontal Time Lines */}
                <div className="absolute inset-0 grid grid-cols-7 pointer-events-none pl-16">
                  {weekDays.map((_, idx) => (
                    <div
                      key={idx}
                      className={`border-r-[2px] border-[#0A0A0A]/5 dark:border-white/5 ${(idx + 1) % 7 === 0 ? "border-r-0" : ""}`}
                    />
                  ))}
                </div>

                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex h-16 border-b-[2px] border-[#0A0A0A]/5 dark:border-white/5 relative group"
                  >
                    <div className="w-16 shrink-0 flex items-start justify-center pt-2 bg-white dark:bg-[#0A0A0A] z-10">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                        {i.toString().padStart(2, "0")}:00
                      </span>
                    </div>
                    <div className="flex-1 grid grid-cols-7">
                      {weekDays.map((day, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleNewPost(day)}
                          className="hover:bg-[#2563EB]/5 cursor-pointer transition-colors"
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mathematical Rendering of Posts */}
                {posts.map((post) => {
                  const postDate = new Date(post.date);
                  if (postDate >= weekStart && postDate <= weekEnd) {
                    const dayIndex = postDate.getDay();
                    const [hours, minutes] = post.time.split(":").map(Number);

                    const topPosition = hours * 64 + (minutes / 60) * 64;
                    const leftPosition = `calc(${dayIndex * 14.28}% + 64px)`;

                    return (
                      <div
                        key={post.id}
                        className="absolute w-[calc(14.28%-12px)] min-h-[60px] bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#2563EB] rounded-xl p-2 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[0_0_15px_rgba(37,99,235,0.2)] z-20 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform ml-1.5"
                        style={{ top: `${topPosition}px`, left: leftPosition }}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#2563EB] mb-1" />
                        <p className="text-[9px] font-black uppercase text-[#0A0A0A] dark:text-white leading-tight break-words">
                          {post.title}
                        </p>
                        <p className="text-[8px] font-bold text-slate-500 mt-1">
                          {post.time}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
