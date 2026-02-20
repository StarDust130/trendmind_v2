"use client";

import { Header } from "@/components/elements/Header";
import { Sidebar } from "@/components/elements/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    // Base layer defines the background for the entire screen
    <div className="flex h-screen bg-white dark:bg-[#0A0A0A] overflow-hidden selection:bg-[#2563EB] selection:text-white">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main App Canvas - Now completely unrestricted */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Mobile Backdrop Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-[#0A0A0A]/60 backdrop-blur-md z-30 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <Header setIsMobileOpen={setIsMobileOpen} />

        {/* ─── FIXED: THE UNBOXED CANVAS ─── */}
        {/* All outer margins, heavy borders, and rounded corners are DESTROYED. 
            The scrollable area now natively fills the exact remaining browser space. */}
        <main className="flex-1 min-h-0 overflow-y-auto custom-scrollbar relative">
          {/* Subtle top inner shadow to separate header from canvas in light mode */}
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/[0.02] dark:from-transparent to-transparent pointer-events-none" />

          {/* Inner constraint: Centers content on ultrawide monitors without drawing a box around it */}
          <div className="w-full max-w-[1600px] mx-auto p-4 sm:p-8 lg:p-10 flex flex-col min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
