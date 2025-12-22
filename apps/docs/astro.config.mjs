import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://kripa-sindhu-007.github.io",
  base: "/404_lib",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "static",
  build: {
    assets: "assets",
  },
  vite: {
    optimizeDeps: {
      include: ["@404-ui/core"],
    },
  },
});
