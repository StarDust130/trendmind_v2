"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Target,
  Zap,
  LineChart,
  Calendar,
  Activity,
  Check,
  Plus,
  Star,
  Play,
  MousePointerClick,
} from "lucide-react";

// Sine Wave Logo
const TrendMindLogo = () => (
  <svg
    width="28"
    height="28"
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
// Quadruple the array to guarantee a seamless infinite loop regardless of screen size
const marqueePosts = [
  ...baseMarqueePosts,
  ...baseMarqueePosts,
  ...baseMarqueePosts,
  ...baseMarqueePosts,
];

export default function TrendMind() {
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setNavHidden(latest > 100 && latest > previous);
  });

  const features = [
    {
      title: "Content Analytics",
      desc: "Deep insights into what resonates.",
      icon: <LineChart />,
      bg: "bg-[#FBBF24]",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-8">
          <div className="flex items-end gap-4 h-40 w-full justify-center mb-6">
            {[40, 70, 45, 90, 60, 110, 85].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-10 bg-[#0A0A0A] border-[3px] border-white rounded-t-xl"
              ></motion.div>
            ))}
          </div>
          <div className="text-4xl font-black">+340% Engagement</div>
        </div>
      ),
    },
    {
      title: "AI Generation",
      desc: "Data-driven post recommendations.",
      icon: <Zap />,
      bg: "bg-[#2563EB]",
      text: "text-white",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-8 relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-40 h-40 border-[4px] border-dashed border-[#FBBF24] rounded-full opacity-50"
          ></motion.div>
          <div className="bg-white p-6 rounded-2xl border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_0px_#0A0A0A] z-10 w-full max-w-xs text-left">
            <div className="h-3 w-1/2 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-3 w-full bg-gray-200 rounded-full mb-3"></div>
            <div className="h-3 w-full bg-gray-200 rounded-full mb-3"></div>
            <div className="h-3 w-3/4 bg-gray-200 rounded-full mb-6"></div>
            <div className="inline-block bg-[#2563EB] text-white px-4 py-1 rounded-full text-xs font-black uppercase">
              Generating...
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Smart Scheduling",
      desc: "Post at mathematically optimal times.",
      icon: <Calendar />,
      bg: "bg-white",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-8">
          <div className="grid grid-cols-4 gap-3 w-full max-w-xs">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: i === 5 || i === 8 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`aspect-square rounded-xl border-[3px] border-[#0A0A0A] flex items-center justify-center font-black ${i === 5 ? "bg-[#FBBF24]" : i === 8 ? "bg-[#2563EB] text-white" : "bg-white"}`}
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
      icon: <Activity />,
      bg: "bg-white",
      visual: (
        <div className="w-full h-full flex flex-col justify-center items-center p-8">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-xs bg-white border-[3px] border-[#0A0A0A] p-6 rounded-3xl shadow-[8px_8px_0px_0px_#FBBF24]"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="font-black uppercase text-sm">
                Viral Format #4
              </div>
              <Activity className="text-[#E64833] w-6 h-6" />
            </div>
            <div className="w-full h-24 border-b-[3px] border-l-[3px] border-[#0A0A0A] relative">
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  d="M0,80 Q50,20 100,60 T200,10"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="6"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] font-sans selection:bg-[#2563EB] selection:text-white overflow-x-hidden relative">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Structured Grid Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* --- SMART NAVBAR --- */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={navHidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed w-full top-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b-[3px] border-[#0A0A0A] px-6 lg:px-10 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-10">
          <a
            href="#hero"
            className="text-xl font-black tracking-tight flex items-center gap-2 uppercase text-[#0A0A0A]"
          >
            <TrendMindLogo />
            TrendMind
          </a>
          <div className="hidden lg:flex gap-8 font-black text-xs uppercase tracking-widest">
            {["About", "Features", "Pricing", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className="hover:text-[#2563EB] transition-colors bg-white px-4 py-1.5 rounded-full border-[3px] border-transparent hover:border-[#0A0A0A] hover:shadow-[3px_3px_0px_0px_#0A0A0A]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="font-black text-xs uppercase hidden md:block hover:opacity-70 tracking-widest">
            Sign In
          </button>
          <a
            href="#pricing"
            className="bg-[#2563EB] text-white rounded-full px-6 py-2.5 text-xs font-black uppercase border-[3px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            Get Access
          </a>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* --- 1. HERO --- */}
        <section
          id="hero"
          className="max-w-7xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-3 mb-8 z-10 relative"
          >
            <span className="bg-[#FBBF24] border-[3px] border-[#0A0A0A] px-5 py-2 rounded-full font-black uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A]">
              AI-Powered
            </span>
            <span className="bg-[#2563EB] text-white border-[3px] border-[#0A0A0A] px-5 py-2 rounded-full font-black uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A]">
              Data-Driven
            </span>
            <span className="bg-white border-[3px] border-[#0A0A0A] px-5 py-2 rounded-full font-black uppercase text-xs tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A]">
              Growth-Focused
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[5rem] leading-[1] font-black tracking-tighter uppercase mb-6 z-10 relative"
          >
            Strategic LinkedIn Content <br />
            <span className="text-[#2563EB]">Created In Seconds.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl font-bold text-[#0A0A0A]/80 max-w-3xl mx-auto mb-10 z-10 relative"
          >
            Craft high-performing LinkedIn posts with AI-powered strategy and
            data-driven insights. Get professional content that drives
            engagement—without the guesswork or time investment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto z-10 relative"
          >
            <a
              href="#pricing"
              className="bg-[#2563EB] text-white rounded-full px-10 py-4 text-sm font-black uppercase border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all flex items-center justify-center gap-2"
            >
              Sign Up For Early Access <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Decorative Geometric Elements */}
          <div className="absolute top-40 left-10 w-16 h-16 border-[3px] border-[#0A0A0A] rounded-full opacity-50"></div>
          <div
            className="absolute bottom-20 right-20 w-20 h-20 bg-[#FBBF24] opacity-20"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>
        </section>

        {/* --- INFINITE POST MARQUEE (Fixed Loop) --- */}
        <section className="w-full relative pb-24 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none"></div>

          <motion.div
            className="flex gap-6 w-max px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {marqueePosts.map((post, i) => (
              <div
                key={i}
                className="w-[360px] bg-white border-[3px] border-[#0A0A0A] rounded-3xl p-6 shadow-[6px_6px_0px_0px_#0A0A0A] flex flex-col shrink-0 hover:-translate-y-2 transition-transform cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.img}
                      alt={post.name}
                      className="w-10 h-10 rounded-full border-[3px] border-[#0A0A0A] object-cover"
                    />
                    <div>
                      <div className="font-black uppercase text-xs">
                        {post.name}
                      </div>
                      <div className="font-bold text-[10px] opacity-60 uppercase">
                        {post.role}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`bg-white px-2 py-1 rounded-full border-[3px] border-[#0A0A0A] text-[10px] font-black uppercase flex items-center gap-1 ${post.color === "bg-[#2563EB]" ? "text-[#2563EB]" : "text-[#0A0A0A]"}`}
                  >
                    <Zap className="w-3 h-3 fill-current" /> {post.score}
                  </div>
                </div>
                <p className="font-bold text-sm leading-relaxed mb-4">
                  {post.text}
                </p>
                <div className="mt-auto pt-3 border-t-[3px] border-[#0A0A0A]/10 flex justify-between items-center font-black text-[10px] uppercase">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3 text-[#2563EB]" />{" "}
                    {post.metrics}
                  </span>
                  <span className="opacity-40">TrendMind AI</span>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* --- 2. HOW IT WORKS --- */}
        <section
          id="how-it-works"
          className="py-24 px-6 bg-white border-y-[3px] border-[#0A0A0A] relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                How TrendMind Works
              </h2>
              <p className="text-lg font-bold opacity-70">
                Three steps to dominate the algorithm.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-0 w-full h-[3px] bg-[#0A0A0A] z-0"></div>

              {[
                {
                  step: "01",
                  title: "Set Content Strategy",
                  desc: "Define your objectives and target audience.",
                  bg: "bg-[#FBBF24]",
                  text: "text-[#0A0A0A]",
                },
                {
                  step: "02",
                  title: "Get AI Recommendations",
                  desc: "Receive data-driven suggestions instantly.",
                  bg: "bg-[#2563EB]",
                  text: "text-white",
                },
                {
                  step: "03",
                  title: "Smart Scheduling",
                  desc: "Auto-schedule and monitor engagement.",
                  bg: "bg-white",
                  text: "text-[#0A0A0A]",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`${item.bg} ${item.text} p-10 rounded-[2rem] border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_0px_#0A0A0A] relative group hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#0A0A0A] transition-all mt-10 md:mt-0`}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white border-[3px] border-[#0A0A0A] rounded-full flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_#0A0A0A] text-[#0A0A0A]">
                    {item.step}
                  </div>
                  <div className="relative z-10 mt-8 text-center">
                    <h3 className="text-2xl font-black uppercase mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base font-bold opacity-90">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3. FEATURES (INTERACTIVE TABS) --- */}
        <section id="features" className="py-32 px-6 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl leading-[1.1] font-black uppercase tracking-tighter mb-6">
                LinkedIn AI Tools for <br />{" "}
                <span className="text-[#2563EB]">Content Success.</span>
              </h2>
              <p className="text-base text-[#0A0A0A]/80 font-bold mb-10 max-w-md border-l-[4px] border-[#FBBF24] pl-4 py-1">
                Comprehensive automation tools to create viral content, schedule
                posts, and analyze performance faster.
              </p>

              <div className="space-y-4">
                {features.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    className={`p-5 rounded-2xl border-[3px] border-[#0A0A0A] transition-all cursor-pointer flex items-center justify-between group ${activeFeature === i ? "bg-[#0A0A0A] text-white shadow-[6px_6px_0px_0px_#FBBF24] translate-x-2" : "bg-white hover:bg-gray-50 shadow-[4px_4px_0px_0px_#0A0A0A]"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-xl border-[3px] border-[#0A0A0A] ${activeFeature === i ? item.bg : "bg-[#FAFAFA]"} ${item.text || "text-[#0A0A0A]"}`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase">
                          {item.title}
                        </h4>
                        <p
                          className={`font-bold text-xs ${activeFeature === i ? "opacity-80" : "opacity-60"}`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <MousePointerClick
                      className={`w-5 h-5 transition-opacity ${activeFeature === i ? "opacity-100 text-[#FBBF24]" : "opacity-0"}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Interactive Window */}
            <div className="relative flex justify-center h-[500px]">
              <div className="w-full h-full bg-[#2563EB] rounded-[3rem] border-[3px] border-[#0A0A0A] shadow-[12px_12px_0px_0px_#0A0A0A] p-6 relative overflow-hidden flex flex-col items-center justify-center">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 4px 4px, #FAFAFA 2px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                ></div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full bg-white rounded-[2rem] border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_0px_#0A0A0A] relative z-10 overflow-hidden"
                  >
                    {features[activeFeature].visual}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. TESTIMONIALS (REDESIGNED: Light UI, Staggered Grid) --- */}
        <section className="py-32 px-6 border-y-[3px] border-[#0A0A0A] bg-[#FAFAFA] relative overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#2563EB] opacity-10 rounded-full"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-[#FBBF24] opacity-10"
            style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          ></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-[#0A0A0A]">
                Loved By Professionals
              </h2>
              <p className="text-xl font-bold opacity-70 max-w-2xl mx-auto">
                See how TrendMind is helping creators grow their presence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-start">
              {[
                {
                  name: "Boluwatife Ogunbiyi",
                  role: "Product Manager",
                  stat: "20x",
                  label: "Growth",
                  text: "I now have a clear strategy for my LinkedIn content. The Data insights has helped me gain consistency.",
                  img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop",
                  accent: "bg-[#FBBF24]",
                  mt: "mt-0",
                },
                {
                  name: "Rhoda Ogbodo",
                  role: "Founder",
                  stat: "+100%",
                  label: "Impr.",
                  text: "The AI recommendations are spot-on! They changed the way we curate linkedin specific content entirely.",
                  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                  accent: "bg-[#2563EB]",
                  mt: "md:mt-12",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Strategist",
                  stat: "5hrs",
                  label: "Saved",
                  text: "The time I save on content creation is incredible. Now I can actually focus on higher-level strategy.",
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
                  accent: "bg-[#0A0A0A]",
                  mt: "md:mt-24",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className={`bg-white p-8 rounded-[2rem] border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_0px_#0A0A0A] relative hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#0A0A0A] transition-all ${review.mt}`}
                >
                  <div
                    className={`absolute -top-4 -right-4 w-12 h-12 ${review.accent} border-[3px] border-[#0A0A0A] rounded-full flex items-center justify-center`}
                  >
                    <Star
                      className={`w-5 h-5 ${review.accent === "bg-[#0A0A0A]" ? "text-white" : "text-[#0A0A0A]"}`}
                      fill="currentColor"
                    />
                  </div>

                  <p className="font-bold text-lg mb-8 leading-relaxed relative z-10 pt-4">
                    "{review.text}"
                  </p>

                  <div className="flex flex-col gap-4 border-t-[3px] border-[#0A0A0A]/10 pt-6">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-4xl font-black tracking-tighter">
                        {review.stat}
                      </div>
                      <div className="bg-[#FAFAFA] px-3 py-1.5 rounded-lg border-[3px] border-[#0A0A0A] text-[10px] font-black uppercase text-right">
                        {review.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-[3px] border-[#0A0A0A] object-cover"
                      />
                      <div>
                        <div className="font-black uppercase text-sm">
                          {review.name}
                        </div>
                        <div className="font-bold text-[10px] opacity-60 uppercase">
                          {review.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. PRICING (REDESIGNED: Floating & Interactive) --- */}
        <section
          id="pricing"
          className="py-32 px-6 bg-white relative overflow-hidden border-b-[3px] border-[#0A0A0A]"
        >
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#0A0A0A] -z-0 opacity-10"></div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 bg-white inline-block px-4">
                Pricing Plans
              </h2>
              <p className="text-lg font-bold text-[#0A0A0A]/70">
                Start for free. Cancel anytime.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
              {/* Starter */}
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-[#FAFAFA] p-10 rounded-[2.5rem] border-[3px] border-[#0A0A0A] shadow-[8px_8px_0px_0px_#0A0A0A] relative z-10"
              >
                <h3 className="text-2xl font-black uppercase mb-2">
                  Free Plan
                </h3>
                <p className="font-bold text-sm opacity-60 mb-8">Starter</p>
                <div className="text-6xl leading-none font-black mb-4 tracking-tighter">
                  $0<span className="text-xl opacity-50 font-bold">/mo</span>
                </div>
                <div className="text-[#2563EB] font-black uppercase text-xs mb-8 tracking-widest bg-white inline-block px-3 py-1 border-[3px] border-[#0A0A0A] rounded-full">
                  10 generations/mo
                </div>
                <ul className="space-y-4 mb-10 text-sm font-black uppercase">
                  {[
                    "10 Generations",
                    "Basic Scheduling",
                    "Content Templates",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#0A0A0A]" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-white text-[#0A0A0A] py-4 rounded-full text-sm font-black uppercase border-[3px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
                  Get Started
                </button>
              </motion.div>

              {/* Pro (Levitating) */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-[#2563EB] text-white p-10 rounded-[2.5rem] border-[3px] border-[#0A0A0A] shadow-[16px_16px_0px_0px_#0A0A0A] relative z-20"
              >
                <div className="absolute -top-4 -right-4 bg-[#FBBF24] text-[#0A0A0A] w-24 h-24 rounded-full flex items-center justify-center text-center leading-tight font-black uppercase border-[3px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] rotate-12">
                  75%
                  <br />
                  OFF
                </div>
                <h3 className="text-2xl font-black uppercase mb-2">Pro Plan</h3>
                <p className="font-bold text-sm opacity-90 mb-8">
                  Early Adopters
                </p>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-3xl font-black opacity-50 line-through">
                    $29
                  </span>
                  <div className="text-6xl leading-none font-black tracking-tighter text-[#FBBF24]">
                    $10
                    <span className="text-xl text-white opacity-80 font-bold">
                      /mo
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 text-sm font-black uppercase">
                  {[
                    "Unlimited Content",
                    "Smart Scheduling",
                    "Strategy Gen",
                    "Priority Support",
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#FBBF24]" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-[#FBBF24] text-[#0A0A0A] py-4 rounded-full text-sm font-black uppercase border-[3px] border-[#0A0A0A] shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all">
                  Get Early Access
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- 6. FAQ --- */}
        <section
          id="faq"
          className="py-24 px-6 border-b-[3px] border-[#0A0A0A] bg-[#FAFAFA]"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">
              FAQ
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "What's included in the free trial?",
                  a: "Full access to all features in the Professional plan for 7 days. Generate, schedule, and analyze with no limits.",
                },
                {
                  q: "Can I change plans later?",
                  a: "Yes, you can upgrade or downgrade your plan instantly at any time from your account settings.",
                },
                {
                  q: "Do I need a credit card for the trial?",
                  a: "No. Start your trial without providing any payment information. It is completely risk-free.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="border-[3px] border-[#0A0A0A] rounded-[1.5rem] bg-white overflow-hidden shadow-[4px_4px_0px_0px_#0A0A0A] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#0A0A0A] group"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full text-left p-6 font-black uppercase text-base md:text-lg flex justify-between items-center hover:bg-[#FBBF24] transition-colors gap-4"
                  >
                    <span className="pr-4 leading-snug">{faq.q}</span>
                    <div
                      className={`bg-white border-[3px] border-[#0A0A0A] p-2 rounded-full transition-transform duration-300 group-hover:rotate-90 ${activeFaq === i ? "rotate-45 bg-[#2563EB] text-white" : ""}`}
                    >
                      <Plus className="w-5 h-5" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t-[3px] border-[#0A0A0A] bg-[#FAFAFA]"
                      >
                        <p className="p-6 font-bold text-sm leading-relaxed opacity-80">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 7. PRE-FOOTER CTA --- */}
        <section className="py-24 px-6 bg-[#FBBF24] text-center border-b-[3px] border-[#0A0A0A]">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 max-w-2xl mx-auto">
            Ready to dominate LinkedIn?
          </h2>
          <p className="text-xl font-bold mb-10 max-w-xl mx-auto opacity-90">
            Join thousands of professionals already using TrendMind.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-[#0A0A0A] text-white rounded-full px-10 py-5 text-sm font-black uppercase border-[3px] border-[#0A0A0A] shadow-[6px_6px_0px_0px_#FAFAFA] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            Sign Up For Early Access
          </a>
        </section>
      </main>

      {/* --- 8. FOOTER --- */}
      <footer className="bg-white pt-16">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="grid md:grid-cols-4 gap-12 border-b-[3px] border-[#0A0A0A]/10 pb-16">
            <div className="md:col-span-2">
              <div className="text-2xl font-black tracking-tight flex items-center gap-2 mb-6 uppercase">
                <TrendMindLogo /> TrendMind
              </div>
              <p className="text-[#0A0A0A]/70 font-bold text-sm max-w-sm leading-relaxed mb-6">
                Craft high-performing posts with AI-powered strategy and
                dominate your industry algorithm.
              </p>
              <div className="text-xs font-black uppercase tracking-widest text-[#0A0A0A]/50">
                Powered By <br />{" "}
                <span className="text-[#0A0A0A] mt-2 inline-block">
                  OpenAI • Gemini AI • LinkedIn
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase mb-6 text-sm text-[#2563EB]">
                Quick Links
              </h4>
              <ul className="space-y-4 font-bold text-xs uppercase tracking-widest text-[#0A0A0A]">
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase mb-6 text-sm text-[#2563EB]">
                Legal
              </h4>
              <ul className="space-y-4 font-bold text-xs uppercase tracking-widest text-[#0A0A0A]">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#2563EB] transition-colors"
                  >
                    Connect
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 pb-10 flex flex-col md:flex-row justify-between items-center gap-4 font-black uppercase tracking-widest text-[#0A0A0A]/40 text-[10px]">
            <div>© 2026 LinkedIn Content Suite. All rights reserved.</div>
            <div>Built for Conversion.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
