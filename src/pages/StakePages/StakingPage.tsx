import { PoolConfigView, StakeView } from 'frakt-client';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { sum } from 'lodash';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import { Frakt, useFrakts } from '../../contexts/frakts';
import { useStaking } from '../../contexts/staking';
import { useWallet } from '../../external/contexts/wallet';
import styles from './styles.module.scss';
import { getPointsForArt } from '../CollectionPage/helpers';
import { usePrivatePage } from '../../hooks';
import moment from 'moment';

const SECONDS_IN_MONTH = 60 * 60 * 24 * 30;

const useUserStaking = (): {
  loading: boolean;
  userStakeAccounts: StakeView[];
  poolConfigAccount: PoolConfigView;
  error: Error;
  userFraktsStaked: Frakt[];
  userFraktsNotStaked: Frakt[];
  userFraktsAvailableToUnstake: Frakt[];
  tokensToHarvest: number;
} => {
  const { wallet } = useWallet();

  const {
    loading: stakingLoading,
    poolConfigAccount,
    stakeAccounts,
    error: stakingError,
    fetchData: fetchStakingInfo,
  } = useStaking();
  const { currentUserFrakts, currentUserFraktsLoading } = useFrakts();

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

  const tokensToHarvest = useMemo(() => {
    return userStakeAccounts.reduce((secondsSum, { last_harvested_at }) => {
      const seconds = moment().unix() - Number(last_harvested_at);
      if (seconds > 0) return secondsSum + seconds;
      return secondsSum;
    }, 0);
  }, [userStakeAccounts]);

  const {
    fraktsStaked: userFraktsStaked,
    fraktsNotStaked: userFraktsNotStaked,
    fraktsAvailableToUnstake: userFraktsAvailableToUnstake,
  } = useMemo((): {
    fraktsStaked: Frakt[];
    fraktsNotStaked: Frakt[];
    fraktsAvailableToUnstake: Frakt[];
  } => {
    return currentUserFrakts.reduce(
      (acc, frakt) => {
        const { isStaked, isAvailableToUnstake } = userStakeAccounts.reduce(
          (acc, stakeAccount) => {
            stakeAccount.art_pubkey === frakt.metadata.artAccountPubkey &&
              (acc.isStaked = true);

            Number(stakeAccount.stake_end_at) - moment().unix() >= 0 &&
              (acc.isAvailableToUnstake = true);
            //TODO: add filter for isAvailableToUnstake now - harvested_at

            return acc;
          },
          { isStaked: false, isAvailableToUnstake: false },
        );

        if (isStaked) {
          acc.fraktsStaked = [...acc.fraktsStaked, frakt];
          isAvailableToUnstake &&
            (acc.fraktsAvailableToUnstake = [
              ...acc.fraktsAvailableToUnstake,
              frakt,
            ]);
        } else {
          acc.fraktsNotStaked = [...acc.fraktsNotStaked, frakt];
        }

        return acc;
      },
      { fraktsStaked: [], fraktsNotStaked: [], fraktsAvailableToUnstake: [] },
    );
  }, [currentUserFrakts, userStakeAccounts]);

  return {
    loading: stakingLoading || currentUserFraktsLoading,
    userStakeAccounts,
    poolConfigAccount,
    error: stakingError,
    userFraktsStaked,
    userFraktsNotStaked,
    userFraktsAvailableToUnstake,
    tokensToHarvest,
  };
};

const StakingPage = (): JSX.Element => {
  usePrivatePage();
  const {
    // loading,
    userFraktsStaked,
    userFraktsNotStaked,
    userFraktsAvailableToUnstake,
    poolConfigAccount,
    tokensToHarvest,
    // error,
  } = useUserStaking();

  const fraktsToStake = userFraktsNotStaked.length;
  const pointsToStake = sum(
    userFraktsNotStaked.map((frakt) => getPointsForArt(frakt)),
  );

  const fraktsStaking = userFraktsStaked.length;
  const pointsStaking = sum(
    userFraktsStaked.map((frakt) => getPointsForArt(frakt)),
  );
  const fraktsAvailableToUnstake = userFraktsAvailableToUnstake.length;

  const fraktsPerMonth =
    Number(poolConfigAccount?.farming_tokens_per_second_per_point || 0) *
    pointsStaking *
    SECONDS_IN_MONTH;

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
              ['FRKTs per month', fraktsPerMonth.toString()],
              ['FRKTs to harvest', tokensToHarvest.toString()],
            ]}
            className={styles.stakingPage__infoTable}
          />
          {!!tokensToHarvest && <Button size="lg">Harvest</Button>}
        </div>
        <div className={styles.stakingPage__unstakeWrapper}>
          <Table
            size="md"
            data={[
              ['Frakts staking', fraktsStaking.toString()],
              ['Points staking', pointsStaking.toString()],
              ['Available to unstake', fraktsAvailableToUnstake.toString()],
            ]}
            className={styles.stakingPage__infoTable}
          />
          {!!fraktsAvailableToUnstake && (
            <NavLink to={URLS.STAKING_UNSTAKE}>
              <Button size="md">Unstake {fraktsAvailableToUnstake}</Button>
            </NavLink>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StakingPage;
