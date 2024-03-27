import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const TIMEOUT = 2500;

// 인증이 필요없는 API인 경우 사용 (ex 로그인)
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  // instance.defaults.timeout = TIMEOUT;
  instance.interceptors.request.use(onFulfilledRequest, onRejectedRequest);
  instance.interceptors.response.use(onFulfilledResponse, onRejectedResponse);
  instance.defaults.withCredentials = true;
  return instance;
};

// 인증이 필요한 API인 경우 사용 (ex 로그인 후 사용되는 api -> 마이페이지 조회..)
const axiosAuthApi = (url, options) => {
  const token = window.sessionStorage.getItem('userInformation');
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: 'Bearer ' + token },
    ...options,
  });
  // instance.defaults.timeout = TIMEOUT;
  instance.interceptors.request.use(onFulfilledRequest, onRejectedRequest);
  instance.interceptors.response.use(onFulfilledResponse, onRejectedResponse);
  instance.defaults.withCredentials = true;
  return instance;
};

const onFulfilledRequest = (response) => {
  // HTTP status가 2XX일 때 처리하고 싶은 로직이 있다면 여기에서 처리함
  // 데이터 받기에 성공했으므로 받은 response를 그대로 return 해준다.
  // 물론 따로 가공해도 됩니다.
  return response;
};
const onRejectedRequest = (error) => {
  // HTTP status가 2XX이 아닐 때 여기를 통과하게 됨
  // return은 항상 Promise.reject(error)로 해야함
  return Promise.reject(error);
};

const onFulfilledResponse = (response) => {
  // HTTP status가 2XX일 때 처리하고 싶은 로직이 있다면 여기에서 처리함
  // 데이터 받기에 성공했으므로 받은 response를 그대로 return 해준다.
  // 물론 따로 가공해도 됩니다.
  return response;
};
const onRejectedResponse = (error) => {
  // HTTP status가 2XX이 아닐 때 여기를 통과하게 됨
  // return은 항상 Promise.reject(error)로 해야함
  return Promise.reject(error);
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
