<template>
  <div class="flex flex-col text-xs space-y-1">
    <label class="font-light"
      >{{ label }}<span class="text-red-300" v-if="isRequired">*</span></label
    >
    <input
      type="email"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'text-gray-100 rounded-xl py-3.5 px-4 outline-none w-full placeholder:font-light focus:outline-2 focus:outline-violet-100',
        errors?.length
          ? 'bg-[#FCDEE4] placeholder:text-black-800'
          : 'bg-gray placeholder:text-gray-600',
      ]"
    />
    <ul class="text-red-600" v-if="errors?.length && shouldDisplayErrorMessage">
      <li data-test="email-error" v-for="error in errors" :key="error.$uid">
        {{ error.$message }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { ErrorObject } from "@vuelidate/core";

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
  (e: "update:modelValue", email: string): void;
}>();
</script>
