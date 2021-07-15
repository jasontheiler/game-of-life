/**
 * Debounces the specified `callback`. `duration` defaults to 500ms.
 */
export const debounce = (
  callback: (...args: any[]) => void,
  duration = 500
) => {
  let timeout: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(null, args), duration);
  };
};
