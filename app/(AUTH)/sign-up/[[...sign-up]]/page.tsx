"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  ArrowUpRight,
  Mail,
  Lock,
  User,
  AlertCircle,
  Zap,
  BarChart3,
  Calendar,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { SiApple, SiLinkedin } from "react-icons/si";
import { TrendMindLogo } from "@/components/elements/TrendMindLogo";



/* ─── Form Logo (adapts to theme) ─── */
const FormLogo = ({ size = 26 }: { size?: number }) => (
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

/* ─── Feature Card ─── */
const FeatureCard = ({
  icon,
  title,
  desc,
  delay,
  rotate,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
  rotate: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30, rotate: rotate - 3 }}
    animate={{ opacity: 1, x: 0, rotate: rotate }}
    transition={{ delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    className="flex items-center gap-3 bg-white/15 border border-white/20 rounded-xl p-3 backdrop-blur-sm"
  >
    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
      {icon}
    </div>
    <div>
      <div className="text-white text-xs font-black uppercase tracking-wide">
        {title}
      </div>
      <div className="text-white/60 text-[10px] font-medium">{desc}</div>
    </div>
    <Check
      className="w-3.5 h-3.5 text-[#FBBF24] ml-auto shrink-0"
      strokeWidth={3}
    />
  </motion.div>
);

const features = [
  {
    icon: <Zap className="w-4 h-4" />,
    title: "AI Content",
    desc: "Posts that rank & go viral",
    delay: 0.55,
    rotate: -1.5,
  },
  {
    icon: <BarChart3 className="w-4 h-4" />,
    title: "Analytics",
    desc: "Track what's working",
    delay: 0.7,
    rotate: 0.5,
  },
  {
    icon: <Calendar className="w-4 h-4" />,
    title: "Auto-Schedule",
    desc: "Post at peak times",
    delay: 0.85,
    rotate: -0.8,
  },
];

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuth = (
    strategy: "oauth_google" | "oauth_apple" | "oauth_linkedin_oidc",
  ) => {
    if (!isLoaded) return;
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setIsLoading(true);
    setError("");
    try {
      await signUp.create({ emailAddress, password, username });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push("/verify-email");
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Sign up failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] dark:bg-[#050505] text-[#0A0A0A] dark:text-white selection:bg-[#FBBF24] selection:text-[#0A0A0A]">
      {/* ═══ BACK BUTTON ═══ */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-50 flex items-center justify-center w-11 h-11 bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_#FBBF24] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all group"
        aria-label="Back to home"
      >
        <ArrowLeft
          className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
          strokeWidth={2.5}
        />
      </Link>

      {/* ═══════════════════════════════
          LEFT PANEL — Obsidian Dark Elite
          ═══════════════════════════════ */}
      <div className="hidden lg:flex relative w-[52%] flex-col justify-between overflow-hidden bg-[#050505] p-14 border-r-[3px] border-white/5">
        {/* Deep Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Tactical Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#2563EB]/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#FBBF24]/[0.05] rounded-full blur-[100px] pointer-events-none" />

        {/* Animated Geometric Components */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 border-[1px] border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-40 h-40 border-[1px] border-white/5 rounded-full"
        />

        {/* ── Brand ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex  items-center gap-3"
        >
          <div className="p-2 bg-white/5 ml-5  rounded-lg backdrop-blur-md">
            <TrendMindLogo size={24} />
          </div>
          <span className="text-white text-xl font-black uppercase tracking-[0.2em]">
            TrendMind <span className="text-[#2563EB]">.</span>
          </span>
        </motion.div>

        {/* ── Main Copy ── */}
        <div className="relative z-10 flex flex-col gap-10 flex-1 justify-center py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              <p className="text-[#2563EB] text-[9px] font-black uppercase tracking-[0.2em]">
                System Protocol v2.0
              </p>
            </div>

            <h1 className="text-white text-[4.5rem] font-black uppercase leading-[0.85] tracking-[ -0.05em]">
              Scale <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
                Faster.
              </span>
            </h1>

            <p className="text-white/40 text-sm font-medium mt-6 max-w-[320px] leading-relaxed border-l border-white/10 pl-6">
              The high-performance engine for LinkedIn creators. Build,
              automate, and dominate the feed.
            </p>
          </motion.div>

          {/* Feature Stack (Condensed & Sharp) */}
          <div className="grid grid-cols-1 gap-3 max-w-[340px]">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="group flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-default"
              >
                <div className="text-[#2563EB] group-hover:scale-110 transition-transform">
                  {/* Assuming icon is passed in feature object */}
                  {f.icon}
                </div>
                <div className="text-[11px] font-black text-white/70 uppercase tracking-widest">
                  {f.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Footer Stats ── */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-white text-2xl font-black">10K+</div>
              <div className="text-white/30 text-[9px] font-black uppercase tracking-widest">
                Active Nodes
              </div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <div className="text-[#FBBF24] text-2xl font-black">4.9/5</div>
              <div className="text-white/30 text-[9px] font-black uppercase tracking-widest">
                Rating
              </div>
            </div>
          </div>

          {/* Neo-Brutalist Color Strip */}
          <div className="flex h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="bg-[#2563EB]"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "20%" }}
              transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
              className="bg-[#FBBF24]"
            />
          </div>
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
            className="flex items-center justify-center gap-2 mb-7 lg:hidden"
          >
            <FormLogo size={26} />
            <span className="font-black text-lg uppercase tracking-tight">
              TrendMind
            </span>
          </motion.div>

          {/* Card */}
          <div className="bg-white dark:bg-[#0D0D0D] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-[2rem] p-7 sm:p-9 shadow-[8px_8px_0px_0px_#0A0A0A] dark:shadow-[8px_8px_0px_0px_#2563EB]">
            {/* Header */}
            <div className="mb-7">
              <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">
                Create Account
              </h2>
              <p className="text-[10px] font-black text-slate-400 dark:text-white/30 uppercase tracking-[0.22em] mt-1">
                7-day free trial · No credit card
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
            <form onSubmit={onSubmit} className="space-y-4">
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

              {/* Full Name */}
              <FieldGroup
                icon={<User className="w-4 h-4" strokeWidth={2.5} />}
                label="Full Name"
                placeholder="Thor"
                value={username}
                onChange={setUsername}
                autoComplete="name"
              />
              {/* Email */}
              <FieldGroup
                icon={<Mail className="w-4 h-4" strokeWidth={2.5} />}
                label="Email"
                placeholder="thor@startup.com"
                type="email"
                value={emailAddress}
                onChange={setEmailAddress}
                autoComplete="email"
              />
              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Password
                </label>
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
                    placeholder="Min. 8 characters"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-130 hover:opacity-170 transition-opacity"
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
                className="w-full flex items-center justify-center gap-2 bg-[#FBBF24] text-[#0A0A0A] py-3.5 rounded-xl border-[3px] border-[#0A0A0A] font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-[3px] hover:translate-x-[3px] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    Create Account{" "}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </>
                )}
              </motion.button>

              {/* Fine print */}
              <p className="text-[9px] font-medium text-center opacity-130 leading-relaxed px-2">
                By creating an account you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </form>

            {/* Footer */}
            <p className="mt-5 text-center text-[10px] font-black uppercase tracking-wider opacity-140">
              Already a member?{" "}
              <Link
                href="/sign-in"
                className="text-[#0854f7] dark:text-[#3b82f6]  hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Reusable Input Field ─── */
function FieldGroup({
  icon,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest opacity-150">{label}</label>
      <div className="relative group">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-80 group-focus-within:text-[#2563EB] transition-all">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3.5 rounded-xl border-[2px] border-[#0A0A0A]/12 dark:border-white/10 bg-[#F7F7F7] dark:bg-white/[0.04] font-semibold text-sm focus:border-[#2563EB] focus:shadow-[3px_3px_0px_0px_#2563EB] outline-none transition-all placeholder:opacity-135 placeholder:text-xs"
          placeholder={placeholder}
          required
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}
