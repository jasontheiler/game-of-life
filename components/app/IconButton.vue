<template>
  <button
    :class="{
      'w-8 h-8 text-xs': size === 'sm',
      'w-12 h-12 text-xl': size === 'md',
      'w-18 h-18 text-3xl': size === 'lg',
    }"
    class="rounded-full border border-black border-opacity-10 bg-black bg-opacity-20 hover:bg-opacity-30 backdrop-filter backdrop-blur-md shadow-md text-teal-100 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-100 transition duration-150"
    v-on="$listeners"
  >
    <FontAwesomeIcon :icon="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { IconName } from "@fortawesome/free-solid-svg-icons";

export default defineComponent({
  props: {
    icon: {
      type: String as PropType<IconName>,
      required: true,
    },

    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      required: false,
      default: "md",
    },
  },
});
</script>
