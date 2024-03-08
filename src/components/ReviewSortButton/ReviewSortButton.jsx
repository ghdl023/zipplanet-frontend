import { useContext } from 'react';
import { SidebarHeaderContext } from '@contexts/SidebarHeaderContext';
import './ReviewSortButton.scss';

function ReviewSortButton({ btn, onClick }) {
  const { sort } = useContext(SidebarHeaderContext);

  return (
    <button
      className={`review__sort__button ${btn.value === sort ? 'active' : ''}`}
      onClick={()=>onClick(btn.value)}
    >
      {btn.label}
    </button>
  );
}

export default ReviewSortButton;
