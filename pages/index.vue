<template>
  <div class="w-full h-screen flex flex-col justify-center items-center">
    <main class="w-full h-1/2" ref="canvasWrapper">
      <canvas ref="canvas" />
    </main>

    <aside>
      <button class="m-4" @click="toggleLoop">
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
      toggleLoop,
      isLooping,
    } = useUniverse();

    useOnResize(
      () => {
        canvasWidth.value = canvasWrapper.value?.clientWidth ?? 1;
        canvasHeight.value = canvasWrapper.value?.clientHeight ?? 1;
      },
      { onMounted: true }
    );

    cellSize.value = 16;

    return {
      canvasWrapper,
      canvas,
      toggleLoop,
      isLooping,
    };
  },
});
</script>
