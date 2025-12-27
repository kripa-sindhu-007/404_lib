import type { Config } from "tailwindcss";
import { fourZeroFourPreset } from "@kripa006/404-ui/theme";

const config: Config = {
  presets: [fourZeroFourPreset],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
