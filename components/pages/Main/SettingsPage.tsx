"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CreditCard,
  Settings as SettingsIcon,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Camera,
  LogOut,
  Moon,
  Sun,
  Laptop,
  AlertTriangle,
  Save,
} from "lucide-react";

const tabVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
};

export default function SettingsClient() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "identity" | "preferences" | "billing" | "security"
  >("identity");

  // ─── IDENTITY STATE ───
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // ─── IMAGE UPLOAD STATE ───
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // ─── DANGER ZONE STATE ───
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hydrate user data safely
  useEffect(() => {
    setMounted(true);
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  // ─── HEADLESS API ACTIONS ───
  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      await user.update({ firstName, lastName });
      setTimeout(() => setIsSaving(false), 600); // UI feedback buffer
    } catch (error) {
      console.error("Profile update failed:", error);
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploadingImage(true);
    try {
      await user.setProfileImage({ file });
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image. Please try a smaller file.");
    }
    setIsUploadingImage(false);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await user.delete();
      router.push("/");
    } catch (error) {
      console.error("Account deletion failed:", error);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const tabs = [
    {
      id: "identity",
      label: "Identity",
      icon: <User size={16} strokeWidth={2.5} />,
    },
    {
      id: "preferences",
      label: "Workspace",
      icon: <SettingsIcon size={16} strokeWidth={2.5} />,
    },
    {
      id: "billing",
      label: "Billing & Limits",
      icon: <CreditCard size={16} strokeWidth={2.5} />,
    },
    {
      id: "security",
      label: "Security",
      icon: <ShieldAlert size={16} strokeWidth={2.5} />,
    },
  ];

  if (!mounted || !isLoaded) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 min-h-[60vh]">
        <div className="w-10 h-10 border-[4px] border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] animate-pulse">
          Accessing Secure Records...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col pt-2 pb-12 relative">
      {/* ─── DANGER ZONE MODAL ─── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white dark:bg-[#0A0A0A] border-[3px] border-[#E64833] rounded-2xl p-6 shadow-[8px_8px_0px_0px_#E64833] flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-[#E64833] mb-2">
                <AlertTriangle size={28} strokeWidth={2.5} />
                <h2 className="font-black text-xl uppercase tracking-tight">
                  Confirm Annihilation
                </h2>
              </div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                This action is irreversible. All generated content, templates,
                and strategies linked to{" "}
                <span className="text-[#0A0A0A] dark:text-white">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>{" "}
                will be permanently purged from the database.
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-[#FAFAFA] dark:bg-[#111] text-[#0A0A0A] dark:text-white border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#E64833] text-white border-[3px] border-[#0A0A0A] rounded-xl font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Purge Account"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HEADER ─── */}
      <div className="shrink-0 mb-6 md:mb-10">
        <h1 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-2">
          System Settings
        </h1>
        <p className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">
          Configure identity parameters, workspace physics, and clearance
          levels.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start">
        {/* ─── TACTICAL NAVIGATION SIDEBAR ─── */}
        <div className="w-full md:w-56 shrink-0 overflow-x-auto md:overflow-visible custom-scrollbar pb-2 md:pb-0">
          <div className="flex md:flex-col gap-2 min-w-max md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`group relative flex items-center justify-between px-4 py-3 md:py-3.5 rounded-xl border-[3px] font-black uppercase tracking-widest text-[10px] md:text-xs transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] border-[#0A0A0A] dark:border-white shadow-[4px_4px_0px_0px_#2563EB] translate-x-1 md:translate-x-2"
                    : "bg-white dark:bg-[#111] text-[#0A0A0A] dark:text-white border-[#0A0A0A] dark:border-white/10 hover:shadow-[4px_4px_0px_0px_#0A0A0A] hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${activeTab === tab.id ? "text-[#2563EB]" : "text-slate-400 group-hover:text-[#0A0A0A] dark:group-hover:text-white transition-colors"}`}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ─── SETTINGS CONTENT CANVAS ─── */}
        <div className="flex-1 w-full min-h-[500px]">
          <AnimatePresence mode="wait">
            {/* 1. IDENTITY TAB */}
            {activeTab === "identity" && (
              <motion.div
                key="identity"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-none">
                  <h2 className="font-black text-lg uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-6 border-b-[3px] border-[#0A0A0A]/10 dark:border-white/10 pb-4">
                    Identity Core
                  </h2>

                  {/* Headless Avatar Upload */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-20 h-20 rounded-2xl border-[3px] border-[#0A0A0A] dark:border-white/20 overflow-hidden shadow-[4px_4px_0px_0px_#2563EB] bg-[#FAFAFA] dark:bg-[#111] shrink-0">
                      {isUploadingImage ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="w-6 h-6 border-[3px] border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : null}
                      {user?.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Avatar Module
                      </p>

                      {/* Hidden File Input & Trigger */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingImage}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-lg text-[#0A0A0A] dark:text-white font-black text-[10px] uppercase tracking-widest hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all disabled:opacity-50"
                      >
                        <Camera size={14} /> Upload Image
                      </button>
                    </div>
                  </div>

                  {/* Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl p-3.5 text-sm font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_#2563EB] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl p-3.5 text-sm font-bold text-[#0A0A0A] dark:text-white focus:outline-none focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_#2563EB] transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Secure Email (Immutable)
                      </label>
                      <div className="flex items-center gap-3 w-full bg-slate-100 dark:bg-[#050505] border-[2px] border-[#0A0A0A]/10 dark:border-white/5 rounded-xl p-3.5 text-sm font-bold text-slate-500 cursor-not-allowed">
                        <CheckCircle2 size={16} className="text-[#10B981]" />
                        {user?.primaryEmailAddress?.emailAddress}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleUpdateProfile}
                    disabled={isSaving}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2563EB] text-white px-8 py-4 rounded-xl border-[3px] border-[#0A0A0A] font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save size={16} strokeWidth={3} /> Sync Identity
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* 2. PREFERENCES TAB (Workspace Settings) */}
            {activeTab === "preferences" && (
              <motion.div
                key="preferences"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-none">
                  <h2 className="font-black text-lg uppercase tracking-tight text-[#0A0A0A] dark:text-white mb-6 border-b-[3px] border-[#0A0A0A]/10 dark:border-white/10 pb-4">
                    Workspace Physics
                  </h2>

                  <div className="flex flex-col gap-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white mb-2">
                      Display Mode
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setTheme("light")}
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-[2px] font-black text-xs uppercase tracking-widest transition-all ${theme === "light" ? "bg-[#FAFAFA] border-[#0A0A0A] text-[#0A0A0A] shadow-[3px_3px_0px_0px_#2563EB]" : "bg-transparent border-slate-200 dark:border-[#222] text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}
                      >
                        <Sun size={20} /> Light
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-[2px] font-black text-xs uppercase tracking-widest transition-all ${theme === "dark" ? "bg-[#0A0A0A] border-white text-white shadow-[3px_3px_0px_0px_#FBBF24]" : "bg-transparent border-slate-200 dark:border-[#222] text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}
                      >
                        <Moon size={20} /> Dark
                      </button>
                      <button
                        onClick={() => setTheme("system")}
                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-[2px] font-black text-xs uppercase tracking-widest transition-all ${theme === "system" ? "bg-[#2563EB] border-[#0A0A0A] text-white shadow-[3px_3px_0px_0px_#0A0A0A]" : "bg-transparent border-slate-200 dark:border-[#222] text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"}`}
                      >
                        <Laptop size={20} /> System
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. BILLING TAB */}
            {activeTab === "billing" && (
              <motion.div
                key="billing"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-none relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#FBBF24]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                        Current Clearance
                      </p>
                      <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[#0A0A0A] dark:text-white">
                        Free Protocol
                      </h2>
                    </div>
                    <div className="px-3 py-1 bg-[#0A0A0A] dark:bg-white text-white dark:text-[#0A0A0A] font-black text-[10px] uppercase tracking-widest rounded-md border-[2px] border-[#0A0A0A] dark:border-white/20 shadow-[2px_2px_0px_0px_#2563EB]">
                      Active
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 mb-10 relative z-10">
                    <div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                        <span className="text-[#0A0A0A] dark:text-white">
                          AI Generation Output
                        </span>
                        <span className="text-[#E64833]">80% Cap (8/10)</span>
                      </div>
                      <div className="w-full h-3 bg-[#FAFAFA] dark:bg-[#111] rounded-full border-[2px] border-[#0A0A0A] dark:border-white/20 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FBBF24] to-[#E64833] w-[80%]" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/pricing")}
                    className="w-full flex items-center justify-center gap-2 bg-[#FBBF24] text-[#0A0A0A] py-4 rounded-xl border-[3px] border-[#0A0A0A] font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all active:bg-[#f5b316]"
                  >
                    <Zap size={16} strokeWidth={3} /> Upgrade System Capacity
                  </button>
                </div>
              </motion.div>
            )}

            {/* 4. SECURITY & DANGER ZONE */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-6"
              >
                {/* Session Control */}
                <div className="bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-2xl p-6 shadow-[6px_6px_0px_0px_#0A0A0A] dark:shadow-none flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black uppercase text-sm text-[#0A0A0A] dark:text-white">
                      Active Session
                    </h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                      Currently logged into the network
                    </p>
                  </div>
                  <button
                    onClick={() => signOut(() => router.push("/"))}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#FAFAFA] dark:bg-[#111] border-[2px] border-[#0A0A0A] dark:border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest text-[#0A0A0A] dark:text-white hover:shadow-[3px_3px_0px_0px_#0A0A0A] dark:hover:shadow-none dark:hover:border-white/50 transition-all"
                  >
                    <LogOut size={14} strokeWidth={2.5} /> Terminate Connection
                  </button>
                </div>

                {/* The Red Zone */}
                <div className="border-[3px] border-[#E64833] bg-white dark:bg-[#0A0A0A] rounded-2xl p-6 md:p-8 flex flex-col items-start gap-4 shadow-[6px_6px_0px_0px_#E64833]">
                  <div className="flex items-center gap-3 text-[#E64833] border-b-[2px] border-[#E64833]/20 w-full pb-3">
                    <ShieldAlert size={20} strokeWidth={2.5} />
                    <h3 className="font-black text-base uppercase tracking-tight">
                      Danger Zone
                    </h3>
                  </div>
                  <p className="text-xs font-bold text-[#0A0A0A] dark:text-white/80 max-w-2xl leading-relaxed">
                    Initiating the purge protocol will permanently destroy your
                    TrendMind identity, deleting all saved strategies, pending
                    AI posts, and API configurations. You will lose access
                    immediately.
                  </p>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="mt-2 w-full sm:w-auto px-6 py-4 bg-[#E64833]/10 text-[#E64833] border-[2px] border-[#E64833] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#E64833] hover:text-white transition-colors focus:outline-none"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
