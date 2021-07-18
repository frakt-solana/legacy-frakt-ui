import React from 'react'

import { useWallet, WALLET_PROVIDERS } from '../../contexts/wallet'
import ButtonArrow from '../ButtonArrow'
import styles from './styles.module.scss'
import { WalletItem } from './WalletItem'

interface IWalletContentProps {
  className?: string
}

const WalletContent = ({ className = '' }: IWalletContentProps) => {
  const { setProviderUrl, setAutoConnect, closeModal } = useWallet()

  return (
    <div className={className}>
      <div className={styles.backButtonContainer}>
        <ButtonArrow
          size='lg'
          arrowLeft
          className={styles.backButton}
          onClick={closeModal}
        >
          Back
        </ButtonArrow>
      </div>
      <div className={styles.title}>Select wallet</div>
      <div className={styles.itemsContainer}>
        {WALLET_PROVIDERS.map(({ url, name, icon: iconUrl }, idx) => (
          <WalletItem
            key={idx}
            onClick={() => {
              setProviderUrl(url)
              setAutoConnect(true)
              closeModal()
            }}
            imageSrc={iconUrl}
            imageAlt={name}
            name={name}
          />
        ))}
      </div>
    </div>
  )
}

export default WalletContent
