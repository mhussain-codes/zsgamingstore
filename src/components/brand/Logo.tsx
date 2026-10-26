import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  size = "md",
  className = "",
  linkToHome = true,
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Monogram Glyph */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-obsidian-850 to-obsidian-950 border border-slate-700/70 p-1.5 flex items-center justify-center shadow-md group-hover:border-cyan-400/60 transition-colors shrink-0`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Angular Z */}
          <path
            d="M11 15H25L15 25H29"
            stroke="url(#logo-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Interlocking S */}
          <path
            d="M36 24C36 20.5 32.5 18 29 18C24.5 18 21.5 20.5 21.5 24C21.5 28.5 36 27.5 36 33C36 37 32 38.5 28 38.5C23 38.5 20 36 20 33"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="37" cy="13" r="2.5" fill="#06B6D4" />
        </svg>
      </div>

      {variant === "full" && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider text-white ${textSizes[size]}`}
            >
              ZS<span className="text-cyan-400">.</span>GAMING
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 tracking-wider">
              PK
            </span>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase mt-0.5">
            Custom PCs &amp; Hardware
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="group inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
};
