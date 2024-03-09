import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import { SidebarContext } from '@contexts/SidebarContext';
import { useContext, useEffect, useState } from 'react';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewReportModal from '@components/ReviewReportModal';
import { X, PencilSquare } from 'react-bootstrap-icons';
import { searchByFilterReviews } from '../../apis/api/review';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import { Tooltip } from 'react-tooltip';
import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import './Sidebar.scss';

const { Sider } = Layout;

function Sidebar() {
  const [reviewDetail, setReviewDetail] = useState(null); // 리뷰상세
  const [createReviewObj, setCreateReviewObj] = useState({
    modalOpen: false, // 리뷰생성
    reportModalOpen: false, // 리뷰신고
  });

  const [search, setSearch] = useRecoilState(searchState);
  const { gu, dong, contractTypeId, rate } = search;

  const { setReviewList } = useContext(PageLayoutContext);

  useEffect(() => {}, []);

  useEffect(() => {
    // console.log('reviewDetail 변경됨!');
  }, [reviewDetail]);

  useEffect(() => {
    async function getReviewList() {
      const res = await searchByFilterReviews({
        gu,
        dong,
        contractTypeId,
        rate,
      });
      console.log(res);
      if (res.status.toLowerCase() === 'ok') {
        setReviewList(res.data);
      }
    }
    getReviewList();
  }, [gu, dong, contractTypeId, rate]);

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
      <Tooltip id="tooltip" />
    </SidebarContext.Provider>
  );
}

export default Sidebar;
