import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoImage from '@assets/images/logo/logo.png';
import { Layout } from 'antd';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import { BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';
import './Header.scss';

const Header = () => {

  const { userId, nickname } = useRecoilValue(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const logoClick = () => {
    navigate(BASE_URL);
  };

  const logout = () => {
    resetUserInfo();
    navigate(BASE_URL, { replace: true});
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
              {/* <a onClick={login}>로그인</a> */}
              <NavLink to="login">로그인</NavLink>
            </li>
          </ul>
        ) : (
          <div className="header__account__container">
            <div
              className="nickname__container"
              data-tooltip-id="header-tooltip"
              data-tooltip-content="마이페이지"
              onClick={()=> navigate(`${BASE_URL}mypage`)}
            >
              <PersonCircle />
              <h3>{nickname}</h3>
            </div>
            <BoxArrowRight
              data-tooltip-id="header-tooltip"
              data-tooltip-content="로그아웃"
              onClick={logout}
            />
          </div>
        )}
      </nav>
      <Tooltip id="header-tooltip" className="tooltip"/>
    </Layout.Header>
  );
};
export default Header;
