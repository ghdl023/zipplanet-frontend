import { useState } from 'react';
import { signUp } from '../../apis/api/user';
import './RegisterForm.scss';

function RegisterForm() {

    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });

    const { username, password, passwordConfirm, phone } = userInput;

    const onClick = async () => {
        const result = await signUp({
            username,
            password,
            passwordConfirm,
            phone,
            nickname: username,
        });
        console.log(result);
    }

    const onChangeInput = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className='register__wrapper'>
            <div className="register__box">
                <div className="register__header">
                    <h1>회원가입</h1>
                    <h4>지금 회원가입해서 리뷰를 작성해보세요!</h4>
                </div>
                <div className="register__body">
                    <div className='register__form'>
                        <div>
                            <input name="username" type="text" value={username} onChange={onChangeInput} placeholder="아이디" />
                        </div>
                        <div>
                            <input name="password" type="password" value={password} onChange={onChangeInput} placeholder="비밀번호" />
                        </div>
                        <div>
                            <input name="passwordConfirm" type="password" value={passwordConfirm} onChange={onChangeInput} placeholder="비밀번호 확인" />
                        </div>
                        <div>
                            <input name="phone" type="text" value={phone} onChange={onChangeInput} placeholder="휴대폰번호(-제외)" />
                        </div>
                        <button onClick={onClick}> 회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;