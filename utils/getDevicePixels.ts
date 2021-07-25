/**
 * Calculates the amount of device pixels for an amount of CSS pixels.
 */
export const getDevicePixels = (cssPixels: number) =>
  Math.floor(cssPixels * window.devicePixelRatio);
