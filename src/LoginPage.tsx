import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import leftarrow from './assets/left-arrow.png';
import styles from './css/LoginPage.module.css';

type LoginProps = {
  setToken: (token: string) => void;
};

type TokenResponse = {
  user_id: string;
  token: string;
  message: string;
};

const LoginPage = ({ setToken }: LoginProps) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch(
        'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1/auth/login_local',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, password }),
        },
      );

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const data = (await response.json()) as TokenResponse;
      setToken(data.token);
      navigate('/');
    } catch (error) {
      console.error('error: ', error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.upperbar}>
        <button className={styles.backbutton} onClick={handleGoBack}>
          <img src={leftarrow} className={styles.backarrow}></img>
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
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
          ></input>
        </div>
        <div className={styles.passwordbox}>
          <span className={styles.passwordtext}>비밀번호</span>
          <input
            className={styles.passwordinput}
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
        <button
          className={styles.loginbutton}
          onClick={() => {
            handleLoginClick().catch(() => {
              console.error('error');
            });
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
