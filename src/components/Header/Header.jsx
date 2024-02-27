import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoImage from '@assets/images/logo/logo_kr.png';
import { Layout } from 'antd';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const logoClick = () => {
    navigate('/zipplanet-frontend/');
  };

  return (
    <Layout.Header>
      <div className="logo">
        <img src={LogoImage} alt="logo" onClick={logoClick} />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="register">회원가입</NavLink>
          </li>
          <li>
            <NavLink to="login">로그인</NavLink>
          </li>
        </ul>
      </nav>
    </Layout.Header>
  );
};
export default Header;
