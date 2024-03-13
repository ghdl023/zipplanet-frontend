import { useEffect, useState } from "react";
import MyPageNavTabs from "../../components/MyPageNavTabs";
import MyPageViewer from "../../components/MyPageViewer";
import './MyPage.scss';
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import { useNavigate } from "react-router";

function MyPage() {
    const [pageNo, setPageNo] = useState(1);
    const userInfo = useRecoilValue(userInfoState);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;


    useEffect(()=>{
        if (userInfo.userId === null || userInfo.userId === '') {
            navigate(BASE_URL, {replace: true});
        }
    })

    return (
        <div className="mypage__main">
            <div className="mypage__header">
                <MyPageNavTabs setPageNo={setPageNo}/>
            </div>
            <div className="mypage__veiwer">
                <MyPageViewer pageNo={pageNo}/>
            </div>
        </div>
    );
}
export default MyPage;