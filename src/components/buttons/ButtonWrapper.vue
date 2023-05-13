<template>
  <button :class="`${theme} rounded-xl text-center py-3`">
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { BUTTON_THEME } from "@/utils/enum";

defineProps({
  theme: {
    type: String as PropType<BUTTON_THEME>,
    default: BUTTON_THEME.WHITE,
  },
  text: {
    type: String,
  },
});
</script>

<style scoped>
.white {
  @apply bg-white text-black;
}

.violet {
  @apply text-white bg-violet-700  disabled:bg-violet-700/40 disabled:text-white/40 disabled:cursor-not-allowed;
}

.pink {
  @apply text-white bg-[#E0007F];
}
</style>
