import type { Metadata } from "next";
import StrategyPage from "@/components/pages/Main/StrategyPage";

export const metadata: Metadata = {
  title: "Content Strategies",
  description:
    "Architect, manage, and deploy your high-converting LinkedIn campaigns based on specific growth goals.",
};

export default function Strategy() {
  return <StrategyPage />;
}
