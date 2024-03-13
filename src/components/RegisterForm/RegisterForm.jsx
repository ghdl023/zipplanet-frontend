import { useState } from 'react';
import { signUp } from '../../apis/api/user';
import './RegisterForm.scss';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function RegisterForm() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });

    const { username, password, passwordConfirm, phone } = userInput;

    const onClick = async () => {
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
        navigate('/zipplanet-frontend/login');
    }

    const onChangeInput = (e) => {
        if (e.target.name === 'phone') {
            const validInputValue = e.target.value.replace(/[^0-9]/g, "");
            setUserInput({
                ...userInput,
                [e.target.name]: validInputValue,
            });
        } else {
            setUserInput({
                ...userInput,
                [e.target.name]: e.target.value,
            });
        }
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