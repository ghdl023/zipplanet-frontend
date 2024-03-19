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
  const maxLen = 38;
  return `https://ghdl023.github.io${import.meta.env.VITE_BASE_URL}images/thumbnail/${Math.floor(Math.random() * maxLen)}.jpg`;
};

const images = [
  'https://d2v80xjmx68n4w.cloudfront.net/gigs/fQod41663730361.jpg',
  'https://previews.123rf.com/images/zhudifeng/zhudifeng1507/zhudifeng150700144/41952353-%EA%B3%A0%EA%B8%89-%EC%8B%9D%EC%82%AC-%EC%8B%A4%EB%82%B4-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg',
  'https://dalldesign.com/wp-content/uploads/2019/09/%EC%8B%A4%EB%82%B4%ED%88%AC%EC%8B%9C%EB%8F%84-33.jpg',
  'https://images.homify.com/v1468337281/p/photo/image/1580766/iStock_000020192462_Large.jpg',
  'https://d2v80xjmx68n4w.cloudfront.net/gigs/iXpAe1662169042.jpg',
  'https://png.pngtree.com/background/20231009/original/pngtree-stunning-3d-illustration-of-a-contemporary-room-interior-picture-image_5403631.jpg',
  'https://images.homify.com/v1438921776/p/photo/image/419343/______7_.jpg',
  'https://dalldesign.com/wp-content/uploads/2019/09/%EC%8B%A4%EB%82%B4%ED%88%AC%EC%8B%9C%EB%8F%84-78.jpg',
  'https://previews.123rf.com/images/zhudifeng/zhudifeng1507/zhudifeng150700161/41952370-%EA%B3%A0%EA%B8%89-%EC%8B%9D%EC%82%AC-%EC%8B%A4%EB%82%B4-%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4.jpg',
  'https://mblogthumb-phinf.pstatic.net/MjAxNzA4MTFfMjQy/MDAxNTAyNDM0MDU2NzI4.9J4a-x1_u8XvSLoRKfY4EF_gsEV3nSmyI_MYymK_1-8g.gxeZCROsFovlhg8aHnAym79hLI7LWWtntnuU2YIV07Qg.JPEG.itbank21c/1.jpg?type=w800',
  'https://mblogthumb-phinf.pstatic.net/MjAxNzA5MjRfMjk1/MDAxNTA2MjM5MTU5MTQ5.5bhRz6q9R7HTIM89dtHApMhMDzBrdbj5AL497SpDWiUg.bxToglnAvN8FGqzMEdws2KjEKcPqHvGL0ZZqP6yTOd8g.JPEG.uidesignmage/%EC%A2%81%EC%9D%80_%EA%B3%B5%EA%B0%84%EC%9D%84_%ED%99%9C%EC%9A%A9%ED%95%9C_%EC%8B%A4%EB%82%B4_%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4_%EB%94%94%EC%9E%90%EC%9D%B8_%2824%29.jpg?type=w800',
  'https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/161829716193728422.jpg?w=720',
  'https://image.guud.com/mall/DP/display/detail/D3323B39EE0F45E4B04B354C493546BA.jpg',
  'https://m.jungle.co.kr/image/5290a6c740b0ad9aff26a084',
  'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=https://t1.daumcdn.net/brunch/service/user/fWKx/image/SXollLB_wUFPFAtITJXhrYT2WR0.jpeg',
  'https://www.decojournal.co.kr/images/contents/33727028259f291b690dfe.jpg',
  'https://cf.zipdoc.co.kr/static/item/197955/20230130120640369_0nXHLZmTAy.jpg',
  'https://i.pinimg.com/736x/71/34/14/71341415b75fd4f65ed126bb9776fa0a.jpg',
  'https://cdn.ksilbo.co.kr/news/photo/202108/911289_509285_3458.jpg',
  'https://www.fnnews.com/resource/media/image/2015/11/01/201511011711319614_l.jpg',
  'https://post-phinf.pstatic.net/MjAyMTAxMjZfNzAg/MDAxNjExNjQxMjgxNDg0.OG2UCrSWPLjEeCiFM-VsIITlZAV26pF8tVWJXoTcDC4g.vo37IGK59QR4ze_EsxJjHflUTOS_8aiexKYEbIRzrbcg.JPEG/1.jpg?type=w800_q75',
  'https://contents-cdn.viewus.co.kr/image/2023/05/CP-2023-0023/image-79a23d33-b4d8-4253-90f9-fe5ee7e5a757.jpeg',
  'https://mstatic1.e-himart.co.kr/contents/content/upload/style/20191029/238657/thumbnail_750_propse_tagging_2777.jpg',
  'https://www.cbiz.kr/news/photo/201505/1968_1621_2435.jpg',
  'https://images.chosun.com/resizer/sbbyU6jvmyv_i28OtIajkjMu6oU=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/NVGQZWFFYVHQZBH7PRVY3RZWZ4.jpg',
  'https://wimg.mk.co.kr/meet/neds/2016/05/image_readtop_2016_342215_14630376072468515.jpg',
  'https://contents-cdn.viewus.co.kr/image/2023/05/CP-2023-0023/image-0b7a32f8-c868-4391-bed8-93fc8a60a06a.jpeg',
  'https://www.homed.co.kr/images/homed_story/33/hs33_main1.png',
  'https://www.lotteresort.com/static/upload/images/20220221/001d1b56-4a4b-48fd-bb40-39b292225274.jpg',
  'https://thumb.photo-ac.com/64/64c7ded452e2160d983a6794f4d35dba_t.jpeg',
  'https://www.homed.co.kr/images/homed_story/19/1-%EC%9B%8C%EB%9D%BC%EB%B0%B8-%ED%99%88%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81.jpg',
];
