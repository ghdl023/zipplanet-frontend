import React, { useContext } from 'react';
import ReviewSearchFilterItemBox from '@components/ReviewSearchFilterItemBox';
import GuDongListPopup from '@components/GuDongListPopup';
import { SidebarContext } from '@contexts/SidebarContext';

import './ReviewSearchFilter.scss';

function ReviewSearchFilter() {
  const { searchFilterObj, setSearchFilterObj } = useContext(SidebarContext);
  const { gu, dong, guDongListPopupType, contractType, rate } = searchFilterObj;

  const gudongBtnList = [
    { type: 'gu', label: gu === '' ? '전체' : gu },
    { type: 'dong', label: dong === '' ? '전체' : dong },
  ];
  // console.log(gudongBtnList);

  const contractTypeBtnList = [
    { label: '전체', value: '', isActive: contractType == '' },
    { label: '월세', value: 1, isActive: contractType == 1 },
    { label: '전세', value: 2, isActive: contractType == 2 },
  ];

  const scoreBtnList = [
    { label: '5점 이하', value: 5, isActive: rate === 5 },
    { label: '4점 이하', value: 4, isActive: rate === 4 },
    { label: '3점 이하', value: 3, isActive: rate === 3 },
    { label: '2점 이하', value: 2, isActive: rate === 2 },
    { label: '1점 이하', value: 1, isActive: rate === 1 },
  ];

  const handleClickReset = () => {
    setSearchFilterObj({
      ...searchFilterObj,
      gu: '',
      dong: '',
      contractType: '',
      rate: 5,
    });
  };

  return (
    <div className="review__search__filter">
      <div className="review__search__filter__header">
        <div className="review__search__filter__header__title">
          <h3>필터 설정하기</h3>
          <button onClick={handleClickReset}>초기화</button>
        </div>
        <div className="review__search__filter__header__desc">
          <p>필터 설정을 통해 원하시는 조건의 리뷰만 골라서 보세요!</p>
        </div>
      </div>
      <div className="review__search__filter__main">
        <ReviewSearchFilterItemBox title="구/동" itemList={gudongBtnList} />
        {guDongListPopupType !== '' && <GuDongListPopup />}
        <ReviewSearchFilterItemBox
          title="거래유형"
          itemList={contractTypeBtnList}
        />
        <ReviewSearchFilterItemBox title="평점" itemList={scoreBtnList} />
      </div>
    </div>
  );
}

export default React.memo(ReviewSearchFilter);
