import ReviewListItem from '@components/ReviewListItem';
import { useContext, useState, useEffect } from 'react';
import { SidebarContext } from '../../contexts/SidebarContext';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import Loading from '../common/Loading';
import { searchByFilterReviews } from '../../apis/api/review';
import './ReviewList.scss';

const LIMIT = 6;

function ReviewList() {
  const { setReviewDetail } = useContext(SidebarContext);
  const { reviewList } = useContext(PageLayoutContext);

  const [order, setOrder] = useState('LIKE_COUNT');
  const [offset, setOffset] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [items, setItems] = useState([]);
  const [target, setTarget] = useState(null); // 구독할 대상 (target을 지켜보고 있다가 이 target이 정해진 threshold 비율만큼 보이면 지정한 행동을 합니다. )
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const [totalCount, setTotalCount] = useState(0);
  const handleLoad = async (options) => {
    let result;
    try {
      setLoadingError(null);
      setIsLoading(true);

      if (totalCount > 0 && !(totalCount > items.length)) {
        setHasNext(false);
        return;
      }
      result = await searchByFilterReviews(options);
      // const { paging, reviews } = result;
      const { data } = result;
      if (options.offset === 0) {
        setItems(data.reviews);
      } else {
        setItems([...items, ...data.reviews]);
      }
      setOffset(options.offset + options.limit);

      setTotalCount(data.totalCount);
      const _hasNext = data.totalCount > items.length;
      console.log(_hasNext);
      setHasNext(_hasNext); //paging.hasNext
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let options = {
      threshold: '1',
    };

    // 새롭게 생성할 observer가 수행할 행동 정의
    let handleIntersection = async ([entries], observer) => {
      if (entries.isIntersecting) {
        hasNext && (await handleLoad({ order, offset: offset, limit: LIMIT }));
        observer.unobserve(entries.target);
      }
    };

    // 새로운 observer 생성
    const io = new IntersectionObserver(handleIntersection, options);
    if (target) io.observe(target);
    return () => io && io.disconnect();
  }, [target, offset]);

  useEffect(() => {
    handleLoad({ order, offset: 1, limit: LIMIT });
  }, []);

  const handleClickReview = (review) => {
    // console.log(review);
    setReviewDetail(review);
  };

  return (
    <>
      {items && items.length > 0 ? (
        <div className="reivew__list__container">
          {items.map((review, idx) => {
            const lastItem = idx === items.length - 2;
            return (
              <ReviewListItem
                key={idx}
                review={review}
                onClick={handleClickReview}
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
      {hasNext && (
        <div className="review__list__loading__container">
          <div className="loading__icon">
            <Loading />
          </div>
          <h2>리뷰를 추가로 불러옵니다.</h2>
        </div>
      )}
    </>
  );
}

export default ReviewList;
