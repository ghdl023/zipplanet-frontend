import { useState } from 'react';
import ReviewSearchBar from '@components/ReviewSearchBar';
import ReviewSortBar from '@components/ReviewSortBar';
import ReviewSearchFilter from '@components/ReviewSearchFilter';
import { SidebarHeaderContext } from '@contexts/SidebarHeaderContext';

import './SidebarHeader.scss';

function SidebarHeader() {
  const [openSearchFilter, setOpenSearchFilter] = useState(false);
  const [sort, setSort] = useState('DEFAULT');

  return (
    <SidebarHeaderContext.Provider
      value={{ openSearchFilter, setOpenSearchFilter, sort, setSort }}
    >
      <div className="review__search__header">
        <ReviewSearchBar />
        {openSearchFilter && <ReviewSearchFilter />}
        <ReviewSortBar />
      </div>
    </SidebarHeaderContext.Provider>
  );
}

export default SidebarHeader;
