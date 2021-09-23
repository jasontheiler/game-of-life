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
