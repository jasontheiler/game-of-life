import {
  onBeforeUnmount,
  onMounted,
  Ref,
  watchEffect,
} from "@vue/composition-api";

/**
 * Listens to click events outside of the specified elements.
 */
export const useOnOutsideClick = (
  element: Ref<Element | null>,
  onOutsideClick: (event: MouseEvent | TouchEvent) => void,
  ignoredElements: Ref<Element | null>[] = []
) => {
  const onClick = (event: MouseEvent | TouchEvent) => {
    if (
      [element, ...ignoredElements].every(
        (element) => !element.value?.contains(event.target as Node)
      )
    )
      onOutsideClick(event);
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
