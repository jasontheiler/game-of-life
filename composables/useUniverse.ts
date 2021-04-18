import { onMounted, Ref, ref, watchEffect } from "@nuxtjs/composition-api";

export const useUniverse = (
  width: Ref<number> | number,
  height: Ref<number> | number
) => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  const widthRef = ref(width);
  const heightRef = ref(height);

  onMounted(async () => {
    const { Universe } = await import("~/wasm/universe/pkg");

    if (canvas.value) {
      const universe = new Universe(
        canvas.value,
        widthRef.value,
        heightRef.value
      );

      watchEffect(() => universe.setSize(widthRef.value, heightRef.value));
    }
  });

  return {
    canvas,
    width: widthRef,
    height: heightRef,
  };
};
