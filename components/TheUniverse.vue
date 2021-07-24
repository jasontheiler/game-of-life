<template>
  <div ref="canvasWrapperElement" class="w-full h-full">
    <canvas
      ref="canvasElement"
      class="cursor-pointer"
      @touchstart.prevent="(isPrimaryActive = true), onTool($event.touches[0])"
      @mousedown.left="
        (isPrimaryActive = true), (isSecondaryActive = false), onTool($event)
      "
      @mousedown.right="
        (isSecondaryActive = true), (isPrimaryActive = false), onTool($event)
      "
      @touchmove.prevent="isPrimaryActive && onTool($event.touches[0])"
      @mousemove="(isPrimaryActive || isSecondaryActive) && onTool($event)"
      @touchcancel.prevent="(prevCoordinates = null), (isPrimaryActive = false)"
      @touchend.prevent="(prevCoordinates = null), (isPrimaryActive = false)"
      @mouseout="
        (prevCoordinates = null),
          (isPrimaryActive = false),
          (isSecondaryActive = false)
      "
      @mouseup.left="(prevCoordinates = null), (isPrimaryActive = false)"
      @mouseup.right="(prevCoordinates = null), (isSecondaryActive = false)"
      @contextmenu.prevent
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@nuxtjs/composition-api";

import { ClientCoordinates, getRelativeCoordinates } from "~/utils";
import { useUniverseStore } from "~/store";
import { useOnResize } from "~/composables";
import { theme } from "~/tailwind.config";

export default defineComponent({
  setup() {
    const universeStore = useUniverseStore();

    const canvasWrapperElement = ref<HTMLDivElement>();
    const canvasElement = ref<HTMLCanvasElement>();

    onMounted(async () => {
      universeStore.init();

      const { Universe } = await import("~/wasm/universe/pkg");

      if (canvasWrapperElement.value && canvasElement.value) {
        universeStore.universe = new Universe(
          canvasElement.value,
          canvasWrapperElement.value.clientWidth,
          canvasWrapperElement.value.clientHeight,
          universeStore.config.cellSize,
          theme.colors.white
        );
      }
    });

    useOnResize(() => {
      if (canvasWrapperElement.value)
        universeStore.universe?.setSize(
          canvasWrapperElement.value.clientWidth,
          canvasWrapperElement.value.clientHeight
        );
    });

    const prevCoordinates = ref<{ prevX: number; prevY: number } | null>(null);
    const isPrimaryActive = ref(false);
    const isSecondaryActive = ref(false);
    const runToolAt = (x: number, y: number) => {
      if (isPrimaryActive.value)
        universeStore.areToolsSwitched
          ? universeStore.universe?.killCellAt(x, y)
          : universeStore.universe?.reviveCellAt(x, y);
      if (isSecondaryActive.value)
        universeStore.areToolsSwitched
          ? universeStore.universe?.reviveCellAt(x, y)
          : universeStore.universe?.killCellAt(x, y);
    };
    const onTool = (clientCoordinates: ClientCoordinates) => {
      if (canvasElement.value) {
        const { relativeX, relativeY } = getRelativeCoordinates(
          canvasElement.value,
          clientCoordinates
        );

        if (prevCoordinates.value) {
          const { prevX, prevY } = prevCoordinates.value;
          const vecX = relativeX - prevX;
          const vecY = relativeY - prevY;
          const vecLength = Math.sqrt(vecX ** 2 + vecY ** 2);
          const maxPoints = vecLength / universeStore.config.cellSize;

          for (let i = 1; i < maxPoints; i++) {
            const pointX = prevX + Math.floor(vecX * (i / maxPoints));
            const pointY = prevY + Math.floor(vecY * (i / maxPoints));

            runToolAt(pointX, pointY);
          }
        }

        prevCoordinates.value = { prevX: relativeX, prevY: relativeY };

        runToolAt(relativeX, relativeY);
      }
    };

    return {
      canvasWrapperElement,
      canvasElement,
      prevCoordinates,
      isPrimaryActive,
      isSecondaryActive,
      onTool,
    };
  },
});
</script>
