import './reset.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import MyPage from './MyPage';
import ProfilePage from './ProfilePage';

export const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  if (token !== null && !loggedIn) {
    setLoggedIn(true);
  }

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
            <Route path="Mypage" element={<MyPage />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};
