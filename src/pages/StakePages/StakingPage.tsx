import { PoolConfigView, StakeView } from 'frakt-client';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { sum } from 'lodash';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import { Frakt } from '../../contexts/frakts';
import { useStaking } from '../../contexts/staking';
import { useWallet } from '../../external/contexts/wallet';
import styles from './styles.module.scss';
import {
  getPointsByColorAndShape,
  getPointsForArt,
} from '../CollectionPage/helpers';
import { usePrivatePage } from '../../hooks';
import moment from 'moment';

const SECONDS_IN_MONTH = 60 * 60 * 24 * 30;
const DECIMALS_PER_FRKT = 1e8;

const useUserStaking = (): {
  loading: boolean;
  userStakeAccounts: StakeView[];
  poolConfigAccount: PoolConfigView;
  error: Error;
  userFraktsNotStaked: Frakt[];
  secondsSumAfterHarvest: number;
  fraktsAvailableToUnstakeAmount: number;
} => {
  const { wallet } = useWallet();

  const {
    loading: stakingLoading,
    poolConfigAccount,
    stakeAccounts,
    error: stakingError,
    fetchData: fetchStakingInfo,
    userFrakts,
  } = useStaking();

  useEffect(() => {
    fetchStakingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userStakeAccounts = useMemo((): StakeView[] => {
    return stakeAccounts.filter(
      ({ stake_owner, is_staked }) =>
        stake_owner === `${wallet.publicKey}` && is_staked,
    );
  }, [stakeAccounts, wallet]);

  const secondsSumAfterHarvest = useMemo(() => {
    return userStakeAccounts.reduce((secondsSum, { last_harvested_at }) => {
      const seconds = moment().unix() - Number(last_harvested_at);
      if (seconds > 0) return secondsSum + seconds;
      return secondsSum;
    }, 0);
  }, [userStakeAccounts]);

  const fraktsAvailableToUnstakeAmount = useMemo(() => {
    return userStakeAccounts.reduce((amount, stakeAccount) => {
      const isAvailableToUnstake =
        moment().unix() - Number(stakeAccount.stake_end_at) >= 0;

      return isAvailableToUnstake ? amount + 1 : amount;
    }, 0);
  }, [userStakeAccounts]);

  return {
    loading: stakingLoading,
    userStakeAccounts,
    poolConfigAccount,
    error: stakingError,
    userFraktsNotStaked: userFrakts,
    secondsSumAfterHarvest,
    fraktsAvailableToUnstakeAmount,
  };
};

const StakingPage = (): JSX.Element => {
  usePrivatePage();
  const {
    // loading,
    userStakeAccounts,
    userFraktsNotStaked,
    poolConfigAccount,
    secondsSumAfterHarvest,
    fraktsAvailableToUnstakeAmount,
    // error,
  } = useUserStaking();

  const fraktsToStake = userFraktsNotStaked.length;
  const pointsToStake = sum(
    userFraktsNotStaked.map((frakt) => getPointsForArt(frakt)),
  );

  const fraktsStaking = userStakeAccounts.length;
  const pointsStaking = sum(
    userStakeAccounts.map(({ color, shape }) =>
      getPointsByColorAndShape(Number(color), Number(shape)),
    ),
  );

  const frktsToHarvest =
    (Number(poolConfigAccount?.farming_tokens_per_second_per_point || 0) *
      pointsStaking *
      secondsSumAfterHarvest) /
    DECIMALS_PER_FRKT;

  const frktsPerMonth =
    (Number(poolConfigAccount?.farming_tokens_per_second_per_point || 0) *
      pointsStaking *
      SECONDS_IN_MONTH) /
    DECIMALS_PER_FRKT;

  return (
    <AppLayout headerText="Staking" mainClassName={styles.appMain}>
      <Helmet>
        <title>{`Staking | FRAKT: Generative Art NFT Collection on Solana`}</title>
      </Helmet>
      <div className={styles.stakingPage}>
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
              ['FRKTs per month', frktsPerMonth.toFixed(2)],
              ['FRKTs to harvest', frktsToHarvest.toFixed(2)],
            ]}
            className={styles.stakingPage__infoTable}
          />
          {frktsToHarvest > 0.5 && <Button size="lg">Harvest</Button>}
        </div>
        <div className={styles.stakingPage__unstakeWrapper}>
          <Table
            size="md"
            data={[
              ['Frakts staking', fraktsStaking.toString()],
              ['Points staking', pointsStaking.toString()],
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
    </AppLayout>
  );
};

export default StakingPage;
