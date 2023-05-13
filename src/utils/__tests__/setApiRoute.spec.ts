import { describe, expect, it } from "vitest";
import { setApiRoute } from "@/utils/api";
import { OpenAPI } from "@/services";

describe("setApiRoute", () => {
  it("should contain the awaited end route", () => {
    setApiRoute();
    expect(OpenAPI.BASE).toContain("api/v1");
  });
});
