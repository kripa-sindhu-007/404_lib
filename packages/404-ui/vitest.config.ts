import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

const svgAsText = {
  name: "svg-as-text",
  enforce: "pre" as const,
  transform(code: string, id: string) {
    const path = id.split("?", 1)[0];
    if (path.endsWith(".svg")) {
      return {
        code: `export default ${JSON.stringify(code)};`,
        map: null,
      };
    }
    return null;
  },
};

export default defineConfig({
  plugins: [svgAsText, vue()],
  assetsInclude: ["**/*.svg"],
  resolve: {
    alias: {
      "@": r("./src"),
      "@kripa006/404-ui/react": r("./src/react/index.ts"),
      "@kripa006/404-ui/vue": r("./src/vue/index.ts"),
      "@kripa006/404-ui/vanilla": r("./src/vanilla/index.ts"),
      "@kripa006/404-ui": r("./src/index.ts"),
    },
  },
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**"],
    },
    projects: [
      {
        extends: true,
        test: {
          name: "dom",
          environment: "jsdom",
          include: [
            "tests/react/**/*.test.tsx",
            "tests/vue/**/*.test.ts",
            "tests/vanilla/**/*.test.ts",
          ],
          setupFiles: ["./tests/setup-jsdom.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "ssr",
          environment: "node",
          include: ["tests/ssr/**/*.test.ts"],
        },
      },
    ],
  },
});
