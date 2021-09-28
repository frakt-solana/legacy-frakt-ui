import React from 'react';

import ButtonArrow from '../ButtonArrow';
import styles from './styles.module.scss';

interface DisconnectButton {
  onClick: () => void;
}

export const DisconnectButton = ({
  onClick,
}: DisconnectButton): JSX.Element => (
  <ButtonArrow
    className={styles.disconnectButton}
    onClick={onClick}
    size="md"
    arrowLeft
  >
    Disconnect wallet
  </ButtonArrow>
);
