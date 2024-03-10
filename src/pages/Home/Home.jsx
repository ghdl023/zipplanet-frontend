import Main from '@components/Main';
import Sidebar from '@components/Sidebar';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import './Home.scss';

function Home() {
  const setUserInfo = useSetRecoilState(userInfoState);
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
