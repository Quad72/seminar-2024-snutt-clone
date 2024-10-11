import { useNavigate } from 'react-router-dom';

import styles from './css/LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.upperbar}>
        <button className={styles.backbutton} onClick={handleGoBack}>
          <img
            src="./src/assets/left-arrow.png"
            className={styles.backarrow}
          ></img>
          뒤로
        </button>
        <span className={styles.title}>로그인</span>
      </div>
      <div className={styles.typebox}>
        <div className={styles.idbox}>
          <span className={styles.idtext}>아이디</span>
          <input
            className={styles.idinput}
            type="text"
            id="id"
            placeholder="아이디를 입력하세요"
          ></input>
        </div>
        <div className={styles.passwordbox}>
          <span className={styles.passwordtext}>비밀번호</span>
          <input
            className={styles.passwordinput}
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          ></input>
        </div>
        <div className={styles.subtextbox}>
          <span className={styles.subtexts}>아이디 찾기</span>
          <span className={styles.subtextssplicer}>|</span>
          <span className={styles.subtexts}>비밀번호 재설정</span>
        </div>
      </div>
      <div className={styles.buttonbox}>
        <button className={styles.loginbutton}>로그인</button>
      </div>
    </div>
  );
};

export default LoginPage;
