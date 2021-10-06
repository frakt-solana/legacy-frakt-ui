import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { sum } from 'lodash';
import BN from 'bn.js';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import { useStaking } from '../../contexts/staking';
import styles from './styles.module.scss';
import { getPointsForArt } from '../CollectionPage/helpers';
import { usePolling, usePrivatePage } from '../../hooks';
import Preloader from '../../components/Preloader';
import { DECIMALS_PER_FRKT, SECONDS_IN_YEAR } from './constants';

const StakingPage = (): JSX.Element => {
  usePrivatePage();

  const {
    loading,
    userStakeAccounts,
    userFrakts: userFraktsNotStaked,
    poolConfigAccount,
    secondsSumAfterHarvest,
    userStakeAccountsAvailableToUnstake,
    fetchData: fetchStakingInfo,
    silentFetchData: silentFetchStakingInfo,
  } = useStaking();

  const { isPolling, startPolling, stopPolling } = usePolling(
    silentFetchStakingInfo,
    5000,
  );

  useEffect(() => {
    if (poolConfigAccount && !loading && !isPolling) {
      startPolling();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    return () => {
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchStakingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fraktsToStake = userFraktsNotStaked.length;
  const pointsToStake = sum(
    userFraktsNotStaked.map((frakt) => getPointsForArt(frakt)),
  );

  const fraktsStaking = userStakeAccounts.length;
  const pointsStaking = sum(userStakeAccounts.map(({ points }) => points));

  const farming_tokens_per_second_per_point = Number(
    poolConfigAccount?.farming_tokens_per_second_per_point,
  );

  const frktsToHarvest =
    new BN(farming_tokens_per_second_per_point)
      .mul(new BN(pointsStaking))
      .mul(new BN(secondsSumAfterHarvest))
      .toNumber() / DECIMALS_PER_FRKT;

  const frktsPerSecond =
    new BN(farming_tokens_per_second_per_point)
      .mul(new BN(pointsStaking))
      .toNumber() / DECIMALS_PER_FRKT;

  const frktsPerYear =
    new BN(farming_tokens_per_second_per_point)
      .mul(new BN(pointsStaking))
      .mul(new BN(SECONDS_IN_YEAR))
      .toNumber() / DECIMALS_PER_FRKT;

  return (
    <AppLayout headerText="Staking" mainClassName={styles.appMain}>
      <Helmet>
        <title>{`Staking | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.stakingPage}>
        {loading ? (
          <Preloader size="lg" className={styles.stakingPage__preloader} />
        ) : (
          <div className={styles.stakingPage__content}>
            <div className={styles.stakingPage__stakeWrapper}>
              <Table
                size="md"
                data={[
                  ['Frakts to stake', fraktsToStake.toString()],
                  ['Points to stake', pointsToStake.toString()],
                ]}
                className={styles.stakingPage__infoTable}
              />
              {!!userFraktsNotStaked.length && (
                <NavLink to={URLS.STAKING_CREATE}>
                  <Button size="md">Stake</Button>
                </NavLink>
              )}
            </div>
            <div className={styles.stakingPage__harvestWrapper}>
              <Table
                size="lg"
                data={[
                  [
                    {
                      text: 'FRKT/sec per point',
                      tooltipText:
                        'Amount of FRKT you earn per second for every point locked in the staking protocol.',
                    },
                    farming_tokens_per_second_per_point.toFixed(8),
                  ],
                  ['FRKT/second', frktsPerSecond.toFixed(8)],
                  ['FRKT/year', frktsPerYear.toFixed(8)],
                  [
                    {
                      text: 'FRKT to harvest',
                      tooltipText:
                        'Amount of FRKT available to withdraw. Withdrawing is available from 0.01 FRKT.',
                    },
                    frktsToHarvest.toFixed(8),
                  ],
                ]}
                className={styles.stakingPage__infoTable}
              />
              {frktsToHarvest > 0.01 && (
                <NavLink to={URLS.STAKING_HARVEST}>
                  <Button size="lg">Harvest</Button>
                </NavLink>
              )}
            </div>
            <div className={styles.stakingPage__unstakeWrapper}>
              <Table
                size="md"
                data={[
                  [
                    'Frakts(Points) staked',
                    `${fraktsStaking}(${pointsStaking})`,
                  ],
                  [
                    'Available to unstake',
                    userStakeAccountsAvailableToUnstake.length.toString(),
                  ],
                ]}
                className={styles.stakingPage__infoTable}
              />
              {/* {!!userStakeAccountsAvailableToUnstake.length && ( */}
              <NavLink to={URLS.STAKING_UNSTAKE}>
                <Button size="md">
                  {/* Unstake {userStakeAccountsAvailableToUnstake.length} */}
                  Unstake all
                </Button>
              </NavLink>
              <p style={{ marginTop: 10, textAlign: 'right' }}>
                *In dev environment you are able to unstake all staking Frakts
              </p>
              {/* )} */}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StakingPage;
