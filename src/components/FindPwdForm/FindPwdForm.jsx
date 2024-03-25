import { useEffect, useRef, useState } from 'react';
import './FindPwdForm.scss';
import { useNavigate } from 'react-router';
import { findId, findPwd } from '../../apis/api/user';
import toast from 'react-hot-toast';
import MyPageModalBody from '../MyPageModalBody';
import MyPageModal from '../MyPageModal/MyPageModal';
import { mailSend } from '../../apis/api/mail';

function FindPwdForm() {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const findPwdRef = useRef([]);
    const [modalControl, setModalControl] = useState(false);
    const [certiNum, setCertiNum] = useState();
    const [inputCertiNum, setInputCertiNum] = useState('');
    const [bCheck, setBCheck] = useState(true);

    useEffect(() => {
        if (inputCertiNum != '') {
            setBCheck(false);
        } else {
            setBCheck(true);
        }
    })

    const onChangeInput = (e) => {
        const validInputValue = e.target.value.replace(/[^0-9]/g, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        setPhone(validInputValue);
    }

    const onClickFindPwd = async () => {
        if (username === '') {
            toast.error('아이디를 입력해주세요.');
            findPwdRef.current[0].focus();
            return;
        }
        if (phone === '') {
            toast.error('휴대폰번호를 입력해주세요.');
            findPwdRef.current[1].focus();
            return;
        }

        // const result = await findPwd({
        //     username: username,
        //     phone: phone
        // });
        const result = await findId({
            phone: phone
        });
        if (result != null) {
            if (result['data'] === username){
                const certi = await mailSend({
                    to: username
                })
                setCertiNum(certi['data']);
                setModalControl(true);
            } else {
                toast.error('유저 정보를 찾을 수 없습니다.');
                return;
            }
            // navigate(`${BASE_URL}findPwdResult`, { state: { result } })
        } else {
            toast.error('유저 정보를 찾을 수 없습니다.');
        }
        
    }
    const onClickCerti = async () => {
        if (certiNum != inputCertiNum) {
            toast.error('인증번호가 올바르지 않습니다.');
            return;
        }
        const result = await findPwd({
            username: username,
            phone: phone
        });
        navigate(`${BASE_URL}findPwdResult`, { state: { result } })
    }

    return (
        <div className='login__wrapper'>
            <div className="login__box">
                <div className="login__header">
                    <h1>비밀번호 찾기</h1>
                    <h4>가입 시 입력한 이메일을 통해<br></br>간편하게 비밀번호를 찾을 수 있어요!</h4>
                </div>
                <div className="login__body">
                    <div className='login__form'>
                        <div className='login__form__input'>
                            <input name="username"
                                type="text"
                                ref={(el) => findPwdRef.current[0] = el}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="아이디" />
                        </div>
                        <div className='login__form__input'>
                            <input name="phone"
                                type="text"
                                value={phone}
                                ref={(el) => findPwdRef.current[1] = el}
                                onChange={onChangeInput}
                                maxLength={13}
                                placeholder="휴대폰번호(-제외)" />
                        </div>
                        <button onClick={onClickFindPwd}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
            {modalControl && <MyPageModal setModalControl={setModalControl}>
                <MyPageModalBody modalNo={7} setModalControl={setModalControl}>
                    <div className='update__phone__container'>
                        <div>탈퇴한 계정 복구</div>
                        <hr />
                        <div className='update__phone__form'>
                            <div className='new__phone'>
                                <label htmlFor='new__phone'>{username} 메일 주소로<br></br> 인증번호가 발송되었습니다.<br></br>
                                </label>
                                <br></br>
                                <b>메일 확인 후 발급된 인증번호를 입력해주세요.</b>
                                <br></br>
                                <div className='account__info'></div>
                                <div>
                                    <input type="number" name='new__phone' value={inputCertiNum} onChange={(e)=>setInputCertiNum(e.target.value)} maxLength={6} placeholder='인증번호 6자리 입력' />
                                </div>
                            </div>
                            <div className='update__submit__btn'>
                                <button type='button' onClick={() => setModalControl(false)}>취소</button>
                                <button type="button" disabled={bCheck} onClick={() => onClickCerti()}>비밀번호 찾기</button>
                            </div>
                        </div>
                    </div>
                </MyPageModalBody>
            </MyPageModal>}
        </div>
    );
}
export default FindPwdForm;