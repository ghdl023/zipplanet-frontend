import { useRecoilState, useRecoilValue } from 'recoil';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import { modalState } from '../../recoil/modalState';
import { userInfoState } from '../../recoil/userInfoState';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewListItem from '../ReviewListItem';
import { searchMyReport } from '../../apis/api/review';
import './MyPageReport.scss';
import moment from 'moment';

function MyPageReport() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
  const userInfo = useRecoilValue(userInfoState);
  const [reviewList, setReviewList] = useState('');
  const [showMore, setShowMore] = useState(5);
  const navigate = useNavigate();

  const onClickReviewItem = (review) => {
    setReviewDetail(review);
    navigate(import.meta.env.VITE_BASE_URL);
  };

  const getList = async () => {
    const getReviewList = await searchMyReport({
      params: {
        userId: userInfo.userId,
      },
    });
    setReviewList(getReviewList['data']);
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="report__container">
      {reviewList != '' ? (
        <div className="report__header">
          총 {reviewList.length}개의 신고 내역이 있습니다.
        </div>
      ) : (
        ''
      )}
      <div className="report__list">
        {reviewList != '' ? (
          reviewList
            .filter((review) => reviewList.indexOf(review) < showMore)
            .map((review, index) => {
              return (
                <div className="report__item" key={index}>
                  <div className="report__content">
                    <ReviewListItem
                      key={index}
                      onClickReviewItem={() => onClickReviewItem(review)}
                      review={review}
                    />
                  </div>
                  <div className="report__contents__box">
                    <div className="report__num">
                      <h2>신고번호 {review.reportId}</h2>
                    </div>
                    <table>
                      <tr>
                        <td>신고일</td>
                        <td>
                          {moment(review.reportDate).format('YYYY년MM월DD일')}
                        </td>
                      </tr>
                      <tr>
                        <td>처리상태</td>
                        <td>
                          {review.solveYn === 'N' ? '접수완료' : '처리완료'}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="report__list__noresult">
            <h2>🚨 부적절한 리뷰를 신고해주시면 빠르게 조치하겠습니다.</h2>
          </div>
        )}
      </div>
      {reviewList.length > showMore ? (
        <div className="show__more__box">
          <button
            className="show__more__btn"
            onClick={() => setShowMore(showMore + 10)}
          >
            더보기
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
export default MyPageReport;
