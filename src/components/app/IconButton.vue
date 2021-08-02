<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :class="{
      'w-8 h-8 text-xs': props.size === 'sm',
      'w-12 h-12 text-xl': props.size === 'md',
      'w-18 h-18 text-3xl': props.size === 'lg',
    }"
    class="
      group
      rounded-full
      nm-concave-green-lg
      active:nm-inset-green-lg
      focus-visible:outline-none
    "
  >
    <div
      class="
        w-full
        h-full
        rounded-full
        flex
        justify-center
        items-center
        group-focus-visible:ring-4 group-focus-visible:ring-current
        transition-shadow
        duration-100
      "
    >
      {{ props.icon }}
      <!-- <FontAwesomeIcon :icon="icon" /> -->
    </div>
  </button>
</template>
