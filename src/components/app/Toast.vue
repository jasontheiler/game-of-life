<script setup lang="ts">
import { useMotions } from "@vueuse/motion";

defineProps({
  isShown: {
    type: Boolean,
    required: true,
  },
});

const motions = useMotions();
</script>

<template>
  <Transition :css="false" @leave="(_, done) => motions.toast.leave(done)">
    <div
      v-if="isShown"
      v-motion="'toast'"
      :initial="{
        transform: 'translateX(-100%)',
      }"
      :enter="{
        transform: 'translateX(0%)',
      }"
      :leave="{
        transform: 'translateX(-100%)',
        transition: {
          ease: 'anticipate',
        },
      }"
      role="alert"
      class="fixed z-10 p-4"
    >
      <div class="p-4 rounded-xl bg-lightGray shadow-xl text-white">
        <slot />
      </div>
    </div>
  </Transition>
</template>
