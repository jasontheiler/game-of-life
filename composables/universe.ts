import { onMounted, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = () => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(0);
  const canvasHeight = ref(0);
  const cellSize = ref(0);
  const toggleCell = ref((_event: MouseEvent) => {});

  const toggleLoop = ref(() => {});
  const isLooping = ref(false);

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvas.value) {
      const universe = new Universe(
        canvas.value,
        canvasWidth.value,
        canvasHeight.value,
        cellSize.value,
        "#cccccc",
        "#000000"
      );

      watchEffect(() =>
        universe.setSize(canvasWidth.value, canvasHeight.value)
      );

      watchEffect(() => universe.setCellSize(cellSize.value));

      toggleCell.value = ({ offsetX, offsetY }) => {
        universe.toggleCellAt(offsetX, offsetY);
      };

      let animationId: number | null = null;

      toggleLoop.value = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
          isLooping.value = false;
        } else {
          const render = () => {
            universe.tick();
            animationId = requestAnimationFrame(render);
          };

          isLooping.value = true;
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
    toggleCell,
    toggleLoop,
    isLooping,
  };
};
