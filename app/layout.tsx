import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// ─── THE SCALABLE SEO ENGINE ───
export const metadata: Metadata = {
  metadataBase: new URL("https://trendmind.ai"), // IMPORTANT: Change to your production domain
  title: {
    template: "%s | TrendMind",
    default: "TrendMind | AI-Powered LinkedIn Content Suite", // Used if a child page has no title
  },
  description:
    "Craft high-performing LinkedIn posts with AI-powered strategy and data-driven insights. Professional content that drives engagement.",
  openGraph: {
    title: "TrendMind | AI-Powered LinkedIn Content Suite",
    description:
      "Craft high-performing LinkedIn posts with AI-powered strategy and data-driven insights.",
    url: "https://trendmind.ai",
    siteName: "TrendMind",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendMind",
    description:
      "Craft high-performing LinkedIn posts with AI-powered strategy and data-driven insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-[#FAFAFA] dark:bg-[#050505] text-[#0A0A0A] dark:text-white`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
