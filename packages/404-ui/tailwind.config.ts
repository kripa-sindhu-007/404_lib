import type { Config } from "tailwindcss";
import { fourZeroFourPreset } from "./src/theme";

const config: Config = {
  presets: [fourZeroFourPreset],
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  plugins: [],
};

export default config;
