<script setup lang="ts">
import { animate, spring } from "motion";

defineProps<{ isShown: boolean }>();
</script>

<template>
  <Transition
    :css="false"
    @enter="
      (element, done) =>
        animate(
          element,
          { transform: ['translateX(-100%)', 'translateX(0%)'] },
          { easing: spring() }
        ).finished.then(done)
    "
    @leave="
      (element, done) =>
        animate(
          element,
          { transform: 'translateX(-100%)' },
          { easing: spring() }
        ).finished.then(done)
    "
  >
    <div v-if="isShown" role="alert" class="fixed z-10 p-4">
      <div class="p-4 rounded-xl bg-lightGray shadow-xl text-white">
        <slot />
      </div>
    </div>
  </Transition>
</template>
