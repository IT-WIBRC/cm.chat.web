import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "@/stores/user";
import { User } from "@/domains/User";
import { UserService } from "@/services";
import { useSessionStore } from "@/stores/session";

let userStore: unknown;
const user = new User({
  email: "wibrrChat@wibrc.grace",
  password: "23#3433wjefi9",
});

describe("User store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();
  });

  it("should be initialized correctly", () => {
    userStore = useUserStore();
    expect(userStore).toBeDefined();
  });

  it("should return the user when all is good", async () => {
    const response = {
      userId: "989444c6-bd5e-4bef-9e27-2d8f6e22a637",
      token: {
        accessToken: "23d3d3d",
        expirationDate: "232442",
      },
    };

    vi.spyOn(UserService, "authenticateUser").mockResolvedValue(response);
    useSessionStore().setCurrentUser = vi.fn();
    const userInfo = await useUserStore().login(user);
    expect(UserService.authenticateUser).toHaveBeenCalled();
    expect(UserService.authenticateUser).toHaveBeenCalledWith(user.userAsDto);
    expect(useSessionStore().setCurrentUser).toHaveBeenCalled();
    expect(useSessionStore().setCurrentUser).toHaveBeenCalledWith(new User(response));
    expect(userInfo).toEqual(new User(response));
  });

  it("should have the awaited error message when the user is not found", async () => {
    vi.spyOn(UserService, "authenticateUser").mockRejectedValue({ body: "USER-404" });
    useSessionStore().setCurrentUser = vi.fn();
    await useUserStore().login(user);
    expect(UserService.authenticateUser).toHaveBeenCalled();
    expect(UserService.authenticateUser).toHaveBeenCalledWith(user.userAsDto);
    expect(useSessionStore().setCurrentUser).not.toHaveBeenCalled();
    expect(useUserStore().error).toEqual({
      wrongInfo: "login.form.errors.not_found_err",
    });
  });
});
