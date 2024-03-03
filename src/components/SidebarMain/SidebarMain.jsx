import ReviewListWrapper from '@components/ReviewListWrapper';
import ReviewList from '@components/ReviewList';

import './SidebarMain.scss';

function SidebarMain() {
  return (
    <div className="sidebar__main">
      {/* <ReviewListWrapper /> */}
      <ReviewList />
    </div>
  );
}

export default SidebarMain;
