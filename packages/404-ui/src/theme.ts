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
 * 404-UI color palette.
 *
 * `space.*` — Apollo-era mission-control phosphor palette used by Space404.
 * `space.accent` / `space.glow` are intentionally retained as the original
 * indigo duo so consumer apps that reference them (docs hero, install CTA)
 * don't shift when the component is redesigned.
 */
export const spaceColors = {
  space: {
    // Numeric shades map onto the new hull / panel tones.
    900: "#0b0d0a",
    800: "#141712",
    700: "#1e2219",
    600: "#283024",
    // Legacy indigo accents — kept for docs surfaces.
    accent: "#6366f1",
    glow: "#818cf8",
    // Mission-control semantic tokens.
    hull: "#0b0d0a",
    panel: "#141712",
    "panel-lite": "#1e2219",
    phosphor: "#7cff4a",
    "phosphor-dim": "#3a7a24",
    amber: "#ffb547",
    warn: "#ff3d3d",
  },
  // Bioluminescent deep-sea palette for Ocean404.
  ocean: {
    900: "#021126",
    800: "#052b49",
    700: "#0a4d6e",
    600: "#0e6e8f",
    accent: "#2ec4b6",
    glow: "#7ef0ff",
    pearl: "#e6fffa",
  },
  // Old-growth temperate-rainforest palette for Forest404.
  // pine* — deep canopy and forest floor.
  // moss/bark — mid-tones for trunks and underbrush.
  // mist/parchment — soft highlights for fog and serif type.
  // ember/firefly — warm lantern + insect glow accents.
  forest: {
    900: "#070d09",
    800: "#0d1812",
    700: "#13251c",
    600: "#1c3a28",
    500: "#2a4d2f",
    moss: "#5d7a3f",
    "moss-soft": "#9fb878",
    bark: "#3a2d1f",
    "bark-light": "#5a4633",
    parchment: "#f1e8d4",
    mist: "#cddccd",
    ember: "#d6a04a",
    firefly: "#f7e57f",
    rust: "#b85a2c",
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
  // Mission-control keyframes (Space404)
  scan: {
    "0%": { transform: "translateY(-100%)" },
    "100%": { transform: "translateY(100%)" },
  },
  crtGlitch: {
    "0%, 92%, 100%": {
      transform: "translate(0,0)",
      filter: "none",
    },
    "93%": { transform: "translate(-2px,1px) skewX(-0.5deg)" },
    "94%": { transform: "translate(2px,-1px) skewX(0.5deg)" },
    "95%": { transform: "translate(-1px,0) skewX(0deg)" },
    "96%": { transform: "translate(1px,0)" },
  },
  orbitSpin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  ledBlink: {
    "0%, 60%, 100%": { opacity: "1" },
    "61%, 99%": { opacity: "0.15" },
  },
  cursorBlink: {
    "0%, 49%": { opacity: "1" },
    "50%, 100%": { opacity: "0" },
  },
  morseFlash: {
    "0%, 100%": { opacity: "0" },
    "10%, 90%": { opacity: "1" },
  },
  rocketLaunch: {
    "0%": { transform: "translate(0, 0)", opacity: "0" },
    "15%": { opacity: "1" },
    "100%": { transform: "translate(0, -120vh)", opacity: "0" },
  },
  rise: {
    "0%": {
      transform: "translate3d(0, 0, 0) scale(0.9)",
      opacity: "0",
    },
    "10%": { opacity: "0.9" },
    "80%": { opacity: "0.8" },
    "100%": {
      transform:
        "translate3d(var(--bubble-drift, 20px), -110vh, 0) scale(1.05)",
      opacity: "0",
    },
  },
  caustic: {
    "0%, 100%": {
      transform: "translate3d(-4%, -2%, 0) rotate(0deg)",
      opacity: "0.35",
    },
    "50%": {
      transform: "translate3d(4%, 3%, 0) rotate(1.5deg)",
      opacity: "0.55",
    },
  },
  sonar: {
    "0%": { transform: "scale(0.4)", opacity: "0.6" },
    "100%": { transform: "scale(2.4)", opacity: "0" },
  },
  jellyBell: {
    "0%, 100%": { transform: "translateY(0) scaleX(1) scaleY(1)" },
    "50%": { transform: "translateY(-14px) scaleX(1.06) scaleY(0.92)" },
  },
  shimmer: {
    "0%, 100%": {
      textShadow:
        "0 0 18px rgba(126,240,255,0.35), 0 0 40px rgba(46,196,182,0.25)",
    },
    "50%": {
      textShadow:
        "0 0 26px rgba(126,240,255,0.55), 0 0 60px rgba(46,196,182,0.35)",
    },
  },
  subCruise: {
    "0%": { transform: "translateX(-20vw)" },
    "100%": { transform: "translateX(120vw)" },
  },
  anglerDrift: {
    "0%": { transform: "translateX(-10vw)", opacity: "0" },
    "20%, 80%": { opacity: "1" },
    "100%": { transform: "translateX(110vw)", opacity: "0" },
  },
  pop: {
    "0%": { transform: "scale(1)", opacity: "0.8" },
    "100%": { transform: "scale(2.2)", opacity: "0" },
  },
  // Forest404 — twilight grove
  canopySway: {
    "0%, 100%": { transform: "translate3d(-1%, 0, 0) rotate(-0.4deg)" },
    "50%": { transform: "translate3d(1%, -0.4%, 0) rotate(0.4deg)" },
  },
  fogDrift: {
    "0%, 100%": {
      transform: "translate3d(-6%, 0, 0)",
      opacity: "0.45",
    },
    "50%": {
      transform: "translate3d(6%, -1%, 0)",
      opacity: "0.7",
    },
  },
  fireflyPulse: {
    "0%, 100%": {
      transform: "translate3d(0, 0, 0) scale(0.85)",
      opacity: "0.15",
      filter: "blur(0.4px)",
    },
    "40%": {
      transform:
        "translate3d(var(--ff-drift-x, 4px), var(--ff-drift-y, -6px), 0) scale(1.15)",
      opacity: "1",
      filter: "blur(0.2px)",
    },
    "70%": {
      transform:
        "translate3d(calc(var(--ff-drift-x, 4px) * -0.6), var(--ff-drift-y, -6px), 0) scale(1)",
      opacity: "0.55",
    },
  },
  leafFall: {
    "0%": {
      transform: "translate3d(0, -10vh, 0) rotate(0deg)",
      opacity: "0",
    },
    "10%": { opacity: "0.95" },
    "90%": { opacity: "0.9" },
    "100%": {
      transform:
        "translate3d(var(--leaf-drift, 30px), 110vh, 0) rotate(var(--leaf-spin, 540deg))",
      opacity: "0",
    },
  },
  compassWobble: {
    "0%, 100%": { transform: "rotate(-4deg)" },
    "25%": { transform: "rotate(2.5deg)" },
    "55%": { transform: "rotate(-1.5deg)" },
    "80%": { transform: "rotate(1deg)" },
  },
  emberBreathe: {
    "0%, 100%": {
      textShadow:
        "0 0 14px rgba(214, 160, 74, 0.18), 0 0 28px rgba(247, 229, 127, 0.06)",
    },
    "50%": {
      textShadow:
        "0 0 22px rgba(214, 160, 74, 0.32), 0 0 48px rgba(247, 229, 127, 0.12)",
    },
  },
  foxTrot: {
    "0%": { transform: "translateX(-12vw)", opacity: "0" },
    "12%, 88%": { opacity: "1" },
    "100%": { transform: "translateX(112vw)", opacity: "0" },
  },
  mothFlutter: {
    "0%": {
      transform: "translate3d(-15vw, 30vh, 0) rotate(-6deg)",
      opacity: "0",
    },
    "15%, 85%": { opacity: "1" },
    "30%": {
      transform: "translate3d(25vw, 20vh, 0) rotate(8deg)",
    },
    "60%": {
      transform: "translate3d(60vw, 38vh, 0) rotate(-4deg)",
    },
    "100%": {
      transform: "translate3d(115vw, 22vh, 0) rotate(6deg)",
      opacity: "0",
    },
  },
  fireflyBurst: {
    "0%": { transform: "scale(1)", opacity: "1" },
    "100%": { transform: "scale(3.6)", opacity: "0" },
  },
} as const;

/**
 * Animation utilities for 404-UI components
 */
export const animationUtilities = {
  float: "float 6s ease-in-out infinite",
  // Space404 (mission-control)
  scan: "scan 6s linear infinite",
  "crt-glitch": "crtGlitch 9s steps(1, end) infinite",
  "orbit-spin": "orbitSpin var(--orbit-duration, 18s) linear infinite",
  "led-blink": "ledBlink 1.6s steps(1, end) infinite",
  "cursor-blink": "cursorBlink 1s steps(1, end) infinite",
  "morse-flash": "morseFlash 200ms ease-out forwards",
  "rocket-launch": "rocketLaunch 2.2s ease-in forwards",
  // Ocean404
  rise: "rise var(--bubble-duration, 10s) linear var(--bubble-delay, 0s) infinite",
  caustic: "caustic 14s ease-in-out infinite",
  sonar: "sonar 4s ease-out infinite",
  "jelly-bell": "jellyBell 5s ease-in-out infinite",
  shimmer: "shimmer 4.5s ease-in-out infinite",
  "sub-cruise": "subCruise 9s linear forwards",
  "angler-drift": "anglerDrift 14s linear forwards",
  pop: "pop 400ms ease-out forwards",
  // Forest404
  "canopy-sway": "canopySway 11s ease-in-out infinite",
  "fog-drift": "fogDrift 18s ease-in-out infinite",
  "firefly-pulse":
    "fireflyPulse var(--ff-duration, 5s) ease-in-out var(--ff-delay, 0s) infinite",
  "leaf-fall":
    "leafFall var(--leaf-duration, 14s) linear var(--leaf-delay, 0s) infinite",
  "compass-wobble": "compassWobble 7s ease-in-out infinite",
  "ember-breathe": "emberBreathe 5.5s ease-in-out infinite",
  "fox-trot": "foxTrot 11s linear forwards",
  "moth-flutter": "mothFlutter 14s ease-in-out forwards",
  "firefly-burst": "fireflyBurst 600ms ease-out forwards",
} as const;

/**
 * Font family configuration for 404-UI components
 */
export const spaceFontFamily = {
  space: ["'Space Grotesk'", "system-ui", "sans-serif"],
  // Mono stack for telemetry/CRT surfaces. Picks up JetBrains Mono / IBM Plex Mono
  // if the consumer loads them, otherwise falls back cleanly.
  telemetry: [
    "'JetBrains Mono'",
    "'IBM Plex Mono'",
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Consolas",
    "monospace",
  ],
  // Old-growth serif stack for Forest404 — picks up Fraunces / Caudex / Cormorant
  // when consumers load them, falls back to crisp print serifs.
  grove: [
    "'Fraunces'",
    "'Caudex'",
    "'Cormorant Garamond'",
    "'Iowan Old Style'",
    "'Apple Garamond'",
    "Georgia",
    "ui-serif",
    "serif",
  ],
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
