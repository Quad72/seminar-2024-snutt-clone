import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import leftarrow from './assets/left-arrow.png';
import styles from './css/LecturePage.module.css';
import LoadingBar from './LoadingBar';

type ClassTime = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  place: string;
  startMinute: number;
  endMinute: number;
};

type LectureDetails = {
  _id: string;
  academic_year: string;
  category: string;
  credit: number;
  course_number: string;
  course_title: string;
  color:
    | {
        bg: string | undefined;
        fg: string | undefined;
      }
    | undefined;
  class_time_json: ClassTime[];
  classification: string;
  department: string;
  instructor: string;
  lecture_number: string;
  quota: number;
  freshman_quota: number | undefined;
  remark: string;
};

type TimeTableInfo = {
  year: number;
  semester: 1 | 2 | 3 | 4;
  lecture_list: LectureDetails[];
  title: string;
};

type LectureProps = {
  token: string | null;
};

const LecturePage = ({ token }: LectureProps) => {
  const [lectureDetails, setLectureDetails] = useState<LectureDetails | null>(
    null,
  );
  const navigate = useNavigate();
  const { tableId, lectureId } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  };
  const dayMapping = ['월', '화', '수', '목', '금'];

  const handleDelete = async () => {
    try {
      if (token === null) throw new Error('No token found');
      if (tableId === undefined || lectureId === undefined)
        throw new Error('id is undefined');

      if (!window.confirm('강의를 삭제하시겠습니까?')) return;

      const response = await fetch(
        `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${tableId}/lecture/${lectureId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        },
      );

      if (!response.ok) {
        throw new Error('강의 삭제 실패');
      }
      navigate('/');
    } catch (error) {
      console.error('error:', error);
    }
  };

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        if (token === null) throw new Error('No token found');
        if (tableId === undefined) throw new Error('id is undefined');
        const response = await fetch(
          `https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/tables/${tableId}`,
          {
            method: 'GET',
            headers: {
              'x-access-token': token,
            },
          },
        );

        if (!response.ok) {
          throw new Error('강의 정보 불러오기 실패');
        }

        const data = (await response.json()) as TimeTableInfo;

        const lecture = data.lecture_list.find(
          (lectureItem: LectureDetails) => lectureItem._id === lectureId,
        );

        if (lecture === undefined) throw new Error('Lecture not found.');
        setLectureDetails(lecture);
      } catch (error) {
        console.error('error:', error);
      }
    };

    void fetchLectureDetails();
  }, [token, tableId, lectureId]);

  return (
    <div className={styles.main}>
      <div className={styles.upperbar}>
        <button className={styles.backbutton} onClick={handleGoBack}>
          <img src={leftarrow} className={styles.backarrow}></img>
          뒤로
        </button>
      </div>
      {lectureDetails !== null ? (
        <div className={styles.content}>
          <div className={styles.datadiv}>
            <div className={styles.databox}>
              강의명
              <p className={styles.data}>{lectureDetails.course_title}</p>
            </div>
            <div className={styles.databox}>
              교수
              <p className={styles.data}>{lectureDetails.instructor}</p>
            </div>
            <div className={styles.databox}>
              색
              <p className={styles.data}>
                {lectureDetails.color !== undefined
                  ? lectureDetails.color.fg
                  : '(없음)'}
              </p>
            </div>
          </div>
          <div className={styles.datadiv}>
            <div className={styles.databox}>
              강의평점
              <p className={styles.data}>★-- (0개)</p>
            </div>
          </div>
          <div className={styles.datadiv}>
            <div className={styles.databox}>
              학과
              <p className={styles.data}>{lectureDetails.department}</p>
            </div>
            <div className={styles.databox}>
              학년
              <p className={styles.data}>{lectureDetails.academic_year}</p>
            </div>
            <div className={styles.databox}>
              학점
              <p className={styles.data}>{lectureDetails.credit}</p>
            </div>
            <div className={styles.databox}>
              분류
              <p className={styles.data}>{lectureDetails.classification}</p>
            </div>
            <div className={styles.databox}>
              구분
              <p className={styles.data}>
                {lectureDetails.category !== ''
                  ? lectureDetails.category
                  : '(없음)'}
              </p>
            </div>
            <div className={styles.databox}>
              강좌번호
              <p className={styles.data}>{lectureDetails.course_number}</p>
            </div>
            <div className={styles.databox}>
              분반번호
              <p className={styles.data}>{lectureDetails.lecture_number}</p>
            </div>
            <div className={styles.databox}>
              정원(재학생)
              <p className={styles.data}>
                {lectureDetails.quota}(
                {lectureDetails.freshman_quota !== undefined
                  ? lectureDetails.quota - lectureDetails.freshman_quota
                  : lectureDetails.quota}
                )
              </p>
            </div>
            <div className={styles.databox}>
              비고
              <p className={styles.data}>{lectureDetails.remark}</p>
            </div>
          </div>
          <div className={styles.datadivsmall}>
            <div className={styles.databox}>시간 및 장소</div>
            {lectureDetails.class_time_json.map((classTime, index) => (
              <div key={index}>
                <div className={styles.databoxsmall}>
                  시간
                  <p className={styles.data}>
                    {dayMapping[classTime.day] ?? '-'} (
                    {formatTime(classTime.startMinute)} ~
                    {formatTime(classTime.endMinute)})
                  </p>
                </div>
                <div className={styles.databoxsmall}>
                  장소
                  <p className={styles.data}>
                    {classTime.place === '' ? '-' : classTime.place}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.datadiv}>
            <button
              className={styles.deletebutton}
              onClick={() => {
                handleDelete().catch(() => {
                  console.error('error');
                });
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default LecturePage;
