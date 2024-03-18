import { useRef, useState, useEffect, useContext } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import moment from 'moment';
import _ from 'lodash';
import ReviewListItem from '@components/ReviewListItem';
import Loading from '../common/Loading';
import { search } from '../../apis/api/review';
import { searchState } from '../../recoil/searchState';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import { reviewListState } from '../../recoil/reviewListState';
import { SidebarContext } from '../../contexts/SidebarContext';
import './ReviewList.scss';

const LIMIT = 100;

function ReviewList() {
  const setReviewDetail = useSetRecoilState(reviewDetailState);
  const searchValue = useRecoilValue(searchState);
  const [offset, setOffset] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [items, setItems] = useRecoilState(reviewListState);
  const [target, setTarget] = useState(null); // 구독할 대상 (target을 지켜보고 있다가 이 target이 정해진 threshold 비율만큼 보이면 지정한 행동을 합니다. )

  const { order } = useContext(SidebarContext);
  const sortedItems = [...items].sort(
    (a, b) => b[order.replace('_', '')] - a[order.replace('_', '')],
  );
  const totalCount = useRef(0);

  const handleLoad = (options) => {
    let result;
    setLoadingError(null);
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const params = {
          ...options,
          ...searchValue,
          sort: order,
        };
        // console.log(params);

        if (options.offset > 1 && options.offset >= totalCount.current) {
          totalCount.current = 0;
          setHasNext(false);
          return;
        }

        result = await search(params);
        const { data } = result;

        for (let review of data.reviews) {
          // 날짜 포맷 변환
          // console.log(review.createDate);
          if (review.createDate)
            review.createDate = moment(review.createDate).format(
              'YYYYMMDDHHmmss',
            );
          if (review.updateDate)
            review.updateDate = moment(review.updateDate).format(
              'YYYYMMDDHHmmss',
            );
          if (review.startDate)
            review.startDate = moment(review.startDate).format('YYYYMMDD');
          if (review.endDate)
            review.endDate = moment(review.endDate).format('YYYYMMDD');
        }

        if (options.offset === 1) {
          setItems(data.reviews);
        } else {
          setItems([...items, ...data.reviews]);
        }
        setOffset(options.offset + options.limit);  
        // console.log(options.offset + options.limit);
        totalCount.current = data.totalCount;
        const _hasNext = data.totalCount > options.offset + options.limit;
        setHasNext(_hasNext);
      } catch (error) {
        setLoadingError(error);
        return;
      } finally {
        setIsLoading(false);
      }
    }, 2500);
  };

  useEffect(() => {
    let options = {
      threshold: '1',
    };

    // 새롭게 생성할 observer가 수행할 행동 정의
    let handleIntersection = async ([entries], observer) => {
      if (entries.isIntersecting) {
        hasNext && (await handleLoad({ offset: offset, limit: LIMIT }));
        observer.unobserve(entries.target);
      }
    };

    // 새로운 observer 생성
    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);
    return () => io && io.disconnect();
  }, [target, offset]);

  useEffect(() => {
    handleLoad({ offset: 1, limit: LIMIT });
  }, [searchValue]);

  const onClickReviewItem = (e, review) => {
    if (e.target.closest('.review__list__item__favorite')) {
      // favorite 클릭시
      e.preventDefault();
      return false;
    }
    setReviewDetail(review);
  };

  const handleToggleFavorite = (reviewId, zzimYn) => {
    let findIndex = _.findIndex(items, { reviewId });
    let copyItems = [...items];
    if (findIndex != -1) {
      copyItems[findIndex] = {
        ...copyItems[findIndex],
        zzimYn: zzimYn ? 'Y' : 'N',
      };
      setItems(copyItems);
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          {sortedItems && sortedItems.length > 0 ? (
            <div className="reivew__list__container">
              {sortedItems.map((review, idx) => {
                const lastItem = idx === sortedItems.length - 2;
                return (
                  <ReviewListItem
                    key={idx}
                    review={review}
                    onClickReviewItem={(e) => onClickReviewItem(e, review)}
                    onToggleFavorite={handleToggleFavorite}
                    ref={lastItem ? setTarget : null}
                  />
                );
              })}
            </div>
          ) : (
            <div className="review__list__noresult">
              <h3>😅 검색되는 리뷰가 없습니다.</h3>
              <p>검색어 또는 필터를 변경해주세요.</p>
            </div>
          )}
        </>
      )}
      {isLoading && (
        <div className="review__list__loading__container">
          <div className="loading__icon">
            <Loading />
          </div>
          <h2>리뷰를 불러오는 중입니다.</h2>
        </div>
      )}
    </>
  );
}

export default ReviewList;
