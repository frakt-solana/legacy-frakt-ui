import { PublicKey } from '@solana/web3.js';
import { useEffect } from 'react';
import { chunk } from 'lodash';

import Preloader from '../../../components/Preloader';
import { Frakt } from '../../../contexts/frakts';
import { useStaking } from '../../../contexts/staking';
import styles from '../styles.module.scss';
import { useHistory } from 'react-router';
import { URLS } from '../../../constants';
import { usePrivatePage } from '../../../hooks';

const FRAKTS_PER_CHUNK = 2;

interface ApprovalStepProps {
  selectedFrakts: Frakt[];
}

const ApprovalStep = ({ selectedFrakts }: ApprovalStepProps): JSX.Element => {
  usePrivatePage();
  const { stakeFrakts, updateStakeFrakts, reusableStakeAccounts } =
    useStaking();
  const history = useHistory();

  useEffect(() => {
    const stake = async () => {
      const { reusedStakeAccounts, newFrakts } = selectedFrakts.reduce(
        (acc, frakt) => {
          const account = reusableStakeAccounts.find(
            ({ art_pubkey }) => art_pubkey === frakt.metadata.artAccountPubkey,
          );

          if (account) {
            acc.reusedStakeAccounts = [...acc.reusedStakeAccounts, account];
          } else {
            acc.newFrakts = [...acc.newFrakts, frakt];
          }

          return acc;
        },
        { reusedStakeAccounts: [], newFrakts: [] },
      );

      const reusedStakeAccountsChunks = chunk(
        reusedStakeAccounts,
        FRAKTS_PER_CHUNK,
      );

      const newFraktsChunks = chunk(newFrakts, FRAKTS_PER_CHUNK);

      for (let i = 0; i < reusedStakeAccountsChunks.length; ++i) {
        const res = await updateStakeFrakts(
          reusedStakeAccountsChunks[i].map(
            ({ stakeAccountPubkey, art_pubkey, mint_pubkey }) => ({
              artPubKey: new PublicKey(art_pubkey),
              mintPubKey: new PublicKey(mint_pubkey),
              stakePubkey: new PublicKey(stakeAccountPubkey),
            }),
          ),
        );
        if (!res) break;
      }

      for (let i = 0; i < newFraktsChunks.length; ++i) {
        const res = await stakeFrakts(
          newFraktsChunks[i].map(({ metadata }) => ({
            artPubKey: new PublicKey(metadata.artAccountPubkey),
            mintPubKey: new PublicKey(metadata.minted_token_pubkey),
          })),
        );
        if (!res) break;
      }

      history.replace(URLS.STAKING_NFT);
    };

    stake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default ApprovalStep;
