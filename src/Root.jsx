import PageLayout from '@components/PageLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import { Routes, Route } from 'react-router-dom';

function Root() {
  return(
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default Root;
