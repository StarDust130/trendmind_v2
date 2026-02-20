import SignInPage from "@/components/pages/Auth/SignInPage";
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Sign In", // Compiles to "Sign In | TrendMind"
  description: "Access your TrendMind workspace and manage your automated LinkedIn content strategies.",
};

export default function SignIn() {
  return <SignInPage />;
}