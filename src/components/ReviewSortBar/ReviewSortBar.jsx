import React, { useContext } from 'react';
import ReviewSortButton from '@components/ReviewSortButton';
import { searchByFilterReviews } from '../../apis/api/review';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import './ReviewSortBar.scss';

function ReviewSortBar() {
  const sortBtnList = [
    { label: '좋아요순', value: 'LIKE_COUNT' },
    { label: '평점순', value: 'TOTAL_RATE' },
    { label: '최신순', value: 'CREATE_DATE' },
  ];

  const [search, setSearch] = useRecoilState(searchState);
  const { setReviewList } = useContext(PageLayoutContext);

  const onClickSortButton = async (value) => {
    console.log(value);
    setSearch({
      ...search,
      sort: value,
    });

    const res = await searchByFilterReviews({
      sort: value,
    });
    console.log(res);
    if (res.status.toLowerCase() == 'ok') {
      setReviewList(res.data);
    }
  };

  return (
    <div className="review__sort__bar">
      {sortBtnList.map((btn, index) => (
        <ReviewSortButton key={index} btn={btn} onClick={onClickSortButton} />
      ))}
    </div>
  );
}

export default React.memo(ReviewSortBar);
