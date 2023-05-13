<template>
  <section class="h-full flex items-end py-10 text-white px-7 md:items-end md:py-20 md:px-20 my_bg md:bg-cover">
    <div class="flex flex-col space-y-10 md:space-y-32">
      <div class="space-y-3 md:space-y-6 md:mt-20 lg:space-y-2">
        <h3 class="font-light text-xs md:text-xl lg:text-sm" data-test="sub-title">
          {{ t("login.sub_title") }}
        </h3>
        <h1 class="font-semibold text-2xl w-5/6 md:text-4xl lg:w-4/5" data-test="title">
          {{ t("login.title") }}
        </h1>
        <p
          class="text-sm font-light md:text-xl md:leading-loose lg:text-base lg:pt-4"
          data-test="description"
        >
          {{ t("login.description_desc") }}
        </p>
      </div>
      <ButtonWrapper
        :text="t('login.started_btn')"
        class="font-semibold uppercase md:py-5 lg:hidden"
        @click="$emit('openLoginForm')"
        data-test="started"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import ButtonWrapper from "@/components/buttons/ButtonWrapper.vue";
import i18nMessages from "@/components/i18n.json";

defineEmits(["openLoginForm"]);

const { t } = useI18n(i18nMessages);
</script>
<style scoped>
.my_bg {
  background-image:
    url("../assets/try-again.png"),
    linear-gradient(135deg, #f761a1 0%, #8c1bab 100%);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top 20% right 40%;
  animation: mymove 5s infinite;
}

@keyframes mymove {
  50% {
    background-position: top 10% right 50%;
  }
}
</style>
