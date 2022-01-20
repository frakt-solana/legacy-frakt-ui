import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { sum } from 'lodash';
import BN from 'bn.js';
import moment from 'moment';

import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import Table from '../../components/Table';
import { URLS } from '../../constants';
import { useStaking } from '../../contexts/staking';
import styles from './styles.module.scss';
import { getPointsForArt } from '../CollectionPage/helpers';
import { usePolling, usePrivatePage } from '../../hooks';
import Preloader from '../../components/Preloader';
import { DECIMALS_PER_FRKT } from '../../contexts/frktBalance';
import { frktBNToString } from '../../utils';
// import { WarnBanner } from './WarnBanner';

const SECONDS_IN_YEAR = 31560000;
const VALUES_PRECISION = 7;

const HARVEST_UNLOCK_DATE_UNIX = 1633889100;
const IS_LOCKED_PERIOD = HARVEST_UNLOCK_DATE_UNIX - moment().unix() >= 0;

const StakingNftPage = (): JSX.Element => {
  usePrivatePage();

  const {
    loading,
    userStakeAccounts,
    userFrakts: userFraktsNotStaked,
    poolConfigAccount,
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

  const frktsToHarvest = useMemo(
    () => {
      return userStakeAccounts.reduce((acc, { points, last_harvested_at }) => {
        const frktPerAccount = new BN(
          moment().unix() - Number(last_harvested_at),
        )
          .mul(new BN(Number(points)))
          .mul(new BN(farming_tokens_per_second_per_point));

        return acc.add(frktPerAccount);
      }, new BN(0));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userStakeAccounts],
  );

  const frktsPerSecond =
    new BN(farming_tokens_per_second_per_point)
      .mul(new BN(pointsStaking))
      .toNumber() / DECIMALS_PER_FRKT;

  const frktsPerYear = frktBNToString(
    new BN(farming_tokens_per_second_per_point)
      .mul(new BN(pointsStaking))
      .mul(new BN(SECONDS_IN_YEAR)),
    2,
  );

  return (
    <AppLayout mainClassName={styles.appMain}>
      <div className="container">
        <Helmet>
          <title>{`Staking FRAKT NFT | FRAKT: Generative Art NFT Collection on Solana`}</title>
        </Helmet>
        <h2 className={styles.pageTitle}>Staking FRAKT NFTs</h2>
        <div className={styles.stakingPage}>
          {loading ? (
            <Preloader size="lg" className={styles.stakingPage__preloader} />
          ) : (
            <>
              {/* <WarnBanner /> */}
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
                    <NavLink to={URLS.STAKING_NFT_CREATE}>
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
                        (
                          farming_tokens_per_second_per_point /
                          DECIMALS_PER_FRKT
                        ).toFixed(VALUES_PRECISION),
                      ],
                      ['FRKT/second', frktsPerSecond.toFixed(VALUES_PRECISION)],
                      ['FRKT/year', frktsPerYear],
                      [
                        {
                          text: 'FRKT to harvest',
                          tooltipText:
                            'Amount of FRKT available to withdraw. Withdrawing is available from 0.01 FRKT.',
                        },
                        frktBNToString(frktsToHarvest, 7),
                      ],
                    ]}
                    className={styles.stakingPage__infoTable}
                  />
                  {frktsToHarvest.toNumber() > 0.01 * DECIMALS_PER_FRKT &&
                    !IS_LOCKED_PERIOD && (
                      <NavLink to={URLS.STAKING_NFT_HARVEST}>
                        <Button size="lg">Harvest</Button>
                      </NavLink>
                    )}
                  {IS_LOCKED_PERIOD && (
                    <p style={{ fontSize: 15, textAlign: 'right' }}>
                      Harvest unlocks on{' '}
                      {moment
                        .unix(HARVEST_UNLOCK_DATE_UNIX)
                        .utc()
                        .format('DD MMMM H:mm')}{' '}
                      UTC
                    </p>
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

                  {/* //? For dev */}
                  {/* <NavLink to={URLS.STAKING_UNSTAKE}>
                <Button size="md">Unstake all</Button>
              </NavLink>
              <p style={{ marginTop: 10, textAlign: 'right' }}>
                *In dev environment you are able to unstake all staking Frakts
              </p> */}

                  {!!userStakeAccounts.length && (
                    <NavLink to={URLS.STAKING_NFT_UNSTAKE}>
                      <Button size="md">Unstake</Button>
                    </NavLink>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default StakingNftPage;
