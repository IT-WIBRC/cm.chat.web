import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "@/stores/session";
import { newNullUser, User } from "@/domains/User";
import { getToken } from "@/utils/api";

let sessionStore: unknown;
const user = new User({
  email: "wibrrChat@wibrc.grace",
  password: "23#3433wjefi9",
  userId: "989444c6-bd5e-4bef-9e27-2d8f6e22a637",
  token: {
    accessToken: "23d3d3d",
    expirationDate: "232442",
  },
});
describe("Session store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    sessionStore = useSessionStore();
  });

  it("should be initialized correctly", () => {
    sessionStore = useSessionStore();
    expect(sessionStore).toBeDefined();
  });

  it("should save the token when the user is set", async () => {
    Storage.prototype.setItem = vi.fn();
    vi.mock("@/utils/api");
    const sessionStore = useSessionStore();
    expect(sessionStore.currentUser).toEqual(newNullUser());
    await sessionStore.setCurrentUser(user);
    expect(sessionStore.currentUser).toEqual(user);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith("apiAccessToken", user.token.accessToken);
    expect(getToken).toHaveBeenCalled();
  });
});
