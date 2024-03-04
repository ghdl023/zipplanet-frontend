import './AccountWrapper.scss';

function AccountWrapper() {
    return (
        <div className="account__container">
            <img src='#' />
            <div className='account__item'>
                <div className='account__item__label'>아이디</div>
                <div>(값)</div>
                <img src='#'/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>비밀번호</div>
                <div>(값)</div>
                <img src='#'/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>닉네임</div>
                <div>(값)</div>
                <img src='#'/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>휴대폰번호</div>
                <div>(값)</div>
                <img src='#'/>
            </div>
            <div className='account__item'>
                <div className='account__item__label'>거주지</div>
                <div>(값)</div>
                <img src='#'/>
            </div>
        </div>
    );
}
export default AccountWrapper;