import { defaultInstance } from '../core';

/**
 * 로그인
 * @param {*} params
 * @returns
 */
export const login = async (params) => {
  try {
    const { data } = await defaultInstance.post('api/user/login', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 회원가입
 * @param {*} params
 * @returns
 */
export const signUp = async (params) => {
  try {
    const { data } = await defaultInstance.post('api/user/signup', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 아이디 찾기
 * @param {*} params
 * @returns
 */
export const findId = async (params) => {
  try {
    const { data } = await defaultInstance.post('api/user/findId', params);
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 비밀번호 찾기
 * @param {*} parmas
 * @returns
 */
export const findPwd = async (parmas) => {
  try {
    const { data } = await defaultInstance.post('api/user/findPwd', parmas);
    return data;
  } catch (e) {
    console.log(e);
  }
};
