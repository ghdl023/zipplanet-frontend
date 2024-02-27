import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@styles/reset.css';

const router = createBrowserRouter([
  {
    path: '/zipplanet-frontend/',
    element: <App />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
);
