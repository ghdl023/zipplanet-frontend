import { Layout } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
const { Sider, Content } = Layout;
import './Home.scss';
import { getAssetUrl } from '../utils/common';

const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
};
const siderStyle = {
  padding: 15,
  textAlign: 'center',
  backgroundColor: '#F3F4F6',
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

function Home() {
  return (
    <>
      <Content style={contentStyle}>
        <img src={getAssetUrl('images/kakao_map.png')} alt="" width="100%" />
      </Content>
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '300px',
                background: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid grey',
              }}
            >
              {i}
            </div>
          ))}
        </div>
      </Sider>
    </>
  );
}

export default Home;
