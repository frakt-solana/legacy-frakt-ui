import styles from './styles.module.scss';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import AppLayout from '../../components/AppLayout';
import { usePolling, usePrivatePage } from '../../hooks';
import { useStakingFrkt } from '../../contexts/stakingFrkt';
import { decimalBNToString, frktBNToString } from '../../utils';
import BN from 'bn.js';
import StakingForm from './StakingForm';

const MIN_HARVEST_THRESHOLD = new BN(1e6); //? 0.01

const StakeFrktPage = (): JSX.Element => {
  usePrivatePage();
  const {
    APR,
    frktStakingAmount,
    // frktToUnstakeAmount,
    // unstakeFrkt,
    refreshStakingInfo,
    harvestAmount,
    harvestFrkt,
  } = useStakingFrkt();
  const { isPolling, startPolling, stopPolling } = usePolling(
    refreshStakingInfo,
    5000,
  );

  useEffect(() => {
    if (!isPolling) startPolling();
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout headerText="Staking FRKT" mainClassName={styles.appMain}>
      <Helmet>
        <title>{`Staking FRKT | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.stakingPage}>
        <div className={styles.stakingPage__content}>
          <StakingForm className={styles.stakingPage__stakeWrapper} />
          <div className={styles.stakingPage__harvestWrapper}>
            <Table
              size="lg"
              data={[
                ['APR', `${decimalBNToString(APR, 2, 2)}%`],
                [
                  {
                    text: 'FRKT to harvest',
                    tooltipText:
                      'Amount of FRKT available to withdraw. Withdrawing is available from 0.01 FRKT.',
                  },
                  harvestAmount.cmp(new BN(0)) === 1
                    ? frktBNToString(harvestAmount)
                    : '0',
                ],
              ]}
              className={styles.stakingPage__infoTable}
            />
            {harvestAmount.cmp(MIN_HARVEST_THRESHOLD) === 1 && (
              <Button onClick={harvestFrkt} size="md">
                Harvest
              </Button>
            )}
          </div>
          <div className={styles.stakingPage__unstakeWrapper}>
            <Table
              size="md"
              data={[
                ['FRKT staked', `${frktBNToString(new BN(frktStakingAmount))}`],
                ['Available to unstake', '0'],
              ]}
              className={styles.stakingPage__infoTable}
            />
          </div>
          {/* // TODO: Uncomment when contract improved */}
          {/* <div className={styles.stakingPage__unstakeWrapper}>
            <Table
              size="md"
              data={[
                ['FRKT staked', `${frktBNToString(new BN(frktStakingAmount))}`],
                [
                  'Available to unstake',
                  `${frktBNToString(frktToUnstakeAmount)}`,
                ],
              ]}
              className={styles.stakingPage__infoTable}
            />
            {frktToUnstakeAmount.toString() !== '0' && (
              <Button onClick={() => unstakeFrkt()} size="md">
                Unstake
              </Button>
            )}
          </div> */}
        </div>
      </div>
    </AppLayout>
  );
};

export default StakeFrktPage;
