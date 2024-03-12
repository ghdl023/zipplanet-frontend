import { useState } from 'react';
import toast from 'react-hot-toast';
import ReviewReportModalBody from '../ReviewReportModalBody';
import LightModal from '../common/LightModal';
import { modalState } from '../../recoil/modalState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { reportReview } from '../../apis/api/review';
import { userInfoState } from '../../recoil/userInfoState';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import './ReviewReportModal.scss';

function ReviewReportModal() {
  const [reportType, setReportType] = useState(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const { reviewId } = useRecoilValue(reviewDetailState);
  const { userId } = useRecoilValue(userInfoState);

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
      reportTypeId: 99,
      reportTypeName: '기타',
    },
  ];

  const onClickItem = (value) => {
    setReportType(value);
  };

  const onClickSubmit = async () => {
    if (!reportType) {
      return;
    }

    const res = await reportReview({
      reviewId,
      userId,
      reportTypeId: reportType,
    });

    if(res.status.toLowerCase() === 'ok' && res.data === 1) {
      toast.success("신고 접수 되었습니다.");
      handleClose();
    } else {
      toast.error(res.message || "오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleClose = () => {
    setModalOpen({
      ...modalOpen,
      reviewReportModalOpen: !modalOpen.reviewReportModalOpen,
    })
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
