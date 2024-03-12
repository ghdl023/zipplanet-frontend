import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from '@components/Header';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import './PageLayout.scss';

function PageLayout() {
  const [reviewList, setReviewList] = useState([]);

  useEffect(()=>{
    if(!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, [])

  return (
    <RecoilRoot>
      <PageLayoutContext.Provider
        value={{
          reviewList,
          setReviewList,
        }}
      >
        <Layout id="page-layout">
          <Header />
          <Layout>
            <Outlet />
          </Layout>
        </Layout>
        <Toaster
          position="bottom-center"
          containerStyle={{
            zIndex: 99999999,
          }}
          toastOptions={{
            duration: 4500,
            success: {
              style: {
                // background: 'green',
                // color: '#fff',
              },
            },
            error: {
              style: {
                // background: 'red',
                // color: '#fff',
              },
            },
          }}
        />
      </PageLayoutContext.Provider>
    </RecoilRoot>
  );
}

export default PageLayout;
