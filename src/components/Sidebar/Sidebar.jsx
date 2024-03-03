import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import { SidebarContext } from '@contexts/SidebarContext';

import './Sidebar.scss';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

function Sidebar() {
  const [reviewDetail, setReviewDetail] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    // console.log('reviewDetail 변경됨!');
  }, [reviewDetail]);

  return (
    <SidebarContext.Provider value={{ reviewDetail, setReviewDetail }}>
      <Sider className="sidebar__container">
        {!reviewDetail ? (
          <>
            <SidebarHeader />
            <SidebarMain />
          </>
        ) : (
          <>
            <ReviewDetail />
          </>
        )}
      </Sider>
    </SidebarContext.Provider>
  );
}

export default Sidebar;
