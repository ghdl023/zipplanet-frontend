import './MyPageModal.scss';

function MyPageModal(props, {children}) {
    return (
            <div className="mypage__modal__background" onClick={()=>props.setModalControl(false)}>
                <div className="mypage__modal__box">
                    {children}
                </div>
            </div>
    );
}
export default MyPageModal;