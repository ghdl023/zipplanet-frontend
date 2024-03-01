import { useEffect } from 'react';
import Main from '../../components/Main';
import Sidebar from '../../components/Sidebar';
import './Home.scss';
import { getHome } from '@api/user';

function Home() {
  useEffect(() => {
    async function fetchData() {
      await getHome().then((res) => {
        console.log(res);
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <Main />
      <Sidebar />
    </>
  );
}

export default Home;
