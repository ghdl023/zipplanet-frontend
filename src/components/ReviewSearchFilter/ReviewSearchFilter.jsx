import React from 'react';
import ReviewSearchFilterItemBox from '@components/ReviewSearchFilterItemBox';

import './ReviewSearchFilter.scss';

const gudongBtnList = [
  { type: 'gu', label: '강남구' },
  { type: 'dong', label: '논현동' },
];

const contractsBtnList = [
  { label: '전체', value: 'all', isActive: true },
  { label: '월세', value: 1, isActive: false },
  { label: '전세', value: 2, isActive: false },
];

const scoreBtnList = [
  { label: '5점 이하', value: 5, isActive: true },
  { label: '4점 이하', value: 4, isActive: false },
  { label: '3점 이하', value: 3, isActive: false },
  { label: '2점 이하', value: 2, isActive: false },
  { label: '1점 이하', value: 1, isActive: false },
];

function ReviewSearchFilter() {
  return (
    <div className="review__search__filter">
      <div className="review__search__filter__header">
        <div className="review__search__filter__header__title">
          <h3>필터 설정하기</h3>
          <button>초기화</button>
        </div>
        <div className="review__search__filter__header__desc">
          <p>필터 설정을 통해 원하시는 조건의 리뷰만 골라서 보세요!</p>
        </div>
      </div>
      <div className="review__search__filter__main">
        <ReviewSearchFilterItemBox title="구/동" itemList={gudongBtnList} />
        <ReviewSearchFilterItemBox
          title="거래유형"
          itemList={contractsBtnList}
        />
        <ReviewSearchFilterItemBox title="평점" itemList={scoreBtnList} />
      </div>
    </div>
  );
}

export default React.memo(ReviewSearchFilter);
