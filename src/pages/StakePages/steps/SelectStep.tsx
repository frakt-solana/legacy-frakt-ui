import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { ARTS_PER_SCROLL } from '../../../components/ArtsList/constants';
import Button from '../../../components/Button';
import Preloader from '../../../components/Preloader';
import { Frakt } from '../../../contexts/frakts';
import FraktCheckbox from '../FraktCheckbox';
import styles from '../styles.module.scss';

interface SelectStepProps {
  frakts: Frakt[];
  fraktsLoading: boolean;
  selectedFrakts: Frakt[];
  setSelectedFrakts: (frakt: Frakt[]) => void;
  nextStep: () => void;
}

const SelectStep = ({
  frakts,
  fraktsLoading,
  selectedFrakts,
  setSelectedFrakts,
  nextStep,
}: SelectStepProps): JSX.Element => {
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

  const selectDeselectHandler = (): void => {
    selectedFrakts.length === frakts.length
      ? setSelectedFrakts([])
      : setSelectedFrakts(frakts);
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
      {!fraktsLoading && (
        <div className={styles.popupContainer}>
          <button
            className={styles.popupContainer__selectDeselectButton}
            onClick={selectDeselectHandler}
          >
            {selectedFrakts.length === frakts.length
              ? 'Deselect all'
              : 'Select all'}
          </button>
          <Button
            disabled={!selectedFrakts.length}
            onClick={nextStep}
            size={'lg'}
          >
            {selectedFrakts.length
              ? `Stake ${selectedFrakts.length} Frakts`
              : `Next step`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectStep;
