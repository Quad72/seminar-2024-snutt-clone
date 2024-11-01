import './reset.css';

import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ProfilePage from './ProfilePage';
import UserPage from './UserPage';

export const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={loggedIn ? <UserPage /> : <MainPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/profile" element={<ProfilePage token={token} />} />
      </Routes>
    </Router>
  );
};
