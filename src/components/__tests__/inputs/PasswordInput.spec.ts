import PasswordInput from "@/components/inputs/PasswordInput.vue";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import EyeSlashIcon from "@/components/icons/EyeSlashIcon.vue";
import EyeWithoutSlashIcon from "@/components/icons/EyeWithoutSlashIcon.vue";

describe("PasswordInput", () => {
  const passwordInput = mount(PasswordInput, {
    props: {
      modelValue: "",
      label: "Password",
      placeholder: "Enter password here",
    },
  });

  it("should render correctly", () => {
    expect(passwordInput.exists()).toBe(true);
  });

  it("should have the awaited label", () => {
    expect(passwordInput.find("label").text()).toBe("Password");
  });

  it("should have the awaited placeholder", () => {
    expect(passwordInput.find("input").element.placeholder).toBe("Enter password here");
  });

  it("should have the eye slash icon by default", () => {
    expect(passwordInput.findComponent(EyeSlashIcon).exists()).toBe(true);
  });

  it("should have the eye without slash icon we we click on the eye slash icon", async () => {
    expect(passwordInput.findComponent(EyeSlashIcon).exists()).toBe(true);
    expect(passwordInput.find("input").element.type).toBe("password");
    await passwordInput.findComponent(EyeSlashIcon).trigger("click");
    expect(passwordInput.findComponent(EyeSlashIcon).exists()).toBe(false);
    expect(passwordInput.find("input").element.type).toBe("text");
    // eslint-disable-next-line vue/max-len
    expect(passwordInput.findComponent(EyeWithoutSlashIcon).exists()).toBe(true);

    await passwordInput.findComponent(EyeWithoutSlashIcon).trigger("click");
    expect(passwordInput.findComponent(EyeSlashIcon).exists()).toBe(true);
    // eslint-disable-next-line vue/max-len
    expect(passwordInput.findComponent(EyeWithoutSlashIcon).exists()).toBe(false);
    expect(passwordInput.find("input").element.type).toBe("password");
  });

  it("should contain the awaited sign whe it is required", async () => {
    expect(passwordInput.find("label").text()).not.toContain("*");
    await passwordInput.setProps({
      isRequired: true,
    });
    expect(passwordInput.find("label").text()).toContain("*");
  });

  it("should emit the awaited value when we type", async () => {
    await passwordInput.find("input").setValue("wibrc@password");
    expect(passwordInput.emitted()).toHaveProperty("update:modelValue", [["wibrc@password"]]);
  });

  it("should display the awaited error message when the props 'shouldDisplayErrorMessage' is set to 'True'", async () => {
    expect(passwordInput.find("[data-test='password-error']").exists()).toBe(false);
    await passwordInput.setProps({
      shouldDisplayErrorMessage: true,
      errors: [
        {
          $uid: "23344",
          $property: "password",
          $message: "Wrong password",
        },
      ],
    });
    const errorPassword = passwordInput.find("[data-test='password-error']");
    expect(errorPassword.exists()).toBe(true);
    expect(errorPassword.text()).toBe("Wrong password");
  });

  it("should not display the error message and have the awaited classes when the props 'shouldDisplayErrorMessage' is set to 'False'", async () => {
    await passwordInput.setProps({
      shouldDisplayErrorMessage: false,
      errors: [
        {
          $uid: "23344",
          $property: "password",
          $message: "Wrong password",
        },
      ],
    });
    expect(passwordInput.find("[data-test='password-error']").exists()).toBe(false);
    expect(passwordInput.find("input").attributes().class).toContain("bg-[#FCDEE4]");
  });
});
