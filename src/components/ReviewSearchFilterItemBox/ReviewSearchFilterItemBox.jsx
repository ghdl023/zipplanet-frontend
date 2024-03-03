import { useContext } from 'react';
import './ReviewSearchFilterItemBox.scss';
import { SidebarContext } from '../../contexts/SidebarContext';

function ReviewSearchFilterItemBox({ title, itemList }) {
  const { searchFilterObj, setSearchFilterObj } = useContext(SidebarContext);
  const { gu, guDongListPopupType } = searchFilterObj;

  const handleClick = (btn) => {
    if (title == '구/동') {
      // 구 선택안했을때는 동 비활성화
      if (btn.type === 'dong' && gu === '') {
        return;
      }

      setSearchFilterObj({
        ...searchFilterObj,
        guDongListPopupType:
          guDongListPopupType === ''
            ? btn.type
            : guDongListPopupType === btn.type // 타입이 같을때만 닫히게
              ? ''
              : btn.type, // btn.type : 'gu' or 'dong'
      });
    } else if (title === '거래유형') {
      setSearchFilterObj({
        ...searchFilterObj,
        contractType: btn.value,
      });
    } else if (title === '평점') {
      setSearchFilterObj({
        ...searchFilterObj,
        rate: btn.value,
      });
    }
  };
  return (
    <div className="review__search__filter__main__item__box">
      <h4>{title}</h4>
      <div className="review__search__filter__main__item__box__btns">
        {itemList.map((btn, index) => (
          <button
            key={index}
            className={`review__search__filter__main__item__box__btn ${btn.isActive ? 'active' : ''}`}
            onClick={() => handleClick(btn)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ReviewSearchFilterItemBox;
