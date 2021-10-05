import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PublicKey } from '@solana/web3.js';
import { chunk } from 'lodash';
import moment from 'moment';

import AppLayout from '../../components/AppLayout';
import Preloader from '../../components/Preloader';
import { useStaking } from '../../contexts/staking';
import styles from './styles.module.scss';
import { usePrivatePage } from '../../hooks';
import { URLS } from '../../constants';
import { StakeView } from 'frakt-client';

const ACCOUNTS_PER_CHUNK = 12;

const HarvestPage = (): JSX.Element => {
  usePrivatePage();
  const { userStakeAccounts, harvestStakes } = useStaking();
  const history = useHistory();

  useEffect(() => {
    const harvest = async () => {
      const userStakeAccountsSorted = [...userStakeAccounts].sort(
        (stakeAccountA, stakeAccountB) => {
          const getSortValue = (stakeAccount: StakeView) => {
            const seconds =
              moment().unix() - Number(stakeAccount.last_harvested_at);
            return seconds * Number(stakeAccount.points);
          };
          return getSortValue(stakeAccountB) - getSortValue(stakeAccountA);
        },
      );

      const chunks = chunk(userStakeAccountsSorted, ACCOUNTS_PER_CHUNK);

      for (let i = 0; i < chunks.length; ++i) {
        const res = await harvestStakes(
          chunks[i].map(
            ({ stakeAccountPubkey }) => new PublicKey(stakeAccountPubkey),
          ),
        );
        if (!res) break;
      }

      history.replace(URLS.STAKING);
    };

    harvest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout mainClassName={styles.appMain} headerText="Harvest">
      <div className={styles.approveStep}>
        <Preloader size="lg" />
        <p className={styles.approveStep__title}>Harvesting FRKTs...</p>
        <p className={styles.approveStep__subtitle}>
          Please approve all transactions.
        </p>
      </div>
    </AppLayout>
  );
};

export default HarvestPage;
