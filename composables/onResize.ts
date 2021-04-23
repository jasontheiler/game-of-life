import { onBeforeUnmount, onMounted } from "@nuxtjs/composition-api";

export const useOnResize = (onResize: () => void, fireOnMounted?: boolean) => {
  onMounted(() => {
    if (fireOnMounted) onResize();
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
  });
};
