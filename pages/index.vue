<template>
  <div class="w-full h-screen">
    <main
      :class="{ '-translate-y-1/3 scale-50': isOpen }"
      class="w-full h-4/5 p-4 sm:p-6 lg:p-8 rounded-b-3xl bg-white bg-opacity-50 shadow-2xl transform-gpu transition-transform duration-500"
    >
      <div ref="canvasWrapper" class="w-full h-full">
        <canvas ref="canvas" @click="toggleCell" />
      </div>
    </main>

    <aside class="flex justify-center items-center">
      <button class="m-8" @click="toggleLoop">
        {{ isLooping ? "Pause" : "Play" }}
      </button>
      <button class="m-8" @click="isOpen = !isOpen">
        {{ isOpen ? "Close" : "Open" }}
      </button>
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
      toggleLoop,
      isLooping,
    } = useUniverse();

    useOnResize(() => {
      canvasWidth.value = canvasWrapper.value?.clientWidth ?? 1;
      canvasHeight.value = canvasWrapper.value?.clientHeight ?? 1;
    }, true);

    cellSize.value = 16;

    const isOpen = ref(false);

    return {
      canvasWrapper,
      canvas,
      toggleCell,
      toggleLoop,
      isLooping,
      isOpen,
    };
  },
});
</script>
