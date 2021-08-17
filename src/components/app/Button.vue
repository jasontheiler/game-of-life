<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  size: {
    type: String as PropType<"sm" | "base" | "lg">,
    default: "base",
  },

  variant: {
    type: String as PropType<"primary" | "secondary">,
    default: "primary",
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="{
      'nm-flat-green-lg text-darkGray active:(nm-inset-green-lg)':
        variant === 'primary',
      'nm-flat-lightGray-lg text-white active:(nm-inset-lightGray-lg)':
        variant === 'secondary',
    }"
    class="group rounded-lg focus-visible:(outline-none)"
  >
    <div
      :class="{
        'px-2 py-1 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'base',
        'px-6 py-3 text-lg': size === 'lg',
      }"
      class="w-full h-full rounded-lg flex justify-center items-center transition-shadow duration-100 group-focus-visible:(ring-4 ring-current)"
    >
      <slot />
    </div>
  </button>
</template>
