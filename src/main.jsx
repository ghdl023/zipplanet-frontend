import ReactDOM from 'react-dom/client';
import PageLayout from '@components/PageLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import MyPage from './pages/MyPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/reset.css';
import '@styles/tooltip.css';
import 'react-tooltip/dist/react-tooltip.css';
import FindId from './pages/FindId';
import FindIdResult from './pages/FindIdResult';
import FindPwd from './pages/FindPwd';
import FindPwdResult from './pages/FindPwdResult/FindPwdResult';

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
      },
      {
        path: '/zipplanet-frontend/findIdResult',
        element: <FindIdResult/>
      },
      {
        path: '/zipplanet-frontend/findPwd',
        element: <FindPwd/>
      },
      {
        path: '/zipplanet-frontend/findPwdResult',
        element: <FindPwdResult/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
