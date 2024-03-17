import './ReviewSortButton.scss';
import { SidebarContext } from '../../contexts/SidebarContext';

function ReviewSortButton({ btn, onClick }) {
  return (
    <SidebarContext.Consumer>
      {(value) => (
        <button
          className={`review__sort__button ${btn.value === value.order ? 'active' : ''}`}
          onClick={() => onClick(btn.value)}
        >
          {btn.label}
        </button>
      )}
    </SidebarContext.Consumer>
  );
}

export default ReviewSortButton;
