/**
 * Debounces the specified `callback`. Timeout defaults to 500ms.
 */
export const debounce = (callback: (...args: any[]) => void, time = 500) => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(null, args), time);
  };
};
