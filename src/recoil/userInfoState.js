import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const KEY = 'userInfo';

const { persistAtom } = recoilPersist({
  key: KEY,
  storage: localStorage,
});

export const userInfoState = atom({
  key: KEY,
  default: {
    userId: '',
    username: '',
    nickname: '',
    address: '',
    phone: '',
    roleName: '',
  },
  effects_UNSTABLE: [persistAtom],
});
