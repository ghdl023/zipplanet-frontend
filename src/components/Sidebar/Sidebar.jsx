import React, { useState, useEffect, createContext } from 'react';
import { Layout } from 'antd';
import { Tooltip } from 'react-tooltip';
import { X, PencilSquare } from 'react-bootstrap-icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import _ from 'lodash';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import ReviewReportModal from '@components/ReviewReportModal';
import { userInfoState } from '../../recoil/userInfoState';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import { modalState } from '../../recoil/modalState';
import { SidebarContext } from '../../contexts/SidebarContext';
import './Sidebar.scss';

const { Sider } = Layout;

function Sidebar() {
  const reviewDetailValue = useRecoilValue(reviewDetailState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const { reviewCreateModalOpen, reviewReportModalOpen } = modalOpen;
  const userInfo = useRecoilValue(userInfoState);

  const [order, setOrder] = useState('create_Date');

  // 최근 본 리뷰 저장하기
  useEffect(() => {
    const reviewDetail = { ...reviewDetailValue };
    const { reviewId, userId } = reviewDetail;
    if (userId) reviewDetail.userId = '';

    if (reviewId) {
      const ls = localStorage.getItem('watched');
      // console.log(ls)
      // const lsArr = JSON.parse(ls).reverse(); // 사용시에는 reverse

      let arr = JSON.parse(ls);
      if (!_.find(arr, { reviewId })) {
        if (arr.length === 5) {
          arr.shift();
        }
        arr.push(reviewDetail);
      } else {
        arr = arr.filter((el) => {
          return el.reviewId !== reviewId;
        });
        arr.push(reviewDetail);
      }
      localStorage.setItem('watched', JSON.stringify(arr));
    }
  }, [reviewDetailValue]);

  return (
    <SidebarContext.Provider value={{ order, setOrder }}>
      <Sider className="sidebar__container">
        <SidebarHeader />
        <SidebarMain />
        {reviewDetailValue && reviewDetailValue.reviewId && <ReviewDetail />}
      </Sider>
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
          data-tooltip-id="add-btn-tooltip"
          data-tooltip-content="새 리뷰 작성"
        >
          {reviewCreateModalOpen ? <X /> : <PencilSquare />}
        </div>
      )}
      <Tooltip id="add-btn-tooltip" className="tooltip" />
    </SidebarContext.Provider>
  );
}

export default Sidebar;
