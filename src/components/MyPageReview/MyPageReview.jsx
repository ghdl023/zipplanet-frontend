import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import ReviewListItem from "../ReviewListItem";
import { modalState } from "../../recoil/modalState";
import { reviewUpdateState } from "../../recoil/reviewUpdateState";
import { reviewDetailState } from "../../recoil/reviewDetailState";

function MyPageReview() {
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
    const [reivewUpdate, setReviewUpdate] = useRecoilState(reviewUpdateState);
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

    return (
        <div>
            내 리뷰
            <ReviewListItem 
            onClickReviewItem={onClickReviewItem}
                review={
                    {
                          reviewId: 10009,
                          userId: 10000,
                          totalRate: 5,
                          transRate: 4,
                          manageRate: 3,
                          infraRate: 2,
                          lifeRate: 1,
                          title: '제목',
                          description: '내용',
                          jibun: '주소',
                          pos: '37.4985356558395,127.032615766508',
                          floorsCount: '10',
                          pyungCount: '5',
                          roomInfo: 'ㅇㅇㅇㅇㅇ',
                          roomOption: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
                          contractTypeId: '2',
                          startDate: '2024-10-05',
                          endDate: '2024-12-31',
                          images: [],
                        }
                }
            />
        </div>
    );
}
export default MyPageReview;