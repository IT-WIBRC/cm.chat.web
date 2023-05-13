import { defineStore } from "pinia";
import type { User } from "@/domains/User";
import { newNullUser } from "@/domains/User";
import { getToken } from "@/utils/api";

type State = {
  currentUser: User;
};
export const useSessionStore = defineStore("session", {
  state: (): State => ({
    currentUser: newNullUser(),
  }),
  getters: {},
  actions: {
    async setCurrentUser(user: User): Promise<void> {
      this.currentUser = user;
      localStorage.setItem("apiAccessToken", user.token.accessToken);
      await getToken();
    },
  },
});
