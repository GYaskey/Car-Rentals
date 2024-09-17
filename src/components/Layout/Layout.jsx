import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import s from './Layout.module.css';

const Layout = () => {
  return (
    <div className={s.layout}>
      <Header />
      <div className={s.mainContent}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
