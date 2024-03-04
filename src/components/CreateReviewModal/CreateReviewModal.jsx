import Modal from '@components/common/Modal';
import { StarFill } from 'react-bootstrap-icons';

import './CreateReviewModal.scss';
import { useContext } from 'react';
import { SidebarContext } from '@contexts/SidebarContext';

function CreateReviewModal() {
  const { createReviewObj, setCreateReviewObj } = useContext(SidebarContext);
  const params = {
    title: '새 리뷰 작성',
    width: '56vw',
    height: '80vh',
    handleClose: () => {
      setCreateReviewObj({
        ...createReviewObj,
        modalOpen: false,
      });
    },
    backdrop: false,
  };
  return (
    <Modal params={params}>
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
                  <StarFill />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <StarFill />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <StarFill />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <StarFill />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                </div>
              </div>
              <div className="category__box">
                <div className="category__box__icon">
                  <StarFill />
                </div>
                <h4 className="category__box__title">총 평점</h4>
                <div className="category__box__rate">
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
                  <StarFill />
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
                    placeholder="리스트에 노출되는 문구입니다. 40자 이내로 입력해주세요."
                    maxLength={40}
                  />
                  <br />
                  <div className="input__length__container">1/40</div>
                </div>
              </div>
              <div className="category__grid__row">
                <h4>
                  내용<span className="required">*</span>
                </h4>
                <div>
                  <textarea
                    placeholder="리스트에 노출되는 문구입니다. 1000자 이내로 입력해주세요."
                    maxLength={1000}
                  />
                  <br />
                  <div className="input__length__container">1/1000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="category__container picture__container">
            <div className="title">
              <h3>사진 등록</h3>
              <h4>사진 등록 전, 꼭 확인해주세요.</h4>
            </div>
            <div className="body">
              <div className="category__grid__row">
                <h4>사진 1</h4>
                <div>
                  <input
                    className="full__width"
                    type="text"
                    placeholder="이미지 URL"
                  />
                </div>
              </div>
              <div className="category__grid__row">
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
                    placeholder=""
                    maxLength={3}
                  />{' '}
                  평&nbsp;&nbsp;/&nbsp;&nbsp;
                  <input
                    className="short__width"
                    type="text"
                    placeholder=""
                    maxLength={3}
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
                  <button className="active">월세</button>
                  <button>전세</button>
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
                <input type="checkbox" /> 리뷰 생성 규정을 확인하였으며,입력한
                정보는 실제 정보와 다름이 없습니다.
              </span>
            </div>
            <div>
              <button>리뷰 등록</button>
            </div>
          </div>
        </div>
      </>
    </Modal>
  );
}

export default CreateReviewModal;
