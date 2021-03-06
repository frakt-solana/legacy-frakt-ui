import { useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.module.scss';
import { sortArts } from './helpers';
import AppLayout from '../../components/AppLayout';
import ArtsList from '../../components/ArtsList';
import ArtsFilter from '../../components/ArtsFilter';
import Preloader from '../../components/Preloader';
import { useWallet } from '@solana/wallet-adapter-react';
import NoFraktsBlock from './components/NoFraktsBlock';
import UpgradeSection from './components/UpgradeSection';
import { notify } from '../../utils/solanaUtils';
import { useFrakts } from '../../contexts/frakts';
import { useCollectionFilters } from './hooks';

const CollectionsPage = (): JSX.Element => {
  const { connected } = useWallet();

  const { filter, sortBy, showUserFrakts, onFilterChange, onSortChange } =
    useCollectionFilters();

  const {
    frakts: rawFrakts,
    fraktsLoading,
    currentUserFrakts: rawCurrentUserFrakts,
    upgradeFrakts,
  } = useFrakts();

  const frakts = useMemo(
    () =>
      showUserFrakts
        ? sortArts(rawCurrentUserFrakts, sortBy)
        : sortArts(rawFrakts, sortBy),
    [rawFrakts, rawCurrentUserFrakts, sortBy, showUserFrakts],
  );
  const fraktsToUpgrade = useMemo(
    () => frakts.filter((art) => art.metadata.is_old_version),
    [frakts],
  );

  const onUpgradeFrakts = useCallback(async () => {
    const success = await upgradeFrakts(fraktsToUpgrade.slice(0, 5));

    success &&
      notify({
        message: 'Success',
        description:
          'Your frakts will be updated within seconds. If you have more to go, please wait for previos generation and repeat',
        type: 'success',
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fraktsToUpgrade.length]);

  return (
    <AppLayout mainClassName={styles.appMain}>
      <Helmet>
        <title>{`Collection | FRAKT: A NFT-DeFi ecosystem on Solana`}</title>
      </Helmet>
      {fraktsLoading && <Preloader size="lg" className={styles.preloader} />}
      {!fraktsLoading && (
        <div className="container">
          <h2 className={styles.pageTitle}>Collection</h2>
          {connected && showUserFrakts && !!fraktsToUpgrade.length && (
            <UpgradeSection
              oldFraktsAmount={fraktsToUpgrade.length}
              onUpgradeClick={onUpgradeFrakts}
            />
          )}
          <ArtsFilter
            sortValue={sortBy}
            onSortChange={onSortChange}
            filterValue={filter}
            onFilterChangeValue={onFilterChange}
          />
          {connected && showUserFrakts && !frakts.length && <NoFraktsBlock />}
          <ArtsList arts={frakts} />
        </div>
      )}
    </AppLayout>
  );
};

export default CollectionsPage;
