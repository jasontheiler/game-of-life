<template>
  <div class="w-full h-screen flex flex-col overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="flex-1 w-full p-4 pb-0 flex flex-col rounded-b-2xl border border-t-0 border-white border-opacity-25 bg-white bg-opacity-25 filter blur-md shadow-2xl transform-gpu transition-transform duration-500"
    >
      <canvas ref="canvas" class="w-full h-full" @click="toggleCell" />

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

    <aside
      class="w-full max-w-screen-md mx-auto px-4 py-6 flex justify-around items-center"
    >
      <AppIconButton icon="undo-alt" @click="reset" />

      <AppIconButton
        :icon="isLooping ? 'pause' : 'play'"
        size="lg"
        @click="toggleLoop"
      />

      <AppIconButton icon="pen-square" />
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
      reset,
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
      reset,
      toggleLoop,
      isLooping,
      isOpen,
    };
  },
});
</script>
