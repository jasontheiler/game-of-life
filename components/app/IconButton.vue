<template>
  <button
    :class="{
      'w-8 h-8 text-xs': size === 'sm',
      'w-12 h-12 text-xl': size === 'md',
      'w-18 h-18 text-3xl': size === 'lg',
    }"
    class="
      group
      rounded-full
      nm-concave-green-lg
      active:nm-inset-green-lg
      focus-visible:outline-none
    "
    v-on="$listeners"
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
      <FontAwesomeIcon :icon="icon" />
    </div>
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
