/**
 * Calculates the position relative to the specified `element`.
 */
export const getPositionInElement = (
  element: Element,
  [x, y]: [number, number]
) => {
  const boundingClientRect = element.getBoundingClientRect();

  const elementX =
    (x - boundingClientRect.left) *
    (element.clientWidth / boundingClientRect.width);
  const elementY =
    (y - boundingClientRect.top) *
    (element.clientHeight / boundingClientRect.height);

  return [elementX, elementY];
};
