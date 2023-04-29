<template>
  <section
    class="h-full flex flex-col justify-center md:justify-start px-4 md:px-32 lg:px-16 xl:px-32 items-center"
  >
    <form
      autocomplete="off"
      @submit.prevent="login"
      class="flex flex-col items-center px-2.5 w-full 2xl:max-w-[800px] space-y-7 py-8 border border-transparent border-b-slate-300 md:mt-32"
    >
      <div class="space-y-1.5 w-full">
        <h2 class="font-semibold text-2.25xl" data-test="title">
          {{ t("login.login_ttl") }} <span class="text-gradient" data-test="app-name">DisKuz</span>
        </h2>
        <h4 data-test="explanation" class="text-md text-gray-200 font-light">
          {{ t("login.login_desc") }}
        </h4>
        <ErrorWrapper
          v-if="errorMessages.wrongInfo"
          :message="t(errorMessages.wrongInfo)"
          class="min-w-fit w-4/5"
        />
      </div>
      <div class="w-full space-y-7">
        <EmailInput
          :label="t('login.form.email_lbl')"
          v-model.trim="userLogin.email"
          :placeholder="t('login.form.email_ph')"
          :errors="v$.email.$errors"
          data-test="email-field"
        />
        <PasswordInput
          :label="t('login.form.password_lbl')"
          v-model.trim="userLogin.password"
          :placeholder="t('login.form.password_ph')"
          :errors="v$.password.$errors"
          data-test="password-field"
        />
        <ButtonWrapper
          class="uppercase disabled:animate-pulse w-full"
          type="submit"
          :text="t('login.login_btn')"
          :theme="BUTTON_THEME.VIOLET"
          :disabled="isButtonDisabled"
          data-test="submit-btn"
        />
      </div>
      <div class="text-center font-light text-slate-600 text-sm">
        <RouterLink to="#" class="link text-sm">{{ t("login.forgot_password_ttl") }}</RouterLink>
      </div>
    </form>
    <div class="flex justify-between items-center pt-5 w-full 2xl:max-w-[800px]">
      <RouterLink to="#" class="text-md link">{{ t("login.already_account_ttl") }}</RouterLink>
      <ButtonWrapper
        class="w-2/4 lg:w-2/5"
        :text="t('login.started_btn')"
        :theme="BUTTON_THEME.PINK"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import EmailInput from "@/components/inputs/EmailInput.vue";
import ButtonWrapper from "@/components/buttons/ButtonWrapper.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";

import { BUTTON_THEME } from "@/utils/enum";
import i18nMessages from "@/components/i18n.json";
import { useSessionStore } from "@/stores/session";
import { useUserStore } from "@/stores/user";
import { newNullUser } from "@/domains/User";
import type { UserError, UserLogin } from "@/utils/types";
import ErrorWrapper from "@/components/ErrorWrapper.vue";

const { t } = useI18n(i18nMessages);

const userLogin = reactive<UserLogin>({
  email: "",
  password: "",
});

const rules = {
  email: {
    required: helpers.withMessage(t("login.form.errors.required_email"), required),
    email: helpers.withMessage(t("login.form.errors.mustBe_email"), email),
  },
  password: {
    required: helpers.withMessage(t("login.form.errors.required_password"), required),
    minlength: helpers.withMessage(t("login.form.errors.characters_password"), minLength(8)),
  },
};

const userStore = useUserStore();
const errorMessages = computed(() => userStore.error);
const $externalResults = reactive({} as UserError);
const v$ = useVuelidate(rules, userLogin, {
  $externalResults,
});

const isButtonDisabled = ref<boolean>(false);
const router = useRouter();

const sessionStore = useSessionStore();
const login = async (): Promise<void> => {
  isButtonDisabled.value = true;
  const isLoginFormValid = await v$.value.$validate();

  if (isLoginFormValid) {
    const newUser = newNullUser();
    newUser.email = userLogin.email;
    newUser.password = userLogin.password;
    newUser.isNull = false;

    sessionStore.currentUser = await userStore.login(newUser);

    if (!sessionStore.currentUser.isNull) {
      await router.push("/user");
    }
    if (userStore.error.wrongInfo) {
      Object.assign($externalResults, {
        email: " ",
        password: " ",
      });
      isButtonDisabled.value = false;
      return;
    }
  }
  v$.value.$clearExternalResults();
  isButtonDisabled.value = false;
};

watch(
  () => userLogin.email,
  (newValue) => {
    if (newValue) {
      Object.assign($externalResults, {
        wrongInfo: "",
        email: "",
      });
      v$.value.email.$reset();
    }
  }
);

watch(
  () => userLogin.password,
  (newValue) => {
    if (newValue) {
      Object.assign($externalResults, {
        wrongInfo: "",
        password: "",
      });
      v$.value.password.$reset();
    }
  }
);
</script>
<style scoped>
.text-gradient {
  @apply bg-gradient;

  /* stylelint-disable */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.link {
  @apply text-gray-200 transition duration-150 ease-in hover:underline hover:underline-offset-2 font-light;
}
</style>
