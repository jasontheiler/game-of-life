<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps({
  modelValue: {
    type: Boolean,
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
});

const value = useVModel(props, "modelValue");
</script>

<template>
  <div class="flex flex-nowrap items-center gap-4">
    <IFaSolidCheck class="hidden" />

    <input
      v-model="value"
      :id="id"
      type="checkbox"
      class="appearance-none relative w-6 h-6 rounded nm-convex-green cursor-pointer checked:(nm-inset-green) focus-visible:(outline-none ring ring-current)"
    />

    <label
      :for="id"
      class="text-xl whitespace-nowrap cursor-pointer select-none"
    >
      {{ label }}
    </label>
  </div>
</template>
