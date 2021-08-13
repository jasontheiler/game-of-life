<script setup lang="ts">
import { useMotions } from "@vueuse/motion";

import { useUniverseStore } from "~/store";

const motions = useMotions();

const universeStore = useUniverseStore();
</script>

<template>
  <Transition :css="false" @leave="(_, done) => motions.framerate.leave(done)">
    <div
      v-if="universeStore.config.displayFramerate"
      v-motion="'framerate'"
      :initial="{
        transform: 'translateX(100%)',
      }"
      :enter="{
        transform: 'translateX(0%)',
      }"
      :leave="{
        transform: 'translateX(100%)',
        transition: {
          ease: 'anticipate',
        },
      }"
      class="absolute right-0 bottom-0 p-4 pointer-events-none"
    >
      <div class="px-3 py-1.5 rounded-xl bg-lightGray shadow-xl text-white">
        {{ universeStore.realFramerate }}fps
      </div>
    </div>
  </Transition>
</template>
