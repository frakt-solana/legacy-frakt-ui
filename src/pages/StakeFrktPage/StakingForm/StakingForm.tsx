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
  const { stakeFrkt, balance } = useStakingFrkt();
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
    stakeFrkt(floatStringToBn(amountForStaking)).finally(() =>
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
      <p style={{ marginTop: 10, marginBottom: 10 }}>
        Please note that FRKT will be locked during staking period of 30 days
      </p>
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
