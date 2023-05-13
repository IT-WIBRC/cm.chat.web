import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import i18nMessage from "@/i18n.json";
import { setApiRoute } from "@/utils/api";

import "./index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const i18n = createI18n({
  locale: navigator.language.split("-")[0],
  fallbackLocale: "en",
  inheritLocale: true,
  legacy: false,
  messages: i18nMessage,
});

app.use(createPinia()).use(router).use(i18n).mount("#app");

setApiRoute();
app.config.errorHandler = (err, instance, info) => {
  console.info(info);
  console.error(err);
  console.warn(instance);
};
