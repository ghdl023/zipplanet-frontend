import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function StarRate({ score }) {
  let faStarCount = Math.floor(score);
  let faStarHalfCount = 0;
  let faRegStarCount = 0;

  const value = score - faStarCount; // 소수점값
  if (value > 0.5) {
    faStarCount++;
  } else if (value > 0) {
    faStarHalfCount++;
  }

  faRegStarCount =
    faStarCount + faStarHalfCount == 5
      ? 0
      : 5 - (faStarCount + faStarHalfCount);

  //   console.log('faStarCount : ' + faStarCount);
  //   console.log('faStarHalfCount : ' + faStarHalfCount);
  //   console.log('faRegStarCount : ' + faRegStarCount);

  return (
    <>
      {Array(faStarCount)
        .fill('FaStar')
        .map((el, index) => {
          return <FaStar key={el + index} />;
        })}
      {Array(faStarHalfCount)
        .fill('FaStarHalfAlt')
        .map((el, index) => {
          return <FaStarHalfAlt key={el + index} />;
        })}
      {Array(faRegStarCount)
        .fill('FaRegStar')
        .map((el, index) => {
          return <FaRegStar key={el + index} />;
        })}
    </>
  );
}

export default StarRate;
