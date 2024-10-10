import './reset.css';

import { useNavigate } from 'react-router-dom';

import waffleLogo from './assets/waffleLogo.svg';
import styles from './css/MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLoginClick = () => {
    navigate('/login'); // '/another' 경로로 이동
  };

  return (
    <div className={styles.main}>
      <div className={styles.logobox}>
        <img src={waffleLogo} className={styles.wafflelogo} />
        <span className={styles.timetabletext}>TimeTable</span>
      </div>
      <div className={styles.toolbox}>
        <div className={styles.loginbox}>
          <button className={styles.loginbutton} onClick={handleLoginClick}>
            로그인
          </button>
          <h5 className={styles.registertext}>회원가입</h5>
        </div>
        <div className={styles.snsbox}>
          <div className={styles.snstextbox}>
            <hr className={styles.snstextline}></hr>
            <div className={styles.snstext}>SNS 계정으로 계속하기</div>
            <hr className={styles.snstextline}></hr>
          </div>
          <div className={styles.snslogobox}>
            <div className={styles.Kakaologo}></div>
            <div className={styles.Googlelogobox}>
              <div className={styles.Googlelogo}></div>
            </div>
            <div className={styles.Facebooklogo}></div>
            <div className={styles.Applelogo}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
