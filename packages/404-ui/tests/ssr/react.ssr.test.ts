import { describe, it, expect } from "vitest";

describe("react entry SSR safety", () => {
  it("does not touch window/document at module evaluation", async () => {
    expect(
      (globalThis as unknown as { window?: unknown }).window
    ).toBeUndefined();
    expect(
      (globalThis as unknown as { document?: unknown }).document
    ).toBeUndefined();
    const mod = await import("@kripa006/404-ui/react");
    expect(mod.Space404).toBeDefined();
    expect(mod.Ocean404).toBeDefined();
    expect(mod.Glitch404).toBeDefined();
    expect(mod.Forest404).toBeDefined();
  });
});
