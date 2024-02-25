import { NavLink } from 'react-router-dom';
import './Header.scss';

const headerStyle = {
  textAlign: 'center',
  lineHeight: '64px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 80,
  padding: '0 30px',
  color: '#000 !important',
  background: 'white',
  borderBottom: '1px solid rgb(237, 237, 237)',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <NavLink to="/">
          {/* <img
            src="/src/assets/images/logo/zip_logo_orange.png"
            alt="logo"
            style={{ width: '85px' }}
          /> */}
          <h2 style={{ fontSize: 16, fontWeight: 600 }}>집플래닛</h2>
        </NavLink>
      </div>
      <nav>
        <ul style={{ display: 'flex' }}>
          <li>
            <NavLink to="register">회원가입</NavLink>
          </li>
          <li>
            <NavLink to="login">로그인</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
