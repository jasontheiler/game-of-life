<script setup lang="ts">
const props = defineProps<{ modelValue: boolean; label: string }>();

const value = useVModel(props, "modelValue");
</script>

<template>
  <label
    class="flex flex-nowrap items-center text-xl whitespace-nowrap cursor-pointer select-none"
  >
    <input
      v-model="value"
      type="checkbox"
      class="w-0 h-0 pointer-events-none active:sibling:(nm-inset-green) focus-visible:sibling:(outline-none ring ring-current)"
    />

    <div
      class="w-6 h-6 mr-3 flex justify-center items-center rounded-lg nm-concave-green-lg text-sm"
    >
      <IFaSolidCheck v-if="value" />
    </div>

    {{ label }}
  </label>
</template>
