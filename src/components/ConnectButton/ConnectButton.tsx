import React from 'react'

import { useWallet } from '../../contexts/wallet'
import Button from '../Button'

export interface IConnectButtonProps {
  className?: string
}

const ConnectButton = ({ className }: IConnectButtonProps) => {
  const { select } = useWallet()

  return (
    <Button className={className} size='lg' onClick={select}>
      Connect wallet
    </Button>
  )
}

export default ConnectButton
