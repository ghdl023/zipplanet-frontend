import React, { useContext } from 'react';
import { Search, FilterSquare, XLg } from 'react-bootstrap-icons';
import { SidebarHeaderContext } from '@contexts/SidebarHeaderContext';

import './ReviewSearchBar.scss';

function ReviewSearchBar() {
  const { openSearchFilter, setOpenSearchFilter } =
    useContext(SidebarHeaderContext);

  const handleClickFilter = () => {
    setOpenSearchFilter((prevOpenSearchFilter) => !prevOpenSearchFilter);
  };

  return (
    <div className="review__searchbar">
      <div className="review__searchbar__search">
        <Search />
      </div>
      <div className="review__searchbar__input">
        <input type="text" placeholder="지번 검색" />
      </div>
      <div className="review__searchbar__filter" onClick={handleClickFilter}>
        <button>
          {openSearchFilter ? (
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
    </div>
  );
}

export default React.memo(ReviewSearchBar);
