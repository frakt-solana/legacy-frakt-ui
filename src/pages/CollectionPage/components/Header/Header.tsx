import React from 'react';

import styles from './styles.module.scss';

const Header = (): JSX.Element => (
  <div className={`${styles.root} ${styles.hiddenOnMobile}`}>
    <p className={styles.text}>Collection</p>
  </div>
);

export default Header;
