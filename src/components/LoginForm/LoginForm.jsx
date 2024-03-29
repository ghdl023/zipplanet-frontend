import { useRef, useState } from 'react';
import { login } from '../../apis/api/user';
import {  useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import './LoginForm.scss';

function LoginFrom() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const loginRef = useRef([]);
  const setUserInfo = useSetRecoilState(userInfoState);

  const onClickLogin = async () => {
    if (id == ''){
      toast.error('아이디를 입력해주세요.');
      loginRef.current[0].focus();
      return;
    }
    if (pwd == ''){
      toast.error('패스워드를 입력해주세요.');
      loginRef.current[1].focus();
      return;
    }
    console.log(id);
    console.log(pwd);
    const result = await login({
      username: id,
      password: pwd,
    });
    console.log(result);
    if (result['data'] === null) {
      toast.error(result['message']);
      return false;
    }
    setUserInfo(result['data']);
    navigate(BASE_URL);
  };

  return (
    <div className="login__wrapper">
      <div className="login__box">
        <div className="login__header">
          <h1>로그인</h1>
          <h4>지금 로그인해서 리뷰를 작성해보세요!</h4>
        </div>
        <div className="login__body">
          <div className="login__form">
            <div className='login__form__input'>
              <input
                name="user_id"
                type="text"
                value={id}
                ref={(el) => loginRef.current[0] = el}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디"
              />
            </div>
            <div className='login__form__input'>
              <input
                name="password"
                type="password"
                value={pwd}
                ref={(el) => loginRef.current[1] = el}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="비밀번호"
              />
            </div>
            <button onClick={onClickLogin}>로그인</button>
          </div>
          <div className="search__nav">
            <NavLink to={`${BASE_URL}findId`}>아이디찾기</NavLink>
            <NavLink to={`${BASE_URL}findPwd`}>비밀번호찾기</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginFrom;
