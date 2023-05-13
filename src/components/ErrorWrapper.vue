<template>
  <div data-test="error-message" :class="`flex ${theme} gap-x-5 px-5 py-1.5 rounded-xl`">
    <span class="font-light text-sm">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { ERROR_THEME } from "@/utils/enum";

defineProps({
  theme: {
    type: String as PropType<ERROR_THEME>,
    default: ERROR_THEME.ERROR,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.error {
  @apply bg-red-700 text-white;
}
</style>
