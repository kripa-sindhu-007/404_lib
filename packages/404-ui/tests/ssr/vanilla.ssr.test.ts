import { describe, it, expect } from "vitest";

describe("vanilla entry SSR safety", () => {
  it("does not touch window/document at module evaluation", async () => {
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
