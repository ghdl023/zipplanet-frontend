import { ArrowRightCircleFill, PersonCircle } from 'react-bootstrap-icons';
import './AccountWrapper.scss';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';

function AccountWrapper(props) {
    const accountInfo = useRecoilValue(userInfoState);

    function modalOpen(num) {
        props.setModalControl(true);
        props.setModalNo(num);
    }
    return (
        <div className="account__container">
            <div className="user__icon__container">
                <PersonCircle className='user__icon' size={80} />
            </div>
            <div className='account__item account__item__userId'>
                <div className='account__item__label'>아이디</div>
                <div>{accountInfo.username}</div>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>비밀번호</div>
                <div></div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(1)}/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>닉네임</div>
                <div>{accountInfo.nickname}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(2)}/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>휴대폰번호</div>
                <div>{accountInfo.phone}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(3)}/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>거주지</div>
                <div>{accountInfo.address}</div>
                <ArrowRightCircleFill size={18} onClick={()=>modalOpen(4)}/>
            </div>
            <div className="account__footer">
                <button>회원탈퇴</button>
            </div>
        </div>
    );
}
export default AccountWrapper;