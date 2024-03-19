import PageLayout from './components/PageLayout/PageLayout';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <RecoilRoot>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'yg-jalnan',
          },
        }}
      >
        <PageLayout />
      </ConfigProvider>
    </RecoilRoot>
  );
}

export default App;
