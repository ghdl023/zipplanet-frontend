import React, { useContext } from 'react';
import ReviewSortButton from '@components/ReviewSortButton';
import './ReviewSortBar.scss';
import { SidebarContext } from '../../contexts/SidebarContext';

function ReviewSortBar() {
  const sortBtnList = [
    { label: '최신순', value: 'create_Date' },
    { label: '평점순', value: 'total_Rate' },
    { label: '좋아요순', value: 'like_Count' },
  ];
  const { setOrder } = useContext(SidebarContext);

  const onClickSortButton = async (value) => {
    setOrder(value);
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
