import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import UserLayout from "@/views/public/UserLayout.vue";

describe("UserLayout", () => {
  const userLayout = mount(UserLayout);

  it("should render correctly", () => {
    expect(userLayout.exists()).toBe(true);
  });

  it("should contain 'User layout' text", () => {
    expect(userLayout.text()).toBe("User layout");
  });
});
