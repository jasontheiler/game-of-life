<script setup lang="ts">
import { get, set, useEventListener } from "@vueuse/core";

import { getDevicePixels, getPositionInElement } from "~/utils";
import { useUniverseStore } from "~/store";
import initUniverse, { Universe } from "~/wasm/universe/pkg";

const universeStore = useUniverseStore();
onMounted(() => universeStore.init());

const canvasElement = ref<HTMLCanvasElement>();

onMounted(async () => {
  if (!canvasElement.value) return;

  await initUniverse();

  const { clientWidth, clientHeight } = canvasElement.value;

  universeStore.universe = new Universe(
    canvasElement.value,
    getDevicePixels(clientWidth),
    getDevicePixels(clientHeight),
    getDevicePixels(universeStore.config.cellSize),
    "#fff"
  );
});

useEventListener("resize", () => {
  if (!canvasElement.value) return;

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

  if (get(presses)[0])
    universeStore.areToolsSwitched
      ? universeStore.universe?.killCellAt(x, y)
      : universeStore.universe?.reviveCellAt(x, y);
  if (get(presses)[1])
    universeStore.areToolsSwitched
      ? universeStore.universe?.reviveCellAt(x, y)
      : universeStore.universe?.killCellAt(x, y);
};

const prevPosition = ref<[number, number] | null>(null);

const onPress = ({ clientX, clientY }: MouseEvent | Touch) => {
  if (!canvasElement.value) return;

  const [x, y] = getPositionInElement(canvasElement.value, [clientX, clientY]);

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

  set(prevPosition, [x, y]);
};
</script>

<template>
  <div class="flex-shrink-0 relative w-full h-full shadow overflow-hidden">
    <canvas
      ref="canvasElement"
      class="w-full h-full bg-darkGray cursor-pointer"
      @touchstart.prevent="
        (presses = [true, false]), onPress($event.touches[0])
      "
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

    <TheFramerateDisplay />
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0 0 32px #000;
}
</style>
