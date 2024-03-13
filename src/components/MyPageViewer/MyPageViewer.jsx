
import MyPageAccount from '@components/MyPageAccount';
import MyPageRecent from '@components/MyPageRecent';
import MyPageReview from '@components/MyPageReview';
import MyPageZzim from '@components/MyPageZzim';
import MyPageReport from '@components/MyPageReport';

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