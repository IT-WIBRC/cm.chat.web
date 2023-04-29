import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/public/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginPage,
      meta: {
        isPublic: false,
      },
    },
    {
      path: "/user",
      name: "User layout",
      component: () => import("@/views/public/UserLayout.vue"),
      meta: {
        isPublic: false,
      },
      children: [],
    },
  ],
});

export default router;
