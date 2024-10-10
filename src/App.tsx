import './reset.css';

import waffleLogo from './assets/waffleLogo.svg';
//import { useReducer } from 'react';
import styles from './css/App.module.css';

export const App = () => {
  //const [count, increment] = useReducer((c: number) => c + 1, 0);

  return (
    <div className={styles.main}>
      <img src={waffleLogo} />
    </div>
    // 커밋 테스트
  );
};
