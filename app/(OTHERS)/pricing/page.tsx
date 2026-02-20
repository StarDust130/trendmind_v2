"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Zap,
  HelpCircle,
  ChevronDown,
  X,
} from "lucide-react";
import Footer from "@/components/elements/Footer";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// ─── FAQ COMPONENT ───
const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl bg-white dark:bg-[#111] overflow-hidden transition-all hover:border-[#2563EB] dark:hover:border-[#2563EB]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
      >
        <span className="font-black uppercase tracking-wide text-sm md:text-base text-[#0A0A0A] dark:text-white pr-4">
          {question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-[#FBBF24] rotate-180" : "bg-transparent"}`}
        >
          <ChevronDown
            size={16}
            strokeWidth={3}
            className={
              isOpen ? "text-[#0A0A0A]" : "text-[#0A0A0A] dark:text-white"
            }
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 md:px-6 pb-6 pt-2 border-t-[3px] border-[#0A0A0A]/10 dark:border-white/5">
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function PricingPage() {
  const router = useRouter();

  const faqs = [
    {
      question: "What's included in the free trial?",
      answer:
        "You get full access to all features in the Early Adopter plan for 7 days, allowing you to test every aspect of the platform's AI generation and scheduling.",
    },
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately. We don't lock you into contracts.",
    },
    {
      question: "Do I need a credit card for the trial?",
      answer:
        "No, you can start your 7-day trial without providing any payment information. Just sign up and start generating.",
    },
    {
      question: "What happens after the trial?",
      answer:
        "You can choose to subscribe to the Early Adopter plan, or your account will be automatically switched to the limited Free version.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] selection:bg-[#FBBF24] selection:text-[#0A0A0A] pb-24 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(#0A0A0A 2px, transparent 2px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* ─── TACTICAL BACK BUTTON ─── */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center w-12 h-12 bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/20 rounded-xl shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[4px_4px_0px_0px_#2563EB] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
          >
            <ArrowLeft
              className="w-6 h-6 text-[#0A0A0A] dark:text-white group-hover:-translate-x-1 transition-transform"
              strokeWidth={2.5}
            />
          </button>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 md:pt-32">
          {/* ─── HEADER ─── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBBF24]/10 border-[2px] border-[#FBBF24]/30 rounded-lg mb-6">
              <Zap className="w-4 h-4 text-[#FBBF24]" strokeWidth={3} />
              <span className="text-xs font-black text-[#FBBF24] uppercase tracking-widest">
                Risk-Free Onboarding
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white leading-[1] mb-6">
              Start with a <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#9333EA]">
                7-Day Free Trial.
              </span>
            </h1>
            <p className="text-sm md:text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Cancel anytime. No credit card required.
            </p>
          </motion.div>

          {/* ─── PRICING CARDS ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-32"
          >
            {/* FREE PLAN (Diminished visually to push the upsell) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col bg-white dark:bg-[#111] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(10,10,10,0.1)] dark:shadow-none transition-all hover:-translate-y-2"
            >
              <div className="mb-8">
                <h3 className="font-black text-2xl uppercase tracking-wider text-[#0A0A0A] dark:text-white mb-2">
                  Free
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-relaxed">
                  Perfect for testing the waters and learning the protocol.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-[#0A0A0A] dark:text-white">
                  $0
                </span>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-2">
                  / month
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-4 mb-8">
                {[
                  "1 Content Strategy",
                  "10 AI-generated posts / month",
                  "Basic Analytics",
                  "Standard Support",
                  "Content Calendar",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-slate-400 shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-xl border-[3px] border-[#0A0A0A] dark:border-white/20 bg-transparent text-[#0A0A0A] dark:text-white font-black uppercase text-sm tracking-widest hover:bg-[#0A0A0A]/5 dark:hover:bg-white/5 transition-all">
                Start Free
              </button>
            </motion.div>

            {/* EARLY ADOPTER PLAN (Aggressive styling, highly elevated) */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col bg-[#0A0A0A] dark:bg-gradient-to-br dark:from-[#111] dark:to-[#050505] border-[3px] md:border-[4px] border-[#0A0A0A] dark:border-[#FBBF24]/30 rounded-3xl p-8 shadow-[12px_12px_0px_0px_#FBBF24] dark:shadow-[0_0_40px_rgba(251,191,36,0.15)] transition-all hover:-translate-y-2 z-10"
            >
              {/* Launch Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#FBBF24] text-[#0A0A0A] px-4 py-1.5 rounded-lg border-[3px] border-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.2em] shadow-[3px_3px_0px_0px_#0A0A0A] whitespace-nowrap">
                Launch Special
              </div>

              <div className="mb-8 mt-2">
                <h3 className="font-black text-2xl uppercase tracking-wider text-white mb-2">
                  Early Adopter
                </h3>
                <p className="text-xs font-bold text-white/60 leading-relaxed">
                  For creators ready to scale their presence and dominate the
                  feed.
                </p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">$10</span>
                <span className="text-sm font-bold text-white/40 uppercase tracking-widest ml-2">
                  / month
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-4 mb-8">
                {[
                  "Up to 3 Content Strategies",
                  "50 AI-generated posts / month",
                  "Advanced Analytics",
                  "Priority Support",
                  "Automated Content Calendar",
                ].map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-[#FBBF24] shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />
                    <span className="text-sm font-bold text-white/90">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 rounded-xl border-[3px] border-[#0A0A0A] bg-[#FBBF24] text-[#0A0A0A] font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all active:bg-[#f5b316]">
                Start Plan
              </button>
            </motion.div>
          </motion.div>

          {/* ─── TACTICAL FAQ SECTION ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl border-[2px] border-[#2563EB]/30 flex items-center justify-center mb-4">
                <HelpCircle
                  className="w-6 h-6 text-[#2563EB]"
                  strokeWidth={2.5}
                />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white">
                System Briefing
              </h2>
              <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">
                Frequently Asked Questions
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {faqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
