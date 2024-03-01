import axios from 'axios';

const BASE_URL = 'http://localhost:8080';
const TIMEOUT = 2500;

// 인증이 필요없는 API인 경우 사용 (ex 로그인)
const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  instance.defaults.timeout = TIMEOUT;
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
  instance.defaults.timeout = TIMEOUT;
  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);

/*
const request = axios.create({
  baseURL: 'http://localhost:8080',
});
//요청 타임아웃 설정
request.defaults.timeout = 2500;

//요청 인터셉터 추가
request.interceptors.request.use(
  (config) => {
    //요청을 보내기 전에 수행할 로직
    return config;
  },
  (error) => {
    //요청 에러가 발생했을 때 수행할 로직
    console.log(error); //디버깅
    return Promise.reject(error);
  },
);

//응답 인터셉터 추가
request.interceptors.response.use(
  (response) => {
    //응답에 대한 로직 작성
    const res = response.data;
    return res;
  },

  (error) => {
    //응답 에러가 발생했을 때 수행할 로직
    console.log(error); //디버깅
    return Promise.reject(error);
  },
);

export default request; //axios 인스턴스를 내보낸다.
*/
