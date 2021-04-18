import { onBeforeUnmount, onMounted } from "@nuxtjs/composition-api";

type Config = {
  onMounted?: boolean;
  onBeforeDestroy?: boolean;
};

export const useOnResize = (callback: () => void, config?: Config) => {
  onMounted(() => {
    if (config?.onMounted) callback();
    window.addEventListener("resize", callback);
  });

  onBeforeUnmount(() => {
    if (config?.onBeforeDestroy) callback();
    window.removeEventListener("resize", callback);
  });
};
