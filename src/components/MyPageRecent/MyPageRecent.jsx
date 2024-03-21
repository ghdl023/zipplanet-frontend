import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewListItem from '../../components/ReviewListItem/ReviewListItem';
import './MyPageRecent.scss';
import { useSetRecoilState } from 'recoil';
import { reviewDetailState } from '../../recoil/reviewDetailState';

function MyPageRecent() {
  const [watched, setWatched] = useState([]);
  const setReviewDetail = useSetRecoilState(reviewDetailState);
  const navigate = useNavigate();

  const onClickReviewItem = (e, review) => {
    setReviewDetail(review);
    navigate(import.meta.env.VITE_BASE_URL);
  };

  useEffect(() => {
    const watched = localStorage.getItem('watched');
    if (watched) {
      setWatched(JSON.parse(watched));
    }
  }, []);

  return (
    <div className='mypage__recent__main'>
      {watched.length > 0 ? (
        <>
          <div className="mypage__recent__header">
            <h2>
              총 <b>{watched.length}</b>개의 최근 본 리뷰가 있습니다.
            </h2>
            <p>최근 본 리뷰는 최대 5개까지 저장됩니다.</p>
          </div>
          <div className="mypage__recent__container">
            {watched.reverse().map((review, index) => (
              <div className='mypage__recent__item'>
                <ReviewListItem
                  key={index}
                  review={review}
                  onClickReviewItem={(e) => onClickReviewItem(e, review)}
                />
              </div>
            ))}

          </div>
        </>
      ) : (
        <div className="mypage__noresult">
          <h1>😱</h1>
          <h2>이런! 아직 살펴본 리뷰가 없네요!</h2>
        </div>
      )}
    </div>
  );
}
export default MyPageRecent;
