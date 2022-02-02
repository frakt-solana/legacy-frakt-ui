import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

import AppLayout from '../../components/AppLayout';
import { PATHS } from '../../constants';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './styles.module.scss';
import { useWalletModal } from '../../contexts/walletModal';

export const StakePage = (): JSX.Element => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <AppLayout>
      <div className="container">
        <Helmet>
          <title>{`Rarity | FRAKT: A NFT-DeFi ecosystem on Solana`}</title>
        </Helmet>
        <div className={styles.root}>
          {connected ? (
            <>
              <NavLink className={styles.link} to={PATHS.STAKING_FRKT}>
                Stake FRKT
              </NavLink>
              <NavLink className={styles.link} to={PATHS.STAKING_NFT}>
                Stake FRAKT
                <br />
                NFTs
              </NavLink>
            </>
          ) : (
            <>
              <p className={styles.link} onClick={() => setVisible(true)}>
                Stake FRKT
              </p>
              <p className={styles.link} onClick={() => setVisible(true)}>
                Stake FRAKT
                <br />
                NFTs
              </p>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};
