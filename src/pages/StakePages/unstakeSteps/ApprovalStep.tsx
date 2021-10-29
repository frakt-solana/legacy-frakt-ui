import { PublicKey } from '@solana/web3.js';
import { useEffect } from 'react';
import moment from 'moment';
import { chunk } from 'lodash';

import Preloader from '../../../components/Preloader';
import { useStaking } from '../../../contexts/staking';
import styles from '../styles.module.scss';
import { useHistory } from 'react-router';
import { URLS } from '../../../constants';
import { usePrivatePage } from '../../../hooks';
import { StakeView } from 'frakt-client';

const ACCOUNTS_PER_CHUNK = 2;

interface ApprovalStepProps {
  selectedStakes: StakeView[];
}

const ApprovalStep = ({ selectedStakes }: ApprovalStepProps): JSX.Element => {
  usePrivatePage();
  const { unstakeFrakts } = useStaking();
  const history = useHistory();

  useEffect(() => {
    const unstake = async () => {
      const userStakeAccountsSorted = [...selectedStakes].sort(
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
    <div className={styles.approveStep}>
      <Preloader size="lg" />
      <p className={styles.approveStep__title}>Unstaking Frakts...</p>
      <p className={styles.approveStep__subtitle}>
        Please approve all transactions.
      </p>
    </div>
  );
};

export default ApprovalStep;
