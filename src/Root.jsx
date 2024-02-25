import { Layout } from 'antd';
import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';

const layoutStyle = {
  height: '100%',
  overflow: 'hidden',
};

function Root() {
  return (
    <div id="root-wrapper">
      <Layout style={layoutStyle}>
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </Layout>
    </div>
  );
}

export default Root;
