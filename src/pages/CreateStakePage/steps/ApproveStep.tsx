import React from 'react';

import Preloader from '../../../components/Preloader';
import styles from '../styles.module.scss';

const ApproveStep = (): JSX.Element => {
  return (
    <div className={styles.approveStep}>
      <Preloader size="lg" />
      <p className={styles.approveStep__title}>Staking Frakts...</p>
      <p className={styles.approveStep__subtitle}>
        Please approve all transactions.
      </p>
    </div>
  );
};

export default ApproveStep;
