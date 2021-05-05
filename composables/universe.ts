import { onMounted, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = () => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(0);
  const canvasHeight = ref(0);
  const cellSize = ref(0);
  const toggleCellAt = ref((_event: MouseEvent) => {});
  const reviveCellAt = ref((_event: MouseEvent) => {});
  const killCellAt = ref((_event: MouseEvent) => {});
  const killAllCells = ref(() => {});

  const togglePlay = ref(() => {});
  const isPlaying = ref(false);

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvas.value) {
      const universe = new Universe(
        canvas.value,
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

      toggleCellAt.value = ({ offsetX, offsetY }) => {
        universe.toggleCellAt(offsetX, offsetY);
      };

      reviveCellAt.value = ({ offsetX, offsetY }) => {
        universe.reviveCellAt(offsetX, offsetY);
      };

      killCellAt.value = ({ offsetX, offsetY }) => {
        universe.killCellAt(offsetX, offsetY);
      };

      killAllCells.value = () => universe.killAllCells();

      let animationId: number | null = null;

      togglePlay.value = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
          isPlaying.value = false;
        } else {
          const render = () => {
            universe.tick();
            animationId = requestAnimationFrame(render);
          };

          isPlaying.value = true;
          animationId = requestAnimationFrame(render);
        }
      };
    }
  });

  return {
    canvas,
    canvasWidth,
    canvasHeight,
    cellSize,
    toggleCellAt,
    reviveCellAt,
    killCellAt,
    killAllCells,
    togglePlay,
    isPlaying,
  };
};
