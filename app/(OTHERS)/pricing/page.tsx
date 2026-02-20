import type { Metadata } from "next";
import PricingPage from "@/components/pages/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start your 7-day free trial. Unlock the full power of TrendMind's AI LinkedIn generation and automated scheduling.",
};

export default function Pricing() {
  return <PricingPage />;
}
