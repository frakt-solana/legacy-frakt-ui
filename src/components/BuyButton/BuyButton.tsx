import React from 'react'
import { useArts } from '../../contexts/artDetails'
import { useWallet } from '../../contexts/wallet'
import { notify } from '../../utils/notifications'
import Button from '../Button'

export interface BuyButtonProps {
  className?: string
}

const BuyButton = ({ className }: BuyButtonProps) => {
  const { connected, select } = useWallet()
  const { buyArt } = useArts()

  const onBuy = async () => {
    const success = await buyArt()

    success &&
      notify({
        message: 'Success',
        description: 'Your frakt will be generated within seconds',
        type: 'success',
      })
  }

  return (
    <Button
      className={className}
      size='lg'
      onClick={connected ? onBuy : select}
      disabled
    >
      SOLD OUT
    </Button>
  )
}

export default BuyButton
