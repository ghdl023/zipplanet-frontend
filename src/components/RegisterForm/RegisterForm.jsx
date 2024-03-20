import { useRef, useState } from 'react';
import { comebackUser, findPwd, signUp } from '../../apis/api/user';
import './RegisterForm.scss';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import MyPageModal from '../MyPageModal/MyPageModal';
import MyPageModalBody from '../MyPageModalBody';

function RegisterForm() {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const signUpRef = useRef([]);
    const [modalControl, setModalControl] = useState(false);
    const [comebackPwd, setCombackPwd] = useState('');
    const [comebackInfo, setComebackInfo] = useState({});
    const modalNo = 7;
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        phone: '',
    });

    const { username, password, passwordConfirm, phone } = userInput;

    const onClick = async () => {
        if (userInput.username === '') {
            toast.error('아이디를 입력하지 않았습니다.');
            signUpRef.current[0].focus();
            return false;
        } else if (userInput.password === '') {
            toast.error('비밀번호를 입력하지 않았습니다.');
            signUpRef.current[1].focus();
            return false;
        } else if (userInput.passwordConfirm != userInput.password) {
            toast.error('비밀번호가 일치하지 않습니다.')
            signUpRef.current[2].focus();
            return false;
        } else if (userInput.phone === '') {
            toast.error('휴대폰 번호를 입력하지 않았습니다.');
            signUpRef.current[3].focus();
            return false;
        }
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
        if (result['data'].deleteYn === 'Y') {
            toast.error(result['message']);
            setComebackInfo(result['data']);
            console.log(result['data']);
            setModalControl(true);
            return false;
        }
        toast.success('회원가입 성공!');
        navigate(`${BASE_URL}login`);
    }

    const onChangeInput = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.name === 'phone' ? e.target.value.replace(/[^0-9]/g, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) : e.target.value,
        });
    }
    const onClickComeback = async () => {
        const result = await findPwd({
            username: comebackInfo.username,
            phone: comebackInfo.phone
        });
        if (result['data'] === null || result['data'] === ''){
            toast.error(result['message']);
            return;
        }
        if(comebackPwd != result['data']){
            toast.error('패스워드가 일치하지 않습니다.');
            console.log(result['data']);
            return;
        }
        const comeback = await comebackUser(comebackInfo.username);
        if (comeback['data'] === 0) {
            toast.error(comeback['message']);
            return;
        }
        toast.success('계정이 정상적으로 복구되었습니다.');
        setModalControl(false);
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
                            <input name="username"
                                type="text"
                                value={username}
                                ref={(el) => signUpRef.current[0] = el}
                                onChange={(e) => onChangeInput(e)}
                                placeholder="아이디" />
                        </div>
                        <div>
                            <input name="password"
                                type="password"
                                value={password}
                                ref={(el) => signUpRef.current[1] = el}
                                onChange={(e) => onChangeInput(e)}
                                placeholder="비밀번호" />
                        </div>
                        <div>
                            <input name="passwordConfirm"
                                type="password"
                                value={passwordConfirm}
                                ref={(el) => signUpRef.current[2] = el}
                                onChange={(e) => onChangeInput(e)}
                                placeholder="비밀번호 확인" />
                        </div>
                        <div>
                            <input name="phone"
                                type="text"
                                value={phone}
                                ref={(el) => signUpRef.current[3] = el}
                                onChange={(e) => onChangeInput(e)}
                                maxLength={13}
                                placeholder="휴대폰번호(-제외)" />
                        </div>
                        <button onClick={onClick}> 회원가입</button>
                    </div>
                </div>
            </div>
            {modalControl && <MyPageModal setModalControl={setModalControl}>
                <MyPageModalBody modalNo={modalNo} setModalControl={setModalControl}>
                <div className='update__phone__container'>
            <div>탈퇴한 계정 복구</div>
            <hr/>
            <div className='update__phone__form'>
                <div className='new__phone'>
                    <label htmlFor='new__phone'>휴대폰번호 {phone}로 탈퇴한 내역이 있습니다.<br></br>
                    </label>
                    <br></br>
                    <h4>계정을 복구하려면 탈퇴한 계정의 패스워드를 입력해주십시오.</h4>
                    <br></br>
                    <div>
                        <input type="password" name='new__phone' onChange={(e)=>setCombackPwd(e.target.value)} placeholder='패스워드 입력' />
                    </div>
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => setModalControl(false)}>취소</button>
                    <button type="button" onClick={() => onClickComeback()}>계정복구</button>
                </div>
            </div>
        </div>
                </MyPageModalBody>
            </MyPageModal>}
        </div>
    );
}
export default RegisterForm;