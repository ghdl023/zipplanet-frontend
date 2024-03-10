import React from 'react';
import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import { SidebarContext } from '@contexts/SidebarContext';
import { useState } from 'react';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewReportModal from '@components/ReviewReportModal';
import { X, PencilSquare } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/userInfoState';
import './Sidebar.scss';

const { Sider } = Layout;

function Sidebar() {
  const [reviewDetail, setReviewDetail] = useState(null); // 리뷰상세
  const [createReviewObj, setCreateReviewObj] = useState({
    modalOpen: false, // 리뷰생성
    reportModalOpen: false, // 리뷰신고
  });

  const userInfo = useRecoilValue(userInfoState);

  return (
    <SidebarContext.Provider
      value={{
        reviewDetail,
        setReviewDetail,
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
      {createReviewObj.modalOpen && <ReviewCreateModal />}
      {createReviewObj.reportModalOpen && <ReviewReportModal />}
      {userInfo.userId && (
        <div
          id="review__add__btn"
          onClick={() =>
            setCreateReviewObj({
              ...createReviewObj,
              modalOpen: !createReviewObj.modalOpen,
            })
          }
          data-tooltip-id="tooltip"
          data-tooltip-content="새 리뷰 작성"
        >
          {createReviewObj.modalOpen ? <X /> : <PencilSquare />}
        </div>
      )}
      <Tooltip id="tooltip" />
    </SidebarContext.Provider>
  );
}

export default Sidebar;
