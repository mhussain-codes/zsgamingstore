import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#07080B",
          900: "#0D0F15",
          850: "#131620",
          800: "#1A1E2B",
          750: "#222738",
          700: "#2C3247",
          600: "#3E4663",
          500: "#555F85",
        },
        graphite: {
          950: "#07080B",
          900: "#0D0F15",
          850: "#131620",
          800: "#1A1E2B",
          750: "#222738",
          700: "#2C3247",
          600: "#3E4663",
          500: "#555F85",
        },
        // Electric Yellow / Gold Palette
        yellow: {
          DEFAULT: "#FACC15",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          glow: "rgba(250, 204, 21, 0.35)",
        },
        // High-Energy Racing Red Palette
        red: {
          DEFAULT: "#EF4444",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          glow: "rgba(239, 68, 68, 0.35)",
        },
        // Seamless mappings for existing classes
        cyan: {
          DEFAULT: "#FACC15",
          300: "#FDE047",
          400: "#FACC15",
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
          glow: "rgba(250, 204, 21, 0.35)",
        },
        coral: {
          DEFAULT: "#EF4444",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        amber: {
          DEFAULT: "#FACC15",
          400: "#FDE047",
          500: "#FACC15",
          600: "#EAB308",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-rajdhani)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
        card: "0 10px 30px -4px rgba(0, 0, 0, 0.6)",
        cardHover: "0 14px 40px -6px rgba(250, 204, 21, 0.2)",
        yellowHover: "0 8px 30px -4px rgba(250, 204, 21, 0.45)",
        redHover: "0 8px 30px -4px rgba(239, 68, 68, 0.45)",
        cyanHover: "0 8px 30px -4px rgba(250, 204, 21, 0.45)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideDown: "slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        floatSlow: "floatSlow 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
