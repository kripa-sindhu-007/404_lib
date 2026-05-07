import { describe, it, expect } from "vitest";

describe("vanilla entry SSR safety", () => {
  // TODO(PR4-SSR): each vanilla theme declares
  //   `export class <Theme>404Element extends HTMLElement`
  // at module top (Space404.ts:328, Glitch404.ts:267, Ocean404.ts:235,
  // Forest404.ts:330), which throws "HTMLElement is not defined" under
  // Node. PR 4 will move the class declaration inside the existing
  // `typeof window !== "undefined"` guard. When that lands, flip this
  // test back to the standard SSR pattern (see react.ssr / vue.ssr) —
  // including the post-import `g.window/g.document` undefined re-checks.
  it.fails("does not touch window/document at module evaluation", async () => {
    const g = globalThis as unknown as {
      window?: unknown;
      document?: unknown;
    };

    expect(g.window).toBeUndefined();
    expect(g.document).toBeUndefined();

    const mod = await import("@kripa006/404-ui/vanilla");

    expect(g.window).toBeUndefined();
    expect(g.document).toBeUndefined();

    expect(mod.createSpace404).toBeDefined();
    expect(mod.createOcean404).toBeDefined();
    expect(mod.createGlitch404).toBeDefined();
    expect(mod.createForest404).toBeDefined();
  });
});
