import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';

import './Sidebar.scss';

const { Sider } = Layout;

const siderStyle = {
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#F7F7F7',
  display: 'flex',
  flexDirection: 'column',
};

function Sidebar() {
  return (
    <Sider width="35%" style={siderStyle}>
      <SidebarHeader />
      <SidebarMain />
    </Sider>
  );
}

export default Sidebar;
