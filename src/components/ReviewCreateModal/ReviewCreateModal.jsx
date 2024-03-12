import { useContext, useState, useRef } from 'react';
import {
  Award,
  House,
  XSquareFill,
  CarFrontFill,
  PersonGear,
  ImageFill,
} from 'react-bootstrap-icons';
import StarRatings from 'react-star-ratings';
import toast from 'react-hot-toast';
import moment from 'moment';
import Modal from '@components/common/Modal';
import { SidebarContext } from '@contexts/SidebarContext';
import { createReview, updateReview } from '@api/review';
import { pyungToArea } from '@utils/common';
import './ReviewCreateModal.scss';
import { useRecoilValue } from 'recoil';
import { reviewUpdateState } from '../../recoil/reviewUpdateState';
function ReviewCreateModal() {
  const { createReviewObj, setCreateReviewObj } = useContext(SidebarContext);
  const reviewUpdateValue = useRecoilValue(reviewUpdateState);
  const geocoder = new kakao.maps.services.Geocoder();
  const [inputValues, setInputValues] = useState(
    reviewUpdateState.reviewId === ''
      ? {
          reviewId: '',
          userId: '',
          totalRate: 0,
          transRate: 0,
          infraRate: 0,
          manageRate: 0,
          lifeRate: 0,
          title: '',
          description: '',
          jibun: '',
          pos: '',
          floorsCount: '',
          pyungCount: '',
          roomInfo: '',
          roomOption: '',
          contractTypeId: '1',
          startDate: '',
          endDate: '',
        }
      : {
          ...reviewUpdateValue,
          startDate: reviewUpdateValue.startDate
            ? moment(reviewUpdateValue.startDate).format('YYYY-MM-DD')
            : reviewUpdateValue.startDate,
          endDate: reviewUpdateValue.endDate
            ? moment(reviewUpdateValue.endDate).format('YYYY-MM-DD')
            : reviewUpdateValue.endDate,
        },
  );
  const isCreate = !inputValues.reviewId;
  const TITLE = isCreate ? '생성' : '수정';
  const [images, setImages] = useState([]);
  const [bChecked, setChecked] = useState(false);
  const [jibunErrMsg, setJibunErrMsg] = useState('');

  const refTitle = useRef(null);
  const refDescription = useRef(null);
  const refJibun = useRef(null);
  const refFloorsCount = useRef(null);
  const refPyungCount = useRef(null);
  const refRoomInfo = useRef(null);
  const refRoomOption = useRef(null);
  const refStartDate = useRef(null);
  const refEndDate = useRef(null);

  const changeRating = (newRating, name) => {
    setInputValues({
      ...inputValues,
      [name]: newRating,
    });
  };

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...images];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      // window.URL.revokeObjectURL(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
  };

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlurJibun = () => {
    const { jibun } = inputValues;
    if (jibun) {
      geocoder.addressSearch(jibun, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          // Lat: result[0].y
          // Lng: result[0].x
          setJibunErrMsg('');
          setInputValues({
            ...inputValues,
            pos: `${result[0].y},${result[0].x}`,
          });
        } else {
          // ZERO_RESULT
          setJibunErrMsg(
            '잘못된 지번주소를 입력하셨습니다. 정확하게 다시 입력해주세요.',
          );
        }
      });
    }
  };

  const create = async () => {
    if (!checkValidation()) {
      return;
    }

    const callApi = isCreate ? createReview : updateReview;
    const res = await callApi({
      ...inputValues,
    });
    // console.log(res);

    if (res.status.toLowerCase() == 'ok' && res.data > 0) {
      toast.success(`리뷰가 ${TITLE}되었습니다!`);
      closeModal();
    } else {
      toast.error(`리뷰 ${TITLE}을 실패했습니다.`);
    }
  };

  const closeModal = () => {
    if (images.length > 0) {
      for (const url of images) {
        console.log(url);
        window.URL.revokeObjectURL(url);
      }
    }

    setCreateReviewObj({
      ...createReviewObj,
      modalOpen: false,
    });
  };

  const checkValidation = () => {
    console.log(inputValues);
    // console.log(images);
    const {
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
      startDate,
      endDate,
    } = inputValues;

    const modalBody = document.getElementsByClassName('modal__content__body');
    if (totalRate === 0) {
      if(modalBody.length > 0) modalBody[0].scrollTop = 0;
      toast.error('총 평점을 선택해주세요.');
      return false;
    } else if (transRate === 0) {
      if(modalBody.length > 0) modalBody[0].scrollTop = 0;
      toast.error('교통점수를 선택해주세요.');
      return false;
    } else if (manageRate === 0) {
      if(modalBody.length > 0) modalBody[0].scrollTop = 0;
      toast.error('관리점수를 선택해주세요.');
      return false;
    } else if (infraRate === 0) {
      if(modalBody.length > 0) modalBody[0].scrollTop = 0;
      toast.error('주변환경점수를 선택해주세요.');
      return false;
    } else if (lifeRate === 0) {
      if(modalBody.length > 0) modalBody[0].scrollTop = 0;
      toast.error('거주환경점수를 선택해주세요.');
      return false;
    } else if (title === null || title === '') {
      toast.error('제목을 입력해주세요.');
      refTitle.current.focus();
      return false;
    } else if (description === null || description === '') {
      toast.error('내용을 입력해주세요.');
      refDescription.current.focus();
      return false;
    } else if (jibun === null || jibun === '' || jibunErrMsg) {
      toast.error('지번주소를 입력해주세요.');
      refJibun.current.focus();
      return false;
    } else if (floorsCount === null || floorsCount === '') {
      toast.error('층 수를 입력해주세요.');
      refFloorsCount.current.focus();
      return false;
    } else if (pyungCount === null || pyungCount === '') {
      toast.error('평 수를 입력해주세요.');
      refPyungCount.current.focus();
      return false;
    } else if (roomInfo === null || roomInfo === '') {
      toast.error('방 정보를 입력해주세요.');
      refRoomInfo.current.focus();
      return false;
    } else if (roomOption === null || roomOption === '') {
      toast.error('방 옵션을 입력해주세요.');
      refRoomOption.current.focus();
      return false;
    }

    const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
    if (startDate === null || startDate === '') {
      toast.error('입주시작일을 입력해주세요.');
      refStartDate.current.focus();
      return false;
    } else {
      let yyyymmdd = startDate.replace(reg, '');
      if (yyyymmdd.length !== 8) {
        toast.error('YYYY-MM-DD 형식으로 입력해주세요.');
        refStartDate.current.focus();
        return false;
      } else {
        setInputValues({
          ...inputValues,
          startDate: `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6)}`,
        });
      }
    }

    if (endDate !== null && endDate !== '') {
      let yyyymmdd = endDate.replace(reg, '');
      if (yyyymmdd.length !== 8) {
        toast.error('YYYY-MM-DD 형식으로 입력해주세요.');
        refEndDate.current.focus();
        return false;
      } else {
        setInputValues({
          ...inputValues,
          endDate: `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6)}`,
        });
      }
    }
    return true;
  };

  return (
    <Modal
      params={{
        title: isCreate ? '새 리뷰 작성' : `리뷰 ${TITLE}`,
        width: '56vw',
        height: '80vh',
        handleClose: closeModal,
        backdrop: false,
      }}
    >
      <>
        <div className="create__review__container">
          <div className="notice__container">
            {isCreate && <p>- 지번당 1개의 리뷰만 등록 가능합니다.</p>}
            <p>
              - 주소를 다르게 입력하거나, 리뷰 내용을 사실과 다르게 작성할 경우
              허위 리뷰로 신고될 수 있으니 꼭 동일하게 입력 바랍니다.
            </p>
          </div>

          <div className="category__container rate__container">
            <div className="title">
              <h3>평점</h3>
              <h4>
                <span className="required">*</span> 필수입력 항목
              </h4>
            </div>
            <div className="body">
              <div className="category__box">
                <div className="category__box__icon">
                  <Award />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValues.totalRate}
                    starDimension={'1.7rem'}
                    starSpacing={0}
                    starRatedColor="#FFC949"
                    starHoverColor="#FFC949"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="totalRate"
                  />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <CarFrontFill />
                </div>
                <h4 className="category__box__title">교통점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValues.transRate}
                    starDimension={'1.7rem'}
                    starSpacing={0}
                    starRatedColor="#FFC949"
                    starHoverColor="#FFC949"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="transRate"
                  />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <PersonGear />
                </div>
                <h4 className="category__box__title">관리점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValues.manageRate}
                    starDimension={'1.7rem'}
                    starSpacing={0}
                    starRatedColor="#FFC949"
                    starHoverColor="#FFC949"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="manageRate"
                  />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <ImageFill />
                </div>
                <h4 className="category__box__title">주변환경점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValues.infraRate}
                    starDimension={'1.7rem'}
                    starSpacing={0}
                    starRatedColor="#FFC949"
                    starHoverColor="#FFC949"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="infraRate"
                  />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <House />
                </div>
                <h4 className="category__box__title">거주환경점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValues.lifeRate}
                    starDimension={'1.7rem'}
                    starSpacing={0}
                    starRatedColor="#FFC949"
                    starHoverColor="#FFC949"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="lifeRate"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="category__container description__container">
            <div className="title">
              <h3>상세 설명</h3>
            </div>
            <div className="body">
              <div className="category__grid__row">
                <h4>
                  제목<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    name="title"
                    value={inputValues.title}
                    placeholder="리스트에 노출되는 문구입니다. 40자 이내로 입력해주세요."
                    maxLength={40}
                    onChange={handleChange}
                    ref={refTitle}
                  />
                  <br />
                  <div className="input__length__container">
                    {inputValues.title.length}/40
                  </div>
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  내용<span className="required">*</span>
                </h4>
                <div>
                  <textarea
                    name="description"
                    value={inputValues.description}
                    placeholder="리스트에 노출되는 문구입니다. 1000자 이내로 입력해주세요."
                    maxLength={1000}
                    onChange={handleChange}
                    ref={refDescription}
                  />
                  <br />
                  <div className="input__length__container">
                    {inputValues.description.length}/1000
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="category__container picture__container">
            <div className="title">
              <h3>사진 등록</h3>
              {/* <h4>사진 등록 전, 꼭 확인해주세요.</h4> */}
              <h4>사진은 최대 5장까지 등록할 수 있습니다.</h4>
            </div>
            <div className="body">
              <div className="category__grid__row">
                <h4>일반 사진</h4>
                <div>
                  <label htmlFor="input-file" onChange={handleAddImages}>
                    <input type="file" id="input-file" multiple />
                    <div className="add__btn">+ 사진추가</div>
                  </label>
                  <div className="preview__image__container">
                    {images.map((image, id) => (
                      <div className="preview__image" key={id}>
                        <img src={image} alt={`${image}-${id}`} />
                        <XSquareFill onClick={() => handleDeleteImage(id)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="category__container option__container">
            <div className="title">
              <h3>추가 정보</h3>
            </div>
            <div className="body">
              <div className="category__grid__row">
                <h4>
                  지번주소<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    name="jibun"
                    value={inputValues.jibun}
                    onChange={handleChange}
                    onBlur={handleBlurJibun}
                    placeholder="지번주소를 입력해주세요. 예) 서울시 강남구 역삼동 826-37"
                    maxLength={100}
                    ref={refJibun}
                  />
                  <div>
                    <small style={{ color: 'red' }}>{jibunErrMsg}</small>
                  </div>
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  층 수<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="short__width"
                    type="text"
                    name="floorsCount"
                    value={inputValues.floorsCount}
                    onChange={handleChange}
                    placeholder="1"
                    maxLength={2}
                    ref={refFloorsCount}
                  />{' '}
                  층
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  평 수<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="short__width"
                    type="text"
                    name="pyungCount"
                    value={inputValues.pyungCount}
                    onChange={handleChange}
                    placeholder=""
                    maxLength={3}
                    ref={refPyungCount}
                  />{' '}
                  평&nbsp;&nbsp;/&nbsp;&nbsp;
                  <input
                    className="short__width"
                    type="text"
                    value={pyungToArea(inputValues.pyungCount)}
                    placeholder=""
                    maxLength={3}
                    readOnly
                  />{' '}
                  ㎡
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  방 정보<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    name="roomInfo"
                    value={inputValues.roomInfo}
                    onChange={handleChange}
                    placeholder="예) 주방 분리형 원룸"
                    maxLength={100}
                    ref={refRoomInfo}
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  옵션<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    name="roomOption"
                    value={inputValues.roomOption}
                    onChange={handleChange}
                    placeholder="예) 에어컨,세탁기,인덕션 (,로 구분하여 여러개 작성 가능)"
                    maxLength={100}
                    ref={refRoomOption}
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  계약형태<span className="required">*</span>
                </h4>
                <div>
                  <button
                    className={`${inputValues.contractTypeId === '1' ? 'active' : ''}`}
                    name="contractTypeId"
                    value="1"
                    onClick={handleChange}
                  >
                    월세
                  </button>
                  <button
                    className={`${inputValues.contractTypeId === '2' ? 'active' : ''}`}
                    name="contractTypeId"
                    value="2"
                    onClick={handleChange}
                  >
                    전세
                  </button>
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  입주시작일<span className="required">*</span>
                </h4>
                <div>
                  <input
                    className="long__width"
                    type="text"
                    name="startDate"
                    value={inputValues.startDate}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                    maxLength={10}
                    ref={refStartDate}
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>계약종료일</h4>
                <div>
                  <input
                    className="long__width"
                    type="text"
                    name="endDate"
                    value={inputValues.endDate}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                    maxLength={10}
                    ref={refEndDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create__review__container__footer">
            <div className="txt__box">
              <span>
                <input
                  id="agreeYn"
                  type="checkbox"
                  checked={bChecked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                />{' '}
                <label htmlFor="agreeYn">
                  리뷰 {TITLE} 규정을 확인하였으며,입력한
                  정보는 실제 정보와 다름이 없습니다.
                </label>
              </span>
            </div>
            <div>
              <button
                className={`${!bChecked ? 'disabled' : ''}`}
                onClick={create}
                disabled={!bChecked}
              >
                리뷰 {TITLE}
              </button>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default ReviewCreateModal;
