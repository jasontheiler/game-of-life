<template>
  <div class="relative w-full h-screen flex flex-col-reverse overflow-hidden">
    <main
      :class="{ '-translate-y-1/3 scale-75': isOpen }"
      class="
        absolute
        inset-x-2
        top-0
        bottom-[7.5rem]
        z-50
        flex flex-col
        rounded-b-2xl
        border border-t-0 border-white border-opacity-10
        bg-blueGray-700 bg-opacity-50
        backdrop-filter backdrop-blur
        shadow-2xl
        transform-gpu
        transition-transform
        duration-500
      "
    >
      <section class="w-full h-full px-4 pt-4 overflow-hidden">
        <div ref="canvasWrapperElement" class="w-full h-full">
          <canvas
            ref="canvasElement"
            class="cursor-pointer"
            @touchstart.prevent="
              (isPrimaryActive = true), onTool($event.touches[0])
            "
            @mousedown.left="
              (isPrimaryActive = true),
                (isSecondaryActive = false),
                onTool($event)
            "
            @mousedown.right="
              (isSecondaryActive = true),
                (isPrimaryActive = false),
                onTool($event)
            "
            @touchmove.prevent="isPrimaryActive && onTool($event.touches[0])"
            @mousemove="
              (isPrimaryActive || isSecondaryActive) && onTool($event)
            "
            @touchcancel.prevent="
              (prevCoordinates = null), (isPrimaryActive = false)
            "
            @touchend.prevent="
              (prevCoordinates = null), (isPrimaryActive = false)
            "
            @mouseout="
              (prevCoordinates = null),
                (isPrimaryActive = false),
                (isSecondaryActive = false)
            "
            @mouseup.left="(prevCoordinates = null), (isPrimaryActive = false)"
            @mouseup.right="
              (prevCoordinates = null), (isSecondaryActive = false)
            "
            @contextmenu.prevent
          />
        </div>
      </section>

      <button
        class="
          w-full
          h-12
          rounded-2xl
          bg-white bg-opacity-0
          hover:bg-opacity-[0.025]
          text-center text-xl text-white text-opacity-50
          focus-visible:outline-none focus-visible:ring focus-visible:ring-white
          transition-shadow
          duration-100
        "
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
      <section class="w-full py-6">
        <AppSlider
          v-model="cellSize"
          :min="2"
          :max="24"
          :step="2"
          label="cell_size"
          unit="px"
          isLazy
        />
      </section>

      <section class="w-full py-6 flex justify-around items-center">
        <AppIconButton icon="undo-alt" @click="pause(), killAllCells()" />

        <AppIconButton
          :icon="isPlaying ? 'pause' : 'play'"
          size="lg"
          @click="isPlaying ? pause() : play()"
        />

        <TheToolSwitch v-model="areToolsSwitched" />
      </section>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@nuxtjs/composition-api";

import {
  ClientCoordinates,
  getRelativeCoordinates,
  RelativeCoordinates,
} from "~/utils";
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

    const areToolsSwitched = ref(false);

    const prevCoordinates = ref<RelativeCoordinates | null>(null);
    const isPrimaryActive = ref(false);
    const isSecondaryActive = ref(false);
    const onTool = (clientCoordinates: ClientCoordinates) => {
      if (canvasElement.value) {
        const { relativeX, relativeY } = getRelativeCoordinates(
          canvasElement.value,
          clientCoordinates
        );

        if (isPrimaryActive.value)
          areToolsSwitched.value
            ? killCellAt.value(relativeX, relativeY)
            : reviveCellAt.value(relativeX, relativeY);
        if (isSecondaryActive.value)
          areToolsSwitched.value
            ? reviveCellAt.value(relativeX, relativeY)
            : killCellAt.value(relativeX, relativeY);

        prevCoordinates.value = { relativeX, relativeY };
      }
    };

    return {
      isOpen,
      canvasWrapperElement,
      canvasElement,
      cellSize,
      killAllCells,
      isPlaying,
      play,
      pause,
      areToolsSwitched,
      prevCoordinates,
      isPrimaryActive,
      isSecondaryActive,
      onTool,
    };
  },
});
</script>
