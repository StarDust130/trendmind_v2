import type { Metadata } from "next";
import SignUpPage from "@/components/pages/Auth/SignUpPage";

export const metadata: Metadata = {
  title: "Create Account", // Compiles to "Create Account | TrendMind"
  description:
    "Start your 7-day free trial. Build, automate, and scale your LinkedIn presence with TrendMind's AI engine.",
};

export default function SignUp() {
  return <SignUpPage />;
}
