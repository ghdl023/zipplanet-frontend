import { useState } from 'react';
import { login } from '../../apis/api/user';
import './LoginForm.scss';

function LoginFrom() {

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const onClickLogin = async () => {
        console.log(id);
        console.log(pwd);
        const result = await login({
            username: id,
            password: pwd
        });
        console.log(result);
    }

    return (
        <div className='login__wrapper'>
            <div className="login__box">
                <div className="login__header">
                    <h1>로그인</h1>
                    <h4>지금 로그인해서 리뷰를 작성해보세요!</h4>
                </div>
                <div className="login__body">
                    <div className='login__form'>
                        <div>
                            <input name="user_id" type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
                        </div>
                        <div>
                            <input name="password" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="비밀번호" />
                        </div>
                        <button onClick={onClickLogin}>로그인</button>
                    </div>
                    <div className='search__nav'>
                        <a href="/zipplanet-frontend/findId">아이디찾기</a>
                        <a href="/zipplanet-frontend/findPwd">비밀번호찾기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginFrom;