"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  ArrowUpRight,
  Mail,
  Lock,
  AlertCircle,
  BarChart3,
  Zap,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { SiApple, SiLinkedin } from "react-icons/si";

/* ─── Logo ─── */
const TrendMindLogo = ({ size = 32 }: { size?: number }) => (
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

/* ─── Animated Post Card (Left Panel Decoration) ─── */
const AnimatedPostCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: -2 }}
    animate={{ opacity: 1, y: 0, rotate: -2 }}
    transition={{ delay: 0.6, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    className="w-full max-w-[300px] bg-white/[0.06] border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
  >
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-[10px] font-black text-white">
        MK
      </div>
      <div>
        <div className="text-white text-xs font-bold">Muzan K.</div>
        <div className="text-white/40 text-[10px] font-medium uppercase">
          Tech Founder
        </div>
      </div>
      <div className="ml-auto flex items-center gap-1 bg-[#FBBF24]/20 border border-[#FBBF24]/30 px-2 py-0.5 rounded-full">
        <Zap className="w-2.5 h-2.5 text-[#FBBF24]" fill="currentColor" />
        <span className="text-[#FBBF24] text-[9px] font-black">99%</span>
      </div>
    </div>
    <p className="text-white/60 text-[11px] leading-relaxed line-clamp-3 mb-3">
      The future of SaaS isn&apos;t just wrapping LLMs. It&apos;s about deep
      workflow integration. Here&apos;s how we reduced churn by 40%…
    </p>
    <div className="flex items-center justify-between pt-2.5 border-t border-white/10">
      <span className="flex items-center gap-1 text-[10px] font-bold text-[#2563EB]">
        <BarChart3 className="w-3 h-3" /> +12k Impressions
      </span>
      <span className="text-white/20 text-[9px] font-mono">TrendMind AI</span>
    </div>
  </motion.div>
);

const panelStats = [
  {
    label: "Active Users",
    value: "10K+",
    icon: <TrendingUp className="w-3.5 h-3.5" />,
  },
  {
    label: "Posts Created",
    value: "1M+",
    icon: <BarChart3 className="w-3.5 h-3.5" />,
  },
  {
    label: "Avg. Growth",
    value: "340%",
    icon: <Zap className="w-3.5 h-3.5" />,
  },
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
export default function CustomSignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuth = (
    strategy: "oauth_google" | "oauth_apple" | "oauth_linkedin_oidc",
  ) => {
    if (!isLoaded) return;
    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage || "Authentication failed. Try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] dark:bg-[#050505] text-[#0A0A0A] dark:text-white selection:bg-[#2563EB] selection:text-white">
      {/* ═══ BACK BUTTON ═══ */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-11 h-11 bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_#2563EB] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all group"
        aria-label="Back to home"
      >
        <ArrowLeft
          className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
          strokeWidth={2.5}
        />
      </Link>

      {/* ═══════════════════════════════
          LEFT PANEL — Desktop Only
          ═══════════════════════════════ */}
      <div className="hidden lg:flex relative w-[52%] flex-col justify-between overflow-hidden bg-[#050505] border-r-[3px] border-white/[0.08] p-14">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-[-15%] left-[-15%] w-[600px] h-[600px] bg-[#2563EB]/[0.13] rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#FBBF24]/[0.06] rounded-full blur-[100px] pointer-events-none" />

        {/* Geometric rotating shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-14 right-14 w-28 h-28 border-[3px] border-[#2563EB]/25 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-14 right-14 w-14 h-14 border-[2px] border-[#FBBF24]/20 rounded-full"
        />
        <motion.div
          animate={{ y: [-14, 14, -14] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-28 right-10 w-10 h-10 bg-[#2563EB]/20 rotate-45"
        />
        <motion.div
          animate={{ y: [12, -12, 12] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-2/5 right-6 w-4 h-4 bg-[#FBBF24]/30 rounded-full"
        />
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          className="absolute bottom-16 left-10 w-12 h-12 bg-[#E64833]/15"
        />

        {/* ── Brand ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center  md:ml-10 gap-3"
        >
          <TrendMindLogo size={28} />
          <span className="text-white text-xl font-black uppercase tracking-tight">
            TrendMind
          </span>
        </motion.div>

        {/* ── Main Copy ── */}
        <div className="relative z-10 flex flex-col gap-7 flex-1 justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-[#2563EB] text-[10px] font-black uppercase tracking-[0.35em] mb-3">
              Good to have you back
            </p>
            <h1 className="text-white text-[3.75rem] font-black uppercase leading-[0.92] tracking-tighter">
              Back In
              <br />
              The{" "}
              <span className="text-[#2563EB] relative inline-block">
                Game.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#FBBF24] origin-left rounded-full"
                />
              </span>
            </h1>
          </motion.div>

          {/* Post Card Mockup */}
          <AnimatedPostCard />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="grid grid-cols-3 gap-2.5"
          >
            {panelStats.map((s, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 text-center"
              >
                <div className="text-[#2563EB] flex justify-center mb-1">
                  {s.icon}
                </div>
                <div className="text-white font-black text-base leading-none">
                  {s.value}
                </div>
                <div className="text-white/35 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="border-l-[3px] border-[#FBBF24] pl-4"
          >
            <p className="text-white/55 text-sm italic leading-relaxed">
              &ldquo;TrendMind tripled my LinkedIn engagement in 3 weeks. The
              only tool I recommend.&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-[#E64833] flex items-center justify-center text-[9px] font-black text-white">
                SR
              </div>
              <span className="text-white/35 text-[10px] font-bold uppercase tracking-wide">
                Sarah R. · Growth Lead
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Color Bar ── */}
        <div className="relative z-10 flex h-[3px] rounded-full overflow-hidden">
          <div className="flex-1 bg-[#2563EB]" />
          <div className="flex-1 bg-[#FBBF24]" />
          <div className="flex-1 bg-[#E64833]" />
          <div className="flex-1 bg-white/20" />
        </div>
      </div>

      {/* ═══════════════════════════════
          RIGHT PANEL — Form
          ═══════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 mb-7 w-full lg:hidden"
          >
            <TrendMindLogo size={26} />
            <span className="font-black text-lg uppercase tracking-tight">
              TrendMind
            </span>
          </motion.div>

          {/* Card */}
          <div className="bg-white dark:bg-[#0D0D0D] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-[2rem] p-7 sm:p-9 shadow-[8px_8px_0px_0px_#0A0A0A] dark:shadow-[8px_8px_0px_0px_#2563EB]">
            {/* Header */}
            <div className="mb-7">
              <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">
                Welcome Back
              </h2>
              <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.22em] mt-1">
                Access your workspace
              </p>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                {
                  icon: (
                    <SiApple className="w-[18px] h-[18px] dark:text-white" />
                  ),
                  label: "Apple",
                  fn: () => handleOAuth("oauth_apple"),
                },
                {
                  icon: <FcGoogle className="w-[18px] h-[18px]" />,
                  label: "Google",
                  fn: () => handleOAuth("oauth_google"),
                },
                {
                  icon: (
                    <SiLinkedin className="w-[18px] h-[18px] text-[#0A66C2]" />
                  ),
                  label: "LinkedIn",
                  fn: () => handleOAuth("oauth_linkedin_oidc"),
                },
              ].map((btn) => (
                <motion.button
                  key={btn.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={btn.fn}
                  type="button"
                  className="h-12 flex flex-col items-center justify-center gap-1 bg-[#F5F5F5] dark:bg-white/[0.05] border-[2px] border-[#0A0A0A]/10 dark:border-white/10 rounded-xl hover:border-[#0A0A0A]/40 dark:hover:border-white/30 hover:shadow-[3px_3px_0px_0px_#0A0A0A] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] transition-all"
                >
                  {btn.icon}
                  <span className="text-[8px] font-black uppercase tracking-wider opacity-40">
                    {btn.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t-[2px] border-[#0A0A0A]/10 dark:border-white/10" />
              <span className="mx-3 text-[9px] font-black uppercase tracking-widest opacity-30 whitespace-nowrap">
                or with email
              </span>
              <div className="flex-grow border-t-[2px] border-[#0A0A0A]/10 dark:border-white/10" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2 bg-[#E64833]/10 border-[2px] border-[#E64833]/40 text-[#E64833] dark:text-red-400 rounded-xl p-3 text-xs font-bold"
                  >
                    <AlertCircle
                      className="w-4 h-4 shrink-0"
                      strokeWidth={2.5}
                    />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-80 group-focus-within:text-[#2563EB] transition-all"
                    strokeWidth={2.5}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border-[2px] border-[#0A0A0A]/12 dark:border-white/10 bg-[#F7F7F7] dark:bg-white/[0.04] font-semibold text-sm focus:border-[#2563EB] focus:shadow-[3px_3px_0px_0px_#2563EB] outline-none transition-all placeholder:opacity-35 placeholder:text-xs"
                    placeholder="name@domain.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-black text-[#2563EB] dark:text-[#3b82f6] hover:underline uppercase tracking-wide"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-80 group-focus-within:text-[#2563EB] transition-all"
                    strokeWidth={2.5}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3.5 rounded-xl border-[2px] border-[#0A0A0A]/12 dark:border-white/10 bg-[#F7F7F7] dark:bg-white/[0.04] font-semibold text-sm focus:border-[#2563EB] focus:shadow-[3px_3px_0px_0px_#2563EB] outline-none transition-all placeholder:opacity-35 placeholder:text-xs"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-70 transition-opacity"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <Eye className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-3.5 rounded-xl border-[3px] border-[#0A0A0A] dark:border-white/20 font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_#FBBF24] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    Sign In{" "}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-[10px] font-black uppercase tracking-wider opacity-40">
              No account?{" "}
              <Link
                href="/sign-up"
                className="text-[#2563EB] dark:text-[#3b82f6] opacity-100 hover:underline ml-1"
              >
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
