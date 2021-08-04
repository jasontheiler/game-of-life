<script setup lang="ts">
import { not, useTransition, whenever } from "@vueuse/core";

const props = defineProps({
  isShown: {
    type: Boolean,
    required: true,
  },
});

const { isShown } = toRefs(props);

const isRendered = ref(false);
const translate3dX = ref(-100);
const translate3dXOutput = useTransition(translate3dX, {
  duration: 2000,
  transition(n) {
    return n === 0 || n === 1
      ? n
      : 4 ** (-10 * n) * Math.sin((n * 10 - 0.5) * ((2 * Math.PI) / 3)) + 1;
  },
  onStarted() {
    if (isShown.value) isRendered.value = true;
  },
  onFinished() {
    if (!isShown.value) isRendered.value = false;
  },
});

whenever(isShown, () => (translate3dX.value = 0), { immediate: true });
whenever(not(isShown), () => (translate3dX.value = -100), { immediate: true });
</script>

<template>
  <div
    v-if="isRendered"
    :style="{ transform: `translate3d(${translate3dXOutput}%, 0, 0)` }"
    role="alert"
    class="fixed p-4"
  >
    <div class="p-4 rounded-xl bg-lightGray shadow-xl text-white">
      <slot />
    </div>
  </div>
</template>
