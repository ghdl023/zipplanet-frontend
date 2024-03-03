import { StarFill } from 'react-bootstrap-icons';

import './ReviewListItem.scss';

function ReviewListItem() {
  return (
    <div className="review__list__item">
      <div className="review__list__item__thumb">
        <img
          src="https://www.zipdeco.co.kr/upload/2018/04/24/IMAGE_201804240306006060_V6N7I"
          alt=""
        />
      </div>
      <div className="review__list__item__content">
        <h5>
          서울시 강남구 논현동 33-168
          {/* ddddddddddddddddddddddddddddddddddddddddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh */}
        </h5>
        <h3>
          제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
        </h3>
        <p>
          내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내
        </p>
      </div>
      <div className="review__list__item__footer">
        <div className="review__list__item__footer__like">
          <span>좋아요 50</span>
        </div>
        <div className="review__list__item__footer__rate">
          <span>
            <StarFill className="star-icon" /> 5.0
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReviewListItem;
