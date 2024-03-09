import './ReviewSortButton.scss';
import { useRecoilValue } from 'recoil';
import { searchState } from '../../recoil/searchState';

function ReviewSortButton({ btn, onClick }) {
  const searchValue = useRecoilValue(searchState);

  return (
    <button
      className={`review__sort__button ${btn.value === searchValue.sort ? 'active' : ''}`}
      onClick={() => onClick(btn.value)}
    >
      {btn.label}
    </button>
  );
}

export default ReviewSortButton;
