<template>
  <div class="w-full h-screen flex flex-col-reverse overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="absolute inset-x-2 top-0 bottom-[7.5rem] flex flex-col rounded-b-2xl border border-t-0 border-white border-opacity-20 bg-white bg-opacity-20 backdrop-blur shadow-2xl transform-gpu transition-transform duration-500"
    >
      <section class="w-full h-full px-4 pt-4 overflow-hidden">
        <div ref="canvasWrapper" class="w-full h-full">
          <canvas ref="canvas" class="cursor-pointer" @click="toggleCell" />
        </div>
      </section>

      <button
        class="w-full h-12 rounded-2xl text-center text-xl text-black text-opacity-20 hover:text-opacity-30 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-100 transition duration-150"
        @click="isOpen = !isOpen"
      >
        <FontAwesomeIcon
          :class="{ 'rotate-180': isOpen }"
          class="transform-gpu transition-transform duration-500"
          icon="chevron-up"
        />
      </button>
    </main>

    <aside class="w-full max-w-screen-md mx-auto px-6">
      <TheSettings />

      <TheControls
        :isPlaying="isPlaying"
        @reset="reset"
        @togglePlay="togglePlay"
      />
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

import { useUniverse, useOnResize } from "~/composables";

export default defineComponent({
  setup() {
    const canvasWrapper = ref<HTMLDivElement | null>(null);
    const {
      canvas,
      canvasWidth,
      canvasHeight,
      cellSize,
      toggleCell,
      reset,
      togglePlay,
      isPlaying,
    } = useUniverse();

    useOnResize(() => {
      if (canvasWrapper.value) {
        canvasWidth.value = canvasWrapper.value?.clientWidth;
        canvasHeight.value = canvasWrapper.value?.clientHeight;
      }
    }, true);

    cellSize.value = 16;

    const isOpen = ref(false);

    return {
      canvasWrapper,
      canvas,
      toggleCell,
      reset,
      togglePlay,
      isPlaying,
      isOpen,
    };
  },
});
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(12px);
}
</style>
