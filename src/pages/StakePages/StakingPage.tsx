import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import styles from './styles.module.scss';

const StakingPage = (): JSX.Element => (
  <AppLayout headerText="Staking">
    <Helmet>
      <title>{`Staking | FRAKT: Generative Art NFT Collection on Solana`}</title>
    </Helmet>
    <div className={styles.stakingPage}>
      <p>You are staking 10 Frakts</p>

      <NavLink to={URLS.STAKING_CREATE}>
        <Button size="lg">Stake</Button>
      </NavLink>
      <NavLink to={URLS.STAKING_UNSTAKE}>
        <Button size="md">Unstake</Button>
      </NavLink>

      <Table
        data={[
          ['Frakts staking', '10'],
          ['Points staking', '280'],
          ['FRKTs to harvest', 50],
        ]}
      />

      <Button>Harvest</Button>
    </div>
  </AppLayout>
);

export default StakingPage;
