import styles from './styles.module.scss';
import React, { useState } from 'react';
import Table from '../../../components/Table';
import Button from '../../../components/Button/Button';
import { usePrivatePage } from '../../../hooks';
import { useStakingFrkt } from '../../../contexts/stakingFrkt';
import {
  decimalBNToString,
  floatStringToBn,
  frktBNToString,
} from '../../../utils';
import NumericInput from '../../../components/NumericInput';

interface StakingFormProps {
  className?: string;
}

export const StakingForm = ({ className }: StakingFormProps): JSX.Element => {
  usePrivatePage();
  const [amountForStaking, setAmountForStaking] = useState<string>('');
  const { stakeFrakts, balance } = useStakingFrkt();
  const [err, setErr] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const amountForStakingChangeHandler = (value: string) => {
    setAmountForStaking(value);
    const valueBn = floatStringToBn(value);
    if (valueBn.gte(balance))
      setErr('Amount should be less than wallet balance');
    else setErr(null);
  };
  const onSave = () => {
    setLoading(true);
    setAmountForStaking('');
    stakeFrakts(floatStringToBn(amountForStaking)).finally(() =>
      setLoading(false),
    );
  };
  return (
    <div className={className}>
      <Table
        size="md"
        data={[['FRKT to stake', balance ? frktBNToString(balance) : '0']]}
        className={styles.infoTable}
      />
      <NumericInput
        btnClick={() => setAmountForStaking(decimalBNToString(balance, 8, 8))}
        btnText="MAX"
        value={amountForStaking}
        onChange={amountForStakingChangeHandler}
        placeholder="Enter staking amount"
        positiveOnly
        error={err}
      />
      <Button
        disabled={!amountForStaking.length || loading}
        onClick={onSave}
        size="md"
      >
        Stake
      </Button>
    </div>
  );
};

export default StakingForm;