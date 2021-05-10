export type ClientCoordinates = {
  clientX: number;
  clientY: number;
};

export type RelativeCoordinates = {
  relativeX: number;
  relativeY: number;
};

/**
 * Calculates the coordinates relative to the specified `element`.
 */
export const getRelativeCoordinates = (
  element: Element,
  { clientX, clientY }: ClientCoordinates
) => {
  const boundingClientRect = element.getBoundingClientRect();

  const relativeX =
    (clientX - boundingClientRect.left) *
    (boundingClientRect.width / element.clientWidth);
  const relativeY =
    (clientY - boundingClientRect.top) *
    (boundingClientRect.height / element.clientHeight);

  return {
    relativeX,
    relativeY,
  };
};
