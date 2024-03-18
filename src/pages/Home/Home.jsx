import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Main from '@components/Main';
import Sidebar from '@components/Sidebar';
import { reviewDetailState } from '../../recoil/reviewDetailState';
import './Home.scss';

function Home() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [reviewDetail, setReviewDetail] = useRecoilState(reviewDetailState);
  // console.log(`id = ${id}`);

  useEffect(()=>{
    if(id) { // 리뷰id 세팅만, 조회는 ReviewDetail 에서
      setReviewDetail({
        ...reviewDetail,
        reviewId: id,
      })
    }
  }, [])
  
  return (
    <>
      <Main />
      <Sidebar />
    </>
  );
}

export default Home;
