import './reset.css';

import { useNavigate } from 'react-router-dom';

import AppleLogo from './assets/Applesmall.png';
import FacebookLogo from './assets/FaceBooksmall.png';
import GoogleLogo from './assets/GoogleLogo.png';
import KakaoLogo from './assets/Kakaosmall.png';
import waffleLogo from './assets/waffleLogo.svg';
import styles from './css/MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
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
            <img className={styles.Kakaologo} src={KakaoLogo}></img>
            <div className={styles.Googlelogobox}>
              <img className={styles.Googlelogo} src={GoogleLogo}></img>
            </div>
            <img className={styles.Facebooklogo} src={FacebookLogo}></img>
            <img className={styles.Applelogo} src={AppleLogo}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
