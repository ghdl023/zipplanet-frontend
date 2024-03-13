import { useState } from 'react';
import './FindPwdForm.scss';
import { useNavigate } from 'react-router';
import { findPwd } from '../../apis/api/user';
import toast from 'react-hot-toast';

function FindPwdForm() {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const onChangeInput = (e) => {
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone(validInputValue);
    }

    const onClickFindPwd = async () => {
        console.log(username+phone);
        const result = await findPwd({
            username: username,
            phone: phone
        });
        console.log(result);
        if (result['data'] != null){
            navigate(`${BASE_URL}findPwdResult`, { state: { result } })
        } else {
            toast.error('유저 정보를 찾을 수 없습니다.');
        }
    }

    return (
        <div className='findPwd__wrapper'>
            <div className="findPwd__box">
                <div className="findPwd__header">
                    <h1>비밀번호 찾기</h1>
                    <h4>아이디와 가입 시 입력한 휴대폰 번호로<br></br>간편하게 비밀번호를 찾을 수 있어요!</h4>
                </div>
                <div className="findPwd__body">
                    <div className='findPwd__form'>
                        <div>
                            <input name="username" type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="아이디" />
                        </div>
                        <div>
                            <input name="phone" type="text" value={phone} onChange={onChangeInput} maxLength={11} placeholder="휴대폰번호(-제외)" />
                        </div>
                        <button onClick={onClickFindPwd}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindPwdForm;