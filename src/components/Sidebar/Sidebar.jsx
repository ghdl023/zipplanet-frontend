import React, { useState }  from 'react';
import { Layout } from 'antd';
import { Tooltip } from 'react-tooltip';
import { X, PencilSquare } from 'react-bootstrap-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewReportModal from '@components/ReviewReportModal';
import { userInfoState } from '../../recoil/userInfoState';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import { modalState } from '../../recoil/modalState';
import './Sidebar.scss';

const { Sider } = Layout;

function Sidebar() {
  const reviewDetailValue = useRecoilValue(reviewDetailState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const { reviewCreateModalOpen, reviewReportModalOpen } =  modalOpen;
  const userInfo = useRecoilValue(userInfoState);
  return (
      <>
        <Sider className="sidebar__container">
          <SidebarHeader />
          <SidebarMain />
          { (reviewDetailValue && reviewDetailValue.reviewId) && <ReviewDetail /> }
        </Sider>
        {reviewCreateModalOpen && <ReviewCreateModal />}
        {reviewReportModalOpen && <ReviewReportModal />}
        {userInfo.userId && (
          <div
            id="review__add__btn"
            onClick={() =>
              setModalOpen({
                ...modalOpen,
                reviewCreateModalOpen: !reviewCreateModalOpen,
              })
            }
            data-tooltip-id="tooltip"
            data-tooltip-content="새 리뷰 작성"
          >
            {reviewCreateModalOpen ? <X /> : <PencilSquare />}
          </div>
        )}
        <Tooltip id="tooltip" />
      </>
  );
}

export default Sidebar;
