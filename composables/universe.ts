import { onMounted, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = () => {
  const canvasElement = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(0);
  const canvasHeight = ref(0);
  const cellSize = ref(0);
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
        "#00000040",
        "#CBFAF0"
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
  let animationId: number | null = null;

  const play = () => {
    if (!animationId) {
      const render = () => {
        tick.value();
        animationId = requestAnimationFrame(render);
      };

      isPlaying.value = true;
      animationId = requestAnimationFrame(render);
    }
  };

  const pause = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
      isPlaying.value = false;
      animationId = null;
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
