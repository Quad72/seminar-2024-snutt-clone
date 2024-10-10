import { useNavigate } from 'react-router-dom';

import styles from './css/LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
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
      <h1>다른 페이지</h1>
      <p>여기는 다른 페이지입니다.</p>
    </div>
  );
};

export default LoginPage;
