import toast from "react-hot-toast";
import { deleteUser } from "../../apis/api/user";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";

function DeleteUser(props) {
    const navigate = useNavigate();
    const resetUserInfo = useResetRecoilState(userInfoState);
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const userInfo = useRecoilValue(userInfoState);
    const onClickDelete = async () => {
        const result = await deleteUser(userInfo.username);
        console.log(result['data']);
        if (result['data'] == 0) {
            toast.error(result);
            return false;
        }
        resetUserInfo();
        navigate(BASE_URL, {replace: true});
        toast.success("정상적으로 탈퇴되었습니다.");
    }

    return (
        <div className='update__phone__container'>
            <div>정말 삭제하시겠습니까?</div>
            <hr/>
            <div className='update__phone__form'>
                <div className='new__phone'>
                    제발...ㅠ
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>취소</button>
                    <button type="button" onClick={onClickDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
}
export default DeleteUser;