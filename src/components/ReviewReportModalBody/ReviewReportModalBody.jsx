import './ReviewReportModalBody.scss';

function ReviewReportModalBody({
  reportType,
  items,
  onClickItem,
  onClickSubmit,
}) {
  return (
    <div className="review__report__container">
      <div className="reivew__report__header">
        <h2>
          <span className="icon__siren">🚨</span>
          리뷰 신고
        </h2>
        <p>신고사유를 선택해주세요.</p>
      </div>
      <div className="review__report__main">
        {items.map((item, index) => (
          <>
            <button
              key={index}
              className={`${reportType === item.reportTypeId ? 'active' : ''} review__report__item`}
              onClick={() => onClickItem(item.reportTypeId)}
            >
              {item.reportTypeName}
            </button>
          </>
        ))}
      </div>
      <div className="review__report__footer">
        <button
          className={`${!reportType ? 'disabled' : ''}`}
          onClick={onClickSubmit}
          disabled={!reportType}
        >
          제출
        </button>
      </div>
    </div>
  );
}

export default ReviewReportModalBody;
