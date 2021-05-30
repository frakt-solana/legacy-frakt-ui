import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useWallet } from '../../contexts/wallet'
import Button from '../Button'

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean
  className?: string
}

export const ConnectButton = ({ className }: any) => {
  const { select } = useWallet()

  return (
    <Button className={className} onClick={select}>
      Connect wallet
    </Button>
  )
}
