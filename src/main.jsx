import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PageLayout from '@components/PageLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import MyPage from './pages/MyPage';
import FindId from './pages/FindId';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/reset.css';
import '@styles/tooltip.css';
import 'react-tooltip/dist/react-tooltip.css';

const router = createBrowserRouter([
  {
    path: '/zipplanet-frontend/',
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/zipplanet-frontend/',
        element: <Home />,
      },
      {
        path: '/zipplanet-frontend/login',
        element: <Login />,
      },
      {
        path: '/zipplanet-frontend/register',
        element: <Register />,
      },
      {
        path: '/zipplanet-frontend/mypage',
        element: <MyPage/>,
      },
      {
        path: '/zipplanet-frontend/findId',
        element: <FindId/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={router} />,
  </RecoilRoot>
  );
