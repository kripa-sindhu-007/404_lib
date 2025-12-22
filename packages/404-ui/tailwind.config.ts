import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#0a0a1a",
          800: "#12122a",
          700: "#1a1a3a",
          600: "#22224a",
          accent: "#6366f1",
          glow: "#818cf8",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "drift": "drift 20s linear infinite",
        "rocket": "rocket 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)" },
        },
        drift: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "100%": { transform: "translateX(-100px) translateY(50px)" },
        },
        rocket: {
          "0%, 100%": { transform: "translateY(0) rotate(-45deg)" },
          "50%": { transform: "translateY(-30px) rotate(-45deg)" },
        },
      },
      fontFamily: {
        space: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
