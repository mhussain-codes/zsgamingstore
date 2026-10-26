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
          950: "#060911",
          900: "#0B0F19",
          850: "#101726",
          800: "#151F32",
          750: "#1C2942",
          700: "#243452",
          600: "#33476E",
          500: "#4B6394",
        },
        graphite: {
          950: "#060911",
          900: "#0B0F19",
          850: "#101726",
          800: "#151F32",
          750: "#1C2942",
          700: "#243452",
          600: "#33476E",
          500: "#4B6394",
        },
        cyan: {
          DEFAULT: "#06B6D4",
          300: "#67E8F9",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          glow: "rgba(6, 182, 212, 0.25)",
        },
        emerald: {
          glow: "rgba(16, 185, 129, 0.25)",
        },
        amber: {
          DEFAULT: "#F59E0B",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        coral: {
          DEFAULT: "#F43F5E",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-rajdhani)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
        card: "0 10px 30px -4px rgba(0, 0, 0, 0.5)",
        cardHover: "0 14px 40px -6px rgba(6, 182, 212, 0.16)",
        cyanHover: "0 8px 30px -4px rgba(6, 182, 212, 0.35)",
        emeraldHover: "0 8px 30px -4px rgba(16, 185, 129, 0.35)",
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
      },
      animation: {
        fadeIn: "fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        slideDown: "slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        floatSlow: "floatSlow 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
