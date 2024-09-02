import type { Config } from "tailwindcss";

import sharedConfig from "@poster-craft/tailwind-config";

const { addDynamicIconSelectors } = require("@iconify/tailwind");

const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  presets: [sharedConfig],
  plugins: [addDynamicIconSelectors(), require("tailwindcss-animate"), require("daisyui")],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        pinned:
          "linear-gradient(119deg, rgb(143 152 242) 0%, rgb(95 167 225) 30%, rgb(206 133 247) 47%, rgb(235 147 186) 69%, rgb(190 188 251) 80%)",
        "pinned-dark":
          "linear-gradient(119deg, rgb(75 87 196) 0%, rgb(31 133 206) 30%, rgb(125 20 166) 42%, rgb(134 15 60) 63%, rgb(18 8 45) 73%)",
        "nav-link-indicator":
          "radial-gradient(44.6% 825% at 50% 50%, rgb(255 133 133) 0%, rgb(255 72 109 / 0) 100%)",
        "nav-link-indicator-dark":
          "radial-gradient(44.6% 825% at 50% 50%, rgb(255 28 28) 0%, rgb(255 72 109 / 0) 100%)",
        "email-button": "linear-gradient(180deg, rgb(210 10 30) 5%, rgb(239 90 90) 100%)",
      },
      boxShadow: {
        "feature-card": "0 -1px 3px 0 rgb(0 0 0 / 0.05)",
        "feature-card-dark": "0 0 0 1px rgb(255 255 255 / 0.06), 0 -1px rgb(255 255 255 / 0.1)",
      },
    },
  },
} satisfies Config;

export default config;
