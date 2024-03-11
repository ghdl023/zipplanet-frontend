export function getAssetUrl(filePath) {
  return new URL(`/src/assets/${filePath}`, import.meta.url).href;
}


// 평수 -> 면적
export function pyungToArea(pyungCount) {
  if(pyungCount) return Math.floor(pyungCount * 3.3058);
  else return '';
}