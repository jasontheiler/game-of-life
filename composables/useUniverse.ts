import { onMounted, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = () => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(1);
  const canvasHeight = ref(1);
  const cellSize = ref(1);
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
        cellSize.value
      );

      universe.drawGrid("#cccccc");
      universe.drawCells("#000000");

      watchEffect(() => {
        universe.setSize(canvasWidth.value, canvasHeight.value);
        universe.drawGrid("#cccccc");
        universe.drawCells("#000000");
      });

      watchEffect(() => {
        universe.setCellSize(cellSize.value);
        universe.drawGrid("#cccccc");
        universe.drawCells("#000000");
      });

      toggleCell.value = ({ offsetX, offsetY }: MouseEvent) => {
        universe.toggleCellAt(offsetX, offsetY);
        universe.drawCells("#000000");
      };

      let animationId: number | null = null;

      toggleLoop.value = () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
          isLooping.value = false;
          animationId = null;
        } else {
          const render = () => {
            universe.tick();
            universe.drawCells("#000000");
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
