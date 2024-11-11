import React from 'react';

import styles from './css/Timetable.module.css';

type ClassSchedule = {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  color: string;
};

type TimetableProps = {
  scheduleData: ClassSchedule[];
};

const Timetable: React.FC<TimetableProps> = ({ scheduleData }) => {
  const days = ['월', '화', '수', '목', '금'];
  const hours = Array.from({ length: 14 }, (_, i) => `${9 + i}`);

  const calculatePosition = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    if (hour === undefined || minute === undefined) {
      return 0;
    }
    return hour + minute / 60;
  };

  const calculateHeight = (startTime: string, endTime: string) => {
    const startPosition = calculatePosition(startTime);
    const endPosition = calculatePosition(endTime);
    return (endPosition - startPosition) * 100; // 높이를 백분율로 변환
  };

  const findClass = (day: string, hour: string) => {
    const currentHour = parseInt(hour);
    return scheduleData.find((schedule) => {
      const startPosition = calculatePosition(schedule.startTime);
      return schedule.day === day && Math.floor(startPosition) === currentHour;
    });
  };

  return (
    <div className={styles.timetable}>
      <div className={styles.body}>
        <div className={styles.emptycell}></div>
        {days.map((day) => (
          <div className={styles.day} key={day}>
            {day}
          </div>
        ))}
        {hours.map((hour) => (
          <div className={styles.row} key={hour}>
            <div className={styles.hour}>{hour}</div>
            {days.map((day) => {
              const classInfo = findClass(day, hour);
              if (classInfo !== undefined) {
                const startPosition = calculatePosition(classInfo.startTime);
                const startOffset =
                  (startPosition - Math.floor(startPosition)) * 100;
                const height = calculateHeight(
                  classInfo.startTime,
                  classInfo.endTime,
                );

                return (
                  <div className={styles.cell} key={`${day}-${hour}`}>
                    <div
                      className={styles.classBlock}
                      style={{
                        position: 'absolute',
                        top: `${startOffset}%`,
                        height: `${height}%`,
                        width: '100%',
                        backgroundColor: classInfo.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                      }}
                    >
                      {classInfo.subject}
                    </div>
                  </div>
                );
              }
              return <div className={styles.cell} key={`${day}-${hour}`} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
