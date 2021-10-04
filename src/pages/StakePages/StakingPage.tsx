import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import styles from './styles.module.scss';

const StakingPage = (): JSX.Element => (
  <AppLayout headerText="Staking" mainClassName={styles.appMain}>
    <Helmet>
      <title>{`Staking | FRAKT: Generative Art NFT Collection on Solana`}</title>
    </Helmet>
    <div className={styles.stakingPage}>
      <div className={styles.stakingPage__stakeWrapper}>
        <Table
          size="md"
          data={[
            ['Frakts to stake', '100'],
            ['Points to stake', '500'],
          ]}
          className={styles.stakingPage__infoTable}
        />
        <NavLink to={URLS.STAKING_CREATE}>
          <Button size="md">Stake</Button>
        </NavLink>
      </div>
      <div className={styles.stakingPage__harvestWrapper}>
        <Table
          size="lg"
          data={[
            ['Points staking', '280'],
            ['FRKTs per month', '100'],
            ['FRKTs to harvest', '500'],
          ]}
          className={styles.stakingPage__infoTable}
        />
        <Button size="lg">Harvest 500</Button>
      </div>
      <div className={styles.stakingPage__unstakeWrapper}>
        <Table
          size="md"
          data={[
            ['Frakts staking', '10'],
            ['Points staking', '280'],
            ['Available to unstake', '5'],
          ]}
          className={styles.stakingPage__infoTable}
        />
        <NavLink to={URLS.STAKING_UNSTAKE}>
          <Button size="md">Unstake 5</Button>
        </NavLink>
      </div>
    </div>
  </AppLayout>
);

export default StakingPage;
