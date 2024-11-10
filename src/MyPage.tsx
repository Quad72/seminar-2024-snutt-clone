import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './css/MyPage.module.css';

type ProfileProps = {
  token: string | null;
  handleLogout: () => void;
};

type ProfileResponse = {
  id: string;
  isAdmin: boolean;
  regDate: string;
  notificationCheckedAt: string;
  email: string;
  localId: string;
  fbName: string;
  nickname: { nickname: string; tag: string };
};

const MyPage = ({ token, handleLogout }: ProfileProps) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [tag, setTag] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token === null) throw new Error('No token found');
        const response = await fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/users/me',
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          },
        );

        if (!response.ok) {
          throw new Error('프로필 불러오기 실패');
        }

        const data = (await response.json()) as ProfileResponse;
        setNickname(data.nickname.nickname);
        setTag(data.nickname.tag);
      } catch (error) {
        console.error('error:', error);
      }
    };

    void fetchProfile();
  }, [token]);

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <div className={styles.main}>
      <h1>MyPage</h1>
      <p className={styles.nametext}>
        {nickname !== null ? `${nickname}#${tag}` : '로딩중...'}
      </p>
      <div className={styles.buttonbox}>
        <button className={styles.logoutbutton} onClick={handleLogoutClick}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
