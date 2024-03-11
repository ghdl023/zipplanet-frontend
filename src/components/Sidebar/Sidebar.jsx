import React, { useState }  from 'react';
import { Layout } from 'antd';
import { Tooltip } from 'react-tooltip';
import { X, PencilSquare } from 'react-bootstrap-icons';
import { useRecoilValue } from 'recoil';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import { SidebarContext } from '@contexts/SidebarContext';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewReportModal from '@components/ReviewReportModal';
import { userInfoState } from '../../recoil/userInfoState';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import './Sidebar.scss';

const { Sider } = Layout;

function Sidebar() {
  const reviewDetailValue = useRecoilValue(reviewDetailState);
  const [createReviewObj, setCreateReviewObj] = useState({
    modalOpen: false, // 리뷰생성
    reportModalOpen: false, // 리뷰신고
  });

  const userInfo = useRecoilValue(userInfoState);

  return (
    <SidebarContext.Provider
      value={{
        createReviewObj,
        setCreateReviewObj,
      }}
    >
      <Sider className="sidebar__container">
        <SidebarHeader />
        <SidebarMain />
        { (reviewDetailValue && reviewDetailValue.reviewId) && <ReviewDetail /> }
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
