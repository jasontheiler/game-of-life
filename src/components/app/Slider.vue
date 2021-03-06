<script setup lang="ts">
import { scalePow } from "d3-scale";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
    scalingExponent?: number;
    label: string;
    unit?: string;
  }>(),
  {
    min: 0,
    max: 100,
    scalingExponent: 1,
  }
);

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
  <label class="flex flex-col gap-2 text-3xl select-none">
    {{ label }}

    <div class="relative w-full h-2 rounded-full nm-flat-green-sm">
      <input
        v-bind="$attrs"
        :value="scale.invert(value)"
        :min="min"
        :max="max"
        type="range"
        class="appearance-none absolute w-full h-full rounded-full bg-transparent cursor-pointer focus-visible:(outline-none ring ring-current)"
        @input="onInput($event)"
      />
    </div>

    <span class="text-right">{{ modelValue }}{{ unit }}</span>
  </label>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  @apply appearance-none w-8 h-8 rounded-full nm-concave-green;
}

input[type="range"]::-moz-range-thumb {
  @apply appearance-none w-8 h-8 rounded-full nm-concave-green;
}

input[type="range"]::-ms-thumb {
  @apply appearance-none w-8 h-8 rounded-full nm-concave-green;
}
</style>
