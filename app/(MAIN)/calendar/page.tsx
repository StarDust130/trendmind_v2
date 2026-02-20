import type { Metadata } from "next";
import CalendarPage from "@/components/pages/Main/CalendarPage";

export const metadata: Metadata = {
  title: "Post Calendar",
  description:
    "Schedule, manage, and automate your high-converting LinkedIn content timeline.",
};

export default function Calendar() {
  return <CalendarPage />;
}
