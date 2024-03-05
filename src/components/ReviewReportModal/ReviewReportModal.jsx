import { useState, useContext } from 'react';
import ReviewReportModalBody from '../ReviewReportModalBody';
import LightModal from '../common/LightModal';
import { SidebarContext } from '@contexts/SidebarContext';

import './ReviewReportModal.scss';

function ReviewReportModal() {
  const [reportType, setReportType] = useState(null);
  const { createReviewObj, setCreateReviewObj } = useContext(SidebarContext);

  const handleClose = () => {
    setCreateReviewObj({ ...createReviewObj, reportModalOpen: false });
  };

  const items = [
    {
      reportTypeId: 1,
      reportTypeName: '신고사유1입니다.신고사유1입니다.신고사유1입니다.',
    },
    {
      reportTypeId: 2,
      reportTypeName: '신고사유2입니다.신고사유1입니다.신고사유1입니다.',
    },
    {
      reportTypeId: 3,
      reportTypeName: '신고사유3입니다.신고사유1입니다.신고사유1입니다.',
    },
    {
      reportTypeId: 4,
      reportTypeName: '신고사유4입니다.신고사유1입니다.신고사유1입니다.',
    },
    {
      reportTypeId: 5,
      reportTypeName: '신고사유5입니다.신고사유1입니다.신고사유1입니다.',
    },
  ];

  const onClickItem = (value) => {
    setReportType(value);
  };

  const onClickSubmit = () => {
    if (!reportType) {
      return;
    }

    handleClose();
  };

  return (
    <LightModal
      params={{
        handleClose,
      }}
    >
      <ReviewReportModalBody
        reportType={reportType}
        items={items}
        onClickItem={onClickItem}
        onClickSubmit={onClickSubmit}
      />
    </LightModal>
  );
}

export default ReviewReportModal;
