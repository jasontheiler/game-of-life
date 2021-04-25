<template>
  <button
    class="w-16 h-16 rounded-full bg-black bg-opacity-20"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    size: {
      type: Boolean as PropType<boolean>,
      required: false,
    },
  },
});
</script>
