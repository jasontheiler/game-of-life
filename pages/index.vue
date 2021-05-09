<template>
  <div class="relative w-full h-screen flex flex-col-reverse overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="absolute inset-x-2 top-0 bottom-[7.5rem] flex flex-col rounded-b-2xl border border-t-0 border-white border-opacity-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md shadow-2xl transform-gpu transition-transform duration-500"
    >
      <section class="w-full h-full px-4 pt-4 overflow-hidden">
        <div ref="canvasWrapperElement" class="w-full h-full">
          <canvas ref="canvasElement" class="cursor-pointer" />
        </div>
      </section>

      <button
        class="w-full h-12 rounded-2xl text-center text-xl text-black text-opacity-20 hover:text-opacity-30 focus-visible:outline-none focus-visible:ring focus-visible:ring-teal-100 transition-shadow duration-100"
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
        <AppIconButton icon="undo-alt" @click="reset" />

        <AppIconButton
          :icon="isPlaying ? 'pause' : 'play'"
          size="lg"
          @click="togglePlay"
        />

        <AppIconSelect
          v-model="interactionMethodOption"
          :options="interactionMethodOptions"
          direction="up"
        />
      </section>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@nuxtjs/composition-api";

import {
  UniverseInteractionMethod,
  useUniverse,
  useOnResize,
} from "~/composables";

export default defineComponent({
  setup() {
    const canvasWrapperElement = ref<HTMLDivElement | null>(null);
    const {
      canvasElement,
      canvasWidth,
      canvasHeight,
      cellSize,
      reset,
      togglePlay,
      isPlaying,
      interactionMethod,
    } = useUniverse();

    useOnResize(() => {
      if (canvasWrapperElement.value) {
        canvasWidth.value = canvasWrapperElement.value?.clientWidth;
        canvasHeight.value = canvasWrapperElement.value?.clientHeight;
      }
    }, true);

    cellSize.value = 16;

    const interactionMethodOptions = [
      { icon: "pen-square", value: "toggle" },
      { icon: "paint-brush", value: "draw" },
      { icon: "eraser", value: "erase" },
    ];
    const interactionMethodOption = ref(interactionMethodOptions[0]);

    watchEffect(
      () =>
        (interactionMethod.value = interactionMethodOption.value
          .value as UniverseInteractionMethod)
    );

    const isOpen = ref(false);

    return {
      canvasWrapperElement,
      canvasElement,
      reset,
      togglePlay,
      isPlaying,
      interactionMethodOptions,
      interactionMethodOption,
      isOpen,
    };
  },
});
</script>
