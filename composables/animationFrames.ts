import { ref } from "@nuxtjs/composition-api";

const useAnimationFrames = (onAnimationFrame: () => void) => {
  const isPlaying = ref(false);
  let frameId: number | null = null;

  const play = () => {
    if (!frameId) {
      const render = () => {
        onAnimationFrame();
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
    isPlaying,
  };
};
