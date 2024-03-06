import { ArrowDownLeftSquareFill, ArrowRightCircleFill, PersonCircle } from 'react-bootstrap-icons';
import './AccountWrapper.scss';
import { useState } from 'react';

function AccountWrapper(props) {
    const [accountInfo, setAccountInfo] = useState({
        userId: 'comet2667',
        userPwd: '',
        nickName: '종필이네 신발가게',
        phone: '010-7705-2667',
        adress: '전남 목포시 남악1로 83',
        profileImg: ''
    })
    function modalOpen(num) {
        props.setModalControl(true);
        props.setModalNo(num);
    }
    return (
        <div className="account__container">
            <div>
                <PersonCircle className='user__icon' size={80} />
                <ArrowDownLeftSquareFill className='user__icon__update' />
            </div>
            <div className='account__item account__item__userId'>
                <div className='account__item__label'>아이디</div>
                <div>{accountInfo.userId}</div>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>비밀번호</div>
                <div>{accountInfo.userPwd}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(1)}/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>닉네임</div>
                <div>{accountInfo.nickName}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(2)}/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>휴대폰번호</div>
                <div>{accountInfo.phone}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(3)}/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>거주지</div>
                <div>{accountInfo.adress}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(4)}/>
            </div>
        </div>
    );
}
export default AccountWrapper;