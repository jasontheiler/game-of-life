<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "base" | "lg";
    variant?: "primary" | "secondary";
  }>(),
  {
    size: "base",
    variant: "primary",
  }
);
</script>

<template>
  <button
    v-bind="$attrs"
    :class="{
      'w-8 h-8 text-xs': size === 'sm',
      'w-12 h-12 text-lg': size === 'base',
      'w-18 h-18 text-2xl': size === 'lg',
      'nm-concave-green-lg text-darkGray active:(nm-inset-green-lg)':
        variant === 'primary',
      'nm-concave-lightGray-lg text-white active:(nm-inset-lightGray-lg)':
        variant === 'secondary',
    }"
    class="group rounded-full focus-visible:(outline-none)"
  >
    <div
      class="w-full h-full rounded-full flex justify-center items-center transition-shadow duration-100 group-focus-visible:(ring-4 ring-current)"
    >
      <slot />
    </div>
  </button>
</template>
