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
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "@nuxtjs/composition-api";

import { useUniverse } from "~/composables";

export default defineComponent({
  setup() {
    const canvasWrapper = ref<HTMLDivElement | null>(null);
    const {
      canvas,
      canvasWidth,
      canvasHeight,
      toggleLoop,
      isLooping,
    } = useUniverse();

    const onResize = () => {
      canvasWidth.value = canvasWrapper.value?.clientWidth ?? 1;
      canvasHeight.value = canvasWrapper.value?.clientHeight ?? 1;
    };

    onMounted(() => {
      window.addEventListener("resize", onResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", onResize);
    });

    return {
      canvasWrapper,
      canvas,
      toggleLoop,
      isLooping,
    };
  },
});
</script>
