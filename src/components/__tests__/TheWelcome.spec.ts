import TheWelcome from "@/components/TheWelcome.vue";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ButtonWrapper from "@/components/buttons/ButtonWrapper.vue";

describe("TheWelcome", () => {
  let theWelcome: VueWrapper;
  beforeEach(() => {
    vi.mock("vue-i18n");
    theWelcome = mount(TheWelcome);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    expect(theWelcome.exists()).toBe(true);
  });

  it("should have the awaited sub-title", () => {
    expect(theWelcome.find("[data-test='sub-title']").text()).toBe("login.sub_title");
  });

  it("should have the awaited sub-title", () => {
    expect(theWelcome.find("[data-test='title']").text()).toBe("login.title");
  });

  it("should have the awaited description", () => {
    expect(theWelcome.find("[data-test='description']").text()).toBe("login.description_desc");
  });

  it("should have the awaited `get's started` button", () => {
    const startedBtn = theWelcome.findComponent(ButtonWrapper);
    expect(startedBtn.exists()).toBe(true);
    expect(startedBtn.props()).toEqual({
      text: "login.started_btn",
      theme: "white",
    });
  });

  it("should emit the awaited event when we click on the `get's started` button", async () => {
    await theWelcome.findComponent(ButtonWrapper).trigger("click");
    expect(theWelcome.emitted()).toHaveProperty("openLoginForm");
  });
});
