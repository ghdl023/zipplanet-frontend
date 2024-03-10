import { useState } from 'react';
import Header from '@components/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { PageLayoutContext } from '../../contexts/PageLayoutContext';
import { RecoilRoot } from 'recoil';
import './PageLayout.scss';

function PageLayout() {
  const [reviewList, setReviewList] = useState([]);

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
      </PageLayoutContext.Provider>
    </RecoilRoot>
  );
}

export default PageLayout;
