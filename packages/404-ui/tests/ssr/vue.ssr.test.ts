import { describe, it, expect } from "vitest";

describe("vue entry SSR safety", () => {
  it("does not touch window/document at module evaluation", async () => {
    const g = globalThis as unknown as {
      window?: unknown;
      document?: unknown;
    };

    expect(g.window).toBeUndefined();
    expect(g.document).toBeUndefined();

    const mod = await import("@kripa006/404-ui/vue");

    expect(g.window).toBeUndefined();
    expect(g.document).toBeUndefined();

    expect(mod.Space404).toBeDefined();
    expect(mod.Ocean404).toBeDefined();
    expect(mod.Glitch404).toBeDefined();
    expect(mod.Forest404).toBeDefined();
  });
});
