import Modal from '@components/common/Modal';
import { House, XSquareFill } from 'react-bootstrap-icons';

import './ReviewCreateModal.scss';
import { useContext, useState } from 'react';
import { SidebarContext } from '@contexts/SidebarContext';
import StarRatings from 'react-star-ratings';

function ReviewCreateModal() {
  const { createReviewObj, setCreateReviewObj } = useContext(SidebarContext);

  const [inputValue, setInputValue] = useState({
    totalRate: 0,
    transRate: 0,
    infraRate: 0,
    manageRate: 0,
    lifeRate: 0,
    title: '',
    description: '',
    jibun: '',
    floorsCount: '',
    pyungCount: '',
    roomCount: '',
    roomOption: '',
    contractType: 1,
    startDate: '',
    endDate: '',
  });

  const [images, setImages] = useState([]);
  const [bChecked, setChecked] = useState(false);

  const changeRating = (newRating, name) => {
    setInputValue({
      ...inputValue,
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

  const createReview = () => {
    console.log(inputValue);
    console.log(images);
    closeModal();
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

  return (
    <Modal
      params={{
        title: '새 리뷰 작성하기',
        width: '56vw',
        height: '80vh',
        handleClose: closeModal,
        backdrop: false,
      }}
    >
      <>
        <div className="create__review__container">
          <div className="notice__container">
            <p>- 지번당 1개의 리뷰만 등록 가능합니다.</p>
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
                  <House />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValue.totalRate}
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
                  <House />
                </div>
                <h4 className="category__box__title">교통점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValue.transRate}
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
                  <House />
                </div>
                <h4 className="category__box__title">관리점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValue.manageRate}
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
                  <House />
                </div>
                <h4 className="category__box__title">주변환경점수</h4>
                <div className="category__box__rate">
                  <StarRatings
                    rating={inputValue.infraRate}
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
                    rating={inputValue.lifeRate}
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
                    value={inputValue.title}
                    placeholder="리스트에 노출되는 문구입니다. 40자 이내로 입력해주세요."
                    maxLength={40}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, title: e.target.value })
                    }
                  />
                  <br />
                  <div className="input__length__container">
                    {inputValue.title.length}/40
                  </div>
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  내용<span className="required">*</span>
                </h4>
                <div>
                  <textarea
                    value={inputValue.description}
                    placeholder="리스트에 노출되는 문구입니다. 1000자 이내로 입력해주세요."
                    maxLength={1000}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        description: e.target.value,
                      })
                    }
                  />
                  <br />
                  <div className="input__length__container">
                    {inputValue.description.length}/1000
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
              {/* <div className="category__grid__row">
                <h4>사진 2</h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    placeholder="이미지 URL"
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>사진 3</h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    placeholder="이미지 URL"
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>사진 4</h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    placeholder="이미지 URL"
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>사진 5</h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    placeholder="이미지 URL"
                  />
                </div>
              </div> */}
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
                    value={inputValue.jibun}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, jibun: e.target.value })
                    }
                    placeholder="지번주소를 입력해주세요. 예) 서울시 강남구 역삼동 826-37"
                    maxLength={100}
                  />
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
                    value={inputValue.floorsCount}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        floorsCount: e.target.value,
                      })
                    }
                    placeholder=""
                    maxLength={2}
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
                    value={inputValue.pyungCount}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        pyungCount: e.target.value,
                      })
                    }
                    placeholder=""
                    maxLength={3}
                  />{' '}
                  평&nbsp;&nbsp;/&nbsp;&nbsp;
                  <input
                    className="short__width"
                    type="text"
                    value={Math.floor(inputValue.pyungCount * 3.3058)}
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
                    value={inputValue.roomCount}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        roomCount: e.target.value,
                      })
                    }
                    placeholder="예) 주방 분리형 원룸"
                    maxLength={100}
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
                    value={inputValue.roomoption}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        roomOption: e.target.value,
                      })
                    }
                    placeholder="예) 에어컨,세탁기,인덕션 (,로 구분하여 여러개 작성 가능)"
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  계약형태<span className="required">*</span>
                </h4>
                <div>
                  <button
                    className={`${inputValue.contractType === 1 ? 'active' : ''}`}
                    onClick={() =>
                      setInputValue({
                        ...inputValue,
                        contractType: 1,
                      })
                    }
                  >
                    월세
                  </button>
                  <button
                    className={`${inputValue.contractType === 2 ? 'active' : ''}`}
                    onClick={() =>
                      setInputValue({
                        ...inputValue,
                        contractType: 2,
                      })
                    }
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
                    value={inputValue.startDate}
                    onChange={(e) =>
                      setInputValue({
                        ...inputValue,
                        startDate: e.target.value,
                      })
                    }
                    placeholder="YYYY.MM.DD"
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="category__grid__row">
                <h4>계약종료일</h4>
                <div>
                  <input
                    className="long__width"
                    type="text"
                    value={inputValue.endDate}
                    onChange={(e) =>
                      setInputValue({ ...inputValue, endDate: e.target.value })
                    }
                    placeholder="YYYY.MM.DD"
                    maxLength={10}
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
                  리뷰 생성 규정을 확인하였으며,입력한 정보는 실제 정보와 다름이
                  없습니다.
                </label>
              </span>
            </div>
            <div>
              <button
                className={`${!bChecked ? 'disabled' : ''}`}
                onClick={createReview}
                disabled={!bChecked}
              >
                리뷰 생성
              </button>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default ReviewCreateModal;