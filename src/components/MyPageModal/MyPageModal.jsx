import './MyPageModal.scss';

function MyPageModal(props) {
    return (
        <div>
            <div className="mypage__modal__background" onClick={() => props.setModalControl(false)}>
                <div className="mypage__modal__box" onClick={(e)=>e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}
export default MyPageModal;