import ReviewListItem from '@components/ReviewListItem';
// import { ArrowClockwise } from 'react-bootstrap-icons';
import './ReviewList.scss';

function ReviewList() {
  return (
    <>
      <div className="reivew__list__container">
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
        <ReviewListItem />
      </div>
      <div className="review__list__loading__container">
        {/* <div className="loading__icon">
          <ArrowClockwise />
        </div>
        <h2>리뷰를 추가로 불러옵니다.</h2>
        <h3>
          잠시만 기다려 주세요! 장시간 불러오지 못하는 경우 새로고침 해주세요.
        </h3> */}
      </div>
    </>
  );
}

export default ReviewList;
