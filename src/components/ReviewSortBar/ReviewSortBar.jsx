import React from 'react';
import ReviewSortButton from '@components/ReviewSortButton';
import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import './ReviewSortBar.scss';

function ReviewSortBar() {
  const sortBtnList = [
    { label: '최신순', value: 'create_Date' },
    { label: '평점순', value: 'total_Rate' },
    { label: '좋아요순', value: 'like_Count' },
  ];

  const [search, setSearch] = useRecoilState(searchState);

  const onClickSortButton = async (value) => {
    console.log(value);
    setSearch({
      ...search,
      sort: value,
    });
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
