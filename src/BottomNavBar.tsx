import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import friendstaboffIcon from './assets/tab_friends_off.svg';
import lecturereviewoffIcon from './assets/tab_lecturereview_off.svg';
import mypageoffIcon from './assets/tab_mypage_off.svg';
import searchIcon from './assets/tab_search.svg';
import timetableoffIcon from './assets/tab_timetable_off.svg';
import timetableonIcon from './assets/tab_timetable_on.svg';
import styles from './css/BottomNavBar.module.css';

const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Timetable',
      iconOff: timetableoffIcon,
      iconOn: timetableonIcon,
    },
    {
      path: '/search',
      label: 'Search',
      iconOn: searchIcon,
      iconOff: searchIcon,
    },
    {
      path: '/lecture',
      label: 'Lecturereview',
      iconOn: lecturereviewoffIcon,
      iconOff: lecturereviewoffIcon,
    },
    {
      path: '/friends',
      label: 'Friends',
      iconOff: friendstaboffIcon,
      iconOn: friendstaboffIcon,
    },
    {
      path: '/mypage',
      label: 'Mypage',
      iconOff: mypageoffIcon,
      iconOn: mypageoffIcon,
    },
  ];

  return (
    <nav className={styles.Navbar}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <img
            src={location.pathname === item.path ? item.iconOn : item.iconOff}
            alt={`${item.label} icon`}
            className={styles.icon}
          />
        </Link>
      ))}
    </nav>
  );
};

export default BottomNavBar;
