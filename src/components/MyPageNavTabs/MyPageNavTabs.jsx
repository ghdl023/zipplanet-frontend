import { useState } from 'react';
import './MyPageNavTabs.scss';
import MyPageAccount from '../../pages/MyPageAccount';
import MyPageRecent from '../../pages/MyPageRecent';
import MyPageReview from '../../pages/MyPageReview';
import MyPageZzim from '../../pages/MyPageZzim';
import MyPageReport from '../../pages/MyPageReport';
function MyPageNavTabs() {
    const [page, setPage] = useState(< MyPageAccount />);
    const [active, setActive] = useState(1);
    
    return (
        <div className="mypage__table__container">
            <h1>마이 페이지</h1>
            <table>
                <tr>
                    <td className={active === 1 ? 'mypage__btn__active' : ''} onClick={() => [setPage(< MyPageAccount />), setActive(1)]}>내 정보</td>
                    <td className={active === 2 ? 'mypage__btn__active' : ''} onClick={() => [setPage(< MyPageRecent />), setActive(2)]}>최근 본 리뷰</td>
                    <td className={active === 3 ? 'mypage__btn__active' : ''} onClick={() => [setPage(< MyPageReview />), setActive(3)]}>내 리뷰</td>
                    <td className={active === 4 ? 'mypage__btn__active' : ''} onClick={() => [setPage(< MyPageZzim />), setActive(4)]}>찜</td>
                    <td className={active === 5 ? 'mypage__btn__active' : ''} onClick={() => [setPage(< MyPageReport />), setActive(5)]}>신고 내역</td>
                </tr>
            </table>
            <div className='mypage__view__container'>
                {page}
            </div>
        </div>
    );
}
export default MyPageNavTabs;