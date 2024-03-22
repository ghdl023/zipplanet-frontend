import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import ReviewListItem from '../ReviewListItem';
import { modalState } from '../../recoil/modalState';
import { reviewUpdateState } from '../../recoil/reviewUpdateState';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import { useEffect, useState } from 'react';
import { deleteReview, searchMyReveiw } from '../../apis/api/review';
import { userInfoState } from '../../recoil/userInfoState';
import './MyPageReview.scss';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import MyPageModal from '../MyPageModal/MyPageModal';
import MyPageModalBody from '../MyPageModalBody';

function MyPageReview() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
    const [reivewUpdate, setReviewUpdate] = useRecoilState(reviewUpdateState);
    const userInfo = useRecoilValue(userInfoState);
    const [reviewList, setReviewList] = useState('');
    const [showMore, setShowMore] = useState(5);
    const [modalNo, setModalNo] = useState();
    const [modalControl, setModalControl] = useState(false);
    const [delReview, setDelReview] = useState();

  const navigate = useNavigate();

  const onClickReviewItem = (review) => {
    setReviewDetail(review);
    navigate(import.meta.env.VITE_BASE_URL);
  };

  const onClickUpdate = (review) => {
    setReviewUpdate(review);
    setModalOpen({
      ...modalOpen,
      reviewCreateModalOpen: true,
    });
  };
  const onClickDelete = async (review) => {
    const result = await deleteReview({
      userId: parseInt(userInfo.userId),
      reviewId: parseInt(review.reviewId),
    });
    if (result == 0) {
      toast.error('리뷰 삭제 실패');
      return;
    }
    toast.success('리뷰가 삭제되었습니다.');

        getList();
    }
    const checkModal = (num ,review) => {
        setModalControl(true);
        setModalNo(num);
        setDelReview(review);
    }

    const getList = async () => {
        const getReviewList = await searchMyReveiw({
            params: {
                userId: userInfo.userId
            }
        });
        setReviewList(getReviewList['data']);
    }
    useEffect(() => {
        getList();
    }, [])
    return (
        <div className="review__container">
            {reviewList != '' ? <div className="review__header">총 {reviewList.length}개의 작성한 리뷰가 있습니다.</div> : ''}
            <div className="review__list">
                {reviewList != '' ? reviewList.filter((review) => reviewList.indexOf(review) < showMore).map((review, index) => {
                    return (
                        <div className="review__item" key={index}>
                            <ReviewListItem
                                key={index}
                                onClickReviewItem={() => onClickReviewItem(review)}
                                review={review}
                            />
                            <div className="myReview__icon__box" >
                                <div className="myReview__icon__item" onClick={() => onClickUpdate(review)}>
                                    <PencilSquare size={20} />
                                </div>
                                <div className="myReview__icon__item" onClick={() => checkModal(6, review)}>
                                    <Trash3 size={20} />
                                </div>
                            </div>
                        </div>
                    );
                }) : <div className="review__list__noresult">
                    <h2>😅 작성한 리뷰가 없습니다.</h2>
                </div>}
                {modalControl && <MyPageModal setModalControl={setModalControl}>
                    <MyPageModalBody modalNo={modalNo} setModalControl={setModalControl} review={delReview} onClickDelete={onClickDelete} />
                </MyPageModal>}
            </div>
            {reviewList.length > showMore ? <div className="show__more__box">
                <button className="show__more__btn" onClick={() => setShowMore(showMore + 10)}>더보기</button>
            </div> : ''}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
export default MyPageReview;