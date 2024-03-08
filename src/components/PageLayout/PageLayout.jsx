import { useState } from 'react';
import Header from '@components/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './PageLayout.scss';

import { PageLayoutContext } from '../../contexts/PageLayoutContext';

function PageLayout() {

  const [reviewList, setReviewList] = useState([]);
  
  return (
    <PageLayoutContext.Provider value={{
        reviewList,
        setReviewList
    }}>
      <Layout id="page-layout">
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </Layout>
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;
