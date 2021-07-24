<template>
  <div class="relative">
    <div
      v-if="label"
      class="
        -mb-3
        text-left text-3xl text-white
        whitespace-nowrap
        select-none
      "
    >
      {{ label }}
    </div>

    <input
      :min="min"
      :max="max"
      :step="step"
      :value="innerValue"
      type="range"
      class="
        appearance-none
        w-full
        h-2
        rounded-full
        bg-black bg-opacity-10
        hover:bg-opacity-20
        shadow-inner
        focus-visible:outline-none focus-visible:ring focus-visible:ring-current
        transition-shadow
        duration-100
        cursor-pointer
      "
      @input="onInput"
    />

    <div
      class="
        -mt-2
        text-right text-3xl text-blueGray-600
        whitespace-nowrap
        select-none
      "
    >
      {{ innerValue }}{{ unit }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api";

import { debounce } from "~/utils";

export default defineComponent({
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },

    label: {
      type: String as PropType<string>,
      required: false,
    },

    unit: {
      type: String as PropType<string>,
      required: false,
    },

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

    isLazy: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },

  setup(props, { emit }) {
    const { isLazy, value } = props;

    const innerValue = ref(value);

    const debouncedEmit = debounce(emit);

    const onInput = ({ target }: InputEvent) => {
      innerValue.value = parseFloat((target as any)?.value);

      isLazy
        ? debouncedEmit("input", innerValue.value)
        : emit("input", innerValue.value);
    };

    return {
      innerValue,
      onInput,
    };
  },
});
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-6 h-6 rounded-full bg-current shadow-lg;
}

input[type="range"]::-moz-range-thumb {
  @apply appearance-none w-6 h-6 rounded-full bg-current shadow-lg;
}

input[type="range"]::-ms-thumb {
  @apply appearance-none w-6 h-6 rounded-full bg-current shadow-lg;
}
</style>
