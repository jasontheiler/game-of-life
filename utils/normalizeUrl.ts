/**
 * Normalizes the provided `url` by prepending `https://` if no other protocol
 * is specified and removing trailing `/`.
 */
export const normalizeUrl = (url: string) =>
  url.replace(/^(?!.+:\/\/)/, "https://").replace(/\/+$/, "");
