import { StarFill } from 'react-bootstrap-icons';

import './ReviewListItem.scss';

function ReviewListItem({ review, onClick }) {
  return (
    <div className="review__list__item" onClick={() => onClick(review)}>
      <div className="review__list__item__thumb">
        <img src={review.thumbnail[0]} alt="" />
      </div>
      <div className="review__list__item__content">
        <h5>
          {review.address}
          {/* ddddddddddddddddddddddddddddddddddddddddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh */}
        </h5>
        <h3>{review.title}</h3>
        <p>{review.detail}</p>
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
