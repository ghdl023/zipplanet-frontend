import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import CreateReviewPopup from '@components/CreateReviewPopup';
import { SidebarContext } from '@contexts/SidebarContext';

import './Sidebar.scss';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

function Sidebar() {
  const [reviewDetail, setReviewDetail] = useState(null); // 리뷰상세
  const [searchFilterObj, setSearchFilterObj] = useState({
    // 검색창 필터설정하기 관련 변수
    gu: '', // 선택 '구'
    dong: '', // 선택 '동'
    guDongListPopupType: '', // '구/동 목록 팝어 노출여부'  => '' : 숨김 /  'gu' or 'dong' : 노출
    contractType: '', // 거래 유형 => 전체: '' / 월세: 1 / 전세: 2
    rate: 5, // 평점
  });
  const [createReviewObj, setCreateReviewObj] = useState({
    modalOpen: true,
  })

  useEffect(() => {}, []);

  useEffect(() => {
    // console.log('reviewDetail 변경됨!');
  }, [reviewDetail]);

  return (
    <SidebarContext.Provider
      value={{
        reviewDetail,
        setReviewDetail,
        searchFilterObj,
        setSearchFilterObj,
        createReviewObj,
        setCreateReviewObj,
      }}
    >
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
      { createReviewObj.modalOpen && <CreateReviewPopup /> }
    </SidebarContext.Provider>
  );
}

export default Sidebar;
