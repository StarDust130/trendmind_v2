import type { Metadata } from "next";
import SettingsPage from "@/components/pages/Main/SettingsPage";

export const metadata: Metadata = {
  title: "System Settings",
  description:
    "Manage your TrendMind account preferences, API integrations, and billing information.",
  // Use robots: { index: false } if you don't want Google indexing a private settings page
  robots: {
    index: false,
    follow: false,
  },
};

export default function Settings() {
  return <SettingsPage />;
}
