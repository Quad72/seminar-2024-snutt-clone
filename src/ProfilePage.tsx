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

type ClassSchedule = {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  color: string;
};

type ClassTime = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  place: string;
  startMinute: number;
  endMinute: number;
};

type Lecture = {
  id: string;
  credit: number;
  class_time_json: ClassTime[];
  course_title: string;
};

type TimeTableInfo = {
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: Lecture[];
  title: string;
};

const ProfilePage = ({ token }: ProfileProps) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [tag, setTag] = useState<string>('');
  const [scheduleData, setScheduleData] = useState<ClassSchedule[]>([]);

  const convertMinutesToTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };

  useEffect(() => {
    const dayMapping = ['월', '화', '수', '목', '금'];

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

    const fetchScheduleData = async () => {
      try {
        if (token === null) throw new Error('No token found');
        const response = await fetch(
          'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/recent',
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch timetable data');
        }

        const data = (await response.json()) as TimeTableInfo;
        const lecture_list = data.lecture_list;

        const transformedData = lecture_list.flatMap((lecture: Lecture) => {
          const subject = lecture.course_title;
          const color = '#' + (((1 << 24) * Math.random()) | 0).toString(16);

          return lecture.class_time_json.map((classTime: ClassTime) => ({
            day: String(dayMapping[classTime.day]), // Map day to 한글 (e.g., 월, 화, 수)
            startTime: convertMinutesToTime(classTime.startMinute),
            endTime: convertMinutesToTime(classTime.endMinute),
            subject,
            color,
          }));
        });

        setScheduleData(transformedData);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };

    void fetchProfile();
    void fetchScheduleData();
  }, [token]);

  /*const scheduleData = [
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
  ];*/

  return (
    <div className={styles.main}>
      <div className={styles.Upperbar}>
        <h3>학기</h3>
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
