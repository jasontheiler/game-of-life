<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const value = useVModel(props, "modelValue");
const toggleValue = useToggle(value);
</script>

<template>
  <button
    :aria-label="`Switch to ${value ? 'drawing' : 'erasing'} cells`"
    class="group w-22 h-12 -m-6 rounded-full nm-concave-green-lg active:(nm-inset-green-lg) xl:(w-12 h-22)"
    @click="toggleValue()"
  >
    <div
      class="relative w-full h-full p-1 rounded-full flex justify-around items-center text-sm transition-shadow duration-100 group-focus-visible:(ring-4 ring-current) xl:(flex-col)"
    >
      <div
        :class="[
          value
            ? 'left-1/2 right-1 top-1 bottom-1 activate xl:(left-1 top-1/2)'
            : 'left-1 right-1/2 top-1 bottom-1 deactivate xl:(right-1 bottom-1/2)',
        ]"
        class="absolute z-0 rounded-full bg-purple shadow-md"
      />

      <IFaSolidSquare class="z-10" />

      <IFaRegularSquare class="z-10" />
    </div>
  </button>
</template>

<style scoped>
.activate {
  animation: switch-right 200ms;
}

@screen xl {
  .activate {
    animation: switch-down 200ms;
  }
}

.deactivate {
  animation: switch-left 200ms;
}

@screen xl {
  .deactivate {
    animation: switch-up 200ms;
  }
}

@keyframes switch-right {
  0% {
    @apply left-1 right-1/2;
  }
  50% {
    @apply left-1 right-1;
  }
  100% {
    @apply left-1/2 right-1;
  }
}

@keyframes switch-left {
  0% {
    @apply left-1/2 right-1;
  }
  50% {
    @apply left-1 right-1;
  }
  100% {
    @apply left-1 right-1/2;
  }
}

@keyframes switch-down {
  0% {
    @apply top-1 bottom-1/2;
  }
  50% {
    @apply top-1 bottom-1;
  }
  100% {
    @apply top-1/2 bottom-1;
  }
}
@keyframes switch-up {
  0% {
    @apply top-1/2 bottom-1;
  }
  50% {
    @apply top-1 bottom-1;
  }
  100% {
    @apply top-1 bottom-1/2;
  }
}
</style>
