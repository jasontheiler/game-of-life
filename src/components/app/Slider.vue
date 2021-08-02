<script setup lang="ts">
const props = defineProps({
  value: Number,
  id: String,
  label: String,
  unit: String,
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});
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
      :id="id"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
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
    />

    <div
      class="
        -mt-2
        text-right text-3xl text-blueGray-600
        whitespace-nowrap
        select-none
      "
    >
      {{ props.value }}{{ props.unit }}
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
