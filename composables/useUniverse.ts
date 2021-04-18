import { onMounted, Ref, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = (
  canvasWidth: Ref<number> | number = 1,
  canvasHeight: Ref<number> | number = 1
) => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const canvasWidthRef = ref(canvasWidth);
  const canvasHeightRef = ref(canvasHeight);

  const toggleLoop = ref(() => {});
  const isLooping = ref(false);
  const animationId = ref<number | null>(null);

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvas.value) {
      const universe = new Universe(
        canvas.value,
        canvasWidthRef.value,
        canvasHeightRef.value
      );

      watchEffect(() =>
        universe.setSize(canvasWidthRef.value, canvasHeightRef.value)
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
    canvasWidth: canvasWidthRef,
    canvasHeight: canvasHeightRef,
    toggleLoop,
    isLooping,
  };
};
