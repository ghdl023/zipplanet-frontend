import { useRef, useState } from 'react';
import './FindPwdForm.scss';
import { useNavigate } from 'react-router';
import { findPwd } from '../../apis/api/user';
import toast from 'react-hot-toast';

function FindPwdForm() {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const findPwdRef = useRef([]);

    const onChangeInput = (e) => {
        const validInputValue = e.target.value.replace(/[^0-9]/g, '')
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
        setPhone(validInputValue);
    }

    const onClickFindPwd = async () => {
        if (username === ''){
            toast.error('아이디를 입력해주세요.');
            findPwdRef.current[0].focus();
            return;
        }
        if (phone === ''){
            toast.error('휴대폰번호를 입력해주세요.');
            findPwdRef.current[1].focus();
            return;
        }
        
        const result = await findPwd({
            username: username,
            phone: phone
        });
        if (result['data'] != null){
            navigate(`${BASE_URL}findPwdResult`, { state: { result } })
        } else {
            toast.error('유저 정보를 찾을 수 없습니다.');
        }
    }

    return (
        <div className='login__wrapper'>
            <div className="login__box">
                <div className="login__header">
                    <h1>비밀번호 찾기</h1>
                    <h4>아이디와 가입 시 입력한 휴대폰 번호로<br></br>간편하게 비밀번호를 찾을 수 있어요!</h4>
                </div>
                <div className="login__body">
                    <div className='login__form'>
                        <div>
                            <input name="username" 
                                type="text" 
                                ref={(el) => findPwdRef.current[0] = el}
                                onChange={(e)=>setUsername(e.target.value)} 
                                placeholder="아이디" />
                        </div>
                        <div>
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
        </div>
    );
}
export default FindPwdForm;