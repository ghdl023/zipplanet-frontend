import ReviewSearchBar from '@components/ReviewSearchBar';
import ReviewSortBar from '@components/ReviewSortBar';

import './SidebarHeader.scss';

function SidebarHeader() {
  return (
    <div className="sidebar__header">
      <ReviewSearchBar />
      <ReviewSortBar />
    </div>
  );
}

export default SidebarHeader;
