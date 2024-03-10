import { atom } from 'recoil';

export const searchState = atom({
  key: 'searchState',
  default: {
    keyword: '', // 검색창 입력
    gu: '', // 필터설정하기 '구'
    dong: '', // 필터설정하기 '동'
    contractTypeId: '', // 필터설정하기 '거래유형'
    rate: 5, // 필터설정하기 '평점'
    sort: 'likeCount',
  },
});
