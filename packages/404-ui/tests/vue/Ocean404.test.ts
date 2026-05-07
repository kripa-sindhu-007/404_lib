import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Ocean404 } from "@kripa006/404-ui/vue";
import { CUSTOM_PROPS } from "../fixtures/props";

describe("Ocean404 (vue)", () => {
  it("mounts without crashing", () => {
    const wrapper = mount(Ocean404);
    expect(wrapper.element).toBeTruthy();
    wrapper.unmount();
  });

  it("renders custom title/subtitle/buttonText", () => {
    const wrapper = mount(Ocean404, { props: CUSTOM_PROPS });
    expect(wrapper.find("h1").text()).toBe(CUSTOM_PROPS.title);
    expect(wrapper.text()).toContain(CUSTOM_PROPS.subtitle);
    expect(wrapper.find("button.ocean-404-button").text()).toContain(
      CUSTOM_PROPS.buttonText
    );
    wrapper.unmount();
  });

  it("emits buttonClick when button clicked", async () => {
    const wrapper = mount(Ocean404, { props: CUSTOM_PROPS });
    await wrapper.find("button.ocean-404-button").trigger("click");
    expect(wrapper.emitted("buttonClick")).toHaveLength(1);
    wrapper.unmount();
  });

  it("module-load does not throw", async () => {
    await expect(import("@kripa006/404-ui/vue")).resolves.toBeDefined();
  });
});
