import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';

import AppLayout from '../../components/AppLayout';
import { URLS } from '../../constants';
import { useWallet } from '../../external/contexts/wallet';
import styles from './styles.module.scss';

export const StakePage = (): JSX.Element => {
  const { connected, select } = useWallet();

  return (
    <AppLayout>
      <Helmet>
        <title>{`Rarity | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.root}>
        {connected ? (
          <>
            <NavLink className={styles.link} to={URLS.STAKING_FRKT}>
              Stake FRKT
            </NavLink>
            <NavLink className={styles.link} to={URLS.STAKING_NFT}>
              Stake FRAKT
              <br />
              NFTs
            </NavLink>
          </>
        ) : (
          <>
            <p className={styles.link} onClick={select}>
              Stake FRKT
            </p>
            <p className={styles.link} onClick={select}>
              Stake FRAKT
              <br />
              NFTs
            </p>
          </>
        )}
      </div>
    </AppLayout>
  );
};
