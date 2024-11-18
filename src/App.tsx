import './reset.css';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import LectureList from './LectureList';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import MyPage from './MyPage';
import ProfilePage from './ProfilePage';

export const App = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(token != null);

  useEffect(() => {
    if (token != null) {
      localStorage.setItem('token', token);
      setLoggedIn(true);
    } else {
      localStorage.removeItem('token');
      setLoggedIn(false);
    }
  }, [token, loggedIn]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          // 로그인 화면 경로
          <>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
          </>
        ) : (
          // 로그인 후 Layout 경로
          <Route path="/" element={<Layout />}>
            <Route index element={<ProfilePage token={token} />} />
            <Route
              path="Mypage"
              element={<MyPage token={token} handleLogout={handleLogout} />}
            />
            <Route
              path="/timetables/:id/lectures"
              element={<LectureList token={token} />}
            />
          </Route>
        )}
      </Routes>
    </Router>
  );
};
