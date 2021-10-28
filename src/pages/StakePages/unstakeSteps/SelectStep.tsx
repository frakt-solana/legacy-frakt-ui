import { StakeView } from 'frakt-client';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ARTS_PER_SCROLL } from '../../../components/ArtsList/constants';
import Preloader from '../../../components/Preloader';
import { Frakt, useFrakts } from '../../../contexts/frakts';
import { usePrivatePage } from '../../../hooks';
import FraktCheckbox from '../FraktCheckbox';
import styles from '../styles.module.scss';

interface SelectStepProps {
  stakes: StakeView[];
  stakesLoading: boolean;
  selectedStakes: StakeView[];
  setSelectedStakes: (stake: StakeView[]) => void;
}

interface FraktStakeView {
  frakt: Frakt;
  stakeAccount: StakeView;
}

const SelectStep = ({
  stakes,
  stakesLoading,
  selectedStakes,
  setSelectedStakes,
}: SelectStepProps): JSX.Element => {
  usePrivatePage();
  const [fraktsToShow, setFraktsToShow] = useState(ARTS_PER_SCROLL);
  const { frakts, fraktsLoading } = useFrakts();

  const loading = stakesLoading || fraktsLoading;

  useEffect(() => {
    setFraktsToShow(ARTS_PER_SCROLL);
  }, [stakes]);

  const userFraktStakes: FraktStakeView[] = useMemo(() => {
    return frakts.reduce((acc, frakt) => {
      const stake = stakes.find(
        ({ mint_pubkey }) => mint_pubkey === frakt.metadata.minted_token_pubkey,
      );
      if (stake) {
        return [...acc, { frakt, stakeAccount: stake }];
      }
      return acc;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const onScrollHandler = (): void =>
    setFraktsToShow((prev) => prev + ARTS_PER_SCROLL);

  const onFraktCheckboxClick = (fraktStake: FraktStakeView): void => {
    selectedStakes.find(
      (selectedStake) =>
        selectedStake.mint_pubkey === fraktStake.stakeAccount.mint_pubkey,
    )
      ? setSelectedStakes(
          selectedStakes.filter(
            (selectedStake) =>
              selectedStake.mint_pubkey !== fraktStake.stakeAccount.mint_pubkey,
          ),
        )
      : setSelectedStakes([...selectedStakes, fraktStake.stakeAccount]);
  };

  const getLockMessage = (stakeAccount: StakeView) => {
    const isLocked = moment().unix() - Number(stakeAccount.stake_end_at) <= 0;
    return isLocked
      ? `Available to\nunstake at\n${moment
          .unix(stakeAccount.stake_end_at as number)
          .utc()
          .format('MMM D, HH:mm UTC')}`
      : null;
  };

  return (
    <div className={styles.selectStep}>
      {loading && (
        <Preloader size="lg" className={styles.selectStep__preloader} />
      )}
      {!!stakes.length && (
        <InfiniteScroll
          className={styles.selectStep__frakts}
          dataLength={fraktsToShow}
          next={onScrollHandler}
          hasMore={true}
          scrollableTarget={window.innerWidth < 1024 ? '#root' : 'mainContent'}
          loader={false}
        >
          {userFraktStakes.slice(0, fraktsToShow).map((fraktStake, idx) => {
            return (
              <FraktCheckbox
                key={idx}
                frakt={fraktStake.frakt}
                isSelected={
                  !!selectedStakes.find(
                    (selectedStake) =>
                      selectedStake.mint_pubkey ===
                      fraktStake.frakt.metadata.minted_token_pubkey,
                  )
                }
                lockedText={getLockMessage(fraktStake.stakeAccount)}
                onClick={(): void => onFraktCheckboxClick(fraktStake)}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SelectStep;
