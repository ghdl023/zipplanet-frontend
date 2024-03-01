// import request from './core';
import { defaultInstance } from '../core';

export const getHome = async () => {
  try {
    const { data } = await defaultInstance.get('home');
    return data;
  } catch (e) {
    console.log(e);
  }
};

// export const getHome = () => {
//   return request({ url: 'home' });
// };

// //get요청

// export const getUserInfo = (userID) => {
//   return request({ url: `gerUserInfo/${userID}` });
// };

// //post요청
// export const saveUserInfo = () => {
//   request({
//     method: 'POST',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone',
//     },
//   });
// };
