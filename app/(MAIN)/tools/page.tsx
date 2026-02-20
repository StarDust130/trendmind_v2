import ToolsClient from "@/components/pages/Main/ToolsPage";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Creator Tools",
  description:
    "Advanced LinkedIn content studio. Design carousels, generate post images, and create video thumbnails.",
};

export default function ToolsPage() {
  return <ToolsClient />;
}
