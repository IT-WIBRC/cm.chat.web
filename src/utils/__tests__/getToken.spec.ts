import { describe, expect, it, vi } from "vitest";
import { getToken } from "@/utils/api";

describe("getToken", () => {
  it("should return the token if present", async () => {
    Storage.prototype.getItem = vi.fn().mockReturnValue("1234");
    expect(await getToken()).toBe("1234");
  });

  it("should return an empty string if the token doesn't exist", async () => {
    Storage.prototype.getItem = vi.fn().mockReturnValue(undefined);
    expect(await getToken()).toBe("");
  });
});
