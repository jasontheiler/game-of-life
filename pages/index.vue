<template>
  <div class="w-full h-screen flex flex-col overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="flex-1 w-full p-4 md:p-6 pb-0 md:pb-0 flex flex-col rounded-b-3xl bg-white bg-opacity-25 shadow-2xl transform-gpu transition-transform duration-500"
    >
      <canvas ref="canvas" class="w-full h-full" @click="toggleCell" />

      <button
        class="w-full h-8 md:h-12 text-center text-xl text-black text-opacity-25"
        @click="isOpen = !isOpen"
      >
        <FontAwesomeIcon
          :class="{ 'rotate-180': isOpen }"
          class="transform-gpu transition-transform duration-500"
          icon="chevron-up"
        />
      </button>
    </main>

    <aside class="px-4 md:px-6 py-6 md:py-8 flex justify-center items-center">
      <AppButtonRound class="text-2xl text-violet-300" @click="toggleLoop">
        <FontAwesomeIcon v-if="isLooping" icon="pause" />
        <FontAwesomeIcon v-else icon="play" />
      </AppButtonRound>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

import { useUniverse, useOnResize } from "~/composables";

export default defineComponent({
  setup() {
    // const canvasWrapper = ref<HTMLDivElement | null>(null);
    const {
      canvas,
      canvasWidth,
      canvasHeight,
      cellSize,
      toggleCell,
      toggleLoop,
      isLooping,
    } = useUniverse();

    useOnResize(() => {
      canvasWidth.value = canvas.value?.clientWidth ?? 1;
      canvasHeight.value = canvas.value?.clientHeight ?? 1;
    }, true);

    cellSize.value = 16;

    const isOpen = ref(false);

    return {
      // canvasWrapper,
      canvas,
      toggleCell,
      toggleLoop,
      isLooping,
      isOpen,
    };
  },
});
</script>
