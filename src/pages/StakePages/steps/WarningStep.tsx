import Button from '../../../components/Button';
import { Frakt } from '../../../contexts/frakts';
import styles from '../styles.module.scss';

interface WarningStepProps {
  selectedFrakts: Frakt[];
  nextStep: () => void;
}

const STAKE_TRANSACTION_FEE_PER_FRAKT = 0.0051;

const WarningStep = ({
  selectedFrakts,
  nextStep,
}: WarningStepProps): JSX.Element => {
  return (
    <div className={styles.attentionStep}>
      <h2 className={styles.attentionStep__title}>Warning!</h2>
      <p className={styles.attentionStep__text}>
        Please note that you have selected {selectedFrakts.length} frakts that
        will be locked during staking period (30 days). Overall transactions fee
        is approximately{' '}
        {(selectedFrakts.length * STAKE_TRANSACTION_FEE_PER_FRAKT).toFixed(4)}{' '}
        SOL.
      </p>
      <Button onClick={nextStep} size={'lg'}>
        I understand
      </Button>
    </div>
  );
};

export default WarningStep;
