import { defineStore } from "pinia";
import { User } from "@/domains/User";
import { UserService } from "@/services";
import { newNullUser } from "@/domains/User";
import { useSessionStore } from "@/stores/session";
import type { ErrorBody, UserError } from "@/utils/types";
import { USER_ERROR, USER_ERROR_KEYS } from "@/utils/errorEnum";

type State = {
  error: UserError;
};

export const useUserStore = defineStore("user", {
  state: (): State => ({
    error: {},
  }),
  getters: {},
  actions: {
    async login(user: User): Promise<User> {
      let newUser = newNullUser();
      try {
        const userInfo = await UserService.authenticateUser(user.userAsDto);
        newUser = new User(userInfo);
        await useSessionStore().setCurrentUser(newUser);
      } catch (error: unknown) {
        const errorKey = (error as ErrorBody).body;
        if (errorKey === USER_ERROR_KEYS["USER-404"]) {
          this.error.wrongInfo = USER_ERROR[errorKey as unknown as keyof typeof USER_ERROR];
        }
      }
      return newUser;
    },
  },
});
