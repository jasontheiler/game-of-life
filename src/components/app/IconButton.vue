<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  size: {
    type: String as PropType<"sm" | "base" | "lg">,
    default: "base",
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="{
      'w-8 h-8 text-xs': props.size === 'sm',
      'w-12 h-12 text-lg': props.size === 'base',
      'w-18 h-18 text-2xl': props.size === 'lg',
    }"
    class="group rounded-full nm-concave-green-lg active:(nm-inset-green-lg) focus-visible:(outline-none)"
  >
    <div
      class="w-full h-full rounded-full flex justify-center items-center transition-shadow duration-100 group-focus-visible:(ring-4 ring-current)"
    >
      <slot />
    </div>
  </button>
</template>
