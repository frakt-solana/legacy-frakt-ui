import { Modal } from 'antd'
import React from 'react'
import { WALLET_PROVIDERS } from '../../contexts/wallet'
import styles from './WalletModal.module.scss'

const WalletModal = ({ onCancel, visible, onElementClick = () => {} }: any) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      wrapClassName={styles.wrap}
      className={styles.root}
      footer={null}
      centered
      width={0}
      transitionName={''}
    >
      {WALLET_PROVIDERS.map((provider, idx) => {
        return (
          <WalletItem
            key={idx}
            name={provider.name}
            onClick={() => onElementClick(provider.url)}
          >
            {provider.name}
            <img
              alt={`${provider.name}`}
              src={provider.icon}
              style={{ marginRight: 8 }}
            />
          </WalletItem>
        )
      })}
    </Modal>
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

export default WalletModal
