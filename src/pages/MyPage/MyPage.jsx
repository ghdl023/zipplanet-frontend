import { useState } from "react";
import MyPageNavTabs from "../../components/MyPageNavTabs";
import MyPageViewer from "../../components/MyPageViewer";
import './MyPage.scss';

function MyPage() {
    const [pageNo, setPageNo] = useState(1);

    return (
        <div className="mypage__main">
            <div>
                <MyPageNavTabs setPageNo={setPageNo}/>
            </div>
            <div className="mypage__veiwer">
                <MyPageViewer pageNo={pageNo}/>
            </div>
        </div>
    );
}
export default MyPage;