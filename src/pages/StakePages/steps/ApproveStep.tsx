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
interface ApproveStepProps {
  selectedFrakts: Frakt[];
}

const ApproveStep = ({ selectedFrakts }: ApproveStepProps): JSX.Element => {
  usePrivatePage();
  const { stakeFrakts } = useStaking();
  const history = useHistory();

  useEffect(() => {
    const stake = async () => {
      const chunks = chunk(selectedFrakts, FRAKTS_PER_CHUNK);

      for (let i = 0; i < chunks.length; ++i) {
        const res = await stakeFrakts(
          chunks[i].map(({ metadata }) => ({
            artPubKey: new PublicKey(metadata.artAccountPubkey),
            mintPubKey: new PublicKey(metadata.minted_token_pubkey),
          })),
        );
        if (!res) break;
      }

      history.replace(URLS.STAKING);
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

export default ApproveStep;
