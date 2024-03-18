import { useState, useRef, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import {
  Heart,
  HeartFill,
  HandThumbsUp,
  HandThumbsUpFill,
  ArrowLeft,
  Share,
} from 'react-bootstrap-icons';
import { Carousel } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import StarRate from '@components/common/StarRate';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import { pyungToArea } from '@utils/common';
import { modalState } from '../../recoil/modalState';
import { userInfoState } from '../../recoil/userInfoState';
import { getReviewDetail, updateZzimYn } from '../../apis/api/review';
import { reviewListState } from '../../recoil/reviewListState';
import './ReviewDetail.scss';

function ReviewDetail() {
  const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
  const resetReviewDetail = useResetRecoilState(reviewDetailState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const {
    reviewId,
    creator,
    totalRate,
    transRate,
    manageRate,
    infraRate,
    lifeRate,
    title,
    description,
    jibun,
    floorsCount,
    pyungCount,
    roomInfo,
    roomOption,
    contractTypeId,
    startDate,
    endDate,
    zzimYn,
    // images
  } = reviewDetail;
  const userInfoValue = useRecoilValue(userInfoState);
  const { userId } = userInfoValue;
  // 테스트 이미지 데이터
  const images = [
    'https://img.freepik.com/free-photo/minimalist-interior-3d-rendering_52683-131548.jpg?size=626&ext=jpg&ga=GA1.1.1292351815.1709942400&semt=ais',
    'https://lh3.googleusercontent.com/proxy/uc2QvnuFeATrNhByoFUkVyZlydGe4l5CSU6kkJ1QfDVGyTWGTnTXZsVOhQ4MqAhLlj1z_w83nxgszk9MdsX9qcQrY3c0sbcsH6Z1IE4cA81O6SilcmZpCmLRQ4AJDW7hFkA0hxbYBh3xx-DK6bMeh37R85dr0w',
    'https://www.zipdeco.co.kr/upload/2017/11/28/EDITOR_201711281009336180_w2Qe4',
    'https://www.qplace.kr/content/images/2022/10/No.2227------------------70------------------------------19.jpeg',
  ];

  const [favorite, setFavorite] = useState(zzimYn === 'Y');
  const favoriteRef = useRef(favorite);

  const [items, setItems] = useRecoilState(reviewListState);

  const loadReviewDetail = async () => {
    const res = await getReviewDetail({
      params: {
        id: reviewId,
        uid: userId,
      }
    });
    // console.log(res);
    if(res.status.toLowerCase() === 'ok' && res.data) {
      setReviewDetail(res.data);
    }
  }

  useEffect(()=>{
    if(reviewId) {
      loadReviewDetail();
    } 
  }, []);

  const handleClickReport = () => {
    if (!userId) return;
    setModalOpen({
      ...modalOpen,
      reviewReportModalOpen: !modalOpen.reviewReportModalOpen,
    });
  };

  const onClickShare = async () => {};

  const onClickFavorite = async () => {
    setFavorite((prev) => !prev);
    favoriteRef.current = !favoriteRef.current;
    await updateZzimYn({
      userId,
      reviewId,
      zzimYn: favoriteRef.current ? 'Y' : 'N',
    });

    let findIndex = _.findIndex(items, { reviewId });

    let copyItems = [...items];
    if (findIndex != -1) {
      copyItems[findIndex] = {
        ...copyItems[findIndex],
        zzimYn: favoriteRef.current ? 'Y' : 'N',
      };

      setItems(copyItems);
    }
  };

  return (
    <div className="review__detail__container">
      <div className="review__detail__header">
        <button onClick={resetReviewDetail}>
          <ArrowLeft />
        </button>
        <h2>{jibun}</h2>
        <div>
          <CopyToClipboard 
            text={`${window.location.origin}${import.meta.env.VITE_BASE_URL}?id=${reviewId}` }
            onCopy={() => toast.success("리뷰 링크가 클립보드에 복사되었습니다.")}>
            <button onClick={onClickShare}>
              <Share />
            </button>
          </CopyToClipboard>
          {userId && (
              <button onClick={onClickFavorite}>
                <span className="icon__favorite">
                  {favorite ? <HeartFill /> : <Heart />}
                </span>
              </button>
            )}
        </div>
      </div>
      <div className="review__detail__main">
        <div className="review__detail__main__content">
          <div className="review__detail__main__content__img__container">
            <Carousel data-bs-theme="light">
              {images &&
                images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img src={img} alt="room-image" />
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <div className="review__detail__main__content__rate__container">
          
            <div className="category__container">
              <div className="category__box">
                <h3>총 평점</h3>
                <div className="category__box__item__rate">
                  <StarRate score={totalRate} />
                </div>
              </div>
              <div className="category__box">
                <h4>작성자</h4>
                <div className="category__box__item__user">{creator}</div>
              </div>
              <div className="category__box">
                <h4>교통</h4>
                <div className="category__box__item__rate">
                  <StarRate score={transRate} />
                </div>
              </div>
              <div className="category__box">
                <h4>주변 환경</h4>
                <div className="category__box__item__rate">
                  <StarRate score={infraRate} />
                </div>
              </div>
              <div className="category__box">
                <h4>관리</h4>
                <div className="category__box__item__rate">
                  <StarRate score={manageRate} />
                </div>
              </div>
              <div className="category__box">
                <h4>거주 환경</h4>
                <div className="category__box__item__rate">
                  <StarRate score={lifeRate} />
                </div>
              </div>
            </div>
          </div>
          <div className="review__detail__main__content__eval__container">
            <div className="eval__header">
              <h1>상세 설명</h1>
              <h2>{title}</h2>
            </div>
            <div className="eval__main">{description}</div>
          </div>
          <div className="review__detail__main__content__info__container">
            <div className="info__header">
              <h1>상세 정보</h1>
            </div>

            <div className="info__main">
              <div className="info__main__item">
                <h2>층 수</h2>
                <span>{floorsCount}층</span>
              </div>
              <div className="info__main__item">
                <h2>평 수</h2>
                <span>
                  {pyungCount}평 / {pyungToArea(pyungCount)}㎡
                </span>
              </div>
              <div className="info__main__item">
                <h2>방 정보</h2>
                <span>{roomInfo}</span>
              </div>
              <div className="info__main__item">
                <h2>옵션</h2>
                <span>{roomOption}</span>
              </div>
              <div className="info__main__item">
                <h2>계약유형</h2>
                <span>{contractTypeId}</span>
              </div>
              <div className="info__main__item">
                <h2>입주기간</h2>
                <span>
                  {moment(startDate).format('YYYY년MM월DD일')}
                  {endDate && <>~ {moment(endDate).format('YYYY년MM월DD일')}</>}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="review__detail__main__footer"
          style={{ background: userId ? '#FF5C00' : '#d2d2d2' }}
        >
          <button onClick={handleClickReport}>허위리뷰 신고하기</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;
