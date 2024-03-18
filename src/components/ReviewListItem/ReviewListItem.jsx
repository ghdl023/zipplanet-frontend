import { useRef, useState, forwardRef, useEffect } from 'react';
import { Heart, HeartFill, StarFill } from 'react-bootstrap-icons';
import { useRecoilValue } from 'recoil';
import _ from 'lodash';
import { updateZzimYn } from '../../apis/api/review';
import { userInfoState } from '../../recoil/userInfoState';
import { getRandomThumbnailImage } from '../../utils/common';
import './ReviewListItem.scss';

const ReviewListItem = forwardRef(
  ({ review, onClickReviewItem, onToggleFavorite }, ref) => {
    const { userId } = useRecoilValue(userInfoState);
    const { reviewId, zzimYn } = review;
    const [favorite, setFavorite] = useState(false); // 초기값을 prop으로 설정하면 안됨
    const favoriteRef = useRef(false);

    useEffect(() => {
      const isFavorite = zzimYn === 'Y';
      setFavorite(isFavorite);
      favoriteRef.current = isFavorite;
    }, [zzimYn]);

    const onClickFavorite = async () => {
      setFavorite((prev) => !prev);
      favoriteRef.current = !favoriteRef.current;

      const zzimYn = favoriteRef.current ? 'Y' : 'N';
      await updateZzimYn({
        // 찜상태 업데이트
        userId,
        reviewId,
        zzimYn,
      });

      if (onToggleFavorite) {
        onToggleFavorite(reviewId, favoriteRef.current); // 리뷰목록 찜상태 업데이트 해주기
      }

      if (localStorage.getItem('watched')) {
        // 최근 본리뷰 업데이트
        const watched = JSON.parse(localStorage.getItem('watched'));
        const findIndex = _.findIndex(watched, { reviewId });
        if (findIndex != -1) {
          watched[findIndex].zzimYn = zzimYn;
          localStorage.setItem('watched', JSON.stringify(watched));
        }
      }
    };

    return (
      <div className="review__list__item" onClick={onClickReviewItem} ref={ref}>
        {userId && (
          <div
            className={`review__list__item__favorite ${favorite ? 'fill' : ''}`}
          >
            <button onClick={onClickFavorite}>
              {favorite ? <HeartFill /> : <Heart />}
            </button>
          </div>
        )}
        <div className="review__list__item__thumb">
          <img src={getRandomThumbnailImage()} />
        </div>
        <div className="review__list__item__content">
          <h5>{review.jibun}</h5>
          <h3>{review.title}</h3>
          <p>{review.description}</p>
        </div>
        <div className="review__list__item__footer">
          <div className="review__list__item__footer__like">
            <span>좋아요 {review.likeCount}</span>
          </div>
          <div className="review__list__item__footer__rate">
            <span>
              <StarFill className="star-icon" /> {review.totalRate.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    );
  },
);
ReviewListItem.displayName = 'ReviewListItem';

export default ReviewListItem;
