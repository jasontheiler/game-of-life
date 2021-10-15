<script setup lang="ts">
import { animate, spring } from "motion";

import { useUniverseStore } from "~/store";

const universeStore = useUniverseStore();
</script>

<template>
  <Transition
    :css="false"
    @enter="
      (element, done) =>
        animate(
          element,
          { transform: ['translateX(100%)', 'translateX(0%)'] },
          { easing: spring() }
        ).finished.then(done)
    "
    @leave="
      (element, done) =>
        animate(
          element,
          { transform: 'translateX(100%)' },
          { easing: spring() }
        ).finished.then(done)
    "
  >
    <div
      v-if="universeStore.config.displayFramerate"
      class="absolute right-0 bottom-0 p-4 pointer-events-none"
    >
      <div class="px-3 py-1.5 rounded-xl bg-lightGray shadow-xl text-white">
        {{ universeStore.realFramerate }}fps
      </div>
    </div>
  </Transition>
</template>
