import { useEffect, useState } from 'react';

import styles from './css/ProfilePage.module.css';

type ProfileProps = {
  token: string | null;
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

const ProfilePage = ({ token }: ProfileProps) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [tag, setTag] = useState<string>('');

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

  return (
    <div className={styles.main}>
      <p className={styles.nametext}>
        {nickname !== null ? `${nickname}#${tag}` : '로딩중...'}
      </p>
    </div>
  );
};

export default ProfilePage;
