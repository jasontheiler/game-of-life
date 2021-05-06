<template>
  <div class="relative w-full h-screen flex flex-col-reverse overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="absolute inset-x-2 top-0 bottom-[7.5rem] flex flex-col rounded-b-2xl border border-t-0 border-white border-opacity-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md shadow-2xl transform-gpu transition-transform duration-500"
    >
      <section class="w-full h-full px-4 pt-4 overflow-hidden">
        <div ref="canvasWrapper" class="w-full h-full">
          <canvas ref="canvas" class="cursor-pointer" @click="onCanvasClick" />
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
      <section></section>

      <section class="w-full py-6 flex justify-around items-center">
        <AppIconButton icon="undo-alt" @click="killAllCells" />

        <AppIconButton
          :icon="isPlaying ? 'pause' : 'play'"
          size="lg"
          @click="togglePlay"
        />

        <AppIconSelect
          v-model="selectedCanvasInteraction"
          :options="canvasInteractionMethods"
          direction="up"
        />
      </section>
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
      toggleCellAt,
      reviveCellAt,
      killCellAt,
      killAllCells,
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

    const canvasInteractionMethods = [
      { value: "toggle", icon: "pen-square" },
      { value: "draw", icon: "paint-brush" },
      { value: "erase", icon: "eraser" },
    ];
    const selectedCanvasInteraction = ref(canvasInteractionMethods[0]);

    const onCanvasClick = (event: MouseEvent) => {
      switch (selectedCanvasInteraction.value.value) {
        case "erase":
          killCellAt.value(event);
          break;
        case "draw":
          reviveCellAt.value(event);
          break;
        case "toggle":
        default:
          toggleCellAt.value(event);
          break;
      }
    };

    const isOpen = ref(false);

    return {
      canvasWrapper,
      canvas,
      onCanvasClick,
      killAllCells,
      togglePlay,
      isPlaying,
      canvasInteractionMethods,
      selectedCanvasInteraction,
      isOpen,
    };
  },
});
</script>
