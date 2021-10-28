import { StakeView } from 'frakt-client';
import { sum } from 'lodash';
import classNames from 'classnames/bind';

import Button from '../../components/Button';
import ButtonArrow from '../../components/ButtonArrow';
import { Frakt } from '../../contexts/frakts';
import { getPointsForArt } from '../CollectionPage/helpers';
import styles from './styles.module.scss';

interface HeaderStakeProps {
  steps: Array<string>;
  frakts: Frakt[];
  fraktsLoading: boolean;
  selectedFrakts: Frakt[];
  currentStep: number;
  onBackButtonClick?: () => void;
  selectDeselectAllHandler: () => void;
  nextStep: () => void;
  className?: string;
}

export const HeaderStake = ({
  frakts,
  fraktsLoading,
  selectedFrakts,
  steps,
  currentStep,
  onBackButtonClick,
  selectDeselectAllHandler,
  nextStep,
  className = '',
}: HeaderStakeProps): JSX.Element => (
  <div
    className={`${styles.header} ${
      currentStep === 0 ? `${styles.header_select}` : ''
    } ${className}`}
  >
    <ButtonArrow
      arrowLeft
      size="lg"
      className={`${styles.header__backButton} ${
        currentStep === 2 ? styles.header__backButton_hidden : ''
      }`}
      onClick={onBackButtonClick}
    >
      {steps[currentStep - 1] || 'Back'}
    </ButtonArrow>
    <div className={styles.header__titleWrapper}>
      <div className={styles.title}>
        <span>Stake Frakts</span>
        <span className={styles.header__stepName}> / {steps[currentStep]}</span>
      </div>
      <div className={styles.header__stepCounter}>
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
    {currentStep === 0 && !fraktsLoading && (
      <div className={styles.header__selectContainer}>
        <p className={styles.header__selectCounter}>
          <b>
            {selectedFrakts.length}(
            {sum(selectedFrakts.map((frakt) => getPointsForArt(frakt)))})
          </b>{' '}
          Frakts(Points) selected
        </p>
        <div className={styles.header__selectButtonsWrapper}>
          <button
            className={styles.header__selectDeselectButton}
            onClick={selectDeselectAllHandler}
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
            {selectedFrakts.length ? `Stake` : `Next step`}
          </Button>
        </div>
      </div>
    )}
  </div>
);

interface HeaderUnstakeProps {
  stakes: StakeView[];
  stakesLoading: boolean;
  selectedStakes: StakeView[];
  steps: Array<string>;
  currentStep: number;
  onBackButtonClick?: () => void;
  selectDeselectAllHandler: () => void;
  disableSelectDeselectButton?: boolean;
  nextStep: () => void;
  className?: string;
}

export const HeaderUnstake = ({
  stakes,
  stakesLoading,
  selectedStakes,
  steps,
  currentStep,
  onBackButtonClick,
  selectDeselectAllHandler,
  disableSelectDeselectButton,
  nextStep,
  className = '',
}: HeaderUnstakeProps): JSX.Element => (
  <div
    className={`${styles.header} ${
      currentStep === 0 ? `${styles.header_select}` : ''
    } ${className}`}
  >
    <ButtonArrow
      arrowLeft
      size="lg"
      className={`${styles.header__backButton} ${
        currentStep === 1 ? styles.header__backButton_hidden : ''
      }`}
      onClick={onBackButtonClick}
    >
      Back
    </ButtonArrow>
    <div className={styles.header__titleWrapper}>
      <div className={styles.title}>
        <span>Unstake Frakts</span>
        <span className={styles.header__stepName}> / {steps[currentStep]}</span>
      </div>
      <div className={styles.header__stepCounter}>
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
    {currentStep === 0 && !stakesLoading && (
      <div className={styles.header__selectContainer}>
        <p className={styles.header__selectCounter}>
          <b>
            {selectedStakes.length}(
            {sum(selectedStakes.map(({ points }) => points))})
          </b>{' '}
          Frakts(Points) selected
        </p>
        <div className={styles.header__selectButtonsWrapper}>
          <button
            className={classNames([
              styles.header__selectDeselectButton,
              {
                [styles.header__selectDeselectButton_disabled]:
                  disableSelectDeselectButton,
              },
            ])}
            onClick={selectDeselectAllHandler}
          >
            {selectedStakes.length === stakes.length
              ? 'Deselect all'
              : 'Select all possible'}
          </button>
          <Button
            disabled={!selectedStakes.length}
            onClick={nextStep}
            size={'lg'}
          >
            {selectedStakes.length ? `Unstake` : `Next step`}
          </Button>
        </div>
      </div>
    )}
  </div>
);
