import React from 'react';
import { Outlet } from 'react-router-dom';

import BottomNavBar from './BottomNavBar';
import styles from './css/Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.Layout}>
      <Outlet />
      <BottomNavBar />
    </div>
  );
};

export default Layout;
