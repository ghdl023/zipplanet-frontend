import { useState } from 'react';
import './FindIdForm.scss';
import { findId } from '../../apis/api/user';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

function FindIdForm() {

    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const onChangeInput = (e) => {
        const validInputValue = e.target.value.replace(/[^0-9]/g, "");
        setPhone(validInputValue);
    }

    const onClickFindId = async () => {
        console.log(phone);
        const result = await findId({
            phone: phone
        });
        console.log(result);
        if (result != null){
            navigate(`${BASE_URL}findIdResult`, { state: { result } });
        } else {
            toast.error('유저 정보를 찾을 수 없습니다.');
        }
        
    }

    return (
        <div className='login__wrapper'>
            <div className="login__box">
                <div className="login__header">
                    <h1>아이디 찾기</h1>
                    <h4>가입 시 입력한 휴대폰 번호로<br></br>간편하게 아이디를 찾을 수 있어요!</h4>
                </div>
                <div className="login__body">
                    <div className='login__form'>
                        <div>
                            <input name="phone" type="text" value={phone} onChange={onChangeInput} maxLength={11} placeholder="휴대폰번호(-제외)" />
                        </div>
                        <button onClick={onClickFindId}>아이디 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindIdForm;