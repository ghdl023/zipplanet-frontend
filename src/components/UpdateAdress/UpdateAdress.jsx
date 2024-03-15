import { useState } from "react";
import './UpdateAdress.scss';
import UpdateAddressGuDongList from "../UpdateAddressGuDongList";

function UpdateAdress(props) {
    const [bCheck, setBCheck] = useState(true);
    const [onList, setOnList] = useState(false);
    const [gu, setGu] = useState('전체');
    const [dong, setDong] = useState('전체');

    const onClickGuList = ()=>{
        onList ? setOnList(false) : setOnList(true);
    }


    return (
        <div className='update__address__container'>
            <div>휴대폰번호 재설정</div>
            <hr/>
            <div className='update__address__form'>
                <div className='new__address'>
                    <label htmlFor='new__address'>휴대폰번호</label>
                    <div className="input__address">
                        <input type="button" name="new__address" value={gu} onClick={onClickGuList} />
                        <input type="button" name="new__address" value={dong} />
                    </div>
                    <div>
                        {onList ? <UpdateAddressGuDongList setOnList={setOnList} setGu={setGu} setDong={setDong}/> : ''}
                    </div>
                </div>
                <hr />
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>닫기</button>
                    <button type="button" disabled={bCheck}>변경</button>
                </div>
            </div>
        </div>
    );
}
export default UpdateAdress;