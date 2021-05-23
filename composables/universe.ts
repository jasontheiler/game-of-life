import { onMounted, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = () => {
  const canvasElement = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(0);
  const canvasHeight = ref(0);
  const cellSize = ref(16);
  const killAllCells = ref(() => {});
  const reviveCellAt = ref((_x: number, _y: number) => {});
  const killCellAt = ref((_x: number, _y: number) => {});
  const tick = ref(() => {});

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvasElement.value) {
      const universe = new Universe(
        canvasElement.value,
        canvasWidth.value,
        canvasHeight.value,
        cellSize.value,
        "#0F172A",
        "#FFFFFF"
      );

      watchEffect(() =>
        universe.setSize(canvasWidth.value, canvasHeight.value)
      );

      watchEffect(() => universe.setCellSize(cellSize.value));

      killAllCells.value = () => universe.killAllCells();
      reviveCellAt.value = (x, y) => universe.reviveCellAt(x, y);
      killCellAt.value = (x, y) => universe.killCellAt(x, y);
      tick.value = () => universe.tick();
    }
  });

  const isPlaying = ref(false);
  let frameId: number | null = null;

  const play = () => {
    if (!frameId) {
      const render = () => {
        tick.value();
        frameId = requestAnimationFrame(render);
      };

      isPlaying.value = true;
      frameId = requestAnimationFrame(render);
    }
  };

  const pause = () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
      isPlaying.value = false;
      frameId = null;
    }
  };

  return {
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
  };
};
