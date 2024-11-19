import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import lectureclock from './assets/lecture_clock.svg';
import lecturelocation from './assets/lecture_location.svg';
import lecturetag from './assets/lecture_tag.svg';
import leftarrow from './assets/left-arrow.png';
import styles from './css/LectureList.module.css';

type ProfileProps = {
  token: string | null;
};

type ClassTime = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  place: string;
  startMinute: number;
  endMinute: number;
};

type Lecture = {
  _id: string;
  credit: number;
  class_time_json: ClassTime[];
  course_title: string;
  department: string;
  instructor: string;
  academic_year: string;
};

type TimeTableInfo = {
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: Lecture[];
  title: string;
};

const LectureList = ({ token }: ProfileProps) => {
  const [fullLectureList, setfullLectureList] = useState<Lecture[] | null>(
    null,
  );
  const navigate = useNavigate();
  const { id } = useParams();

  if (id === undefined) {
    throw new Error('id is undefined');
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const goToLectureDetails = (lectureId: string) => {
    navigate(`/timetables/${id}/lectures/${lectureId}`);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };
  const dayMapping = ['월', '화', '수', '목', '금'];

  useEffect(() => {
    const fetchLectureList = async () => {
      try {
        if (token === null) throw new Error('No token found');
        const response = await fetch(
          `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${id}`,
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          },
        );

        if (!response.ok) {
          throw new Error('강의목록 불러오기 실패');
        }

        const data = (await response.json()) as TimeTableInfo;
        const lecture_list = data.lecture_list;
        setfullLectureList(lecture_list);
      } catch (error) {
        console.error('error:', error);
      }
    };

    void fetchLectureList();
  }, [token, id]);

  return (
    <div className={styles.main}>
      <div className={styles.upperbar}>
        <button className={styles.backbutton} onClick={handleGoBack}>
          <img src={leftarrow} className={styles.backarrow}></img>
          뒤로
        </button>
      </div>
      <div className={styles.list}>
        {fullLectureList !== null ? (
          fullLectureList.map((lecture) => (
            <button
              key={lecture._id}
              className={styles.lectureitem}
              onClick={() => {
                goToLectureDetails(lecture._id);
              }}
            >
              <div className={styles.mainline}>
                <h4>{lecture.course_title}</h4>
                <p className={styles.lectureinfos}>
                  {lecture.instructor === '' ? '-' : lecture.instructor} /{' '}
                  {lecture.credit}
                  학점
                </p>
              </div>
              <div className={styles.eachline}>
                <img src={lecturetag} className={styles.lectureicon}></img>
                <p className={styles.lectureinfos}>
                  {lecture.department === '' ? '-' : lecture.department},{' '}
                  {lecture.academic_year === '' ? '-' : lecture.academic_year}
                </p>
              </div>
              <div className={styles.eachline}>
                <img src={lectureclock} className={styles.lectureicon}></img>
                <p className={styles.lectureinfos}>
                  {lecture.class_time_json
                    .map(
                      (classTime) =>
                        `${dayMapping[classTime.day] ?? '-'}(${formatTime(classTime.startMinute)} ~ ${formatTime(classTime.endMinute)})`,
                    )
                    .join(', ')}
                </p>
              </div>
              <div className={styles.eachline}>
                <img src={lecturelocation} className={styles.lectureicon}></img>
                <p className={styles.lectureinfos}>
                  {Array.from(
                    new Set(
                      lecture.class_time_json.map((classTime) =>
                        classTime.place === '' ? '-' : classTime.place,
                      ),
                    ),
                  ).join(', ')}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className={styles.loading}>로딩중...</div>
        )}
      </div>
    </div>
  );
};

export default LectureList;
