<template>
  <div class="relative w-full h-screen flex flex-col-reverse overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="absolute inset-x-2 top-0 bottom-[7.5rem] flex flex-col rounded-b-2xl border border-t-0 border-white border-opacity-20 bg-white bg-opacity-20 backdrop-filter backdrop-blur-md shadow-2xl transform-gpu transition-transform duration-500"
    >
      <section class="w-full h-full px-4 pt-4 overflow-hidden">
        <div ref="canvasWrapperElement" class="w-full h-full">
          <canvas
            ref="canvasElement"
            class="cursor-pointer"
            @touchstart.prevent="
              (isPrimary = true), onPrimary($event.touches[0])
            "
            @touchmove.prevent="onPrimary($event.touches[0])"
            @touchcancel.prevent="isPrimary = false"
            @touchend.prevent="isPrimary = false"
            @mousedown.left="
              (isPrimary = true), (isSecondary = false), onPrimary($event)
            "
            @mousedown.right="
              (isSecondary = true), (isPrimary = false), onSecondary($event)
            "
            @mousemove="onPrimary($event), onSecondary($event)"
            @mouseout="(isPrimary = false), (isSecondary = false)"
            @mouseup.left="isPrimary = false"
            @mouseup.right="isSecondary = false"
            @contextmenu.prevent
          />
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
        <AppIconButton
          icon="undo-alt"
          @click="
            pause();
            killAllCells();
          "
        />

        <AppIconButton
          :icon="isPlaying ? 'pause' : 'play'"
          size="lg"
          @click="isPlaying ? pause() : play()"
        />

        <TheAssignmentSwitch v-model="isSwitched" />
      </section>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

import { ClientCoordinates, getRelativeCoordinates } from "~/utils";
import { useOnResize, useUniverse } from "~/composables";

export default defineComponent({
  setup() {
    const isOpen = ref(false);

    const canvasWrapperElement = ref<HTMLDivElement | null>(null);
    const {
      canvasElement,
      canvasWidth,
      canvasHeight,
      cellSize,
      killAllCells,
      reviveCellAt,
      killCellAt,
      isPlaying,
      play,
      pause,
    } = useUniverse();

    useOnResize(() => {
      if (canvasWrapperElement.value) {
        canvasWidth.value = canvasWrapperElement.value?.clientWidth;
        canvasHeight.value = canvasWrapperElement.value?.clientHeight;
      }
    }, true);

    cellSize.value = 16;

    const isPrimary = ref(false);
    const isSecondary = ref(false);
    const isSwitched = ref(false);
    const onPrimary = (clientCoordinates: ClientCoordinates) => {
      if (isPrimary.value && canvasElement.value) {
        const { relativeX, relativeY } = getRelativeCoordinates(
          canvasElement.value,
          clientCoordinates
        );

        isSwitched.value
          ? killCellAt.value(relativeX, relativeY)
          : reviveCellAt.value(relativeX, relativeY);
      }
    };
    const onSecondary = (clientCoordinates: ClientCoordinates) => {
      if (isSecondary.value && canvasElement.value) {
        const { relativeX, relativeY } = getRelativeCoordinates(
          canvasElement.value,
          clientCoordinates
        );

        isSwitched.value
          ? reviveCellAt.value(relativeX, relativeY)
          : killCellAt.value(relativeX, relativeY);
      }
    };

    return {
      isOpen,
      canvasWrapperElement,
      canvasElement,
      killAllCells,
      isPlaying,
      play,
      pause,
      isPrimary,
      isSecondary,
      isSwitched,
      onPrimary,
      onSecondary,
    };
  },
});
</script>
