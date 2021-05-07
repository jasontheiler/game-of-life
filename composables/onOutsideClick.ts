import {
  onBeforeUnmount,
  onMounted,
  Ref,
  watchEffect,
} from "@vue/composition-api";

/**
 * Listens to click events outside of the specified element.
 */
export const useOnOutsideClick = (
  element: Ref<Element | null>,
  onOutsideClick: (event: MouseEvent | TouchEvent) => void
) => {
  const onClick = (event: MouseEvent | TouchEvent) => {
    if (!element.value?.contains(event.target as Node)) onOutsideClick(event);
  };

  onMounted(() =>
    watchEffect(() =>
      element.value
        ? document.addEventListener("click", onClick)
        : document.removeEventListener("click", onClick)
    )
  );

  onBeforeUnmount(() => document.removeEventListener("click", onClick));
};
