import { useEffect, useState } from 'react';
import './UpdatePassword.scss';
import {  useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import { findPwd, updateUser } from '../../apis/api/user';
import toast from 'react-hot-toast';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
function UpdatePassword(props) {
    const [bCheck, setBCheck] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [view, setView] = useState({
        oldPwd:true,
        newPwd:true,
        pwdCon:true
    });

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
                    <div className='password__item'>
                        <input type={view.oldPwd? 'password':'text'} name='old__password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='현재 비밀번호' />
                        <div className='password__view__icon'
                            onMouseDown={()=>setView({...view, oldPwd:false})}
                            onMouseUp={()=>setView({...view, oldPwd:true})}>
                            {view.oldPwd? <EyeSlash size={20}/> : <Eye size={20}/>}
                        </div>
                    </div>
                </div>
                <div className='new__password'>
                    <label htmlFor='new__password'>새로운 비밀번호</label>
                    <div className='password__item'>
                        <input type={view.newPwd? 'password':'text'} name='new__password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='새로운 비밀번호' />
                        <div className='password__view__icon'
                            onMouseDown={()=>setView({...view, newPwd:false})}
                            onMouseUp={()=>setView({...view, newPwd:true})}>
                            {view.newPwd? <EyeSlash size={20}/> : <Eye size={20}/>}
                        </div>
                    </div>
                    <div className='password__item'>
                        <input type={view.pwdCon? 'password':'text'} name='new__password__check' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder='비밀번호 확인' />
                        <div className='password__view__icon'
                            onMouseDown={()=>setView({...view, pwdCon:false})}
                            onMouseUp={()=>setView({...view, pwdCon:true})}>
                            {view.pwdCon? <EyeSlash size={20}/> : <Eye size={20}/>}
                        </div>
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