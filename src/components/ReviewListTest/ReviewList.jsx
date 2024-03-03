import ReviewListItemTest from '../ReviewListItemTest';
import './ReviewList.scss';

function ReviewList({ items, onDelete, setTarget }) {
  return (
    <ul>
      {items.map((item, idx) => {
        const lastItem = idx === items.length - 2;
        return (
          <li key={idx}>
            <ReviewListItemTest
              item={item}
              onDelete={onDelete}
              ref={lastItem ? setTarget : null}
            />
          </li>
        );
      })}
    </ul>
  );
}
export default ReviewList;
