import React from 'react';

import Button from '../../../components/Button';
import styles from '../styles.module.scss';

interface AttentionStepProps {
  selectedFrakts: any[];
  nextStep: () => void;
}

const AttentionStep = ({ nextStep }: AttentionStepProps): JSX.Element => {
  return (
    <div className={styles.attentionStep}>
      <h2 className={styles.attentionStep__title}>Attention!</h2>
      <p className={styles.attentionStep__text}>
        Notice that your chosen frakts will be locked during the staking period.
      </p>
      <Button onClick={nextStep} size={'lg'}>
        I understand
      </Button>
    </div>
  );
};

export default AttentionStep;
