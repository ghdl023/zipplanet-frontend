import { Layout } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import ReviewListWrapper from '../ReviewListWrapper/ReviewListWrapper';
import './Sidebar.scss';

const { Sider } = Layout;

const siderStyle = {
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#F7F7F7',
  display: 'flex',
  flexDirection: 'column',
};

const filterBtnStyle = {
  background: 'black',
  padding: '5px 10px',
  borderRadius: 10,
  color: 'white',
  fontSize: 13,
  marginRight: 10,
};

function Sidebar() {
  return (
    <Sider width="32%" style={siderStyle}>
      <div>
        <div
          style={{
            padding: '15px 10px',
            background: 'white',
            width: '100%',
            borderRadius: 5,
          }}
        >
          <SearchOutlined />
          <input
            type="text"
            placeholder="지번 검색"
            style={{
              width: '80%',
              padding: 5,
              fontSize: 16,
              border: 'none',
              outline: 'none',
            }}
          />
          <CloseOutlined />
        </div>
        <div style={{ display: 'flex', margin: '10px 0' }}>
          <div style={filterBtnStyle}>추천 순</div>
          <div style={filterBtnStyle}>최신 순</div>
        </div>
      </div>
      <div
        className="sider-list-container"
        style={{
          height: '100%',
          overflowY: 'scroll',
        }}
      >
        <ReviewListWrapper />
      </div>
    </Sider>
  );
}

export default Sidebar;
