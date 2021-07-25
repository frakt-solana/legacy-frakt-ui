import React from 'react'

import styles from './styles.module.scss'

interface IWalletItemProps {
  onClick: () => void
  imageSrc: string
  imageAlt: string
  name: string
}

export const WalletItem = ({
  onClick,
  imageSrc,
  imageAlt,
  name,
}: IWalletItemProps) => {
  return (
    <div className={styles.walletItemContainer} onClick={onClick}>
      <div className={styles.walletItem}>
        <img alt={imageAlt} src={imageSrc} />
        {name}
      </div>
    </div>
  )
}
