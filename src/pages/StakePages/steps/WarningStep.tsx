import Button from '../../../components/Button';
import { Frakt } from '../../../contexts/frakts';
import styles from '../styles.module.scss';

interface WarningStepProps {
  selectedFrakts: Frakt[];
  nextStep: () => void;
}

const WarningStep = ({
  selectedFrakts,
  nextStep,
}: WarningStepProps): JSX.Element => {
  return (
    <div className={styles.attentionStep}>
      <h2 className={styles.attentionStep__title}>Warning!</h2>
      <p className={styles.attentionStep__text}>
        Please note that you have selected {selectedFrakts.length} frakt(s) that
        will be locked during the staking period.
      </p>
      <Button onClick={nextStep} size={'lg'}>
        I understand
      </Button>
    </div>
  );
};

export default WarningStep;
