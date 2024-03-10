import { atom } from 'recoil';

export const userInfoState = atom({
  key: 'userInfo',
  default: {
    userId: '',
    username: '',
    nickname: '',
    address: '',
    phone: '',
    roleName: '',
  },
});
