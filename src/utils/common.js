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

export function isValidDate(dateString) {
  // yyyy-mm-dd 형식의 정규표현식
  var pattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!pattern.test(dateString)) {
    return false;
  }

  var date = new Date(dateString);
  if (date == 'Invalid Date') {
    return false;
  }
  var month = date.getMonth() + 1;
  var day = date.getDate();

  // 월과 일이 유효한 범위인지 확인
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  return true;
}
