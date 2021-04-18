import { onMounted, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = () => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const canvasWidth = ref(1);
  const canvasHeight = ref(1);
  const cellSize = ref(1);

  const toggleLoop = ref(() => {});
  const isLooping = ref(false);
  const animationId = ref<number | null>(null);

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvas.value) {
      const universe = new Universe(
        canvas.value,
        canvasWidth.value,
        canvasHeight.value,
        cellSize.value
      );

      watchEffect(() =>
        universe.setSize(canvasWidth.value, canvasHeight.value)
      );

      toggleLoop.value = () => {
        if (animationId.value) {
          cancelAnimationFrame(animationId.value);
          isLooping.value = false;
          animationId.value = null;
        } else {
          const render = () => {
            universe.tick();
            animationId.value = requestAnimationFrame(render);
          };

          isLooping.value = true;
          animationId.value = requestAnimationFrame(render);
        }
      };
    }
  });

  return {
    canvas,
    canvasWidth,
    canvasHeight,
    cellSize,
    toggleLoop,
    isLooping,
  };
};
