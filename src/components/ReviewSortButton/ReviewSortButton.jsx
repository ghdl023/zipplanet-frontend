import { useContext } from 'react';
import { SidebarHeaderContext } from '@contexts/SidebarHeaderContext';
import './ReviewSortButton.scss';

function ReviewSortButton({ btn }) {
  const { sort, setSort } = useContext(SidebarHeaderContext);

  const handleClick = () => {
    setSort(btn.value);
  };

  return (
    <button
      className={`review__sort__button ${btn.value === sort ? 'active' : ''}`}
      onClick={handleClick}
    >
      {btn.label}
    </button>
  );
}

export default ReviewSortButton;
