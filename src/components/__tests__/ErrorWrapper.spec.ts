import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ErrorWrapper from "@/components/ErrorWrapper.vue";

describe("ErrorWrapper", () => {
  const errorWrapper = mount(ErrorWrapper, {
    props: {
      theme: "error",
      message: "Error",
    },
  });

  it("should render correctly", () => {
    expect(errorWrapper.exists()).toBe(true);
  });

  it("should display the awaited message", () => {
    expect(errorWrapper.find("[data-test='error-message']").text()).toBe("Error");
  });

  it("should have the awaited class", () => {
    expect(errorWrapper.find("[data-test='error-message']").classes()).toContain("error");
  });
});
