import { Layout } from 'antd';
import MapImage from '@assets/images/kakao_map.png';
import './Main.scss';

const { Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
};

function Main() {
  return (
    <>
      <Content style={contentStyle}>
        <img src={MapImage} alt="" width="100%" height="100%" />
      </Content>
    </>
  );
}

export default Main;
