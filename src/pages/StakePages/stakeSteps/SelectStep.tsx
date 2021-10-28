import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ARTS_PER_SCROLL } from '../../../components/ArtsList/constants';
import Preloader from '../../../components/Preloader';
import { Frakt } from '../../../contexts/frakts';
import { usePrivatePage } from '../../../hooks';
import FraktCheckbox from '../FraktCheckbox';
import styles from '../styles.module.scss';

interface SelectStepProps {
  frakts: Frakt[];
  fraktsLoading: boolean;
  selectedFrakts: Frakt[];
  setSelectedFrakts: (frakt: Frakt[]) => void;
}

const SelectStep = ({
  frakts,
  fraktsLoading,
  selectedFrakts,
  setSelectedFrakts,
}: SelectStepProps): JSX.Element => {
  usePrivatePage();
  const [fraktsToShow, setFraktsToShow] = useState(ARTS_PER_SCROLL);

  useEffect(() => {
    setFraktsToShow(ARTS_PER_SCROLL);
  }, [frakts]);

  const onScrollHandler = (): void =>
    setFraktsToShow((prev) => prev + ARTS_PER_SCROLL);

  const onFraktCheckboxClick = (frakt: Frakt): void => {
    selectedFrakts.find(
      (selectedFrakt) =>
        selectedFrakt?.metadata?.artAccountPubkey ===
        frakt?.metadata?.artAccountPubkey,
    )
      ? setSelectedFrakts(
          selectedFrakts.filter(
            (selectedFrakt) =>
              selectedFrakt?.metadata?.artAccountPubkey !==
              frakt?.metadata?.artAccountPubkey,
          ),
        )
      : setSelectedFrakts([...selectedFrakts, frakt]);
  };

  return (
    <div className={styles.selectStep}>
      {fraktsLoading && (
        <Preloader size="lg" className={styles.selectStep__preloader} />
      )}
      {!!frakts.length && (
        <InfiniteScroll
          className={styles.selectStep__frakts}
          dataLength={fraktsToShow}
          next={onScrollHandler}
          hasMore={true}
          scrollableTarget={window.innerWidth < 1024 ? '#root' : 'mainContent'}
          loader={false}
        >
          {frakts.slice(0, fraktsToShow).map((frakt, idx) => (
            <FraktCheckbox
              key={idx}
              frakt={frakt}
              isSelected={
                !!selectedFrakts.find(
                  (selectedFrakt) =>
                    selectedFrakt?.metadata?.artAccountPubkey ===
                    frakt?.metadata?.artAccountPubkey,
                )
              }
              onClick={(): void => onFraktCheckboxClick(frakt)}
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SelectStep;
