import { defineConfig } from "tsup";

export default defineConfig([
  // Main entry (core utilities only)
  {
    entry: {
      index: "src/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    sourcemap: true,
    treeshake: true,
    minify: false,
    external: ["react", "react-dom", "vue"],
  },
  // React components
  {
    entry: {
      "react/index": "src/react/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    minify: false,
    external: ["react", "react-dom"],
  },
  // Vue components
  {
    entry: {
      "vue/index": "src/vue/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    minify: false,
    external: ["vue"],
  },
  // Vanilla components
  {
    entry: {
      "vanilla/index": "src/vanilla/index.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    sourcemap: true,
    treeshake: true,
    minify: false,
  },
]);
