import { useNavigate } from 'react-router-dom';
import { getAssetUrl } from '../../utils/common';
import './ErrorPage.scss';

function ErrorPage() {
  // const error = useRouteError();
  // console.error(error);

  const navigate = useNavigate();

  return (
    <div id="error-page">
      <img src={getAssetUrl('images/404.png')} alt="404" />
      <div>
        <h1>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</h1>
        <p>
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경,삭제되어 찾을 수 없습니다.
        </p>
      </div>
      <div
        id="error-btn-home"
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로
      </div>
    </div>
  );
}

export default ErrorPage;
