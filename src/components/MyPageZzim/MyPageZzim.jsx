import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import ReviewListItem from "../ReviewListItem";
import { modalState } from "../../recoil/modalState";
import { reviewUpdateState } from "../../recoil/reviewUpdateState";
import { reviewDetailState } from "../../recoil/reviewDetailState";
import { useEffect, useState } from "react";
import { searchMyReveiw } from "../../apis/api/review";
import { userInfoState } from "../../recoil/userInfoState";
import './MyPageZzim.scss';

function MyPageZzim() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
    const [reivewUpdate, setReviewUpdate] = useRecoilState(reviewUpdateState);
    const userInfo = useRecoilValue(userInfoState);
    const [reviewList, setReviewList] = useState('');
    const [showMore, setShowMore] = useState(5);

    const navigate = useNavigate();

    const onClickReviewItem = (review) => {
        console.log(review)
        // 리뷰 수정시
        // setReviewUpdate(review);
        // setModalOpen({
        //     ...modalOpen,
        //     reviewCreateModalOpen: true,
        // })

        // 리뷰 상세 조회시
        setReviewDetail(review);
        navigate(import.meta.env.VITE_BASE_URL);
    }
    const getList = async () => {
        const getReviewList = await searchMyReveiw({
            userId: parseInt(userInfo.userId)
        });
        setReviewList(getReviewList['data']);
    }
    useEffect(() => {
        getList();
    })

    return (
        <div className="zzim__container">
            <div className="zzim__header">총 {reviewList.length}개의 내역이 있습니다.</div>
            <div className="zzim__list">
                {reviewList != '' ? reviewList.filter((review) => reviewList.indexOf(review) < showMore).map((review, index) => {
                    return (
                        <ReviewListItem
                            key={index}
                            onClickReviewItem={onClickReviewItem}
                            review={review}
                        />
                    );
                }) : ''}
            </div>
            <div className="show__more__box">
                <button className="show__more__btn" onClick={()=>setShowMore(showMore+10)}>더보기</button>
            </div>
        </div>
    );
}
export default MyPageZzim;