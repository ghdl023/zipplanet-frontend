import { useEffect } from 'react';
import Main from '@components/Main';
import Sidebar from '@components/Sidebar';
import { getHome } from '@api/user';

import './Home.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoAtom } from '../../recoil/userInfoState';

function Home() {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  // const { username } = useRecoilValue(userInfoAtom);

  setTimeout(() => {
    setUserInfo({
      userId: 10000,
      username: 'test',
      nickname: '종필이네신발가게',
      address: '서울시 강남구 논현동',
      phone: '01012345678',
      roleName: 'ROLE_USER',
    });
  }, 2000);

  return (
    <>
      <Main />
      <Sidebar />
    </>
  );
}

export default Home;
