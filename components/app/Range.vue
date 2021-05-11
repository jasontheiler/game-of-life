<template>
  <div class="w-full flex items-center">
    <span class="select-none">{{ min }}</span>

    <input
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      type="range"
      class="w-full h-2 mx-4 appearance-none rounded-full bg-black bg-opacity-5 shadow-inner focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-100 transition-shadow duration-100"
      @input="onInput"
    />

    <span class="select-none">{{ max }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    min: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },

    max: {
      type: Number as PropType<number>,
      required: false,
      default: 100,
    },

    step: {
      type: Number as PropType<number>,
      required: false,
      default: 1,
    },

    value: {
      type: Number as PropType<number>,
      required: true,
    },
  },

  setup(_, { emit }) {
    const onInput = ({ target }: InputEvent) => {
      const value = parseFloat((target as any)?.value);

      console.log(value);

      emit("input", value);
    };

    return {
      onInput,
    };
  },
});
</script>

<style scoped>
input::-webkit-slider-thumb {
  @apply cursor-pointer;
}
</style>
