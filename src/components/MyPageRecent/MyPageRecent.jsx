import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import ReviewListItem from '../../components/ReviewListItem/ReviewListItem';
import { useSetRecoilState } from 'recoil';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import './MyPageRecent.scss';

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
      const filtered = _.filter(JSON.parse(watched), (it) => it.title); // 필수값인 제목이 있는것만 정상적인 리뷰로 보고 초기화함.
      setWatched(filtered);
      localStorage.setItem('watched', JSON.stringify(filtered));
    }
  }, []);

  return (
    <div className="mypage__recent__main">
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
              <div className="mypage__recent__item" key={index}>
                <ReviewListItem
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
