import { describe, it, expect, vi, afterEach } from "vitest";
import { createForest404 } from "@kripa006/404-ui/vanilla";
import { CUSTOM_PROPS } from "../fixtures/props";

let host: HTMLElement | null = null;

afterEach(() => {
  if (host && host.parentNode) host.parentNode.removeChild(host);
  host = null;
});

function makeHost(): HTMLElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  host = el;
  return el;
}

describe("Forest404 (vanilla)", () => {
  it("mounts without crashing", () => {
    const root = makeHost();
    const inst = createForest404(root);
    expect(root.querySelector(".forest-404-container")).not.toBeNull();
    inst.destroy();
  });

  it("renders custom title/subtitle/buttonText", () => {
    const root = makeHost();
    const inst = createForest404(root, CUSTOM_PROPS);
    expect(root.querySelector("h1")?.textContent).toBe(CUSTOM_PROPS.title);
    expect(root.querySelector(".forest-404-subtitle")?.textContent).toBe(
      CUSTOM_PROPS.subtitle
    );
    expect(root.querySelector(".forest-404-button")?.textContent).toContain(
      CUSTOM_PROPS.buttonText
    );
    inst.destroy();
  });

  it("fires onButtonClick when button clicked", () => {
    const root = makeHost();
    const fn = vi.fn();
    const inst = createForest404(root, { ...CUSTOM_PROPS, onButtonClick: fn });
    root.querySelector<HTMLButtonElement>(".forest-404-button")?.click();
    expect(fn).toHaveBeenCalledTimes(1);
    inst.destroy();
  });

  it("module-load does not throw", async () => {
    await expect(import("@kripa006/404-ui/vanilla")).resolves.toBeDefined();
  });
});
