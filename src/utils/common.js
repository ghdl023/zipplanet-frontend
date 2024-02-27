export function getAssetUrl(filePath) {
  return new URL(`/src/assets/${filePath}`, import.meta.url).href;
}
