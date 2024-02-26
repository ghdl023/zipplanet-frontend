import { forwardRef } from 'react';
import './ReviewListItem.scss';

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

const ReviewListItem = forwardRef(({ item, onDelete }, ref) => {
  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  return (
    <div className="ReviewListItem" ref={ref}>
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
});
ReviewListItem.displayName = 'ReviewListItem';

export default ReviewListItem;
