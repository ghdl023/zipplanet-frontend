import React, { useState, useContext } from 'react';
import { Search, FilterSquare, XLg } from 'react-bootstrap-icons';
import { searchByFilterReviews } from '../../apis/api/review';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import ReviewSearchFilter from '../ReviewSearchFilter/ReviewSearchFilter';
import './ReviewSearchBar.scss';

function ReviewSearchBar() {
  const [search, setSearch] = useRecoilState(searchState);
  const [filterOpen, setFilterOpen] = useState(false);

  const { setReviewList } = useContext(PageLayoutContext);

  const getReviewList = async () => {
    const res = await searchByFilterReviews({
      keyword: search.keyword,
    });

    console.log(res);
    if (res.status.toLowerCase() == 'ok') {
      setReviewList(res.data);
    }
  };

  const handleChangeInput = (e) => {
    setSearch({
      ...search,
      keyword: e.target.value,
    });
  };

  return (
    <div className="review__searchbar">
      <div className="review__searchbar__search">
        <Search />
      </div>
      <div className="review__searchbar__input">
        <input
          type="text"
          placeholder="지번 검색"
          onChange={handleChangeInput}
          onKeyDown={(e) => e.key === 'Enter' && getReviewList()}
        />
      </div>
      <div
        className="review__searchbar__filter"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <button>
          {!filterOpen ? (
            <>
              <FilterSquare />
              &nbsp;
              <span>필터</span>
            </>
          ) : (
            <>
              <XLg />
              &nbsp;
              <span>닫기</span>
            </>
          )}
        </button>
      </div>
      {filterOpen && <ReviewSearchFilter />}
    </div>
  );
}

export default React.memo(ReviewSearchBar);
