import Header from '@components/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './PageLayout.scss';

function PageLayout() {
  return (
    <Layout id="page-layout">
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
}

export default PageLayout;
