<template>
  <div class="flex flex-col text-xs space-y-1">
    <label class="font-light"
      >{{ label }}<span class="text-red-300" v-if="isRequired">*</span></label
    >
    <div class="w-full relative">
      <input
        :type="hideOrShowEye ? 'text' : 'password'"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'text-gray-100 font-light rounded-xl py-3.5 px-4 outline-none w-full placeholder:text-gray-600 focus:outline-2 focus:outline-violet-100',
          errors?.length
            ? 'bg-[#FCDEE4] placeholder:text-black-800'
            : 'bg-gray placeholder:text-gray-600',
        ]"
      />
      <div
        class="absolute bottom-3.5 right-3 cursor-pointer"
        @click="hideOrShowEye = !hideOrShowEye"
      >
        <EyeWithoutSlashIcon v-if="hideOrShowEye" />
        <EyeSlashIcon v-else />
      </div>
    </div>
    <ul class="text-red-600" v-if="errors?.length && shouldDisplayErrorMessage">
      <li data-test="password-error" v-for="error in errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ErrorObject } from "@vuelidate/core";
import { ref } from "vue";
import EyeSlashIcon from "@/components/icons/EyeSlashIcon.vue";
import EyeWithoutSlashIcon from "@/components/icons/EyeWithoutSlashIcon.vue";

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  shouldDisplayErrorMessage: {
    type: Boolean,
    default: true,
  },
  errors: {
    type: Array as PropType<ErrorObject[]>,
    default: () => [],
  },
});

defineEmits<{
  (e: "update:modelValue", password: string): void;
}>();

const hideOrShowEye = ref<boolean>(false);
</script>
