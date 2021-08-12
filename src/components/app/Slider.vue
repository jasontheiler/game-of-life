<script setup lang="ts">
import { get, set, useVModel } from "@vueuse/core";
import { scalePow } from "d3-scale";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  scalingExponent: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    required: true,
  },
  unit: String,
});

const value = useVModel(props, "modelValue");

const scale = computed(() =>
  scalePow()
    .exponent(props.scalingExponent)
    .domain([props.min, props.max])
    .rangeRound([props.min, props.max])
);

const onInput = ({ target }: any) =>
  set(value, get(scale)(parseInt(target?.value)));
</script>

<template>
  <div class="relative">
    <label
      :for="id"
      class="-mb-3 text-left text-3xl whitespace-nowrap select-none"
    >
      {{ label }}
    </label>

    <input
      v-bind="$attrs"
      :value="scale.invert(value)"
      :id="id"
      :min="min"
      :max="max"
      type="range"
      class="appearance-none w-full h-2 rounded-full bg-black bg-opacity-10 shadow-inner transition-shadow duration-100 cursor-pointer hover:(bg-opacity-20) focus-visible:(outline-none ring ring-current)"
      @input="onInput($event)"
    />

    <div
      class="-mt-2 text-right text-3xl text-blueGray-600 whitespace-nowrap select-none"
    >
      {{ props.modelValue }}{{ props.unit }}
    </div>
  </div>
</template>

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
