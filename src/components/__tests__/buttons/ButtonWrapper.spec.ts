import ButtonWrapper from "@/components/buttons/ButtonWrapper.vue";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

describe("ButtonWrapper", () => {
  const buttonWrapper = mount(ButtonWrapper, {
    props: {
      theme: "white",
      text: "Started now",
    },
  });

  it("should render correctly", () => {
    expect(buttonWrapper.exists()).toBe(true);
  });

  it("should hae the awaited theme", () => {
    expect(buttonWrapper.find("button").attributes().class).toContain("white");
  });

  it("should hae the awaited text", () => {
    expect(buttonWrapper.text()).toBe("Started now");
  });
});
