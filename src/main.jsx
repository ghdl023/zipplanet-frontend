import ReactDOM from 'react-dom/client';
import Root from './Root';
import ErrorPage from '@pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@styles/reset.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      // loader: appLoader,
      // action: appAction,
      children: [
        { index: true, element: <Home /> },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.PUBLIC_URL,
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
