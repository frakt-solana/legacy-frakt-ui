import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { sum } from 'lodash';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import { useStaking } from '../../contexts/staking';
import styles from './styles.module.scss';
import { getPointsForArt } from '../CollectionPage/helpers';
import { usePrivatePage } from '../../hooks';
import Preloader from '../../components/Preloader';
import { useEffect } from 'react';

const SECONDS_IN_MONTH = 60 * 60 * 24 * 30;
const DECIMALS_PER_FRKT = 1e10;

const StakingPage = (): JSX.Element => {
  usePrivatePage();

  const {
    loading,
    userStakeAccounts,
    userFrakts: userFraktsNotStaked,
    poolConfigAccount,
    secondsSumAfterHarvest,
    fraktsAvailableToUnstakeAmount,
    fetchData: fetchStakingInfo,
  } = useStaking();

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

  const frktsToHarvest =
    (Number(poolConfigAccount?.farming_tokens_per_second_per_point) *
      pointsStaking *
      secondsSumAfterHarvest) /
    DECIMALS_PER_FRKT;

  const frktsPerMonth =
    (Number(poolConfigAccount?.farming_tokens_per_second_per_point) *
      pointsStaking *
      SECONDS_IN_MONTH) /
    DECIMALS_PER_FRKT;

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
                  ['Points staking', pointsStaking.toString()],
                  ['FRKT per month', frktsPerMonth.toFixed(2)],
                  ['FRKT to harvest', frktsToHarvest.toFixed(2)],
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
                  ['Frakts staking', fraktsStaking.toString()],
                  // ['Points staking', pointsStaking.toString()],
                  [
                    'Available to unstake',
                    fraktsAvailableToUnstakeAmount.toString(),
                  ],
                ]}
                className={styles.stakingPage__infoTable}
              />
              {!!fraktsAvailableToUnstakeAmount && (
                <NavLink to={URLS.STAKING_UNSTAKE}>
                  <Button size="md">
                    Unstake {fraktsAvailableToUnstakeAmount}
                  </Button>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StakingPage;
