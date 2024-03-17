import React, { useState } from 'react';
import { Search, FilterSquare, XLg } from 'react-bootstrap-icons';
import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import ReviewSearchFilter from '../ReviewSearchFilter/ReviewSearchFilter';
import './ReviewSearchBar.scss';

function ReviewSearchBar() {
  const [search, setSearch] = useRecoilState(searchState);
  const [filterOpen, setFilterOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const onClickEnter = () => {
    console.log('Enter!');
    setSearch({
      ...search,
      searchType: 'keyword',
      keyword,
    });
    setKeyword('');
  };

  const handleChangeInput = (e) => {
    setKeyword(e.target.value);
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
          onKeyDown={(e) => e.key === 'Enter' && onClickEnter()}
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
