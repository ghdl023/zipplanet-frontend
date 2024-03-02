import React from 'react';
import ReviewSortButton from '@components/ReviewSortButton';

import './ReviewSortBar.scss';

const sortBtnList = [
  { label: '추천순', value: 'DEFAULT' },
  { label: '평점순', value: 'CHECK_RATE' },
  { label: '최신순', value: 'CHECK_DATE' },
];

function ReviewSortBar() {
  return (
    <div className="review__sort__bar">
      {sortBtnList.map((btn, index) => (
        <ReviewSortButton key={index} btn={btn} />
      ))}
    </div>
  );
}

export default React.memo(ReviewSortBar);
