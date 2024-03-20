import './DeleteMyReview.scss';

function DeleteMyReview(props) {

    const onClickDelete = () => {
        props.onClickDelete(props.review);
        props.setModalControl(false);
    }

    return (
        <div className='update__phone__container'>
            <div>정말 삭제하시겠습니까?</div>
            <hr/>
            <div className='update__phone__form'>
                <div className='new__phone'>
                    삭제 버튼을 누르면 해당 '{props.review.title}' 리뷰가 삭제됩니다.
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>취소</button>
                    <button type="button" onClick={onClickDelete}>삭제</button>
                </div>
            </div>
        </div>
    );
}
export default DeleteMyReview;
