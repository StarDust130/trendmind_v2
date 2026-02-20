import DashboardPage from "@/components/pages/Main/DashboardPage";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Dashboard", // Compiles to "Dashboard | TrendMind" automatically
  description:
    "View your active LinkedIn strategies, system metrics, and initialize new content protocols.",
};

export default function Dashboard() {
  return <DashboardPage />;
}
