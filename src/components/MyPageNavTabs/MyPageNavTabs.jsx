import { useState } from 'react';
import './MyPageNavTabs.scss';

function MyPageNavTabs(props) {

    const [active, setActive] = useState(1);

    function setPageNo(num) {
        props.setPageNo(num);
    }

    return (
        <div className="mypage__nav__container">
            <h1>마이 페이지</h1>
            <div className='mypage__nav__item'>
                <div className={active === 1 ? 'mypage__btn__active' : ''} onClick={() => [setPageNo(1), setActive(1)]}>내 정보</div>
                <div className={active === 2 ? 'mypage__btn__active' : ''} onClick={() => [setPageNo(2), setActive(2)]}>최근 본 리뷰</div>
                <div className={active === 3 ? 'mypage__btn__active' : ''} onClick={() => [setPageNo(3), setActive(3)]}>내 리뷰</div>
                <div className={active === 4 ? 'mypage__btn__active' : ''} onClick={() => [setPageNo(4), setActive(4)]}>찜</div>
                <div className={active === 5 ? 'mypage__btn__active' : ''} onClick={() => [setPageNo(5), setActive(5)]}>신고 내역</div>
            </div>
        </div>
    );
}
export default MyPageNavTabs;