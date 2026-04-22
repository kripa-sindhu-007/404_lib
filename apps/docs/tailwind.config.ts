import type { Config } from "tailwindcss";
import { fourZeroFourPreset } from "@kripa006/404-ui/theme";

const config: Config = {
  presets: [fourZeroFourPreset],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        serif: [
          "'Instrument Serif'",
          "'Iowan Old Style'",
          "'Apple Garamond'",
          "Georgia",
          "serif",
        ],
        mono: ["'JetBrains Mono'", "ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
