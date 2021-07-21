import React from 'react'
import styles from './styles.module.scss'
import { useWallet } from '../../contexts/wallet'
import { formatNumber, shortenAddress } from '../../utils/utils'
import { useNativeAccount } from '../../contexts/accounts'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import BuyButton from '../BuyButton'
import Table from '../Table'
import { DisconnectButton } from './DisconnectButton'

interface ICurrentUserTableProps {
  className?: string
}

const CurrentUserTable = ({ className = '' }: ICurrentUserTableProps) => {
  const { wallet, disconnect } = useWallet()
  const { account } = useNativeAccount()

  if (!wallet?.publicKey) {
    return null
  }

  const getBalanceValue = () =>
    `${formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL`

  return (
    <div className={className}>
      <DisconnectButton onClick={disconnect} />
      <Table
        className={styles.table}
        data={[
          ['Address', shortenAddress(`${wallet.publicKey || ''}`)],
          ['Balance', getBalanceValue()],
          ['Price', '0.5 SOL'],
        ]}
      />
      <div className={styles.buttonsWrapper}>
        <BuyButton className={styles.buyButton} />
      </div>
    </div>
  )
}

export default CurrentUserTable
