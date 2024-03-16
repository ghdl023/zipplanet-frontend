import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Header from '@components/Header';
import ReviewCreateModal from '../ReviewCreateModal';
import { modalState } from '../../recoil/modalState';
import './PageLayout.scss';

function PageLayout() {
  const modalStateValue = useRecoilValue(modalState);
  const { reviewCreateModalOpen } = modalStateValue;

  useEffect(() => {
    if (!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <Layout id="page-layout">
        <Header />
        <Layout>
          <Outlet />
        </Layout>
      </Layout>
      {reviewCreateModalOpen && <ReviewCreateModal />}
      <Toaster
        position="bottom-center"
        containerStyle={{
          zIndex: 99999999,
        }}
        toastOptions={{
          duration: 4500,
          success: {
            style: {
              // background: 'green',
              // color: '#fff',
            },
          },
          error: {
            style: {
              // background: 'red',
              // color: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default PageLayout;
