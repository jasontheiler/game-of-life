<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";
import { useTransition } from "@vueuse/core";

const { needRefresh, updateServiceWorker } = useRegisterSW();

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
    if (needRefresh.value) isRendered.value = true;
  },
  onFinished() {
    if (!needRefresh.value) isRendered.value = false;
  },
});

watchEffect(() =>
  needRefresh.value ? (translate3dX.value = 0) : (translate3dX.value = -100)
);
</script>

<template>
  <div
    v-if="isRendered"
    :style="{ transform: `translate3d(${translate3dXOutput}%, 0, 0)` }"
    role="alert"
    class="fixed top-0 p-4 transform-gpu"
  >
    <div class="p-4 rounded-xl bg-lightGray shadow-xl text-white">
      <p>New updates available! Click on the reload button to update.</p>

      <div class="w-full mt-6 flex justify-end gap-6">
        <AppButton variant="secondary" @click="updateServiceWorker()">
          Reload
        </AppButton>

        <AppButton variant="secondary" @click="needRefresh = false">
          Dismiss
        </AppButton>
      </div>
    </div>
  </div>
</template>
