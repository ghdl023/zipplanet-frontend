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
      reportTypeName: '리뷰 내용이 허위 사실입니다.',
    },
    {
      reportTypeId: 2,
      reportTypeName: '일방적인 비난으로만 작성되었습니다.',
    },
    {
      reportTypeId: 3,
      reportTypeName: '폭력적인 내용이 포함되어 있습니다.',
    },
    {
      reportTypeId: 4,
      reportTypeName: '리뷰내용이 제 개인의 명예를 훼손하고 있습니다.',
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
