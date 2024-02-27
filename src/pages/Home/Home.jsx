import { useEffect } from 'react';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import './Home.scss';

import { getHome } from '../../api/user';

function Home() {
  useEffect(async () => {
    console.log('hi');
    const result = await getHome();
    console.log(result);
  }, []);

  return (
    <>
      <Main />
      <Sidebar />
    </>
  );
}

export default Home;
