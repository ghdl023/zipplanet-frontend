
import MyPageAccount from '../../pages/MyPageAccount';
import MyPageRecent from '../../pages/MyPageRecent';
import MyPageReview from '../../pages/MyPageReview';
import MyPageZzim from '../../pages/MyPageZzim';
import MyPageReport from '../../pages/MyPageReport';

import './MyPageViewer.scss';

function MyPageViewer(props) {

    return (
        <div className="mypage__viewer__container">
            { props.pageNo === 1 ? 
                <MyPageAccount/>
                : props.pageNo === 2 ?
                <MyPageRecent/>
                : props.pageNo === 3 ?
                <MyPageReview/>
                : props.pageNo === 4 ?
                <MyPageZzim/>
                : props.pageNo === 5 ?
                <MyPageReport/>
                : ''
            }
        </div>
    );
}
export default MyPageViewer;