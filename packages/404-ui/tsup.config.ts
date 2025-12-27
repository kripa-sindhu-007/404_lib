import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    theme: "src/theme.ts",
    "react/index": "src/react/index.ts",
    "vue/index": "src/vue/index.ts",
    "vanilla/index": "src/vanilla/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: false,
  sourcemap: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom", "vue", "tailwindcss"],
  loader: {
    ".svg": "text",
  },
  splitting: false,
});
