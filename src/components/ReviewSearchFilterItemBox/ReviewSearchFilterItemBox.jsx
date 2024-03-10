import { useRecoilState } from 'recoil';
import { searchState } from '../../recoil/searchState';
import './ReviewSearchFilterItemBox.scss';

function ReviewSearchFilterItemBox({ title, itemList, onClickGudongType }) {
  const [search, setSearch] = useRecoilState(searchState);
  const { gu } = search;

  const handleClick = (e, btn) => {
    if (title == '구/동') {
      // 구 선택안했을때는 동 비활성화
      if (btn.type === 'dong' && gu === '') {
        return;
      }
      onClickGudongType(btn.type);
    } else if (title === '거래유형') {
      setSearch({
        ...search,
        searchType: 'filter',
        contractTypeId: btn.value,
      });
      window.dispatchEvent(new CustomEvent('callSearchReviewEvent', {})); // 리뷰 조회 이벤트 호출
    } else if (title === '평점') {
      setSearch({
        ...search,
        searchType: 'filter',
        rate: btn.value,
      });
      window.dispatchEvent(new CustomEvent('callSearchReviewEvent', {})); // 리뷰 조회 이벤트 호출
    }
  };
  return (
    <div className="review__search__filter__main__item__box">
      <h4>{title}</h4>
      <div className="review__search__filter__main__item__box__btns">
        {itemList.map((btn, index) => (
          <button
            key={index}
            className={`review__search__filter__main__item__box__btn ${btn.isActive ? 'active' : ''} ${title === '구/동' ? btn.type : ''}`}
            onClick={(e) => handleClick(e, btn)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewSearchFilterItemBox;
