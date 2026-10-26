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
        graphite: {
          950: "#07090E",
          900: "#0B0F17",
          850: "#101622",
          800: "#161E2E",
          750: "#1D273B",
          700: "#24324B",
          600: "#374766",
          500: "#506385",
        },
        cyan: {
          DEFAULT: "#00E5FF",
          400: "#22EAFF",
          500: "#00E5FF",
          600: "#00B8CC",
          700: "#008C9C",
          glow: "rgba(0, 229, 255, 0.25)",
        },
        teal: {
          accent: "#00F5D4",
        },
        coral: {
          DEFAULT: "#FF5353",
          400: "#FF6B6B",
          500: "#FF5353",
          600: "#E03E3E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-rajdhani)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
        card: "0 8px 30px -4px rgba(0, 0, 0, 0.5)",
        cyanHover: "0 8px 25px -4px rgba(0, 229, 255, 0.25)",
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
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        slideDown: "slideDown 0.25s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
