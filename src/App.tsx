import './reset.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './LoginPage';
import MainPage from './MainPage'; // 홈 컴포넌트
import ProfilePage from './ProfilePage';

export const App = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/profile" element={<ProfilePage token={token} />} />
      </Routes>
    </Router>
  );
};
