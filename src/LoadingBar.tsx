import React from 'react';

import styles from './css/LoadingBar.module.css';

const LoadingBar: React.FC = () => {
  return (
    <div className={styles.loading_bar_container}>
      <div className={styles.loading_bar}></div>
    </div>
  );
};

export default LoadingBar;
