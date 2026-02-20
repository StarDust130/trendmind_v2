
import Link from "next/link";
import { SiLinkedin, SiX, SiGithub, SiGmail, SiOpenai, SiGooglegemini } from "react-icons/si";
import { ChevronRight } from "lucide-react";
import { TrendMindLogo } from "./TrendMindLogo";


export const Footer = () => {
      const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      };
  return (
    <footer className="bg-[#0A0A0A] dark:bg-[#050505] text-white relative overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-[10%] w-24 h-24 border-[2px] border-white/10 rounded-full" />
        <div
          className="absolute bottom-16 left-[8%] w-16 h-16 border-[2px] border-white/10"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
        <div className="absolute top-1/3 left-[45%] w-4 h-4 bg-[#FBBF24] opacity-20 rounded-full animate-float" />
      </div>

      <div className="max-w-6xl mx-auto px-5 pt-14 pb-8 relative z-10">
        {/* Top stripe - Bauhaus color bar */}
        <div className="flex h-[4px] mb-10 rounded-full overflow-hidden">
          <div className="flex-1 bg-[#2563EB]" />
          <div className="flex-1 bg-[#FBBF24]" />
          <div className="flex-1 bg-[#E64833]" />
          <div className="flex-1 bg-white" />
        </div>

        {/* Footer grid — mobile: brand top, then Product+Legal side by side, then Powered By */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-12">
          {/* Brand — full width on mobile, 5 cols on md */}
          <div className="col-span-2 md:col-span-5">
            <Link
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="text-lg font-black font-display tracking-tight flex items-center gap-2 uppercase text-[#0A0A0A] dark:text-white"
            >
              <TrendMindLogo />
              TrendMind
            </Link>
            <p className="text-white/50 font-medium text-sm max-w-sm leading-relaxed mb-5">
              Craft high-performing posts with AI-powered strategy and dominate
              your industry on LinkedIn.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: <SiLinkedin />,
                  url: "https://linkedin.com",
                  color:
                    "group-hover:text-[#0A66C2] group-hover:border-[#0A66C2]/50 group-hover:shadow-[0_0_15px_rgba(10,102,194,0.3)]",
                },
                {
                  icon: <SiX />, // New X (Twitter) Brand Icon
                  url: "https://x.com",
                  color:
                    "group-hover:text-white group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                },
                {
                  icon: <SiGithub />,
                  url: "https://github.com",
                  color:
                    "group-hover:text-white group-hover:border-white/50 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
                },
                {
                  icon: <SiGmail />,
                  url: "mailto:hello@trendmind.ai",
                  color:
                    "group-hover:text-[#EA4335] group-hover:border-[#EA4335]/50 group-hover:shadow-[0_0_15px_rgba(234,67,53,0.3)]",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
        group relative w-10 h-10 
        flex items-center justify-center 
        rounded-xl border-[1.5px] border-white/10 
        bg-white/[0.02] backdrop-blur-sm
        transition-all duration-300 ease-out
        ${social.color}
        hover:-translate-y-1
      `}
                >
                  {/* Icon */}
                  <span className="text-white/30 text-lg transition-colors duration-300 group-hover:text-inherit">
                    {social.icon}
                  </span>

                  {/* Background Flare - Subtle radial gradient on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Product — 1 col on mobile, 2 cols on md */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold uppercase mb-4 text-xs tracking-wider text-[#FBBF24]">
              Product
            </h4>
            <ul className="space-y-3 font-medium text-start text-xs uppercase tracking-wider text-white/60">
              {["About", "Features", "Pricing", "FAQ"].map((link) => (
                <li key={link}>
                  {/* Fixed Alignment: Relative positioning to handle the chevron without pushing text */}
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.toLowerCase());
                    }}
                    className="hover:text-white transition-colors flex items-center relative group"
                  >
                    <ChevronRight className="w-3 h-3 absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                    <span className="transition-transform group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal — 1 col on mobile, 2 cols on md */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold uppercase mb-4 text-xs tracking-wider text-[#FBBF24]">
              Legal
            </h4>
            <ul className="space-y-3 font-medium text-xs uppercase tracking-wider text-white/60">
              {["Terms", "Privacy", "Security", "Contact"].map((link) => (
                <li key={link}>
                  {/* Fixed Alignment: Relative positioning to handle the chevron without pushing text */}
                  <a
                    href="#"
                    className="hover:text-white transition-colors flex items-center relative group"
                  >
                    <ChevronRight className="w-3 h-3 absolute -left-4 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                    <span className="transition-transform group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered by — full width on mobile, 3 cols on md */}
          <div className="col-span-2 md:col-span-3 mt-12">
            {/* Tactical Heading */}
            <h4 className="font-black uppercase mb-8 text-[10px] tracking-[0.4em] text-[#FBBF24] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#FBBF24] rounded-full animate-pulse" />
              Powered By
            </h4>

            {/* Raw Icon Dock */}
            <div className="flex items-center gap-12 ml-1">
              {[
                {
                  name: "OpenAI",
                  icon: <SiOpenai />,
                  url: "https://openai.com",
                  hoverColor:
                    "group-hover:text-[#10a37f] group-hover:drop-shadow-[0_0_15px_rgba(16,163,127,0.8)]",
                },
                {
                  name: "Gemini",
                  icon: <SiGooglegemini />,
                  url: "https://gemini.google.com",
                  hoverColor:
                    "group-hover:text-[#4285F4] group-hover:drop-shadow-[0_0_15px_rgba(66,133,244,0.8)]",
                },
                {
                  name: "LinkedIn",
                  icon: <SiLinkedin />,
                  url: "https://developer.linkedin.com",
                  hoverColor:
                    "group-hover:text-[#0A66C2] group-hover:drop-shadow-[0_0_15px_rgba(10,102,194,0.8)]",
                },
              ].map((tech) => (
                <Link
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center transition-all duration-300"
                >
                  {/* The Icon - Deep Dimmed when inactive, Neon when hovered */}
                  <span
                    className={`text-[26px] text-white/10 transition-all duration-500 group-hover:scale-110 ${tech.hoverColor}`}
                  >
                    {tech.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 font-medium uppercase tracking-wider text-white/30 text-[10px]">
          <div>&copy; 2026 TrendMind. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            Built for conversion
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FBBF24]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer