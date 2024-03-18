import { useEffect, useState } from "react";
import './UpdateAdress.scss';
import UpdateAddressGuDongList from "../UpdateAddressGuDongList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import { findPwd, updateUser } from "../../apis/api/user";
import toast from "react-hot-toast";

function UpdateAdress(props) {
    const [bCheck, setBCheck] = useState(true);
    const [onList, setOnList] = useState(false);
    const [gu, setGu] = useState('전체');
    const [dong, setDong] = useState('전체');
    const [guDongCheck, setGuDongCheck] = useState(true);

    const userInfo = useRecoilValue(userInfoState);
    const setUserInfo = useSetRecoilState(userInfoState);

    useEffect(() => {
        if (gu != '전체') {
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
            nickname: userInfo.nickname,
            phone: userInfo.phone,
            address: (dong === '전체'? gu : gu+' '+dong),
            username: userInfo.username,
        });
        if (result['data'] === 0 || result['data'] === null || result['data'] === '0'){
            toast.error(result['message']);
            return false;
        }
        toast.success('거주지가 성공적으로 변경되었습니다.');
        setUserInfo({
            ...userInfo,
            address: (dong === '전체'? gu : gu+' '+dong)
        })
        props.setModalControl(false);
    }

    const onClickGuList = () => {
        if (guDongCheck === true) {
            onList ? setOnList(false) : setOnList(true);
        } else {
            setGuDongCheck(true);
            setOnList(true);
        }

    }
    const onClickDongList = () => {
        if (gu === '전체') {
            return;
        }
        if (guDongCheck === false) {
            onList ? setOnList(false) : setOnList(true);
        } else {
            setGuDongCheck(false);
            setOnList(true);
        }
    }


    return (
        <div className='update__address__container'>
            <div>거주지 재설정</div>
            <hr />
            <div className='update__address__form'>
                <div className='new__address'>
                    <label htmlFor='new__address'>구/동</label>
                    <div className="input__address">
                        <input type="button" name="new__address" value={gu} onClick={onClickGuList} />
                        <input type="button" name="new__address" value={dong} onClick={onClickDongList} />
                    </div>
                    <div>
                        {onList ? <UpdateAddressGuDongList
                            guDongCheck={guDongCheck}
                            gu={gu}
                            setOnList={setOnList}
                            setGu={setGu}
                            setDong={setDong} /> : ''}
                    </div>
                </div>
                <hr />
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>닫기</button>
                    <button type="button" onClick={onClickUpdate} disabled={bCheck}>변경</button>
                </div>
            </div>
        </div>
    );
}
export default UpdateAdress;