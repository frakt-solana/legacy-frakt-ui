import { sum } from 'lodash';

import Button from '../../components/Button';
import ButtonArrow from '../../components/ButtonArrow';
import { Frakt } from '../../contexts/frakts';
import { getPointsForArt } from '../CollectionPage/helpers';
import styles from './styles.module.scss';

interface HeaderProps {
  steps: Array<string>;
  frakts: Frakt[];
  fraktsLoading: boolean;
  selectedFrakts: Frakt[];
  currentStep: number;
  onBackButtonClick?: () => void;
  showSelectButtons?: boolean;
  selectDeselectAllHandler: () => void;
  nextStep: () => void;
  className?: string;
}

const Header = ({
  frakts,
  fraktsLoading,
  selectedFrakts,
  steps,
  currentStep,
  onBackButtonClick,
  selectDeselectAllHandler,
  nextStep,
  className = '',
}: HeaderProps): JSX.Element => (
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

export default Header;
