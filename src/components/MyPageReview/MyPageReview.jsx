import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import ReviewListItem from "../ReviewListItem";
import { modalState } from "../../recoil/modalState";
import { reviewUpdateState } from "../../recoil/reviewUpdateState";
import { reviewDetailState } from "../../recoil/reviewDetailState";
import { useEffect, useState } from "react";
import { searchMyReveiw } from "../../apis/api/review";
import { userInfoState } from "../../recoil/userInfoState";
import './MyPageReview.scss';
import PaginationButton from "../PaginationButton";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";

function MyPageReview() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
    const [reivewUpdate, setReviewUpdate] = useRecoilState(reviewUpdateState);
    const userInfo = useRecoilValue(userInfoState);
    const [reviewList, setReviewList] = useState('');
    const [pageCount, setPageCount] = useState();
    const [pageNo, setPageNo] = useState(1);

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

    const onClickUpdate = (review) => {
        console.log(review);
        setReviewUpdate(review);
        setModalOpen({
            ...modalOpen,
            reviewCreateModalOpen: true,
        })
    }

    const getList = async () => {
        const getReviewList = await searchMyReveiw({
            userId: parseInt(userInfo.userId)
        });
        setReviewList(getReviewList['data']);
        setPageCount(Math.ceil(reviewList.length / 5));
    }
    useEffect(() => {
        getList();
    })

    return (
        <div className="review__container">
            <div className="review__header">총 {reviewList.length}개의 내역이 있습니다.</div>
            <div className="review__list">
                {reviewList != '' ? reviewList.filter((review) => reviewList.indexOf(review) >= (5 * pageNo - 5) && reviewList.indexOf(review) < (5 * pageNo)).map((review, index) => {
                    return (
                        <div className="review__item">
                            <ReviewListItem
                                key={index}
                                onClickReviewItem={onClickReviewItem}
                                review={review}
                            />
                            <div className="myReview__icon__box">
                                <div className="myReview__icon__item" onClick={onClickUpdate}> 
                                    <PencilSquare size={20} />
                                </div>
                                <div className="myReview__icon__item">
                                    <Trash3 size={20} />
                                </div>
                            </div>
                        </div>
                    );
                }) : ''}
            </div>
            <div>
                <PaginationButton setPageNo={setPageNo} pageNo={pageNo} pageCount={pageCount} />
            </div>
        </div>
    );
}
export default MyPageReview;

// reviewId: 10009,
// userId: 10000,
// totalRate: 5,
// transRate: 4,
// manageRate: 3,
// infraRate: 2,
// lifeRate: 1,
// title: '제목',
// description: '내용',
// jibun: '주소',
// pos: '37.4985356558395,127.032615766508',
// floorsCount: '10',
// pyungCount: '5',
// roomInfo: 'ㅇㅇㅇㅇㅇ',
// roomOption: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
// contractTypeId: '2',
// startDate: '2024-10-05',
// endDate: '2024-12-31',
// images: [],