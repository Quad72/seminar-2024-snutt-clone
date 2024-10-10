import './reset.css';

import waffleLogo from './assets/waffleLogo.svg';
//import { useReducer } from 'react';
import styles from './css/App.module.css';

export const App = () => {
  //const [count, increment] = useReducer((c: number) => c + 1, 0);

  return (
    <div className={styles.main}>
      <div className={styles.logobox}>
        <img src={waffleLogo} className={styles.wafflelogo} />
        <span className={styles.timetabletext}>TimeTable</span>
      </div>
      <div className={styles.toolbox}>
        <div className={styles.loginbox}>
          <button className={styles.loginbutton}>로그인</button>
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
