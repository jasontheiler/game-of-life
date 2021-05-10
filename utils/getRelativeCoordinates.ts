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
    (element.clientWidth / boundingClientRect.width);
  const relativeY =
    (clientY - boundingClientRect.top) *
    (element.clientHeight / boundingClientRect.height);

  return {
    relativeX,
    relativeY,
  };
};
