<template>
  <button
    class="group relative w-12 h-12 focus-visible:outline-none"
    @click="$emit('input', !value)"
  >
    <div
      :class="[
        value
          ? 'w-7 h-7 translate-x-7 translate-y-7 text-xs'
          : 'z-10 w-11 h-11 text-lg',
      ]"
      class="absolute -left-1 -top-1 transform-gpu transition-transform duration-200"
    >
      <div
        class="w-full h-full flex justify-center items-center rounded-full border border-white border-opacity-20 bg-black bg-opacity-20 group-hover:bg-opacity-30 backdrop-filter backdrop-blur shadow-md group-focus-visible:ring group-focus-visible:ring-current transition-shadow duration-100"
      >
        <FontAwesomeIcon icon="paint-brush" />
      </div>
    </div>

    <div
      :class="[
        value
          ? 'z-10 w-11 h-11 text-lg'
          : 'w-7 h-7 translate-x-7 translate-y-7 text-xs',
      ]"
      class="absolute -left-1 -top-1 transform-gpu transition-transform duration-200"
    >
      <div
        class="w-full h-full flex justify-center items-center rounded-full border border-white border-opacity-20 bg-black bg-opacity-20 group-hover:bg-opacity-30 backdrop-filter backdrop-blur shadow-md group-focus-visible:ring group-focus-visible:ring-current transition-shadow duration-100"
      >
        <FontAwesomeIcon icon="eraser" />
      </div>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
});
</script>
