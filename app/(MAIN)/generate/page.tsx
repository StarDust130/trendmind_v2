// app/(dashboard)/generate/page.tsx
import GeneratePage from "@/components/pages/Main/GeneratePage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "AI Generator",
  description:
    "Generate, preview, and schedule high-converting LinkedIn posts using the TrendMind AI engine.",
};

export default function Generate() {
  return <GeneratePage />;
}
