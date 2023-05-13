import TheLoginForm from "@/components/TheLoginForm.vue";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount, RouterLinkStub, VueWrapper } from "@vue/test-utils";
import PasswordInput from "../inputs/PasswordInput.vue";
import EmailInput from "../inputs/EmailInput.vue";
import ButtonWrapper from "../buttons/ButtonWrapper.vue";
import { useUserStore } from "@/stores/user";
import type { TestingPinia } from "@pinia/testing";
import { createTestingPinia } from "@pinia/testing";
import { User } from "@/domains/User";
import { useRouter } from "vue-router";
import ErrorWrapper from "@/components/ErrorWrapper.vue";
import { nextTick } from "vue";

const router = useRouter();
describe("TheLoginForm", () => {
  let loginForm: VueWrapper;
  let pinia: TestingPinia;

  beforeEach(() => {
    router.push = vi.fn();
    vi.mocked(useRouter).mockImplementationOnce(() => router);
    vi.mock("vue-i18n");
    vi.mock("vue-router");
    pinia = createTestingPinia({
      stubActions: false,
      createSpy: vi.fn,
    });
    useUserStore(pinia).login = vi.fn().mockImplementation(() => "1234");
    loginForm = mount(TheLoginForm, {
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
    vi.resetAllMocks();
    vi.clearAllMocks();
  });

  it("should render correctly", () => {
    expect(loginForm.exists()).toBe(true);
  });

  it("should have the awaited title", () => {
    expect(loginForm.find("[data-test='title']").text()).toContain("login.login_ttl");
  });

  it("should have the awaited application name", () => {
    expect(loginForm.find("[data-test='app-name']").text()).toContain("DisKuz");
  });

  it("should have the awaited description", () => {
    expect(loginForm.find("[data-test='explanation']").text()).toContain("login.login_desc");
  });

  it("should have the awaited field to fill the password", () => {
    const password = loginForm.findComponent(PasswordInput);
    expect(password.exists()).toBe(true);
    expect(password.props()).toEqual({
      errors: [],
      isRequired: false,
      label: "login.form.password_lbl",
      modelValue: "",
      placeholder: "login.form.password_ph",
      shouldDisplayErrorMessage: true,
    });
  });

  it("should have the awaited field to fill the email", () => {
    const email = loginForm.findComponent(EmailInput);
    expect(email.exists()).toBe(true);
    expect(email.props()).toEqual({
      errors: [],
      isRequired: false,
      label: "login.form.email_lbl",
      modelValue: "",
      placeholder: "login.form.email_ph",
      shouldDisplayErrorMessage: true,
    });
  });

  it("should have the awaited button to submit his information", () => {
    const submitBtn = loginForm.findComponent(ButtonWrapper);
    expect(submitBtn.exists()).toBe(true);
    expect(submitBtn.props()).toEqual({
      text: "login.login_btn",
      theme: "violet",
    });
  });

  it("should have the 'forgot password' link", () => {
    const forgotPassword = loginForm.findComponent(RouterLinkStub);
    expect(forgotPassword.exists()).toBe(true);
    expect(forgotPassword.text()).toBe("login.forgot_password_ttl");
    expect(forgotPassword.props()).toEqual({
      to: "#",
      custom: false,
    });
  });

  it("should have the link for those whi already have an account", () => {
    const alreadyHaveAccount = loginForm.findAllComponents(RouterLinkStub)[1];
    expect(alreadyHaveAccount.exists()).toBe(true);
    expect(alreadyHaveAccount.text()).toBe("login.already_account_ttl");
    expect(alreadyHaveAccount.props()).toEqual({
      to: "#",
      custom: false,
    });
  });

  it("should not contain the error component by default", () => {
    expect(loginForm.findComponent(ErrorWrapper).exists()).toBe(false);
  });

  it("should have the awaited button to 'get started'", () => {
    const getStartedBtn = loginForm.findAllComponents(ButtonWrapper)[1];
    expect(getStartedBtn.exists()).toBe(true);
    expect(getStartedBtn.props()).toEqual({
      text: "login.started_btn",
      theme: "pink",
    });
  });

  it("should display errors message when any fields has not been filled", async () => {
    expect(loginForm.find("[data-test='email-error']").exists()).toBe(false);
    expect(loginForm.find("[data-test='password-error']").exists()).toBe(false);
    await loginForm.findComponent(ButtonWrapper).trigger("submit");
    expect(loginForm.find("[data-test='email-error']").text()).toBe(
      "login.form.errors.required_email"
    );
    expect(loginForm.find("[data-test='password-error']").text()).toBe(
      "login.form.errors.required_password"
    );
  });

  it("should display error message when the number of character of the password field is less that 8", async () => {
    expect(loginForm.find("[data-test='password-error']").exists()).toBe(false);
    await loginForm.find("[data-test='password-field'] input").setValue("2der482");
    await loginForm.findComponent(ButtonWrapper).trigger("submit");
    expect(loginForm.find("[data-test='password-error']").text()).toBe(
      "login.form.errors.characters_password"
    );
  });

  it("should display error message when only the password is filled", async () => {
    expect(loginForm.find("[data-test='email-error']").exists()).toBe(false);
    await loginForm.find("[data-test='password-field'] input").setValue("2der482#");
    await loginForm.findComponent(ButtonWrapper).trigger("submit");
    expect(loginForm.find("[data-test='email-error']").text()).toBe(
      "login.form.errors.required_email"
    );
    expect(loginForm.find("[data-test='password-error']").exists()).toBe(false);
  });

  it("should display error message when only the email is filled", async () => {
    expect(loginForm.find("[data-test='email-error']").exists()).toBe(false);
    await loginForm.find("[data-test='email-field'] input").setValue("wibrd@gn.fr");
    await loginForm.findComponent(ButtonWrapper).trigger("submit");
    expect(loginForm.find("[data-test='password-error']").text()).toBe(
      "login.form.errors.required_password"
    );
    expect(loginForm.find("[data-test='email-error']").exists()).toBe(false);
  });

  it("should send the awaited information when all fields are well filled", async () => {
    await loginForm.find("[data-test='email-field'] input").setValue("wibrd@gn.fr");
    await loginForm.find("[data-test='password-field'] input").setValue("2der482#");

    await loginForm.findComponent(ButtonWrapper).trigger("submit");

    expect(loginForm.findComponent(ButtonWrapper).find("button").element.disabled).toBe(true);

    await flushPromises();
    expect(useUserStore().login).toHaveBeenCalledOnce();
    expect(useUserStore().login).toHaveBeenCalledWith(
      new User({
        email: "wibrd@gn.fr",
        password: "2der482#",
      })
    );
    expect(loginForm.findComponent(ButtonWrapper).find("button").element.disabled).toBe(false);
    expect(router.push).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/user");
    expect(loginForm.findComponent(ErrorWrapper).exists()).toBe(false);
  });

  it("should display the awaited error when the user is not found", async () => {
    expect(loginForm.findComponent(ErrorWrapper).exists()).toBe(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useUserStore().error.wrongInfo = "login.form.errors.not_found_err";
    await nextTick();

    const errorMessage = loginForm.findComponent(ErrorWrapper);
    expect(errorMessage.exists()).toBe(true);
    expect((loginForm.findComponent(ButtonWrapper).element as HTMLButtonElement).disabled).toBe(
      false
    );
    expect(errorMessage.props()).toEqual({
      message: "login.form.errors.not_found_err",
      theme: "error",
    });
  });
});
