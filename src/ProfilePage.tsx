import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LectureList from './assets/topbar_lecturelist.svg';
import ListviewToggle from './assets/topbar_listview.svg';
import Notification from './assets/topbar_notification.svg';
import ShareButton from './assets/topbar_share.svg';
import styles from './css/ProfilePage.module.css';
import Timetable from './Timetable';

type ProfileProps = {
  token: string | null;
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
  _id: string;
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: Lecture[];
  title: string;
};

const ProfilePage = ({ token }: ProfileProps) => {
  const [scheduleData, setScheduleData] = useState<ClassSchedule[]>([]);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [timeTableTitle, settimeTableTitle] = useState<string>('');
  const [timeTableId, setTimeTableId] = useState<string>('');

  const navigate = useNavigate();

  const goToLectureList = (id: string) => {
    navigate(`/timetables/${id}/lectures`);
  };

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
        settimeTableTitle(data.title);
        setTimeTableId(data._id);
        const lecture_list = data.lecture_list;
        setTotalCredits(
          lecture_list.reduce((sum, item) => sum + item.credit, 0),
        );

        const transformedData = lecture_list.flatMap((lecture: Lecture) => {
          const subject = lecture.course_title;
          const color = '#' + (((1 << 24) * Math.random()) | 0).toString(16);

          return lecture.class_time_json.map((classTime: ClassTime) => ({
            day: String(dayMapping[classTime.day]),
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

  return (
    <div className={styles.main}>
      <div className={styles.Upperbar}>
        <img src={ListviewToggle} className={styles.listviewToggle}></img>
        <p className={styles.semester}>
          {timeTableTitle !== '' ? timeTableTitle : '로딩중...'}
        </p>
        <p className={styles.credits}>({totalCredits}학점)</p>
        <img
          src={LectureList}
          className={styles.lectureList}
          onClick={() => {
            goToLectureList(timeTableId);
          }}
        ></img>
        <img src={ShareButton} className={styles.shareButton}></img>
        <img src={Notification} className={styles.notification}></img>
      </div>
      <div className={styles.timetable}>
        <Timetable scheduleData={scheduleData} />
      </div>
    </div>
  );
};

export default ProfilePage;
