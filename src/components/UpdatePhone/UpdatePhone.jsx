import { useEffect, useState } from 'react';
import './UpdatePhone.scss';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import { findPwd, updateUser } from '../../apis/api/user';
import toast from 'react-hot-toast';

function UpdatePhone(props) {
    const [bCheck, setBCheck] = useState(true);
    const [newPhone, setNewPhone] = useState('');

    const userInfo = useRecoilValue(userInfoState);
    const setUserInfo = useSetRecoilState(userInfoState);

    useEffect(()=>{
        if(newPhone != ''){
            setBCheck(false);
        } else {
            setBCheck(true);
        }
    })

    const onClickUpdate = async () => {
        const selectPwd = await findPwd({
            username: userInfo.username,
            phone: userInfo.phone,
        });

        const result = await updateUser({
            password: selectPwd['data'],
            passwordConfirm: selectPwd['data'],
            nickname: userInfo.nickname,
            phone: newPhone,
            address: userInfo.address,
            username: userInfo.username,
        });
        if (result['data'] === 0 || result['data'] === null || result['data'] === '0'){
            toast.error(result['message']);
            return false;
        }
        toast.success('휴대폰번호가 성공적으로 변경되었습니다.');
        setUserInfo({
            ...userInfo,
            phone: newPhone
        })
        props.setModalControl(false);
    }

    const onChangeInput = (e) => {
        setNewPhone(e.target.value.replace(/[^0-9]/g, ""));
    }

    return (
        <div className='update__phone__container'>
            <div>휴대폰번호 재설정</div>
            <hr/>
            <div className='update__phone__form'>
                <div className='new__phone'>
                    <label htmlFor='new__phone'>휴대폰번호</label>
                    <div>
                        <input type="text" name='new__phone' value={newPhone} onChange={onChangeInput} maxLength={11} placeholder='휴대폰번호를 입력해주세요.(- 제외)' />
                    </div>
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>닫기</button>
                    <button type="button" onClick={onClickUpdate} disabled={bCheck}>변경</button>
                </div>
            </div>
        </div>
    );
}
export default UpdatePhone;