import React from 'react';
import styles from './styles.module.scss';

interface ButtonRegularProps {
  className?: string;
  disabled?: boolean;
  isLink?: boolean;
  linkAttrs?: Record<string, any>;
  onClick?: (args: any) => any;
  size?: string;
  Icon?: any;
  children: any;
}

const getIcon = ({ Icon, size = 'md' }): JSX.Element | string => {
  const pixelSize = size === 'sm' ? 14 : size === 'lg' ? 24 : 18;
  return Icon ? <Icon size={pixelSize} /> : '';
};

const ButtonRegular = ({
  className,
  disabled = false,
  isLink = false,
  linkAttrs,
  onClick = (): void => {},
  size = 'md',
  Icon,
  children,
}: ButtonRegularProps): JSX.Element => {
  if (isLink) {
    return (
      <a
        className={`${styles.root} ${className || ''} ${
          disabled ? styles.disabled : ''
        } ${styles[size]}`}
        {...linkAttrs}
      >
        {getIcon({ Icon, size })}
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.root} ${className || ''} ${
        disabled ? styles.disabled : ''
      } ${styles[size]}`}
      onClick={onClick}
    >
      {getIcon({ Icon, size })}
      {children}
    </button>
  );
};

export default ButtonRegular;
