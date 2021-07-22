import { onBeforeUnmount, onMounted } from "@nuxtjs/composition-api";

/**
 * Listens to resize events on the window.
 */
export const useOnResize = (onResize: () => void) => {
  onMounted(() => window.addEventListener("resize", onResize));
  onBeforeUnmount(() => window.removeEventListener("resize", onResize));
};
