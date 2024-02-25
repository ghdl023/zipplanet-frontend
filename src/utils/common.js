export function getAssetUrl(filePath) {
  console.log(filePath);
  console.log(import.meta.url);
  console.log(new URL(`/src/assets/${filePath}`, import.meta.url).href);
  return new URL(`/src/assets/${filePath}`, import.meta.url).href;
}
