import { useEffect, useState } from 'react';

import styles from './css/ProfilePage.module.css';
import Timetable from './Timetable';

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

  const scheduleData = [
    {
      day: '월',
      startTime: '10:00',
      endTime: '10:45',
      subject: '수학',
      color: 'red',
    },
    {
      day: '화',
      startTime: '11:00',
      endTime: '13:45',
      subject: '영어',
      color: 'blue',
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.Upperbar}>
        <h3>24-2</h3>
        <p className={styles.nametext}>
          {nickname !== null ? `${nickname}#${tag}` : '로딩중...'}
        </p>
      </div>
      <div className={styles.timetable}>
        <Timetable scheduleData={scheduleData} />
      </div>
    </div>
  );
};

export default ProfilePage;
