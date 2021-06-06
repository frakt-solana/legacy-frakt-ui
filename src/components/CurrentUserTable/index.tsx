import React from 'react'
import styles from './CurrentUserTable.module.scss'
import { useWallet } from '../../contexts/wallet'
import { formatNumber, shortenAddress } from '../../utils/utils'
import { useNativeAccount } from '../../contexts/accounts'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import Button from '../Button'
import { BuyButton } from '../BuyButton'

const DisconnectButton = ({ onClick }: any) => (
  <Button className={styles.disconnectButton} onClick={onClick} size='sm' showArrow={false}>
    Disconnect wallet
  </Button>
)

const CurrentUserTable = ({ className }: any) => {
  const { wallet, disconnect } = useWallet()
  const { account } = useNativeAccount()

  if (!wallet?.publicKey) {
    return null
  }

  return (
    <div className={`${styles.root} ${className || ''}`}>
      <div className={styles.table}>
        <div>
          <p>Address</p>
          <p>{shortenAddress(`${wallet.publicKey}`)}</p>
        </div>
        <div>
          <p>Balance</p>
          <p>
            {formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)}{' '}
            SOL
          </p>
        </div>
      </div>
      <BuyButton className={styles.buyButton} />
      <DisconnectButton onClick={disconnect} />
    </div>
  )
}

export default CurrentUserTable
