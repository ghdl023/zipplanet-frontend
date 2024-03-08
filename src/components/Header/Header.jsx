import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoImage from '@assets/images/logo/logo_kr.png';
import { Layout } from 'antd';
import './Header.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../recoil/userInfoState';
import { PersonCircle } from 'react-bootstrap-icons';

const Header = () => {

  const { userId, username } = useRecoilValue(userInfoAtom);
  // const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  console.log(userId)

  const navigate = useNavigate();
  const logoClick = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    navigate(BASE_URL);
  };

  return (
    <Layout.Header>
      <div className="logo">
        <img src={LogoImage} alt="logo" onClick={logoClick} />
      </div>
      <nav>
        {
          (userId == null || userId == '') ? (
            <ul>
              <li>
                <NavLink to="register">회원가입</NavLink>
              </li>
              <li>
                <NavLink to="login">로그인</NavLink>
              </li>
            </ul>

          ) : (
            <div className="header__account__container">
                <div>
                <PersonCircle/>
                  <h3>{ username }</h3>
                </div>
            </div>
          )
        }
      </nav>
    </Layout.Header>
  );
};
export default Header;
