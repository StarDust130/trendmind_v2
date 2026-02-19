"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowUp,
  BarChart3,
  Zap,
  LineChart,
  Calendar,
  Activity,
  Check,
  Plus,
  Star,
  Play,
  X,
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  Mail,
  Linkedin,
  Twitter,
  Github,
  ChevronRight,
  Menu,
  XIcon,
  Sun,
  Moon,
} from "lucide-react";

/* ─────────────────────── LOGO ─────────────────────── */
const TrendMindLogo = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#2563EB"
    strokeWidth="3.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12c2-6 4-6 6 0s4 6 6 0 4-6 6 0" />
  </svg>
);

/* ─────────── FLOATING BAUHAUS SHAPES ─────────── */
const FloatingShapes = ({ variant = "hero" }: { variant?: string }) => {
  const shapes: Record<
    string,
    { className: string; style?: React.CSSProperties }[]
  > = {
    hero: [
      {
        className:
          "absolute top-28 left-[8%] w-14 h-14 border-[3px] border-[#2563EB] rounded-full opacity-20 animate-float",
      },
      {
        className:
          "absolute top-44 right-[12%] w-10 h-10 bg-[#FBBF24] opacity-15 animate-float-reverse",
        style: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      },
      {
        className:
          "absolute bottom-32 left-[15%] w-8 h-8 bg-[#E64833] opacity-10 rotate-45 animate-float-diagonal",
      },
      {
        className:
          "absolute top-60 right-[8%] w-20 h-20 border-[3px] border-[#FBBF24] opacity-10 animate-spin-slow",
      },
      {
        className:
          "absolute bottom-48 right-[25%] w-6 h-6 bg-[#2563EB] rounded-full opacity-15 animate-float",
      },
      {
        className:
          "absolute top-36 left-[35%] w-4 h-4 bg-[#0A0A0A] rounded-full opacity-10 animate-float-reverse",
      },
      {
        className:
          "absolute bottom-20 left-[40%] w-16 h-[3px] bg-[#2563EB] opacity-15 rotate-[30deg] animate-float-diagonal",
      },
    ],
    section: [
      {
        className:
          "absolute top-16 right-[10%] w-12 h-12 border-[3px] border-[#FBBF24] rounded-full opacity-15 animate-float",
      },
      {
        className:
          "absolute bottom-16 left-[8%] w-8 h-8 bg-[#2563EB] opacity-10 rotate-45 animate-float-reverse",
      },
      {
        className:
          "absolute top-1/2 right-[5%] w-6 h-6 bg-[#E64833] opacity-10 animate-float-diagonal",
        style: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      },
    ],
    pricing: [
      {
        className:
          "absolute top-20 left-[5%] w-24 h-24 border-[3px] border-[#2563EB] rounded-full opacity-10 animate-spin-slow",
      },
      {
        className:
          "absolute bottom-20 right-[8%] w-16 h-16 bg-[#FBBF24] opacity-10 rotate-45 animate-float",
      },
      {
        className:
          "absolute top-1/3 right-[15%] w-10 h-10 bg-[#E64833] opacity-10 animate-float-reverse",
        style: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      },
      {
        className:
          "absolute bottom-1/3 left-[12%] w-6 h-6 bg-[#2563EB] rounded-full opacity-15 animate-float-diagonal",
      },
      {
        className:
          "absolute top-10 right-[40%] w-32 h-[3px] bg-[#FBBF24] opacity-15 rotate-12 animate-float",
      },
    ],
    faq: [
      {
        className:
          "absolute top-10 right-[6%] w-20 h-20 border-[3px] border-dashed border-[#2563EB] rounded-full opacity-10 animate-spin-slow",
      },
      {
        className:
          "absolute bottom-10 left-[5%] w-12 h-12 bg-[#FBBF24] opacity-10 animate-float",
        style: { clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" },
      },
      {
        className:
          "absolute top-1/2 left-[8%] w-5 h-5 bg-[#E64833] rounded-full opacity-15 animate-float-reverse",
      },
    ],
  };

  return (
    <div className="dark:opacity-[0.25] transition-opacity duration-500">
      {(shapes[variant] || shapes.section).map((shape, i) => (
        <div
          key={i}
          className={shape.className}
          style={shape.style}
          aria-hidden
        />
      ))}
    </div>
  );
};

/* ─────────── SECTION REVEAL WRAPPER ─────────── */
const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─────────── MARQUEE DATA ─────────── */
/* ─────────── AVATAR COMPONENT ─────────── */
const Avatar = ({
  name,
  bg = "bg-[#2563EB]",
}: {
  name: string;
  bg?: string;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className={`w-9 h-9 rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 ${bg} flex items-center justify-center text-[10px] font-bold uppercase tracking-wider ${
        bg === "bg-white" || bg === "bg-[#FBBF24]"
          ? "text-[#0A0A0A]"
          : "text-white"
      }`}
    >
      {initials}
    </div>
  );
};

const baseMarqueePosts = [
  {
    name: "Muzan Y.",
    role: "Tech Founder",
    text: "The future of SaaS isn't just wrapping LLMs. It's about deep workflow integration. Here is how we reduced churn by 40%...",
    metrics: "+12k Impr.",
    score: "99%",
    avatarBg: "bg-[#FBBF24]",
  },
  {
    name: "Sarah J.",
    role: "Growth Lead",
    text: "Stop posting generic advice. The algorithm rewards vulnerability and hard data. We tested 100 variations of hooks this week...",
    metrics: "+8k Impr.",
    score: "94%",
    avatarBg: "bg-[#2563EB]",
  },
  {
    name: "David L.",
    role: "Product Manager",
    text: "Shipping features is easy. Solving the right problem is hard. After 5 years in product, here is the brutally honest framework...",
    metrics: "+15k Impr.",
    score: "97%",
    avatarBg: "bg-[#0A0A0A]",
  },
  {
    name: "Elena Rivers",
    role: "Marketing Dir",
    text: "Your B2B marketing strategy is probably too boring. Professional doesn't mean lifeless. We injected humor into our cold outreach...",
    metrics: "+10k Impr.",
    score: "96%",
    avatarBg: "bg-[#E64833]",
  },
];
const marqueePosts = [
  ...baseMarqueePosts,
  ...baseMarqueePosts,
  ...baseMarqueePosts,
  ...baseMarqueePosts,
];

/* ─────────── THEME TOGGLE ─────────── */
const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-white/10" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    // Enable smooth transition on all elements
    document.documentElement.classList.add("theme-transition");
    // Switch theme instantly
    setTheme(isDark ? "light" : "dark");
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 600);
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip (Hidden on Mobile) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="hidden md:block absolute top-full mt-2.5 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap pointer-events-none z-999 border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[2px_2px_0px_0px_#2563EB]"
          >
            {isDark ? "Light Mode" : "Dark Mode"}
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
        className="relative w-9 h-9 cursor-pointer rounded-full border-[2px] border-[#0A0A0A] dark:border-white/25 bg-white dark:bg-white/10 flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all overflow-hidden group"
        whileTap={{ scale: 0.85 }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* SUN - Always in DOM, animated via GPU */}
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
            <Sun className="w-4 h-4 text-[#FBBF24]" strokeWidth={2.5} />
          </motion.div>

          {/* MOON - Always in DOM, animated via GPU */}
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
            <Moon className="w-4 h-4 text-[#2563EB]" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Glow ring on hover */}
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

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
export default function TrendMind() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 500);
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F5F5F5] font-[family-name:var(--font-space-grotesk)] selection:bg-[#2563EB] selection:text-white overflow-x-hidden relative">
      {/* ═══ GRID BACKGROUND ═══ */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ═══════════════ NAVBAR & MOBILE OVERLAY ═══════════════ */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed w-full top-0 z-50 flex flex-col"
      >
        {/* Main Navbar Bar (Hidden when Mobile Menu is open) */}
        {!mobileMenu && (
          <div className="px-5 lg:px-10 py-3.5 flex justify-between items-center relative z-50 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b-[3px] border-[#0A0A0A] dark:border-white/15">
            <div className="flex items-center gap-8">
              <a
                href="#hero"
                className="text-lg font-black font-display tracking-tight flex items-center gap-2 uppercase text-[#0A0A0A] dark:text-white"
              >
                <TrendMindLogo />
                TrendMind
              </a>
              <div className="hidden lg:flex gap-2 text-xs font-bold uppercase tracking-wider">
                {["About", "Features", "Pricing", "FAQ"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-4 py-2 rounded-full border-[3px] border-transparent hover:border-[#0A0A0A] dark:hover:border-white/30 hover:shadow-[3px_3px_0px_0px_#0A0A0A] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] hover:bg-white dark:hover:bg-white/10 transition-all duration-200 text-[#0A0A0A] dark:text-white/80"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="font-bold text-xs uppercase hidden md:block hover:text-[#2563EB] dark:hover:text-[#3b82f6] transition-colors tracking-wider">
                Sign In
              </button>

              {/* Desktop Get Access Button with Arrow Icon */}
              <a
                href="#pricing"
                className="hidden md:inline-flex items-center gap-2 bg-[#2563EB] text-white rounded-full px-6 py-2.5 text-xs font-black uppercase border-[3px] border-[#0A0A0A] dark:border-white/20 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
              >
                Get Access <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
              </a>

              {/* Mobile Menu Open Toggle */}
              <button
                className="lg:hidden p-2 rounded-[0.8rem] border-[3px] border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-white/10 text-[#0A0A0A] dark:text-white shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
                onClick={() => setMobileMenu(true)}
              >
                <Menu className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}

        {/* Scroll progress bar */}
        {!mobileMenu && (
          <motion.div
            className="h-[3px] bg-[#2563EB] dark:bg-[#3b82f6] origin-left relative z-50"
            style={{ scaleX }}
          />
        )}
      </motion.nav>

      {/* ═══════════════ EXACT MOBILE MENU TAKEOVER WITH ANIMATIONS ═══════════════ */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#FAFAFA] dark:bg-[#0A0A0A] flex flex-col overflow-hidden"
          >
            {/* Animated Background Elements (Grid & Shapes) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {/* Background Grid */}
              <div
                className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              ></div>

              {/* Floating Geometric Shapes */}
              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-32 -left-8 w-24 h-24 border-[3px] border-blue-200 rounded-full opacity-60"
              ></motion.div>
              <motion.div
                animate={{ rotate: [0, 360], y: [0, -20, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-40 -right-6 w-20 h-20 bg-red-100/50 rotate-45"
              ></motion.div>
            </div>

            {/* Header */}
            <div className="px-5 py-3.5 flex justify-between items-center border-b-[3px] border-[#0A0A0A] dark:border-white/15 bg-white dark:bg-[#111111] relative z-10">
              <a
                href="#hero"
                onClick={() => setMobileMenu(false)}
                className="text-xl font-black font-display tracking-tight flex items-center gap-2 uppercase text-[#0A0A0A] dark:text-white"
              >
                <TrendMindLogo />
                TrendMind
              </a>
              <button
                className="p-1.5 rounded-[0.8rem] border-[3px] border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-white/10 text-[#0A0A0A] dark:text-white shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
                onClick={() => setMobileMenu(false)}
              >
                <XIcon className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Massive Pill Buttons Container */}
            <div className="flex-1 flex flex-col px-6 pt-10 pb-8 gap-5 overflow-y-auto relative z-10">
              {["About", "Features", "Pricing", "FAQ"].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenu(false)}
                  className="w-full text-center py-5 rounded-[2rem] border-[3px] border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-white/10 text-[#0A0A0A] dark:text-white font-black uppercase tracking-wider text-base shadow-[5px_5px_0px_0px_#0A0A0A] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
                >
                  {item}
                </motion.a>
              ))}

              {/* Distinctive Blue Get Access Button WITH ICON */}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#pricing"
                onClick={() => setMobileMenu(false)}
                className="w-full flex items-center justify-center gap-2 py-5 rounded-[2rem] border-[3px] border-[#0A0A0A] dark:border-white/20 bg-[#2563EB] text-white font-black uppercase tracking-wider text-base shadow-[5px_5px_0px_0px_#0A0A0A] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all mt-2"
              >
                Get Access <ArrowUpRight className="w-5 h-5" strokeWidth={3} />
              </motion.a>
            </div>

            {/* 4-Color Bottom Indicator Line */}
            <div className="w-full h-1.5 flex mt-auto relative z-10">
              <div className="h-full bg-[#2563EB] w-1/4"></div>
              <div className="h-full bg-[#FBBF24] w-1/4"></div>
              <div className="h-full bg-[#E64833] w-1/4"></div>
              <div className="h-full bg-[#0A0A0A] w-1/4"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ FULL-SCREEN MOBILE MENU ═══ */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#FAFAFA] dark:bg-[#0A0A0A] lg:hidden flex flex-col"
          >
            {/* Top bar */}
            <div className="px-5 py-3.5 flex justify-between items-center border-b-[3px] border-[#0A0A0A] dark:border-white/15">
              <a
                href="#hero"
                onClick={() => setMobileMenu(false)}
                className="text-lg font-bold tracking-tight flex items-center gap-2 uppercase"
              >
                <TrendMindLogo />
                TrendMind
              </a>
              <button
                className="p-2 rounded-xl border-[2px] border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-white/10"
                onClick={() => setMobileMenu(false)}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links centered */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8">
              {["About", "Features", "Pricing", "FAQ"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenu(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="w-full max-w-xs text-center px-6 py-4 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/20 font-bold text-lg uppercase tracking-wider hover:bg-[#FBBF24] transition-colors shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] bg-white dark:bg-white/10 dark:text-white"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="#pricing"
                onClick={() => setMobileMenu(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs text-center px-6 py-4 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/20 bg-[#2563EB] text-white font-bold text-lg uppercase tracking-wider shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]"
              >
                Get Access
              </motion.a>
            </div>

            {/* Bottom decoration */}
            <div className="px-8 pb-8">
              <div className="flex h-[4px] rounded-full overflow-hidden">
                <div className="flex-1 bg-[#2563EB]" />
                <div className="flex-1 bg-[#FBBF24]" />
                <div className="flex-1 bg-[#E64833]" />
                <div className="flex-1 bg-[#0A0A0A]" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* ═══════════════ 1. HERO ═══════════════ */}
        <section
          id="hero"
          className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 pt-28 pb-16 overflow-hidden"
        >
          <FloatingShapes variant="hero" />

          {/* ── Glow Orbs ── */}
          <div className="absolute top-1/4 left-[10%] w-[420px] h-[420px] bg-[#2563EB]/[0.07] dark:bg-[#2563EB]/[0.15] rounded-full blur-[100px] animate-glow-drift pointer-events-none" />
          <div className="absolute bottom-1/4 right-[8%] w-[360px] h-[360px] bg-[#FBBF24]/[0.08] dark:bg-[#FBBF24]/[0.12] rounded-full blur-[90px] animate-glow-drift-2 pointer-events-none" />
          <div className="absolute top-[60%] left-[45%] w-[280px] h-[280px] bg-[#E64833]/[0.05] dark:bg-[#E64833]/[0.1] rounded-full blur-[80px] animate-glow-drift pointer-events-none" />

          {/* ── Grain Overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.015] animate-grain"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")',
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />

          {/* ── Scattered micro-dots ── */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#2563EB] opacity-20 dark:opacity-30 animate-float"
              style={{
                top: `${15 + i * 14}%`,
                left: `${5 + i * 16}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
          {[...Array(5)].map((_, i) => (
            <div
              key={`dot2-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[#FBBF24] opacity-25 dark:opacity-35 animate-float-reverse"
              style={{
                top: `${20 + i * 15}%`,
                right: `${4 + i * 12}%`,
                animationDelay: `${i * 1.1}s`,
                animationDuration: `${6 + i}s`,
              }}
            />
          ))}

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2.5 mb-8 z-10 relative"
          >
            {[
              {
                label: "AI-Powered",
                bg: "bg-[#FBBF24]",
                text: "text-[#0A0A0A]",
              },
              { label: "Data-Driven", bg: "bg-[#2563EB]", text: "text-white" },
              {
                label: "Growth-Focused",
                bg: "bg-white dark:bg-white/15",
                text: "text-[#0A0A0A] dark:text-white",
              },
            ].map((badge, i) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className={`${badge.bg} ${badge.text} border-[2px] border-[#0A0A0A] dark:border-white/20 px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]`}
              >
                {badge.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1] font-bold tracking-tight uppercase mb-5 z-10 relative max-w-5xl"
          >
            Strategic LinkedIn
            <br />
            Content{" "}
            <span className="text-[#2563EB] relative inline-block">
              Created
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FBBF24] origin-left rounded-full"
              />
            </span>
            <br />
            <span className="text-[#2563EB]">In Seconds.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg font-medium text-[#0A0A0A]/70 dark:text-white/60 max-w-2xl mx-auto mb-8 z-10 relative leading-relaxed"
          >
            Craft high-performing LinkedIn posts with AI-powered strategy and
            data-driven insights. Professional content that drives
            engagement—without the guesswork.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto z-10 relative"
          >
            <a
              href="#pricing"
              className="bg-[#2563EB] text-white rounded-full px-8 py-3.5 text-sm font-bold uppercase border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all flex items-center justify-center gap-2 tracking-wide"
            >
              Get Early Access <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowDemo(true)}
              className="bg-white dark:bg-white/10 text-[#0A0A0A] dark:text-white rounded-full px-8 py-3.5 text-sm font-bold uppercase border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all flex items-center justify-center gap-2 tracking-wide hover:bg-[#FBBF24] dark:hover:bg-[#FBBF24] dark:hover:text-[#0A0A0A]"
            >
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-12 z-10 relative"
          >
            {[
              {
                value: "2K+",
                label: "Active Users",
                icon: <Users className="w-4 h-4" />,
              },
              {
                value: "1M+",
                label: "Posts Created",
                icon: <TrendingUp className="w-4 h-4" />,
              },
              {
                value: "98%",
                label: "Satisfaction",
                icon: <Sparkles className="w-4 h-4" />,
              },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center bg-white dark:bg-white/10">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════ MARQUEE ═══════════════ */}
        <section className="w-full relative pb-20 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] dark:from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] dark:from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-5 w-max px-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {marqueePosts.map((post, i) => (
              <div
                key={i}
                className="w-[340px] bg-white dark:bg-[#141414] border-[2px] border-[#0A0A0A] dark:border-white/15 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] flex flex-col shrink-0 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_#2563EB] dark:hover:shadow-[6px_6px_0px_0px_#3b82f6] transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={post.name} bg={post.avatarBg} />
                    <div>
                      <div className="font-bold uppercase text-xs">
                        {post.name}
                      </div>
                      <div className="font-medium text-[10px] opacity-50 uppercase">
                        {post.role}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-white/10 px-2 py-1 rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 text-[10px] font-bold uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />{" "}
                    {post.score}
                  </div>
                </div>
                <p className="font-medium text-sm leading-relaxed mb-3 line-clamp-3">
                  {post.text}
                </p>
                <div className="mt-auto pt-3 border-t-[2px] border-[#0A0A0A]/10 dark:border-white/10 flex justify-between items-center font-bold text-[10px] uppercase">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-[#2563EB]" />{" "}
                    {post.metrics}
                  </span>
                  <span className="opacity-30 font-mono text-[9px]">
                    TrendMind AI
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ═══════════════ 2. HOW IT WORKS ═══════════════ */}
        <section
          id="about"
          className="py-24 px-5 bg-white dark:bg-[#111111] border-y-[3px] border-[#0A0A0A] dark:border-white/15 relative overflow-hidden"
        >
          <FloatingShapes variant="section" />
          <div className="max-w-5xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block bg-[#FBBF24] border-[2px] border-[#0A0A0A] dark:border-white/20 px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] mb-4 text-[#0A0A0A]">
                  How It Works
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-3">
                  Three Steps to Dominate
                </h2>
                <p className="text-base font-medium opacity-60 max-w-md mx-auto">
                  From strategy to virality in minutes, not hours.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8 md:gap-10 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[3px] bg-[#0A0A0A] dark:bg-white/20 z-0" />

              {[
                {
                  step: "01",
                  title: "Set Strategy",
                  desc: "Define your objectives, voice, and target audience in seconds.",
                  bg: "bg-[#FBBF24]",
                  text: "text-[#0A0A0A]",
                },
                {
                  step: "02",
                  title: "AI Creates",
                  desc: "Receive data-driven posts, hooks, and formats instantly.",
                  bg: "bg-[#2563EB]",
                  text: "text-white",
                },
                {
                  step: "03",
                  title: "Schedule & Grow",
                  desc: "Auto-schedule at optimal times and watch engagement soar.",
                  bg: "bg-white dark:bg-[#1A1A1A]",
                  text: "text-[#0A0A0A] dark:text-white",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div
                    className={`${item.bg} ${item.text} p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] relative group hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#0A0A0A] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.12)] transition-all mt-8 md:mt-0`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-[#1A1A1A] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-full flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] text-[#0A0A0A] dark:text-white">
                      {item.step}
                    </div>
                    <div className="relative z-10 mt-6 text-center">
                      <h3 className="text-xl font-bold uppercase mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium opacity-80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 3. FEATURES ═══════════════ */}
        <section
          id="features"
          className="py-24 lg:py-36 px-5 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative overflow-hidden"
        >
          {/* Section bg elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#2563EB]/[0.04] dark:bg-[#2563EB]/[0.08] rounded-full blur-[80px]" />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#FBBF24]/[0.05] dark:bg-[#FBBF24]/[0.08] rounded-full blur-[70px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border-[1px] border-dashed border-[#0A0A0A]/[0.04] dark:border-white/[0.06] rounded-full animate-orbit" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Section header */}
            <Reveal>
              <div className="text-center mb-16 lg:mb-20">
                <span className="inline-block bg-[#2563EB] text-white border-[2px] border-[#0A0A0A] dark:border-white/20 px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] mb-5">
                  Features
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight mb-4 leading-[1.1]">
                  Everything You Need to
                  <br />
                  <span className="text-[#2563EB] relative inline-block">
                    Dominate LinkedIn
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute -bottom-1 left-0 w-full h-[4px] bg-[#FBBF24] origin-left rounded-full"
                    />
                  </span>
                </h2>
                <p className="text-base md:text-lg font-medium text-[#0A0A0A]/60 dark:text-white/50 max-w-xl mx-auto">
                  AI-powered tools that transform your content strategy from
                  guesswork into a science.
                </p>
              </div>
            </Reveal>

            {/* ── Bento Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {/* Card 1 — Content Analytics (spans 2 cols on lg) */}
              <Reveal delay={0} className="lg:col-span-2">
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="bg-[#FBBF24] p-7 md:p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[8px_8px_0px_0px_#2563EB] dark:hover:shadow-[8px_8px_0px_0px_#3b82f6] transition-shadow relative overflow-hidden group cursor-pointer h-full"
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 bg-white dark:bg-black/80 rounded-xl border-[2px] border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A]">
                        <LineChart className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg uppercase tracking-tight">
                          Content Analytics
                        </h3>
                        <p className="text-xs font-medium opacity-70">
                          Deep insights into what resonates
                        </p>
                      </div>
                    </div>
                    {/* Mini chart visualization */}
                    <div className="flex items-end gap-2 md:gap-3 h-28 w-full mt-4">
                      {[35, 55, 40, 72, 48, 90, 65, 100, 78, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.1 + i * 0.06,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className={`flex-1 rounded-t-lg border-[2px] border-[#0A0A0A] transition-colors duration-300 ${
                            i >= 7
                              ? "bg-[#2563EB]"
                              : "bg-white dark:bg-white/90"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl md:text-3xl font-bold tracking-tight">
                        +340%
                      </span>
                      <span className="bg-white dark:bg-white/90 px-3 py-1.5 rounded-full border-[2px] border-[#0A0A0A] text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#0A0A0A] text-[#0A0A0A]">
                        ↑ Engagement
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>

              {/* Card 2 — AI Generation */}
              <Reveal delay={0.1}>
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="bg-[#2563EB] text-white p-7 md:p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[8px_8px_0px_0px_#FBBF24] transition-shadow relative overflow-hidden group cursor-pointer h-full"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
                  </div>
                  {/* Dot pattern */}
                  <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 bg-[#FBBF24] rounded-xl border-[2px] border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A] text-[#0A0A0A]">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">
                        AI Generation
                      </h3>
                    </div>
                    <p className="text-sm font-medium opacity-80 mb-6 leading-relaxed">
                      Data-driven posts, hooks, and formats generated instantly
                      by AI.
                    </p>
                    {/* Fake generated content */}
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border-[2px] border-white/20">
                      <div className="space-y-2.5 mb-4">
                        <div className="h-2.5 w-4/5 bg-white/30 rounded-full" />
                        <div className="h-2.5 w-full bg-white/25 rounded-full" />
                        <div className="h-2.5 w-3/5 bg-white/20 rounded-full" />
                      </div>
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-flex items-center gap-1.5 bg-[#FBBF24] text-[#0A0A0A] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      >
                        <Sparkles className="w-3 h-3" /> Generating...
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>

              {/* Card 3 — Smart Scheduling */}
              <Reveal delay={0.15}>
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="bg-white dark:bg-[#141414] p-7 md:p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[8px_8px_0px_0px_#FBBF24] transition-shadow relative overflow-hidden group cursor-pointer h-full"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FBBF24]/20 to-transparent group-hover:animate-shimmer" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 bg-[#FAFAFA] dark:bg-white/10 rounded-xl border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">
                        Smart Scheduling
                      </h3>
                    </div>
                    <p className="text-sm font-medium opacity-60 mb-5 leading-relaxed">
                      Post at mathematically optimal times for max reach.
                    </p>
                    {/* Calendar mini grid */}
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={
                            i === 2 || i === 5 ? { scale: [1, 1.08, 1] } : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i === 5 ? 0.5 : 0,
                          }}
                          className={`aspect-square rounded-lg border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center font-bold text-xs ${
                            i === 2
                              ? "bg-[#FBBF24] shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] text-[#0A0A0A]"
                              : i === 5
                                ? "bg-[#2563EB] text-white shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]"
                                : "bg-[#FAFAFA] dark:bg-white/5"
                          }`}
                        >
                          {i + 14}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>

              {/* Card 4 — Trend Tracking */}
              <Reveal delay={0.2}>
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="bg-white dark:bg-[#141414] p-7 md:p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[8px_8px_0px_0px_#E64833] transition-shadow relative overflow-hidden group cursor-pointer h-full"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#E64833]/10 to-transparent group-hover:animate-shimmer" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 bg-[#FAFAFA] dark:bg-white/10 rounded-xl border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">
                        Trend Tracking
                      </h3>
                    </div>
                    <p className="text-sm font-medium opacity-60 mb-5 leading-relaxed">
                      Capitalize on viral formats before they peak.
                    </p>
                    {/* Trend line */}
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-4 rounded-xl border-[2px] border-[#0A0A0A] dark:border-white/15 shadow-[3px_3px_0px_0px_#FBBF24]"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                          Viral Format #4
                        </span>
                        <span className="bg-[#E64833] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                          Trending
                        </span>
                      </div>
                      <div className="w-full h-12 relative">
                        <svg
                          className="w-full h-full overflow-visible"
                          preserveAspectRatio="none"
                          viewBox="0 0 200 50"
                        >
                          <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M0,40 Q30,35 50,30 T100,18 T150,8 T200,2"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <motion.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 2,
                              ease: "easeInOut",
                              delay: 0.3,
                            }}
                            d="M0,45 Q30,42 50,38 T100,30 T150,25 T200,20"
                            fill="none"
                            stroke="#FBBF24"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.5"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </Reveal>

              {/* Card 5 — Performance Score (spans 2 cols on lg) */}
              <Reveal delay={0.25}>
                <motion.div
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className="bg-gradient-to-br from-[#2563EB] to-[#0A0A0A] text-white p-7 md:p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#FBBF24] hover:shadow-[8px_8px_0px_0px_#FBBF24] transition-shadow relative overflow-hidden group cursor-pointer h-full"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer" />
                  </div>
                  {/* Animated gradient orb */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FBBF24] rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-[#FBBF24] rounded-xl border-[2px] border-[#0A0A0A] flex items-center justify-center shadow-[2px_2px_0px_0px_#0A0A0A]">
                        <BarChart3 className="w-5 h-5 text-[#0A0A0A]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg uppercase tracking-tight">
                          Performance Score
                        </h3>
                        <p className="text-xs font-medium opacity-60">
                          Pre-publish validation
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-white/70 mb-8 leading-relaxed max-w-md">
                      Every post gets scored before publishing. Know exactly how
                      it will perform with our proprietary engagement prediction
                      engine.
                    </p>

                    {/* Score visualization */}
                    <div className="flex items-end gap-6">
                      <div className="flex-1">
                        <div className="flex items-end gap-2 h-24">
                          {[45, 65, 78, 88, 92].map((val, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              whileInView={{ height: `${val}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.6,
                                delay: 0.1 + i * 0.08,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="flex-1 bg-[#FBBF24] rounded-t-lg border-[2px] border-[#0A0A0A]"
                            />
                          ))}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mt-2">
                          Trending
                        </div>
                      </div>

                      {/* Score badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.5,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="flex flex-col items-center"
                      >
                        <div className="relative w-24 h-24">
                          <svg
                            className="w-full h-full -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              stroke="white"
                              strokeWidth="3"
                              fill="none"
                              opacity="0.15"
                            />
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="42"
                              stroke="#FBBF24"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 0.94 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.5,
                                delay: 0.5,
                                ease: "easeOut",
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1, type: "spring" }}
                              className="text-2xl font-bold text-[#FBBF24] tracking-tight"
                            >
                              94
                            </motion.span>
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">
                              Score
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </div>

            {/* Bottom feature pills */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-3 mt-12">
                {[
                  "Multi-format Support",
                  "A/B Testing",
                  "Hashtag AI",
                  "Hook Library",
                  "Team Collaboration",
                  "API Access",
                ].map((pill, i) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="px-4 py-2 rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 bg-white dark:bg-white/10 text-[10px] font-bold uppercase tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 hover:bg-[#FBBF24] dark:hover:bg-[#FBBF24] dark:hover:text-[#0A0A0A] transition-all cursor-default"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ 4. TESTIMONIALS ═══════════════ */}
        <section className="py-24 lg:py-32 px-5 border-y-[3px] border-[#0A0A0A] dark:border-white/15 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative overflow-hidden">
          <FloatingShapes variant="section" />

          <div className="max-w-6xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block bg-white dark:bg-white/10 border-[2px] border-[#0A0A0A] dark:border-white/20 px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] mb-4">
                  Testimonials
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-3">
                  Loved By Professionals
                </h2>
                <p className="text-base font-medium opacity-60 max-w-lg mx-auto">
                  See how TrendMind is helping creators grow their presence.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 items-start">
              {[
                {
                  name: "Boluwatife Ogunbiyi",
                  role: "Product Manager",
                  stat: "20x",
                  label: "Growth",
                  text: "I now have a clear strategy for my LinkedIn content. The Data insights has helped me gain consistency.",
                  avatarBg: "bg-[#FBBF24]",
                  accent: "bg-[#FBBF24]",
                  shadow: "#FBBF24",
                  mt: "mt-0",
                },
                {
                  name: "Rhoda Ogbodo",
                  role: "Founder",
                  stat: "+100%",
                  label: "Impressions",
                  text: "The AI recommendations are spot-on! They changed the way we curate linkedin specific content entirely.",
                  avatarBg: "bg-[#2563EB]",
                  accent: "bg-[#2563EB]",
                  shadow: "#2563EB",
                  mt: "md:mt-10",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Strategist",
                  stat: "5hrs",
                  label: "Saved/Week",
                  text: "The time I save on content creation is incredible. Now I can actually focus on higher-level strategy.",
                  avatarBg: "bg-[#0A0A0A]",
                  accent: "bg-[#0A0A0A]",
                  shadow: "#0A0A0A",
                  mt: "md:mt-20",
                },
              ].map((review, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div
                    className={`bg-white dark:bg-[#141414] p-7 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 relative hover:-translate-y-2 transition-all ${review.mt}`}
                    style={{
                      boxShadow: `6px 6px 0px 0px ${review.shadow}`,
                    }}
                  >
                    {/* Star badge */}
                    <div
                      className={`absolute -top-3 -right-3 w-10 h-10 ${review.accent} border-[2px] border-[#0A0A0A] rounded-full flex items-center justify-center`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          review.accent === "bg-[#0A0A0A]"
                            ? "text-white"
                            : "text-[#0A0A0A]"
                        }`}
                        fill="currentColor"
                      />
                    </div>

                    <p className="font-medium text-sm mb-6 leading-relaxed pt-2">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    <div className="flex flex-col gap-3 border-t-[2px] border-[#0A0A0A]/10 dark:border-white/10 pt-5">
                      <div className="flex justify-between items-center">
                        <div className="text-3xl font-bold tracking-tight">
                          {review.stat}
                        </div>
                        <div className="bg-[#FAFAFA] dark:bg-white/10 px-2.5 py-1 rounded-lg border-[2px] border-[#0A0A0A] dark:border-white/20 text-[9px] font-bold uppercase">
                          {review.label}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar name={review.name} bg={review.avatarBg} />
                        <div>
                          <div className="font-bold uppercase text-xs">
                            {review.name}
                          </div>
                          <div className="font-medium text-[10px] opacity-50 uppercase">
                            {review.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 5. PRICING ═══════════════ */}
        <section
          id="pricing"
          className="py-24 lg:py-32 px-5 bg-white dark:bg-[#111111] relative overflow-hidden border-b-[3px] border-[#0A0A0A] dark:border-white/15"
        >
          <FloatingShapes variant="pricing" />

          {/* Bauhaus geometric background accents */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#2563EB] opacity-[0.04] rounded-full" />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-[#FBBF24] opacity-[0.05] rounded-full" />
            <div
              className="absolute top-1/4 right-[5%] w-24 h-24 bg-[#E64833] opacity-[0.04]"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block bg-[#FBBF24] border-[2px] border-[#0A0A0A] dark:border-white/20 px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] mb-4 text-[#0A0A0A]">
                  Pricing
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-3">
                  Simple, Honest Pricing
                </h2>
                <p className="text-base font-medium text-[#0A0A0A]/60 dark:text-white/50">
                  Start for free. Scale when you&apos;re ready.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
              {/* Free Plan */}
              <Reveal delay={0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-[#FAFAFA] dark:bg-[#1A1A1A] p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.08)] relative z-10"
                >
                  {/* Inner geometric accent */}
                  <div className="absolute top-4 right-4 w-10 h-10 border-[2px] border-[#0A0A0A] dark:border-white/10 rounded-full opacity-10" />
                  <div
                    className="absolute bottom-6 right-8 w-6 h-6 bg-[#FBBF24] opacity-10"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  />

                  <h3 className="text-xl font-bold uppercase mb-1">
                    Free Plan
                  </h3>
                  <p className="font-medium text-xs opacity-50 mb-6 uppercase tracking-wider">
                    Starter
                  </p>
                  <div className="text-5xl leading-none font-bold mb-3 tracking-tight">
                    $0
                    <span className="text-lg opacity-40 font-medium">/mo</span>
                  </div>
                  <div className="text-[#2563EB] dark:text-[#3b82f6] font-bold uppercase text-[10px] mb-7 tracking-widest bg-white dark:bg-white/10 inline-block px-3 py-1 border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-full">
                    10 generations/mo
                  </div>
                  <ul className="space-y-3 mb-8 text-sm font-semibold uppercase">
                    {[
                      "10 AI Generations",
                      "Basic Scheduling",
                      "Content Templates",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white dark:bg-white/10 border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-white dark:bg-white/10 text-[#0A0A0A] dark:text-white py-3.5 rounded-full text-sm font-bold uppercase border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all tracking-wide">
                    Get Started
                  </button>
                </motion.div>
              </Reveal>

              {/* Pro Plan */}
              <Reveal delay={0.2}>
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-[#2563EB] text-white p-8 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/15 shadow-[10px_10px_0px_0px_#0A0A0A] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.08)] relative z-20"
                >
                  {/* Discount badge */}
                  <div className="absolute -top-4 -right-4 bg-[#FBBF24] text-[#0A0A0A] w-20 h-20 rounded-full flex items-center justify-center text-center leading-tight font-bold uppercase border-[3px] border-[#0A0A0A] dark:border-white/20 shadow-[3px_3px_0px_0px_#0A0A0A] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] rotate-12 text-sm">
                    75%
                    <br />
                    OFF
                  </div>

                  {/* Inner geometric accents */}
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-[2px] border-white/20 rounded-full" />
                  <div
                    className="absolute top-12 right-24 w-5 h-5 border-[2px] border-white/15"
                    style={{
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                  />

                  <h3 className="text-xl font-bold uppercase mb-1">Pro Plan</h3>
                  <p className="font-medium text-xs opacity-80 mb-6 uppercase tracking-wider">
                    Early Adopters
                  </p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-2xl font-bold opacity-40 line-through">
                      $29
                    </span>
                    <div className="text-5xl leading-none font-bold tracking-tight text-[#FBBF24]">
                      $10
                      <span className="text-lg text-white opacity-70 font-medium">
                        /mo
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm font-semibold uppercase">
                    {[
                      "Unlimited Content",
                      "Smart Scheduling",
                      "Strategy Generation",
                      "Priority Support",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#FBBF24] border-[2px] border-[#0A0A0A] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#0A0A0A]" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-[#FBBF24] text-[#0A0A0A] py-3.5 rounded-full text-sm font-bold uppercase border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all tracking-wide">
                    Get Early Access
                  </button>
                </motion.div>
              </Reveal>
            </div>

            {/* Trust badges */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-12 text-[10px] font-bold uppercase tracking-widest opacity-40">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> SSL Secured
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Instant Setup
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Cancel Anytime
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ 6. FAQ ═══════════════ */}
        <section
          id="faq"
          className="py-24 lg:py-32 px-5 border-b-[3px] border-[#0A0A0A] dark:border-white/15 bg-[#FAFAFA] dark:bg-[#0A0A0A] relative overflow-hidden"
        >
          <FloatingShapes variant="faq" />

          {/* Bauhaus background accents */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-32 left-1/2 w-96 h-96 bg-[#2563EB] opacity-[0.03] rounded-full transform -translate-x-1/2" />
            <div className="absolute -bottom-24 -left-12 w-48 h-48 bg-[#FBBF24] opacity-[0.04]" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-14">
                <span className="inline-block bg-white dark:bg-white/10 border-[2px] border-[#0A0A0A] dark:border-white/20 px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] mb-4">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-3">
                  Got Questions?
                </h2>
                <p className="text-base font-medium opacity-60">
                  Everything you need to know about TrendMind.
                </p>
              </div>
            </Reveal>

            <div className="space-y-4">
              {[
                {
                  q: "What's included in the free trial?",
                  a: "Full access to all features in the Professional plan for 7 days. Generate, schedule, and analyze with no limits.",
                  icon: <Sparkles className="w-4 h-4" />,
                },
                {
                  q: "Can I change plans later?",
                  a: "Yes, you can upgrade or downgrade your plan instantly at any time from your account settings. Changes apply immediately.",
                  icon: <TrendingUp className="w-4 h-4" />,
                },
                {
                  q: "Do I need a credit card for the trial?",
                  a: "No. Start your trial without providing any payment information. It is completely risk-free.",
                  icon: <Shield className="w-4 h-4" />,
                },
                {
                  q: "How does the AI generate content?",
                  a: "TrendMind analyzes trending formats, your industry data, and proven engagement patterns to craft posts optimized for the LinkedIn algorithm.",
                  icon: <Zap className="w-4 h-4" />,
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. We use enterprise-grade encryption and never share your content or analytics data with third parties.",
                  icon: <Shield className="w-4 h-4" />,
                },
              ].map((faq, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div
                    className={`border-[3px] border-[#0A0A0A] dark:border-white/15 rounded-2xl overflow-hidden transition-all group ${
                      activeFaq === i
                        ? "bg-white dark:bg-[#141414] shadow-[6px_6px_0px_0px_#2563EB]"
                        : "bg-white dark:bg-[#141414] shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A0A0A] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.1)]"
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full text-left p-5 font-bold uppercase text-sm flex justify-between items-center gap-4 hover:bg-[#FBBF24]/30 dark:hover:bg-[#FBBF24]/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center transition-colors ${
                            activeFaq === i
                              ? "bg-[#2563EB] text-white"
                              : "bg-[#FAFAFA] dark:bg-white/10"
                          }`}
                        >
                          {faq.icon}
                        </div>
                        <span className="leading-snug">{faq.q}</span>
                      </div>
                      <div
                        className={`w-8 h-8 border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          activeFaq === i
                            ? "rotate-45 bg-[#2563EB] text-white"
                            : "bg-white dark:bg-white/10 group-hover:bg-[#FBBF24] dark:group-hover:bg-[#FBBF24]"
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t-[3px] border-[#0A0A0A] dark:border-white/15 bg-[#FAFAFA] dark:bg-[#0A0A0A]"
                        >
                          <p className="p-5 font-medium text-sm leading-relaxed opacity-70">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 7. PRE-FOOTER CTA ═══════════════ */}
        <section className="py-20 px-5 bg-[#FBBF24] dark:bg-[#FBBF24]/90 text-center border-b-[3px] border-[#0A0A0A] dark:border-white/15 relative overflow-hidden">
          {/* Bauhaus geometric BG */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -left-16 w-48 h-48 border-[4px] border-[#0A0A0A] rounded-full opacity-10" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#0A0A0A] opacity-[0.06]" />
            <div
              className="absolute top-1/4 right-[20%] w-16 h-16 bg-[#E64833] opacity-10"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
            <div className="absolute bottom-8 left-[15%] w-8 h-8 bg-[#2563EB] rounded-full opacity-15 animate-float" />
          </div>

          <Reveal>
            <h2 className="text-3xl md:text-[2.75rem] font-bold uppercase tracking-tight mb-4 max-w-2xl mx-auto relative z-10 leading-tight">
              Ready to Dominate LinkedIn?
            </h2>
            <p className="text-base font-medium mb-8 max-w-lg mx-auto opacity-80 relative z-10">
              Join thousands of professionals already using TrendMind to grow
              their audience and influence.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white rounded-full px-8 py-3.5 text-sm font-bold uppercase border-[2px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#FAFAFA] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all relative z-10 tracking-wide"
            >
              Start Your Free Trial <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>
        </section>
      </main>

      {/* ═══════════════ 8. FOOTER ═══════════════ */}
      <footer className="bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
        {/* Geometric accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[10%] w-24 h-24 border-[2px] border-white/10 rounded-full" />
          <div
            className="absolute bottom-16 left-[8%] w-16 h-16 border-[2px] border-white/10"
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          />
          <div className="absolute top-1/3 left-[45%] w-4 h-4 bg-[#FBBF24] opacity-20 rounded-full animate-float" />
        </div>

        <div className="max-w-6xl mx-auto px-5 pt-14 pb-8 relative z-10">
          {/* Top stripe - Bauhaus color bar */}
          <div className="flex h-[4px] mb-10 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#2563EB]" />
            <div className="flex-1 bg-[#FBBF24]" />
            <div className="flex-1 bg-[#E64833]" />
            <div className="flex-1 bg-white" />
          </div>

          {/* Footer grid — mobile: brand top, then Product+Legal side by side, then Powered By */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12">
            {/* Brand — full width on mobile, 5 cols on md */}
            <div className="col-span-2 md:col-span-5">
              <div className="text-xl font-bold tracking-tight flex items-center gap-2 mb-4 uppercase">
                <TrendMindLogo />
                TrendMind
              </div>
              <p className="text-white/50 font-medium text-sm max-w-sm leading-relaxed mb-5">
                Craft high-performing posts with AI-powered strategy and
                dominate your industry on LinkedIn.
              </p>
              {/* Social links */}
              <div className="flex gap-2.5">
                {[
                  {
                    icon: <Linkedin className="w-4 h-4" />,
                    bg: "hover:bg-[#2563EB]",
                  },
                  {
                    icon: <Twitter className="w-4 h-4" />,
                    bg: "hover:bg-[#1DA1F2]",
                  },
                  {
                    icon: <Github className="w-4 h-4" />,
                    bg: "hover:bg-white/20",
                  },
                  {
                    icon: <Mail className="w-4 h-4" />,
                    bg: "hover:bg-[#E64833]",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-9 h-9 rounded-lg border-[2px] border-white/20 flex items-center justify-center ${social.bg} hover:border-transparent transition-all`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Product — 1 col on mobile, 2 cols on md */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold uppercase mb-4 text-xs tracking-wider text-[#FBBF24]">
                Product
              </h4>
              <ul className="space-y-3 font-medium text-start text-xs uppercase tracking-wider text-white/60">
                {["About", "Features", "Pricing", "FAQ"].map((link) => (
                  <li key={link}>
                    {/* Fixed Alignment: Relative positioning to handle the chevron without pushing text */}
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-white transition-colors flex items-center relative group"
                    >
                      <ChevronRight className="w-3 h-3 absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                      <span className="transition-transform group-hover:translate-x-1">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal — 1 col on mobile, 2 cols on md */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold uppercase mb-4 text-xs tracking-wider text-[#FBBF24]">
                Legal
              </h4>
              <ul className="space-y-3 font-medium text-xs uppercase tracking-wider text-white/60">
                {["Terms", "Privacy", "Security", "Contact"].map((link) => (
                  <li key={link}>
                    {/* Fixed Alignment: Relative positioning to handle the chevron without pushing text */}
                    <a
                      href="#"
                      className="hover:text-white transition-colors flex items-center relative group"
                    >
                      <ChevronRight className="w-3 h-3 absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                      <span className="transition-transform group-hover:translate-x-1">
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Powered by — full width on mobile, 3 cols on md */}
            <div className="col-span-2 md:col-span-3">
              <h4 className="font-bold uppercase mb-4 text-xs tracking-wider text-[#FBBF24]">
                Powered By
              </h4>
              <div className="flex flex-wrap gap-2">
                {["OpenAI", "Gemini AI", "LinkedIn API"].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg border-[2px] border-white/15 text-[10px] font-bold uppercase tracking-wider text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 font-medium uppercase tracking-wider text-white/30 text-[10px]">
            <div>&copy; 2026 TrendMind. All rights reserved.</div>
            <div className="flex items-center gap-1.5">
              Built for conversion
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════ BACK TO TOP ═══════════════ */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[3px_3px_0px_0px_#2563EB] flex items-center justify-center hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all hover:bg-[#2563EB] dark:hover:bg-[#2563EB] dark:hover:text-white group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══════════════ DEMO MODAL ═══════════════ */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowDemo(false)}
                className="absolute -top-14 right-0 w-10 h-10 bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-white rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center hover:bg-[#FBBF24] transition-colors shadow-[3px_3px_0px_0px_#2563EB]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video bg-[#0A0A0A] rounded-2xl border-[3px] border-white/20 overflow-hidden shadow-[0_0_60px_rgba(37,99,235,0.3)]">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                  title="TrendMind Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <p className="text-center text-white/50 text-xs font-medium uppercase tracking-wider mt-4">
                Press ESC or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
