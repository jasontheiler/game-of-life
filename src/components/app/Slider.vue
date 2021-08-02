<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  unit: String,
});
const emit = defineEmits(["update:modelValue"]);

const value = useVModel(props, "modelValue", emit);
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
      v-model="value"
      v-bind="$attrs"
      :id="id"
      type="range"
      class="appearance-none w-full h-2 rounded-full bg-black bg-opacity-10 shadow-inner transition-shadow duration-100 cursor-pointer hover:(bg-opacity-20) focus-visible:(outline-none ring ring-current)"
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
