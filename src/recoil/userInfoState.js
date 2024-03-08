import { atom } from 'recoil';

export const userInfoAtom =  atom({
    key: "userInfo",
    default: {
        userId: '',
        username: '',
        nickname: '',
        address: '',
        phone: '',
        roleName: '',
    }
});