"use client";

import { useState } from "react";
import { Header } from "@/components/elements/Header";
import { Sidebar } from "@/components/elements/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#050505] overflow-hidden selection:bg-[#2563EB] selection:text-white">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main App Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Mobile Backdrop Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 bg-[#0A0A0A]/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <Header setIsMobileOpen={setIsMobileOpen} />

        {/* ─── FLOATING CONTENT CARD ─── */}
        {/* FIX: main is now a flex column with min-h-0 to enforce strict boundaries */}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden px-4 pb-4 sm:px-8 sm:pb-8">
          {/* FIX: The card is now flex-1 min-h-0. This guarantees it fills the exact space and scrolls internally. */}
          <div className="flex-1 min-h-0 w-full bg-white dark:bg-[#0A0A0A] border-[3px] border-[#0A0A0A] dark:border-white/10 rounded-3xl sm:rounded-[2.5rem] shadow-[4px_4px_0px_0px_#0A0A0A] dark:shadow-[8px_8px_0px_0px_rgba(251,191,36,0.1)] overflow-y-auto custom-scrollbar flex flex-col relative">
            {/* Inner Content Padding Wrapper */}
            <div className="flex-1 p-4 sm:p-8 md:p-10">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
