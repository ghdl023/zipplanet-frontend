import { defaultInstance } from '../core';

/**
 * 리뷰 목록 조회
 * @param {*} params
 * @returns
 */
export const search = async (params) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo);
    if (parsedUserInfo && parsedUserInfo.userInfo) {
      params.userId = parsedUserInfo.userInfo.userId;
    }
  }
  // console.log(params)

  try {
    const { data } = await defaultInstance.get('/api/review/search', {
      params,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 리뷰 생성
 * @param {*} params
 * @returns
 */
export const createReview = async (params) => {
  try {
    const { data } = await defaultInstance.post('/api/review/create', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 리뷰 수정
 * @param {*} params
 * @returns
 */
export const updateReview = async (params) => {
  try {
    const { data } = await defaultInstance.post('/api/review/update', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 리뷰 신고
 * @param {*} params
 * @returns
 */
export const reportReview = async (params) => {
  try {
    const { data } = await defaultInstance.post('/api/review/report', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 모든 리뷰 좌표(pos) 불러오기
 * @returns
 */
export const selectAllPos = async () => {
  try {
    const { data } = await defaultInstance.get('/api/review/selectAllPos');
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 리뷰 찜상태 업데이트
 * @param {*} params
 * @returns
 */
export const updateZzimYn = async (params) => {
  try {
    const { data } = await defaultInstance.post('/api/review/favorite', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 리뷰 상세 조회
 * @param {*} params
 * @returns
 */
export const getReviewDetail = async (params) => {
  try {
    const { data } = await defaultInstance.get('/api/review/detail', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 마이페이지 내 리뷰 조회
 * @param {*} params
 * @returns
 */
export const searchMyReveiw = async (params) => {
  try {
    const { data } = await defaultInstance.get(
      '/api/review/searchMyReview',
      params,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 마이페이지 찜 목록 조회
 * @param {*} params
 * @returns
 */
export const searchMyZzim = async (params) => {
  try {
    const { data } = await defaultInstance.get(
      '/api/review/searchMyZzim',
      params,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 리뷰 삭제
 * @param {*} params
 * @returns
 */
export const deleteReview = async (params) => {
  try {
    const { data } = await defaultInstance.post('/api/review/delete', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 신고 내역 조회
 * @param {*} params
 * @returns
 */
export const searchMyReport = async (params) => {
  try {
    const { data } = await defaultInstance.get(
      '/api/review/searchMyReport',
      params,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};
