import React from 'react';
import { Helmet } from 'react-helmet';

import AppLayout from '../../components/AppLayout';
import styles from './styles.module.scss';

const StakingPage = (): JSX.Element => (
  <AppLayout>
    <Helmet>
      <title>{`Staking | FRAKT: Generative Art NFT Collection on Solana`}</title>
    </Helmet>
    <div className={styles.root}>
      <h1 className={styles.title}>Staking page here</h1>
    </div>
  </AppLayout>
);

export default StakingPage;
