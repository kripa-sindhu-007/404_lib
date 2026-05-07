import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Ocean404 } from "@kripa006/404-ui/react";
import { CUSTOM_PROPS } from "../fixtures/props";

describe("Ocean404 (react)", () => {
  it("mounts without crashing", () => {
    const { container } = render(<Ocean404 />);
    expect(container.firstChild).not.toBeNull();
  });

  it("renders custom title/subtitle/buttonText", () => {
    render(<Ocean404 {...CUSTOM_PROPS} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      CUSTOM_PROPS.title
    );
    expect(screen.getByText(CUSTOM_PROPS.subtitle)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: CUSTOM_PROPS.buttonText })
    ).toBeInTheDocument();
  });

  it("fires onButtonClick when button clicked", () => {
    const fn = vi.fn();
    render(<Ocean404 {...CUSTOM_PROPS} onButtonClick={fn} />);
    fireEvent.click(
      screen.getByRole("button", { name: CUSTOM_PROPS.buttonText })
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("module-load does not throw", async () => {
    await expect(import("@kripa006/404-ui/react")).resolves.toBeDefined();
  });
});
