<template>
  <main class="h-full grid grid-cols-1 lg:grid-cols-2">
    <TheLoginForm :class="{ 'hidden lg:flex': !isLoginFormDisplay }" />
    <TheWelcome
      @openLoginForm="isLoginFormDisplay = true"
      :class="{ 'hidden lg:flex': isLoginFormDisplay }"
    />
  </main>
</template>

<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import TheLoginForm from "@/components/TheLoginForm.vue";
import { ref } from "vue";

const isLoginFormDisplay = ref(false);
</script>
