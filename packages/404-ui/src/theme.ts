/**
 * 404-UI Tailwind Theme Preset
 *
 * This is the single source of truth for all 404-UI specific theme configurations.
 * Import this preset in your Tailwind config to use 404-UI components.
 *
 * @example
 * ```ts
 * import { fourZeroFourPreset } from "404-ui/theme";
 *
 * export default {
 *   presets: [fourZeroFourPreset],
 *   content: ["./src/**\/*.{js,ts,jsx,tsx}"],
 * };
 * ```
 */

import type { Config } from "tailwindcss";

/**
 * 404-UI color palette for space-themed components
 */
export const spaceColors = {
  space: {
    900: "#0a0a1a",
    800: "#12122a",
    700: "#1a1a3a",
    600: "#22224a",
    accent: "#6366f1",
    glow: "#818cf8",
  },
} as const;

/**
 * Animation keyframes for 404-UI components
 */
export const animationKeyframes = {
  float: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-20px)" },
  },
  twinkle: {
    "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
    "50%": { opacity: "1", transform: "scale(1.5)" },
  },
  pulseGlow: {
    "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" },
    "50%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)" },
  },
  drift: {
    "0%": { transform: "translateX(0) translateY(0)" },
    "100%": { transform: "translateX(-100px) translateY(50px)" },
  },
  astronaut: {
    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
    "50%": { transform: "translateY(-20px) rotate(5deg)" },
  },
  rocket: {
    "0%, 100%": { transform: "translateY(0) rotate(-45deg)" },
    "50%": { transform: "translateY(-30px) rotate(-45deg)" },
  },
} as const;

/**
 * Animation utilities for 404-UI components
 */
export const animationUtilities = {
  float: "float 6s ease-in-out infinite",
  twinkle: "twinkle 3s ease-in-out infinite",
  "pulse-glow": "pulseGlow 2s ease-in-out infinite",
  drift: "drift 20s linear infinite",
  astronaut: "astronaut 8s ease-in-out infinite",
  rocket: "rocket 8s ease-in-out infinite",
} as const;

/**
 * Font family configuration for 404-UI components
 */
export const spaceFontFamily = {
  space: ["'Space Grotesk'", "system-ui", "sans-serif"],
};

/**
 * Complete 404-UI Tailwind preset
 * This can be used as a preset in any Tailwind configuration
 */
export const fourZeroFourPreset: Partial<Config> = {
  theme: {
    extend: {
      colors: spaceColors,
      animation: animationUtilities,
      keyframes: animationKeyframes,
      fontFamily: spaceFontFamily,
    },
  },
};

/**
 * Default export for convenience
 */
export default fourZeroFourPreset;
