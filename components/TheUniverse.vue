<template>
  <canvas
    ref="canvas"
    class="w-full h-full cursor-pointer"
    @touchstart.prevent="(presses = [true, false]), onPress($event.touches[0])"
    @mousedown.left="(presses = [true, false]), onPress($event)"
    @mousedown.right="(presses = [false, true]), onPress($event)"
    @touchmove.prevent="onPress($event.touches[0])"
    @mousemove="onPress($event)"
    @touchcancel.prevent="(presses = [false, false]), (prevPosition = null)"
    @touchend.prevent="(presses = [false, false]), (prevPosition = null)"
    @mouseout="(presses = [false, false]), (prevPosition = null)"
    @mouseup="(presses = [false, false]), (prevPosition = null)"
    @contextmenu.prevent
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@nuxtjs/composition-api";
import { templateRef, useEventListener } from "@vueuse/core";

import { getDevicePixels, getPositionInElement } from "~/utils";
import { useUniverseStore } from "~/store";

export default defineComponent({
  setup() {
    const universeStore = useUniverseStore();
    onMounted(() => universeStore.init());

    const canvasElement = templateRef<HTMLCanvasElement>("canvas");

    onMounted(async () => {
      const { Universe } = await import("~/wasm/universe/pkg");

      if (canvasElement.value) {
        const { clientWidth, clientHeight } = canvasElement.value;

        universeStore.universe = new Universe(
          canvasElement.value,
          getDevicePixels(clientWidth),
          getDevicePixels(clientHeight),
          getDevicePixels(universeStore.config.cellSize),
          "#fff"
        );
      }
    });

    useEventListener("resize", () => {
      const { clientWidth, clientHeight } = canvasElement.value;

      universeStore.universe?.setSize(
        getDevicePixels(clientWidth),
        getDevicePixels(clientHeight)
      );
    });

    const presses = ref([false, false]);

    const changeCellAt = (x: number, y: number) => {
      x = getDevicePixels(x);
      y = getDevicePixels(y);

      if (presses.value[0])
        universeStore.areToolsSwitched
          ? universeStore.universe?.killCellAt(x, y)
          : universeStore.universe?.reviveCellAt(x, y);
      if (presses.value[1])
        universeStore.areToolsSwitched
          ? universeStore.universe?.reviveCellAt(x, y)
          : universeStore.universe?.killCellAt(x, y);
    };

    const prevPosition = ref<[number, number] | null>(null);

    const onPress = ({ clientX, clientY }: MouseEvent | Touch) => {
      const [x, y] = getPositionInElement(canvasElement.value, [
        clientX,
        clientY,
      ]);

      if (prevPosition.value) {
        const [prevX, prevY] = prevPosition.value;

        const vecX = x - prevX;
        const vecY = y - prevY;
        const vecLength = Math.sqrt(vecX ** 2 + vecY ** 2);
        const points = vecLength / universeStore.config.cellSize;

        for (let i = 1; i < points; i++) {
          const pointX = prevX + Math.floor(vecX * (i / points));
          const pointY = prevY + Math.floor(vecY * (i / points));

          changeCellAt(pointX, pointY);
        }
      }

      changeCellAt(x, y);

      prevPosition.value = [x, y];
    };

    return {
      presses,
      prevPosition,
      onPress,
    };
  },
});
</script>
