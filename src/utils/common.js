export function getAssetUrl(filePath) {
  return new URL(`/src/assets/${filePath}`, import.meta.url).href;
}

// 평수 -> 면적
export function pyungToArea(pyungCount) {
  if (pyungCount) return Math.floor(pyungCount * 3.3058);
  else return '';
}

export const debounceFunction = (callback, delay) => {
  let timer;
  return (...args) => {
    // 실행한 함수(setTimeout())를 취소
    clearTimeout(timer);
    // delay가 지나면 callback 함수를 실행
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const getRandomThumbnailImage = () => {
  const maxLen = 12;
  return `https://ghdl023.github.io${import.meta.env.VITE_BASE_URL}images/thumbnail/${Math.floor(Math.random() * maxLen)}.jpg`;
};