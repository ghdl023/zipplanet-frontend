import React, { useState, useContext } from 'react';
import { Search, FilterSquare, XLg } from 'react-bootstrap-icons';
import { SidebarHeaderContext } from '@contexts/SidebarHeaderContext';
import { searchByFilterReviews } from '../../apis/api/review';
import './ReviewSearchBar.scss';
import { SidebarContext } from '../../contexts/SidebarContext';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';

function ReviewSearchBar() {

  const [searchInput, setSearchInput] = useState('');
  const { searchFilterObj : { gu, dong, contractType, rate }  } = useContext(SidebarContext);
  const { setReviewList } = useContext(PageLayoutContext);

  const { openSearchFilter, setOpenSearchFilter } =
    useContext(SidebarHeaderContext);

  const handleClickFilter = () => {
    setOpenSearchFilter((prevOpenSearchFilter) => !prevOpenSearchFilter);
  };

  const search = async () => {
      
     const res = await searchByFilterReviews({
        keyword: searchInput,
        // gu: '',
        // dong: '',
        // contractTypeId: '',
        // rate: 5
     });

     console.log(res);
     if(res.status.toLowerCase() == 'ok') {
        setReviewList(res.data);
     }
     
  }

  return (
    <div className="review__searchbar">
      <div className="review__searchbar__search">
        <Search />
      </div>
      <div className="review__searchbar__input">
        <input type="text" placeholder="지번 검색" value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && search()}/>
      </div>
      <div className="review__searchbar__filter" onClick={handleClickFilter}>
        <button>
          {!openSearchFilter ? (
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
