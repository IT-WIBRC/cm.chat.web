import EmailInput from "@/components/inputs/EmailInput.vue";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

describe("EmailInput", () => {
  const emailInput = mount(EmailInput, {
    props: {
      modelValue: "",
      label: "Email",
      placeholder: "Enter email here",
    },
  });

  it("should render correctly", () => {
    expect(emailInput.exists()).toBe(true);
  });

  it("should have the awaited label", () => {
    expect(emailInput.find("label").text()).toBe("Email");
  });

  it("should have the awaited placeholder", () => {
    expect(emailInput.find("input").element.placeholder).toBe("Enter email here");
  });

  it("should contain the awaited sign whe it is required", async () => {
    expect(emailInput.find("label").text()).not.toContain("*");
    await emailInput.setProps({
      isRequired: true,
    });
    expect(emailInput.find("label").text()).toContain("*");
  });

  it("should emit the awaited value when we type", async () => {
    await emailInput.find("input").setValue("wibrc@email");
    expect(emailInput.emitted()).toHaveProperty("update:modelValue", [["wibrc@email"]]);
  });

  it("should display the awaited error message when the props 'shouldDisplayErrorMessage' is set to 'True'", async () => {
    expect(emailInput.find("[data-test='email-error']").exists()).toBe(false);
    await emailInput.setProps({
      shouldDisplayErrorMessage: true,
      errors: [
        {
          $uid: "23344",
          $property: "email",
          $message: "Wrong email",
        },
      ],
    });
    const errorEmail = emailInput.find("[data-test='email-error']");
    expect(errorEmail.exists()).toBe(true);
    expect(errorEmail.text()).toBe("Wrong email");
  });

  it("should not display the error message and have the awaited classes when the props 'shouldDisplayErrorMessage' is set to 'False'", async () => {
    await emailInput.setProps({
      shouldDisplayErrorMessage: false,
      errors: [
        {
          $uid: "23344",
          $property: "email",
          $message: "Wrong email",
        },
      ],
    });
    expect(emailInput.find("[data-test='email-error']").exists()).toBe(false);
    expect(emailInput.find("input").attributes().class).toContain("bg-[#FCDEE4]");
  });
});
