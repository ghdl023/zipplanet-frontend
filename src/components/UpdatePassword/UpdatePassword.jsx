import { useEffect, useState } from 'react';
import './UpdatePassword.scss';
import {  useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import { findPwd, updateUser } from '../../apis/api/user';
import toast from 'react-hot-toast';
function UpdatePassword(props) {
    const [bCheck, setBCheck] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const userInfo = useRecoilValue(userInfoState);

    useEffect(() => {
        if (oldPassword != '' && newPassword != '' && passwordConfirm != '') {
            setBCheck(false);
        } else {
            setBCheck(true);
        }
    })

    const onClickUpdate = async () => {
        const selectPwd = await findPwd({
            username: userInfo.username,
            phone: userInfo.phone
        });
        if (selectPwd['data'] != oldPassword) {
            toast.error('현재 비밀번호를 확인해주세요.');
            return false;
        }
        if (newPassword != passwordConfirm) {
            toast.error('새로운 비밀번호가 일치하지 않습니다.');
            return false;
        }
        const result = await updateUser({
            password: newPassword,
            passwordConfirm: passwordConfirm,
            nickname: userInfo.nickname,
            phone: userInfo.phone,
            address: userInfo.address,
            username: userInfo.username,
        });
        if (result['data'] === 0 || result['data'] === null || result['data'] === '0') {
            toast.error('비밀번호 변경에 실패하였습니다.');
            return false;
        }
        toast.success('비밀번호 변경 성공!');
        props.setModalControl(false);
    }

    return (
        <div className='update__password__container'>
            <div>비밀번호 재설정</div>
            <hr />
            <div className='update__password__form'>
                <div className='old__password'>
                    <label htmlFor='old__password'>현재 비밀번호</label>
                    <div>
                        <input type="password" name='old__password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='현재 비밀번호' />
                    </div>
                </div>
                <div className='new__password'>
                    <label htmlFor='new__password'>새로운 비밀번호</label>
                    <div>
                        <input type="password" name='new__password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='8자리 이상 영문, 숫자, 특수문자 포함' />
                    </div>
                    <div>
                        <input type="password" name='new__password__check' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='비밀번호 확인' />
                    </div>
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>닫기</button>
                    <button type="button" onClick={onClickUpdate} disabled={bCheck}>변경</button>
                </div>
            </div>
        </div>
    )
}
export default UpdatePassword;