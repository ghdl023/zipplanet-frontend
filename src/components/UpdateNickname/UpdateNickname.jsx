import { useEffect, useState } from 'react';
import './UpdateNickname.scss';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import { findPwd, updateUser } from '../../apis/api/user';
import toast from 'react-hot-toast';

function UpdateNickname(props) {
    const [bCheck, setBCheck] = useState(true);
    const [newNickname, setNewNickname] = useState('');

    const userInfo = useRecoilValue(userInfoState);
    const setUserInfo = useSetRecoilState(userInfoState);
    
    useEffect(()=>{
        if(newNickname != ''){
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

        const result = await updateUser({
            password: selectPwd['data'],
            passwordConfirm: selectPwd['data'],
            nickname: newNickname,
            phone: userInfo.phone,
            address: userInfo.address,
            username: userInfo.username,
        });
        if (result['data'] === 0 || result['data'] === null || result['data'] === '0'){
            toast.error(result['message']);
            return false;
        }
        toast.success('닉네임이 성공적으로 변경되었습니다.');
        setUserInfo({
            ...userInfo,
            nickname: newNickname
        })
        props.setModalControl(false);
    }

    return (
        <div className='update__nickname__container'>
            <div>닉네임 재설정</div>
            <hr />
            <div className='update__nickname__form'>
                <div className='old__nickname'>
                    <div className='update__nickname__header'>
                        <label htmlFor='old__nickname'>닉네임</label>
                        <div className='random__nickname'>
                            <button>랜덤추천</button>
                        </div>
                    </div>
                    <div className='input__nickname'>
                        <input type="text" name='old__nickname' value={newNickname} onChange={(e)=>setNewNickname(e.target.value)} placeholder='닉네임을 입력해주세요.' />
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
export default UpdateNickname;