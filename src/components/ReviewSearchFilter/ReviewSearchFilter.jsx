import React, { useEffect, useState } from 'react';
import ReviewSearchFilterItemBox from '@components/ReviewSearchFilterItemBox';
import GuDongList from '@components/GuDongList';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import './ReviewSearchFilter.scss';

function ReviewSearchFilter() {
  const [search, setSearch] = useRecoilState(searchState);
  const resetSearch = useResetRecoilState(searchState);
  const { gu, dong, contractTypeId, rate } = search;
  const [gudongType, setGudongType] = useState(''); // 이 값에따라 GudongListPopup 리스트 초기화 ('', 'gu', 'dong')

  const list_gudong = [
    { type: 'gu', label: gu || '전체' },
    { type: 'dong', label: dong || '전체' },
  ];
  // console.log(gudongBtnList);

  const list_contractType = [
    { label: '전체', value: '', isActive: contractTypeId == '' },
    { label: '월세', value: 1, isActive: contractTypeId == 1 },
    { label: '전세', value: 2, isActive: contractTypeId == 2 },
  ];

  const list_rate = [
    { label: '5점 이하', value: 5, isActive: rate === 5 },
    { label: '4점 이하', value: 4, isActive: rate === 4 },
    { label: '3점 이하', value: 3, isActive: rate === 3 },
    { label: '2점 이하', value: 2, isActive: rate === 2 },
    { label: '1점 이하', value: 1, isActive: rate === 1 },
  ];

  const handleClickReset = () => {
    resetSearch();
  };

  const onClickGudongType = (gudongType) => {
    setGudongType(
      (prev) =>
        prev === ''
          ? gudongType
          : prev === gudongType // 타입이 같을때
            ? ''
            : gudongType, // 'gu' or 'dong'
    );
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
        <ReviewSearchFilterItemBox
          title="구/동"
          itemList={list_gudong}
          onClickGudongType={onClickGudongType}
        />
        {gudongType !== '' && (
          <GuDongList
            gudongType={gudongType}
            onClickGudongType={onClickGudongType}
          />
        )}
        <ReviewSearchFilterItemBox
          title="거래유형"
          itemList={list_contractType}
        />
        <ReviewSearchFilterItemBox title="평점" itemList={list_rate} />
      </div>
    </div>
  );
}

export default React.memo(ReviewSearchFilter);
