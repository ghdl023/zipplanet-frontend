import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';
import ReviewDetail from '@components/ReviewDetail';
import { SidebarContext } from '@contexts/SidebarContext';

import './Sidebar.scss';
import { useContext, useEffect, useState } from 'react';
import ReviewCreateModal from '../ReviewCreateModal';
import ReviewReportModal from '@components/ReviewReportModal';
import { HouseAdd, X, PencilSquare } from 'react-bootstrap-icons';
import { searchByFilterReviews } from '../../apis/api/review';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import { Tooltip } from 'react-tooltip';

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
    modalOpen: false, // 리뷰생성
    reportModalOpen: false, // 리뷰신고
  });

  const { setReviewList } = useContext(PageLayoutContext);

  useEffect(() => {}, []);

  useEffect(() => {
    // console.log('reviewDetail 변경됨!');
  }, [reviewDetail]);

  useEffect(() => {
    const { gu, dong, contractType, rate } = searchFilterObj;
    async function search() {
      const res = await searchByFilterReviews({
        gu,
        dong,
        contractTypeId: contractType,
        rate,
      });
      console.log(res);

      if (res.status.toLowerCase() === 'ok') {
        setReviewList(res.data);
      }
    }
    search();
  }, [
    searchFilterObj.gu,
    searchFilterObj.dong,
    searchFilterObj.contractType,
    searchFilterObj.rate,
  ]);

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
