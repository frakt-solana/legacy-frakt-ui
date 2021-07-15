import React from 'react'

import ButtonArrow from '../ButtonArrow'
import styles from './styles.module.scss'

interface IDisconnectButton {
  onClick: () => void
}

export const DisconnectButton = ({ onClick }: IDisconnectButton) => (
  <ButtonArrow
    className={styles.disconnectButton}
    onClick={onClick}
    size='md'
    arrowLeft
  >
    Disconnect wallet
  </ButtonArrow>
)
