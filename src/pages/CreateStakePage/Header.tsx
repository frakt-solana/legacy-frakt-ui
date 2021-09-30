import React from 'react';

import ButtonArrow from '../../components/ButtonArrow';
import styles from './styles.module.scss';

interface HeaderProps {
  steps: Array<string>;
  currentStep: number;
  onBackButtonClick: () => void;
  hideBackButton?: boolean;
}

const Header = ({
  steps,
  currentStep,
  onBackButtonClick,
  hideBackButton = false,
}: HeaderProps): JSX.Element => (
  <div className={styles.header}>
    <ButtonArrow
      arrowLeft
      size="lg"
      className={`${styles.header__backButton} ${
        hideBackButton ? styles.header__backButton_hidden : ''
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
  </div>
);

export default Header;
