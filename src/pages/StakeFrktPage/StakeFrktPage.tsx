import styles from './styles.module.scss';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Table from '../../components/Table';
import Button from '../../components/Button/Button';
import AppLayout from '../../components/AppLayout';
import { usePolling, usePrivatePage } from '../../hooks';
import { useStakingFrkt } from '../../contexts/stakingFrkt';
import { decimalBNToString, frktBNToString } from '../../utils';
import BN from 'bn.js';
import StakingForm from './StakingForm';

const StakeFrktPage = (): JSX.Element => {
  usePrivatePage();
  const {
    amountPerYear,
    staked,
    amountPerSec,
    readyForUnstakingAmount,
    unstakeFrakts,
    refreshStakingInfo,
    harvest,
    harvestFrakts,
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
    <AppLayout headerText="Staking" mainClassName={styles.appMain}>
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
                ['FRKT/second', amountPerSec ? amountPerSec.toString() : '0'],
                [
                  'FRKT/year',
                  amountPerYear ? decimalBNToString(amountPerYear) : '0',
                ],
                [
                  {
                    text: 'FRKT to harvest',
                    tooltipText:
                      'Amount of FRKT available to withdraw. Withdrawing is available from 0.01 FRKT.',
                  },
                  '2',
                ],
              ]}
              className={styles.stakingPage__infoTable}
            />
            {harvest.toString() !== '0' && (
              <Button onClick={harvestFrakts} size="md">
                Harvest
              </Button>
            )}
          </div>
          <div className={styles.stakingPage__unstakeWrapper}>
            <Table
              size="md"
              data={[
                [
                  'Frakts staked',
                  `${staked ? frktBNToString(new BN(staked)) : '0'}`,
                ],
                [
                  'Available to unstake',
                  `${
                    readyForUnstakingAmount
                      ? frktBNToString(readyForUnstakingAmount)
                      : '0'
                  }`,
                ],
              ]}
              className={styles.stakingPage__infoTable}
            />
            {readyForUnstakingAmount.toString() !== '0' && (
              <Button onClick={() => unstakeFrakts()} size="md">
                Unstake
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StakeFrktPage;
