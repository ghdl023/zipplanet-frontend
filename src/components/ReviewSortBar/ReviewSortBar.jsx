import React from 'react';
import ReviewSortButton from '@components/ReviewSortButton';
import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import './ReviewSortBar.scss';

function ReviewSortBar() {
  const sortBtnList = [
    { label: '좋아요순', value: 'likeCount' },
    { label: '평점순', value: 'totalRate' },
    { label: '최신순', value: 'createDate' },
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
