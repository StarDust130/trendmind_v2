"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView,
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
  MousePointerClick,
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
    <>
      {(shapes[variant] || shapes.section).map((shape, i) => (
        <div
          key={i}
          className={shape.className}
          style={shape.style}
          aria-hidden
        />
      ))}
    </>
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
const baseMarqueePosts = [
  {
    name: "Muzan Y.",
    role: "Tech Founder",
    text: "The future of SaaS isn't just wrapping LLMs. It's about deep workflow integration. Here is how we reduced churn by 40%...",
    metrics: "+12k Impr.",
    score: "99%",
    color: "bg-[#FBBF24]",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    name: "Sarah J.",
    role: "Growth Lead",
    text: "Stop posting generic advice. The algorithm rewards vulnerability and hard data. We tested 100 variations of hooks this week...",
    metrics: "+8k Impr.",
    score: "94%",
    color: "bg-[#2563EB]",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    name: "David L.",
    role: "Product Manager",
    text: "Shipping features is easy. Solving the right problem is hard. After 5 years in product, here is the brutally honest framework...",
    metrics: "+15k Impr.",
    score: "97%",
    color: "bg-white",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
  {
    name: "Elena Rivers",
    role: "Marketing Dir",
    text: "Your B2B marketing strategy is probably too boring. Professional doesn't mean lifeless. We injected humor into our cold outreach...",
    metrics: "+10k Impr.",
    score: "96%",
    color: "bg-white",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  },
];
const marqueePosts = [
  ...baseMarqueePosts,
  ...baseMarqueePosts,
  ...baseMarqueePosts,
  ...baseMarqueePosts,
];

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
  const [navHidden, setNavHidden] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setNavHidden(latest > 120 && latest > previous);
    setShowBackToTop(latest > 500);
  });

  // Auto-cycle features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ─── FEATURES DATA ─── */
  const features = [
    {
      title: "Content Analytics",
      desc: "Deep insights into what resonates with your audience.",
      icon: <LineChart className="w-5 h-5" />,
      bg: "bg-[#FBBF24]",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-8">
          <div className="flex items-end gap-3 md:gap-4 h-36 w-full justify-center mb-6">
            {[40, 70, 45, 90, 60, 110, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-7 md:w-10 bg-[#0A0A0A] border-[3px] border-white rounded-t-lg"
              />
            ))}
          </div>
          <div className="text-2xl md:text-4xl font-bold tracking-tight">
            +340% Engagement
          </div>
        </div>
      ),
    },
    {
      title: "AI Generation",
      desc: "Data-driven post recommendations powered by AI.",
      icon: <Zap className="w-5 h-5" />,
      bg: "bg-[#2563EB]",
      text: "text-white",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-8 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-32 h-32 border-[4px] border-dashed border-[#FBBF24] rounded-full opacity-50"
          />
          <div className="bg-white p-5 rounded-2xl border-[3px] border-[#0A0A0A] shadow-[5px_5px_0px_0px_#0A0A0A] z-10 w-full max-w-xs text-left">
            <div className="h-3 w-1/2 bg-gray-200 rounded-full mb-3" />
            <div className="h-3 w-full bg-gray-200 rounded-full mb-2.5" />
            <div className="h-3 w-full bg-gray-200 rounded-full mb-2.5" />
            <div className="h-3 w-3/4 bg-gray-200 rounded-full mb-5" />
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block bg-[#2563EB] text-white px-4 py-1 rounded-full text-xs font-bold uppercase"
            >
              Generating...
            </motion.div>
          </div>
        </div>
      ),
    },
    {
      title: "Smart Scheduling",
      desc: "Post at mathematically optimal times.",
      icon: <Calendar className="w-5 h-5" />,
      bg: "bg-white",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-8">
          <div className="grid grid-cols-4 gap-2.5 w-full max-w-xs">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === 5 || i === 8 ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`aspect-square rounded-xl border-[3px] border-[#0A0A0A] flex items-center justify-center font-bold text-sm ${
                  i === 5
                    ? "bg-[#FBBF24]"
                    : i === 8
                      ? "bg-[#2563EB] text-white"
                      : "bg-white"
                }`}
              >
                {i + 10}
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Trend Tracking",
      desc: "Capitalize on formats before they peak.",
      icon: <Activity className="w-5 h-5" />,
      bg: "bg-white",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-8">
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-xs bg-white border-[3px] border-[#0A0A0A] p-5 rounded-2xl shadow-[6px_6px_0px_0px_#FBBF24]"
          >
            <div className="flex justify-between items-center mb-5">
              <div className="font-bold uppercase text-xs tracking-wider">
                Viral Format #4
              </div>
              <Activity className="text-[#E64833] w-5 h-5" />
            </div>
            <div className="w-full h-20 border-b-[3px] border-l-[3px] border-[#0A0A0A] relative">
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  d="M0,60 Q40,10 80,45 T160,8"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="5"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  /* ─── STAGGER VARIANTS ─── */
  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-[family-name:var(--font-space-grotesk)] selection:bg-[#2563EB] selection:text-white overflow-x-hidden relative">
      {/* ═══ GRID BACKGROUND ═══ */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={navHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed w-full top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-xl border-b-[3px] border-[#0A0A0A]"
      >
        <div className="px-5 lg:px-10 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a
              href="#hero"
              className="text-lg font-bold tracking-tight flex items-center gap-2 uppercase"
            >
              <TrendMindLogo />
              TrendMind
            </a>
            <div className="hidden lg:flex gap-2 text-xs font-semibold uppercase tracking-wider">
              {["About", "Features", "Pricing", "FAQ"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-full border-[2px] border-transparent hover:border-[#0A0A0A] hover:shadow-[3px_3px_0px_0px_#0A0A0A] hover:bg-white transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-semibold text-xs uppercase hidden md:block hover:text-[#2563EB] transition-colors tracking-wider">
              Sign In
            </button>
            <a
              href="#pricing"
              className="hidden sm:inline-flex bg-[#2563EB] text-white rounded-full px-5 py-2.5 text-xs font-bold uppercase border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all"
            >
              Get Access
            </a>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-xl border-[2px] border-[#0A0A0A] bg-white"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {/* Scroll progress bar */}
        <motion.div
          className="h-[3px] bg-[#2563EB] origin-left"
          style={{ scaleX }}
        />
        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t-[3px] border-[#0A0A0A] bg-white overflow-hidden"
            >
              <div className="p-5 flex flex-col gap-3">
                {["About", "Features", "Pricing", "FAQ"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenu(false)}
                    className="px-4 py-3 rounded-xl border-[2px] border-[#0A0A0A] font-bold text-sm uppercase tracking-wider hover:bg-[#FBBF24] transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="#pricing"
                  onClick={() => setMobileMenu(false)}
                  className="px-4 py-3 rounded-xl border-[2px] border-[#0A0A0A] bg-[#2563EB] text-white font-bold text-sm uppercase tracking-wider text-center shadow-[3px_3px_0px_0px_#0A0A0A]"
                >
                  Get Access
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="relative z-10">
        {/* ═══════════════ 1. HERO ═══════════════ */}
        <section
          id="hero"
          className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 pt-28 pb-16 overflow-hidden"
        >
          <FloatingShapes variant="hero" />

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
                bg: "bg-white",
                text: "text-[#0A0A0A]",
              },
            ].map((badge, i) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className={`${badge.bg} ${badge.text} border-[2px] border-[#0A0A0A] px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A]`}
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
            className="text-base md:text-lg font-medium text-[#0A0A0A]/70 max-w-2xl mx-auto mb-8 z-10 relative leading-relaxed"
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
              className="bg-[#2563EB] text-white rounded-full px-8 py-3.5 text-sm font-bold uppercase border-[2px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all flex items-center justify-center gap-2 tracking-wide"
            >
              Get Early Access <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowDemo(true)}
              className="bg-white text-[#0A0A0A] rounded-full px-8 py-3.5 text-sm font-bold uppercase border-[2px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all flex items-center justify-center gap-2 tracking-wide hover:bg-[#FBBF24]"
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
                <div className="w-9 h-9 rounded-full border-[2px] border-[#0A0A0A] flex items-center justify-center bg-white">
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
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-5 w-max px-5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {marqueePosts.map((post, i) => (
              <div
                key={i}
                className="w-[340px] bg-white border-[2px] border-[#0A0A0A] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0A0A0A] flex flex-col shrink-0 hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_#2563EB] transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.img}
                      alt={post.name}
                      className="w-9 h-9 rounded-full border-[2px] border-[#0A0A0A] object-cover"
                    />
                    <div>
                      <div className="font-bold uppercase text-xs">
                        {post.name}
                      </div>
                      <div className="font-medium text-[10px] opacity-50 uppercase">
                        {post.role}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-2 py-1 rounded-full border-[2px] border-[#0A0A0A] text-[10px] font-bold uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />{" "}
                    {post.score}
                  </div>
                </div>
                <p className="font-medium text-sm leading-relaxed mb-3 line-clamp-3">
                  {post.text}
                </p>
                <div className="mt-auto pt-3 border-t-[2px] border-[#0A0A0A]/10 flex justify-between items-center font-bold text-[10px] uppercase">
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
          className="py-24 px-5 bg-white border-y-[3px] border-[#0A0A0A] relative overflow-hidden"
        >
          <FloatingShapes variant="section" />
          <div className="max-w-5xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block bg-[#FBBF24] border-[2px] border-[#0A0A0A] px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] mb-4">
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
              <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[3px] bg-[#0A0A0A] z-0" />

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
                  bg: "bg-white",
                  text: "text-[#0A0A0A]",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.15}>
                  <div
                    className={`${item.bg} ${item.text} p-8 rounded-2xl border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_0px_#0A0A0A] relative group hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#0A0A0A] transition-all mt-8 md:mt-0`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-white border-[3px] border-[#0A0A0A] rounded-full flex items-center justify-center font-bold text-lg shadow-[3px_3px_0px_0px_#0A0A0A] text-[#0A0A0A]">
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
          className="py-24 lg:py-32 px-5 bg-[#FAFAFA] relative overflow-hidden"
        >
          <FloatingShapes variant="section" />
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
            <div>
              <Reveal>
                <span className="inline-block bg-[#2563EB] text-white border-[2px] border-[#0A0A0A] px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] mb-5">
                  Features
                </span>
                <h2 className="text-3xl md:text-[2.75rem] leading-[1.1] font-bold uppercase tracking-tight mb-4">
                  LinkedIn AI Tools for{" "}
                  <span className="text-[#2563EB] relative">
                    Content Success.
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#FBBF24] origin-left rounded-full"
                    />
                  </span>
                </h2>
                <p className="text-sm text-[#0A0A0A]/70 font-medium mb-8 max-w-md border-l-[3px] border-[#FBBF24] pl-4 py-1 leading-relaxed">
                  Comprehensive automation tools to create viral content,
                  schedule posts, and analyze performance faster.
                </p>
              </Reveal>

              <div className="space-y-3">
                {features.map((item, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div
                      onClick={() => setActiveFeature(i)}
                      className={`p-4 rounded-xl border-[2px] border-[#0A0A0A] transition-all cursor-pointer flex items-center justify-between group ${
                        activeFeature === i
                          ? "bg-[#0A0A0A] text-white shadow-[4px_4px_0px_0px_#FBBF24] translate-x-1"
                          : "bg-white hover:bg-gray-50 shadow-[3px_3px_0px_0px_#0A0A0A] hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg border-[2px] border-[#0A0A0A] ${
                            activeFeature === i ? item.bg : "bg-[#FAFAFA]"
                          } ${item.text || "text-[#0A0A0A]"}`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-wide">
                            {item.title}
                          </h4>
                          <p
                            className={`font-medium text-xs ${
                              activeFeature === i ? "opacity-70" : "opacity-50"
                            }`}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-all ${
                          activeFeature === i
                            ? "opacity-100 text-[#FBBF24] translate-x-0"
                            : "opacity-0 -translate-x-2"
                        }`}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Interactive Window */}
            <Reveal delay={0.2}>
              <div className="relative flex justify-center h-[420px] lg:h-[480px]">
                <div className="w-full h-full bg-[#2563EB] rounded-[2rem] border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_0px_#0A0A0A] p-5 relative overflow-hidden flex flex-col items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 3px 3px, #FAFAFA 1.5px, transparent 0)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-white rounded-2xl border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_0px_#0A0A0A] relative z-10 overflow-hidden"
                    >
                      {features[activeFeature].visual}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════ 4. TESTIMONIALS ═══════════════ */}
        <section className="py-24 lg:py-32 px-5 border-y-[3px] border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden">
          <FloatingShapes variant="section" />

          <div className="max-w-6xl mx-auto relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <span className="inline-block bg-white border-[2px] border-[#0A0A0A] px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] mb-4">
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
                  img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop",
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
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
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
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
                  accent: "bg-[#0A0A0A]",
                  shadow: "#0A0A0A",
                  mt: "md:mt-20",
                },
              ].map((review, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div
                    className={`bg-white p-7 rounded-2xl border-[3px] border-[#0A0A0A] relative hover:-translate-y-2 transition-all ${review.mt}`}
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

                    <div className="flex flex-col gap-3 border-t-[2px] border-[#0A0A0A]/10 pt-5">
                      <div className="flex justify-between items-center">
                        <div className="text-3xl font-bold tracking-tight">
                          {review.stat}
                        </div>
                        <div className="bg-[#FAFAFA] px-2.5 py-1 rounded-lg border-[2px] border-[#0A0A0A] text-[9px] font-bold uppercase">
                          {review.label}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <img
                          src={review.img}
                          alt={review.name}
                          className="w-10 h-10 rounded-full border-[2px] border-[#0A0A0A] object-cover"
                        />
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
          className="py-24 lg:py-32 px-5 bg-white relative overflow-hidden border-b-[3px] border-[#0A0A0A]"
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
                <span className="inline-block bg-[#FBBF24] border-[2px] border-[#0A0A0A] px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] mb-4">
                  Pricing
                </span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-3">
                  Simple, Honest Pricing
                </h2>
                <p className="text-base font-medium text-[#0A0A0A]/60">
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
                  className="bg-[#FAFAFA] p-8 rounded-2xl border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_0px_#0A0A0A] relative z-10"
                >
                  {/* Inner geometric accent */}
                  <div className="absolute top-4 right-4 w-10 h-10 border-[2px] border-[#0A0A0A] rounded-full opacity-10" />
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
                  <div className="text-[#2563EB] font-bold uppercase text-[10px] mb-7 tracking-widest bg-white inline-block px-3 py-1 border-[2px] border-[#0A0A0A] rounded-full">
                    10 generations/mo
                  </div>
                  <ul className="space-y-3 mb-8 text-sm font-semibold uppercase">
                    {[
                      "10 AI Generations",
                      "Basic Scheduling",
                      "Content Templates",
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white border-[2px] border-[#0A0A0A] flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-white text-[#0A0A0A] py-3.5 rounded-full text-sm font-bold uppercase border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all tracking-wide">
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
                  className="bg-[#2563EB] text-white p-8 rounded-2xl border-[3px] border-[#0A0A0A] shadow-[10px_10px_0px_0px_#0A0A0A] relative z-20"
                >
                  {/* Discount badge */}
                  <div className="absolute -top-4 -right-4 bg-[#FBBF24] text-[#0A0A0A] w-20 h-20 rounded-full flex items-center justify-center text-center leading-tight font-bold uppercase border-[3px] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#0A0A0A] rotate-12 text-sm">
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
          className="py-24 lg:py-32 px-5 border-b-[3px] border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden"
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
                <span className="inline-block bg-white border-[2px] border-[#0A0A0A] px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_0px_#0A0A0A] mb-4">
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
                    className={`border-[3px] border-[#0A0A0A] rounded-2xl overflow-hidden transition-all group ${
                      activeFaq === i
                        ? "bg-white shadow-[6px_6px_0px_0px_#2563EB]"
                        : "bg-white shadow-[4px_4px_0px_0px_#0A0A0A] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#0A0A0A]"
                    }`}
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full text-left p-5 font-bold uppercase text-sm flex justify-between items-center gap-4 hover:bg-[#FBBF24]/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg border-[2px] border-[#0A0A0A] flex items-center justify-center transition-colors ${
                            activeFaq === i
                              ? "bg-[#2563EB] text-white"
                              : "bg-[#FAFAFA]"
                          }`}
                        >
                          {faq.icon}
                        </div>
                        <span className="leading-snug">{faq.q}</span>
                      </div>
                      <div
                        className={`w-8 h-8 border-[2px] border-[#0A0A0A] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          activeFaq === i
                            ? "rotate-45 bg-[#2563EB] text-white"
                            : "bg-white group-hover:bg-[#FBBF24]"
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
                          className="border-t-[3px] border-[#0A0A0A] bg-[#FAFAFA]"
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
        <section className="py-20 px-5 bg-[#FBBF24] text-center border-b-[3px] border-[#0A0A0A] relative overflow-hidden">
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
      <footer className="bg-[#0A0A0A] text-white relative overflow-hidden">
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
          <div className="flex h-[4px] mb-12 rounded-full overflow-hidden">
            <div className="flex-1 bg-[#2563EB]" />
            <div className="flex-1 bg-[#FBBF24]" />
            <div className="flex-1 bg-[#E64833]" />
            <div className="flex-1 bg-white" />
          </div>

          <div className="grid md:grid-cols-12 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-5">
              <div className="text-xl font-bold tracking-tight flex items-center gap-2 mb-5 uppercase">
                <TrendMindLogo />
                TrendMind
              </div>
              <p className="text-white/50 font-medium text-sm max-w-sm leading-relaxed mb-6">
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
                    bg: "hover:bg-[#0A0A0A]",
                  },
                  {
                    icon: <Github className="w-4 h-4" />,
                    bg: "hover:bg-[#0A0A0A]",
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

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h4 className="font-bold uppercase mb-5 text-xs tracking-wider text-[#FBBF24]">
                Product
              </h4>
              <ul className="space-y-3 font-medium text-xs uppercase tracking-wider text-white/60">
                {["About", "Features", "Pricing", "Changelog"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-2">
              <h4 className="font-bold uppercase mb-5 text-xs tracking-wider text-[#FBBF24]">
                Legal
              </h4>
              <ul className="space-y-3 font-medium text-xs uppercase tracking-wider text-white/60">
                {["Terms", "Privacy", "Security", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Powered by */}
            <div className="md:col-span-3">
              <h4 className="font-bold uppercase mb-5 text-xs tracking-wider text-[#FBBF24]">
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
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#0A0A0A] text-white rounded-full border-[2px] border-[#0A0A0A] shadow-[3px_3px_0px_0px_#2563EB] flex items-center justify-center hover:shadow-none hover:translate-y-0.5 hover:translate-x-0.5 transition-all hover:bg-[#2563EB] group"
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
                className="absolute -top-14 right-0 w-10 h-10 bg-white text-[#0A0A0A] rounded-full border-[2px] border-[#0A0A0A] flex items-center justify-center hover:bg-[#FBBF24] transition-colors shadow-[3px_3px_0px_0px_#2563EB]"
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
