// import { Modal } from 'antd'
import React from 'react'
import { useWallet, WALLET_PROVIDERS } from '../../contexts/wallet'
import ButtonArrow from '../ButtonArrow'
import styles from './WalletContent.module.scss'

const WalletContent = ({ className }: any) => {
  const { setProviderUrl, setAutoConnect, closeModal } = useWallet()

  return (
    <div className={`${styles.root} ${className || ''}`}>
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
        {WALLET_PROVIDERS.map((prov, idx) => (
          <WalletItem
            key={idx}
            name={prov.name}
            onClick={() => {
              setProviderUrl(prov.url)
              setAutoConnect(true)
              closeModal()
            }}
          >
            {prov.name}
            <img alt={`${prov.name}`} src={prov.icon} />
          </WalletItem>
        ))}
      </div>
    </div>
  )
}

const WalletItem = ({ onClick, className, children }: any) => {
  return (
    <div
      className={`${styles.walletItem} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default WalletContent
