import { Layout } from 'antd';
import SidebarHeader from '@components/SidebarHeader';
import SidebarMain from '@components/SidebarMain';

import './Sidebar.scss';

const { Sider } = Layout;

function Sidebar() {
  return (
    <Sider className="sidebar__container">
      <SidebarHeader />
      <SidebarMain />
    </Sider>
  );
}

export default Sidebar;
