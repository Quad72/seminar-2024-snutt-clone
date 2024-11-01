import './reset.css';

import styles from './css/UserPage.module.css';
//import { useNavigate } from 'react-router-dom';
import Timetable from './Timetable';

const UserPage = () => {
  //const navigate = useNavigate();

  /*const handleLoginClick = () => {
    navigate('/login');
  };*/

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
    // 추가 과목 정보
  ];

  return (
    <div className={styles.Main}>
      <div className={styles.Upperbar}>
        <h3>24-2</h3>
      </div>
      <Timetable scheduleData={scheduleData} />
    </div>
  );
};

export default UserPage;
