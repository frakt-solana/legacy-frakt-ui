import React from 'react';

import AppLayout from '../../components/AppLayout';
import Preloader from '../../components/Preloader';
import styles from './styles.module.scss';

const UnstakePage = (): JSX.Element => {
  return (
    <AppLayout mainClassName={styles.appMain} headerText="Unstake Frakts">
      <div className={styles.approveStep}>
        <Preloader size="lg" />
        <p className={styles.approveStep__title}>Unstaking Frakts...</p>
        <p className={styles.approveStep__subtitle}>
          Please approve all transactions.
        </p>
      </div>
    </AppLayout>
  );
};

export default UnstakePage;
