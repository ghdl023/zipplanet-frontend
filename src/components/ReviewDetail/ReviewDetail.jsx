import { useState, useContext } from 'react';
import { SidebarContext } from '@contexts/SidebarContext';
import { ArrowLeft, Share } from 'react-bootstrap-icons';
import { Carousel } from 'react-bootstrap';
import { FaStarHalfAlt, FaStar } from 'react-icons/fa';
import StarRate from '@components/common/StarRate';
import './ReviewDetail.scss';

function ReviewDetail() {
  const { reviewDetail, setReviewDetail, createReviewObj, setCreateReviewObj } =
    useContext(SidebarContext);

  const handleClickReport = () => {
    setCreateReviewObj({
      ...createReviewObj,
      reportModalOpen: true,
    });
  };

  return (
    <div className="review__detail__container">
      <div className="review__detail__header">
        <button onClick={() => setReviewDetail(null)}>
          <ArrowLeft />
        </button>
        <h2>{reviewDetail.address}</h2>
        <button>
          <Share />
        </button>
      </div>
      <div className="review__detail__main">
        <div className="review__detail__main__content">
          <div className="review__detail__main__content__img__container">
            <Carousel data-bs-theme="light">
              {reviewDetail.thumbnail.map((img, index) => (
                <Carousel.Item key={index}>
                  <img src={img} alt="room-image" />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="review__detail__main__content__rate__container">
            <div className="category__box">
              <h3>총 평점</h3>
              <div className="category__box__item__rate">
                <StarRate score={reviewDetail.total_score} />
              </div>
            </div>
            <div className="category__box">
              <h3>작성자</h3>
              <div className="category__box__item__user">
                {reviewDetail.creator}
              </div>
            </div>
            <div className="category__box">
              <h3>교통점수</h3>
              <div className="category__box__item__rate">
                <StarRate score={reviewDetail.trans_score} />
              </div>
            </div>
            <div className="category__box">
              <h3>주변환경</h3>
              <div className="category__box__item__rate">
                <StarRate score={reviewDetail.infra_score} />
              </div>
            </div>
            <div className="category__box">
              <h3>관리점수</h3>
              <div className="category__box__item__rate">
                <StarRate score={reviewDetail.manage_score} />
              </div>
            </div>
            <div className="category__box">
              <h3>거주환경</h3>
              <div className="category__box__item__rate">
                <StarRate score={reviewDetail.life_score} />
              </div>
            </div>
          </div>
          <div className="review__detail__main__content__eval__container">
            <div className="eval__header">
              <h1>상세 설명</h1>
              <h2>
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
                {reviewDetail.title}
              </h2>
            </div>
            <div className="eval__main">
              {reviewDetail.detail}
              {reviewDetail.detail}
              {reviewDetail.detail}
              {reviewDetail.detail}
              {reviewDetail.detail}
              {reviewDetail.detail}
              {reviewDetail.detail}
            </div>
          </div>
          <div className="review__detail__main__content__info__container">
            <div className="info__header">
              <h1>상세 정보</h1>
            </div>

            <div className="info__main">
              <div className="info__main__item">
                <h2>층 수</h2>
                <span>{reviewDetail.floors}층</span>
              </div>
              <div className="info__main__item">
                <h2>평 수</h2>
                <span>{reviewDetail.pyungsoo}평 / 39.6㎡</span>
              </div>
              <div className="info__main__item">
                <h2>방 정보</h2>
                <span>{reviewDetail.room}</span>
              </div>
              <div className="info__main__item">
                <h2>옵션</h2>
                <span>{reviewDetail.option}</span>
              </div>
              <div className="info__main__item">
                <h2>계약유형</h2>
                <span>{reviewDetail.contractType}</span>
              </div>
              <div className="info__main__item">
                <h2>입주기간</h2>
                <span>
                  {reviewDetail.ibjuDate} ~ {reviewDetail.endDate}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="review__detail__main__footer">
          <button onClick={handleClickReport}>허위리뷰 신고하기</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
