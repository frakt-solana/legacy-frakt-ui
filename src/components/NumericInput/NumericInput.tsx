import React from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

interface NumericInputProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  btnClick?: () => void;
  positiveOnly?: boolean;
  integerOnly?: boolean;
  className?: string;
  maxLength?: number;
  error?: string | boolean;
  btnText?: string;
}

function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value));
}

export const NumericInput = ({
  onChange,
  value,
  placeholder = '0.0',
  positiveOnly = false,
  integerOnly = false,
  btnClick,
  className,
  error,
  maxLength,
  btnText,
}: NumericInputProps): JSX.Element => {
  const onChangeHanlder = (event) => {
    const { value } = event.target;

    if (positiveOnly && value?.[0] === '-') return;
    if (integerOnly && value?.split('').includes('.')) return;
    if (maxLength && value.length > maxLength) return;

    if (value === '-' || value === '') onChange(value);
    if (isNumeric(value)) onChange(value);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={onChangeHanlder}
        placeholder={placeholder}
        maxLength={25}
        className={classNames([styles.numberInput, className])}
      />
      {btnText && (
        <span onClick={btnClick} className={styles.btn}>
          {btnText}
        </span>
      )}
      <div className={styles.inputError}> {error ? error : ' '}</div>
    </div>
  );
};

NumericInput.displayName = 'NumericInput';
