import { useState } from 'react';
import { signUp } from '../../apis/api/user';
import './RegisterForm.scss';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function RegisterForm() {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });

    const { username, password, passwordConfirm, phone } = userInput;

    const onClick = async () => {
        if (userInput.username === ''){
            toast.error('아이디를 입력하지 않았습니다.');
            return false;
        } else if (userInput.password === '') {
            toast.error('비밀번호를 입력하지 않았습니다.');
            return false;
        } else if (userInput.passwordConfirm != userInput.password) {
            toast.error('비밀번호가 일치하지 않습니다.')
            return false;
        } else if (userInput.phone === '') {
            toast.error('휴대폰 번호를 입력하지 않았습니다.');
            return false;
        }
        console.log(userInput);
        const result = await signUp({
            username,
            password,
            passwordConfirm,
            phone,
            nickname: username,
        });
        if (result['data'] === null) {
            toast.error(result['message']);
            return false;
        }
        toast.success('회원가입 성공!');
        navigate(`${BASE_URL}login`);
    }

    const onChangeInput = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.name === 'phone' ? e.target.value.replace(/[^0-9]/g, "") :  e.target.value,
        });
    }

    return (
        <div className='login__wrapper'>
            <div className="login__box">
                <div className="login__header">
                    <h1>회원가입</h1>
                    <h4>지금 회원가입해서 리뷰를 작성해보세요!</h4>
                </div>
                <div className="login__body">
                    <div className='login__form'>
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
                            <input name="phone" type="text" value={phone} onChange={onChangeInput} maxLength={11} placeholder="휴대폰번호(-제외)" />
                        </div>
                        <button onClick={onClick}> 회원가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;