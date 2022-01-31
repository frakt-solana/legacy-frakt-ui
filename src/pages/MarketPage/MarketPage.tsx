import React from 'react';
import { Helmet } from 'react-helmet';

import AppLayout from '../../components/AppLayout';
import styles from './styles.module.scss';

const MarketPage = (): JSX.Element => (
  <AppLayout isLarge>
    <div className="container_lg">
      <Helmet>
        <title>{`Market | FRAKT: A NFT-DeFi ecosystem on Solana`}</title>
      </Helmet>
      <div className={styles.wrapper}></div>
    </div>
  </AppLayout>
);

export default MarketPage;
