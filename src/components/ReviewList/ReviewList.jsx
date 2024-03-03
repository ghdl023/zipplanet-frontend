import ReviewListItem from '@components/ReviewListItem';
// import { ArrowClockwise } from 'react-bootstrap-icons';
import './ReviewList.scss';
import { useContext } from 'react';
import { SidebarContext } from '../../contexts/SidebarContext';

const reviewItemList = [
  {
    review_id: 1,
    address: '서울시 강남구 논현동 33-1',
    title: '제목1',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    thumbnail: [
      'https://www.zipdeco.co.kr/upload/2018/04/24/IMAGE_201804240306006060_V6N7I',
      'https://contents-cdn.viewus.co.kr/image/2023/12/CP-2023-0010/image-466b9eb6-954e-46d3-af59-e1a74ce5dbcd.jpeg',
      'https://mblogthumb-phinf.pstatic.net/MjAxNzExMTVfMjUg/MDAxNTEwNzI3Nzk0ODAw.v4kiIifZvqbzIinRZhmA6XJQvMcQtwnrDpsk0gQrlKYg.PtUU5kw-qSjjzkq0Ev70shFeehsU6GkpOxfwHP5AEksg.JPEG.thedesigns11/natural-wood-flooring.jpg?type=w800',
    ],
    creator: '종필이네신발가게',
    floors: 25,
    pyungsoo: 12,
    room: '2룸 1거실',
    option:
      '냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨',
    contractType: '전세',
    ibjuDate: '2023.12.19',
    endDate: '2024.06.04',
    likeCount: 13,
    total_score: 3.5, // 3 / 1 / 1
    trans_score: 4.6, // 5 / 0 / 0
    infra_score: 2.3, // 2 / 1 / 2
    manage_score: 3.0, // 3 / 0 // 2
    life_score: 5.0, // 5 / 0/ 0
  },
  {
    review_id: 2,
    address: '서울시 강남구 논현동 33-2',
    title: '제목2',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    thumbnail: [
      'https://www.zipdeco.co.kr/upload/2018/04/24/IMAGE_201804240306006060_V6N7I',
      'https://contents-cdn.viewus.co.kr/image/2023/12/CP-2023-0010/image-466b9eb6-954e-46d3-af59-e1a74ce5dbcd.jpeg',
      'https://mblogthumb-phinf.pstatic.net/MjAxNzExMTVfMjUg/MDAxNTEwNzI3Nzk0ODAw.v4kiIifZvqbzIinRZhmA6XJQvMcQtwnrDpsk0gQrlKYg.PtUU5kw-qSjjzkq0Ev70shFeehsU6GkpOxfwHP5AEksg.JPEG.thedesigns11/natural-wood-flooring.jpg?type=w800',
    ],
    creator: '종필이네신발가게',
    floors: 25,
    pyungsoo: 12,
    room: '2룸 1거실',
    option:
      '냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨',
    contractType: '전세',
    ibjuDate: '2023.12.19',
    endDate: '2024.06.04',
    likeCount: 13,
    total_score: 3.5, // 3 / 1 / 1
    trans_score: 4.6, // 5 / 0 / 0
    infra_score: 2.3, // 2 / 1 / 2
    manage_score: 3.0, // 3 / 0 // 2
    life_score: 5.0, // 5 / 0/ 0
  },
  {
    review_id: 3,
    address: '서울시 강남구 논현동 33-3',
    title: '제목3',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    thumbnail: [
      'https://www.zipdeco.co.kr/upload/2018/04/24/IMAGE_201804240306006060_V6N7I',
      'https://contents-cdn.viewus.co.kr/image/2023/12/CP-2023-0010/image-466b9eb6-954e-46d3-af59-e1a74ce5dbcd.jpeg',
      'https://mblogthumb-phinf.pstatic.net/MjAxNzExMTVfMjUg/MDAxNTEwNzI3Nzk0ODAw.v4kiIifZvqbzIinRZhmA6XJQvMcQtwnrDpsk0gQrlKYg.PtUU5kw-qSjjzkq0Ev70shFeehsU6GkpOxfwHP5AEksg.JPEG.thedesigns11/natural-wood-flooring.jpg?type=w800',
    ],
    creator: '종필이네신발가게',
    floors: 25,
    pyungsoo: 12,
    room: '2룸 1거실',
    option:
      '냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨',
    contractType: '전세',
    ibjuDate: '2023.12.19',
    endDate: '2024.06.04',
    likeCount: 13,
    total_score: 3.5, // 3 / 1 / 1
    trans_score: 4.6, // 5 / 0 / 0
    infra_score: 2.3, // 2 / 1 / 2
    manage_score: 3.0, // 3 / 0 // 2
    life_score: 5.0, // 5 / 0/ 0
  },
  {
    review_id: 4,
    address: '서울시 강남구 논현동 33-4',
    title: '제목4',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    thumbnail: [
      'https://www.zipdeco.co.kr/upload/2018/04/24/IMAGE_201804240306006060_V6N7I',
      'https://contents-cdn.viewus.co.kr/image/2023/12/CP-2023-0010/image-466b9eb6-954e-46d3-af59-e1a74ce5dbcd.jpeg',
      'https://mblogthumb-phinf.pstatic.net/MjAxNzExMTVfMjUg/MDAxNTEwNzI3Nzk0ODAw.v4kiIifZvqbzIinRZhmA6XJQvMcQtwnrDpsk0gQrlKYg.PtUU5kw-qSjjzkq0Ev70shFeehsU6GkpOxfwHP5AEksg.JPEG.thedesigns11/natural-wood-flooring.jpg?type=w800',
    ],
    creator: '종필이네신발가게',
    floors: 25,
    pyungsoo: 12,
    room: '2룸 1거실',
    option:
      '냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨',
    contractType: '전세',
    ibjuDate: '2023.12.19',
    endDate: '2024.06.04',
    likeCount: 13,
    total_score: 3.5, // 3 / 1 / 1
    trans_score: 4.6, // 5 / 0 / 0
    infra_score: 2.3, // 2 / 1 / 2
    manage_score: 3.0, // 3 / 0 // 2
    life_score: 5.0, // 5 / 0/ 0
  },
  {
    review_id: 5,
    address: '서울시 강남구 논현동 33-5',
    title: '제목5',
    detail:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    thumbnail: [
      'https://www.zipdeco.co.kr/upload/2018/04/24/IMAGE_201804240306006060_V6N7I',
      'https://contents-cdn.viewus.co.kr/image/2023/12/CP-2023-0010/image-466b9eb6-954e-46d3-af59-e1a74ce5dbcd.jpeg',
      'https://mblogthumb-phinf.pstatic.net/MjAxNzExMTVfMjUg/MDAxNTEwNzI3Nzk0ODAw.v4kiIifZvqbzIinRZhmA6XJQvMcQtwnrDpsk0gQrlKYg.PtUU5kw-qSjjzkq0Ev70shFeehsU6GkpOxfwHP5AEksg.JPEG.thedesigns11/natural-wood-flooring.jpg?type=w800',
    ],
    creator: '종필이네신발가게',
    floors: 25,
    pyungsoo: 12,
    room: '2룸 1거실',
    option:
      '냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨, 냉장고, 세탁기, 에어컨',
    contractType: '전세',
    ibjuDate: '2023.12.19',
    endDate: '2024.06.04',
    likeCount: 13,
    total_score: 3.5, // 3 / 1 / 1
    trans_score: 4.6, // 5 / 0 / 0
    infra_score: 2.3, // 2 / 1 / 2
    manage_score: 3.0, // 3 / 0 // 2
    life_score: 5.0, // 5 / 0/ 0
  },
];

function ReviewList() {
  const { setReviewDetail } = useContext(SidebarContext);

  const handleClickReview = (review) => {
    // console.log(review);
    setReviewDetail(review);
  };

  return (
    <>
      <div className="reivew__list__container">
        {reviewItemList.map((review, index) => (
          <ReviewListItem
            key={review.review_id}
            review={review}
            onClick={handleClickReview}
          />
        ))}
      </div>
      <div className="review__list__loading__container">
        {/* <div className="loading__icon">
          <ArrowClockwise />
        </div>
        <h2>리뷰를 추가로 불러옵니다.</h2>
        <h3>
          잠시만 기다려 주세요! 장시간 불러오지 못하는 경우 새로고침 해주세요.
        </h3> */}
      </div>
    </>
  );
}

export default ReviewList;
