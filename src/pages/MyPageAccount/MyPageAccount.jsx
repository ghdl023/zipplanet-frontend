import { useState } from "react";
import AccountWrapper from "../../components/AccountWrapper";
import MyPageModal from "../../components/MyPageModal/MyPageModal";
import MyPageModalBody from "../../components/MyPageModalBody";
import './MyPageAccount.scss';

function MyPageAccount() {
    const [modalNo, setModalNo] = useState();
    const [modalControl, setModalControl] = useState(false);
    return (
        <div className="mypage__account">
            {modalControl && <MyPageModal setModalControl={setModalControl}>
                <MyPageModalBody modalNo={modalNo}/>
            </MyPageModal>}
            <AccountWrapper setModalNo={setModalNo} setModalControl={setModalControl}/>
        </div>
    );
}
export default MyPageAccount;