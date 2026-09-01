import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#FAF6F0",
          dark: "#0F1117"
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#181B24"
        },
        charcoal: {
          DEFAULT: "#1E2026",
          light: "#525866",
          dark: "#0B0C0E",
        },
        terracotta: {
          DEFAULT: "#D95D39",
          light: "#FDF2EE",
          dark: "#B84322",
          glow: "#FF7A52"
        },
        sage: {
          DEFAULT: "#4F8A64",
          light: "#EBF5EE",
          dark: "#3B6A4C",
        },
        amber: {
          gold: "#D4AF37",
          glow: "#F59E0B"
        },
        border: {
          DEFAULT: "#E5DEC9",
          dark: "#2A2E3B"
        },
        sand: {
          DEFAULT: "#F3EDE2",
          dark: "#141720"
        }
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 12px 32px -8px rgba(30, 32, 38, 0.08)",
        glow: "0 0 25px -5px rgba(217, 93, 57, 0.35)",
        lift: "0 18px 40px -10px rgba(217, 93, 57, 0.25)",
        darkCard: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
