import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StakeView } from 'frakt-client';
import { PublicKey } from '@solana/web3.js';
import moment from 'moment';
import { chunk } from 'lodash';

import AppLayout from '../../components/AppLayout';
import Preloader from '../../components/Preloader';
import { useStaking } from '../../contexts/staking';
import { usePrivatePage } from '../../hooks';
import styles from './styles.module.scss';
import { URLS } from '../../constants';

const ACCOUNTS_PER_CHUNK = 2;

const UnstakePage = (): JSX.Element => {
  usePrivatePage();
  //TODO: Disable ability to unstake all frakts on prod
  const {
    userStakeAccounts: userStakeAccountsAvailableToUnstake,
    /* userStakeAccountsAvailableToUnstake,*/ unstakeFrakts,
  } = useStaking();
  const history = useHistory();

  useEffect(() => {
    const unstake = async () => {
      const userStakeAccountsSorted = [
        ...userStakeAccountsAvailableToUnstake,
      ].sort((stakeAccountA, stakeAccountB) => {
        const getSortValue = (stakeAccount: StakeView) => {
          const seconds =
            moment().unix() - Number(stakeAccount.last_harvested_at);
          return seconds * Number(stakeAccount.points);
        };
        return getSortValue(stakeAccountB) - getSortValue(stakeAccountA);
      });

      const chunks = chunk(userStakeAccountsSorted, ACCOUNTS_PER_CHUNK);

      for (let i = 0; i < chunks.length; ++i) {
        const res = await unstakeFrakts(
          chunks[i].map(({ stakeAccountPubkey, art_pubkey, mint_pubkey }) => ({
            artPubKey: new PublicKey(art_pubkey),
            mintPubKey: new PublicKey(mint_pubkey),
            stakePubkey: new PublicKey(stakeAccountPubkey),
          })),
        );
        if (!res) break;
      }

      history.replace(URLS.STAKING);
    };

    unstake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
