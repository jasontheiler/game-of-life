/**
 * Calculates the amount of device pixels for the specified amount of
 * `cssPixels`.
 */
export const getDevicePixels = (cssPixels: number) =>
  Math.floor(cssPixels * window.devicePixelRatio);
