<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <main ref="canvasWrapper" class="w-full h-3/4">
      <canvas ref="canvas" @click="toggleCell" />
    </main>

    <aside>
      <button class="m-8" @click="toggleLoop">
        {{ isLooping ? "Pause" : "Play" }}
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

    return {
      canvasWrapper,
      canvas,
      toggleCell,
      toggleLoop,
      isLooping,
    };
  },
});
</script>
