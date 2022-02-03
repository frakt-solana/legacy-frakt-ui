import React, { useMemo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import AppLayout from '../../components/AppLayout';
import ArtsList from '../../components/ArtsList';
import Preloader from '../../components/Preloader';
import { useFrakts } from '../../contexts/frakts';
import { useHistory, useParams } from 'react-router';
import { shortenAddress } from '../../utils/solanaUtils';
import { PublicKey } from '@solana/web3.js';
import { useCollectionFilters } from '../CollectionPage/hooks';
import ArtsFilter from '../../components/ArtsFilter';
import { sortArts } from '../CollectionPage/helpers';
import { PATHS } from '../../constants';

const WalletCollectionPage = (): JSX.Element => {
  const { walletPubkey } = useParams<{ walletPubkey: string }>();
  const history = useHistory();

  const { fraktsLoading, getWalletFrakts } = useFrakts();

  const [loading, setLoading] = useState<boolean>(true);
  const [walletFrakts, setWalletFrakts] = useState([]);

  const { filter, sortBy, onFilterChange, onSortChange } =
    useCollectionFilters();

  useEffect(() => {
    const fetchWalletFrakts = async (): Promise<void> => {
      try {
        const frakts = await getWalletFrakts(new PublicKey(walletPubkey));
        setWalletFrakts(frakts);
      } catch (err) {
        history.replace(PATHS.PAGE_404);
      } finally {
        setLoading(false);
      }
    };

    if (!fraktsLoading && walletPubkey) {
      fetchWalletFrakts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraktsLoading, walletPubkey]);

  const frakts = useMemo(
    () => sortArts(walletFrakts, sortBy),
    [walletFrakts, sortBy],
  );

  return (
    <AppLayout mainClassName={styles.appMain}>
      <div className="container">
        <Header walletPubkey={walletPubkey} />
        <Helmet>
          <title>{`Collection of ${walletPubkey} | FRAKT: A NFT-DeFi ecosystem on Solana`}</title>
        </Helmet>
        {loading && <Preloader size="lg" className={styles.preloader} />}
        {!loading && (
          <>
            {!frakts.length && <NoFraktsBlock />}
            {!!frakts.length && (
              <ArtsFilter
                hideFilter
                sortValue={sortBy}
                onSortChange={onSortChange}
                filterValue={filter}
                onFilterChangeValue={onFilterChange}
              />
            )}
            <ArtsList arts={frakts} />
          </>
        )}
      </div>
    </AppLayout>
  );
};

const Header = ({
  walletPubkey = '',
}: {
  walletPubkey?: string;
}): JSX.Element => (
  <div className={styles.header}>
    <p className={styles.header__text}>
      Collection of {shortenAddress(walletPubkey)}
    </p>
  </div>
);

const NoFraktsBlock = (): JSX.Element => {
  return (
    <div className={styles.noFrakts}>
      <p className={styles.noFrakts__text}>
        {"This wallet doesn't have any frakts yet"}
      </p>
    </div>
  );
};

export default WalletCollectionPage;
