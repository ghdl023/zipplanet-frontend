import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoImage from '@assets/images/logo/logo.png';
import { Layout } from 'antd';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userInfoAtom } from '../../recoil/userInfoState';
import { BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';
import './Header.scss';

const Header = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const { userId, username } = useRecoilValue(userInfoAtom);
  const refresh = useResetRecoilState(userInfoAtom);

  const navigate = useNavigate();
  const logoClick = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    navigate(BASE_URL);
  };

  const login = () => {
    setUserInfo({
      userId: 10000,
      username: 'test',
      nickname: '종필이네신발가게',
      address: '서울시 강남구 논현동',
      phone: '01012345678',
      roleName: 'ROLE_USER',
    });
  };

  const logout = () => {
    refresh();
  };

  return (
    <Layout.Header>
      <div className="logo">
        <img src={LogoImage} alt="logo" onClick={logoClick} />
      </div>
      <nav>
        {userId == null || userId == '' ? (
          <ul>
            <li>
              <NavLink to="register">회원가입</NavLink>
            </li>
            <li>
              <a onClick={login}>로그인</a>
              {/* <NavLink to="login">로그인</NavLink> */}
            </li>
          </ul>
        ) : (
          <div className="header__account__container">
            <div
              className="nickname__container"
              data-tooltip-id="tooltip"
              data-tooltip-content="마이페이지"
            >
              <PersonCircle />
              <h3>{username}</h3>
            </div>
            <BoxArrowRight
              data-tooltip-id="tooltip"
              data-tooltip-content="로그아웃"
              onClick={logout}
            />
          </div>
        )}
      </nav>
      <Tooltip id="tooltip" />
    </Layout.Header>
  );
};
export default Header;
