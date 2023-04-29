import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount, RouterLinkStub, VueWrapper } from "@vue/test-utils";
import LoginPage from "@/views/public/LoginPage.vue";
import TheLoginForm from "@/components/TheLoginForm.vue";
import TheWelcome from "@/components/TheWelcome.vue";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";

describe("LoginPage", () => {
  let loginPage: VueWrapper;
  let pinia: TestingPinia;

  beforeEach(() => {
    vi.mock("vue-i18n");
    vi.mock("vue-router");

    pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
    });
    useUserStore(pinia).login = vi.fn().mockImplementation(() => "1234");
    loginPage = mount(LoginPage, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    expect(loginPage.exists()).toBe(true);
  });

  it("should render the awaited login form with awaited classes", () => {
    const loginForm = loginPage.findComponent(TheLoginForm);
    expect(loginForm.exists()).toBe(true);
    expect(loginForm.attributes().class).toContain("hidden lg:flex");
  });

  it("should render the awaited welcome part", () => {
    const welcome = loginPage.findComponent(TheWelcome);
    expect(welcome.exists()).toBe(true);
    expect(welcome.attributes().class).not.toContain("hidden lg:flex");
  });

  it("should have the awaited classes after click on started button", async () => {
    await loginPage.find("[data-test='started']").trigger("click");
    expect(loginPage.findComponent(TheWelcome).attributes().class).toContain("hidden lg:flex");
    expect(loginPage.findComponent(TheLoginForm).attributes().class).not.toContain(
      "hidden lg:flex"
    );
  });
});
