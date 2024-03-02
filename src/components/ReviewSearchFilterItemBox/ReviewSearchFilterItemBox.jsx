import './ReviewSearchFilterItemBox.scss';

function ReviewSearchFilterItemBox({ title, itemList }) {
  return (
    <div className="review__search__filter__main__item__box">
      <h4>{title}</h4>
      <div className="review__search__filter__main__item__box__btns">
        {itemList.map((btn, index) => (
          <button
            key={index}
            className={`review__search__filter__main__item__box__btn ${btn.isActive ? 'active' : ''}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewSearchFilterItemBox;
