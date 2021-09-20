import React from 'react'
import Button from '../Button'

export interface BuyButtonProps {
  className?: string
}

const BuyButton = ({ className }: BuyButtonProps) => {
  return (
    <Button className={className} size='lg' disabled>
      SOLD OUT
    </Button>
  )
}

export default BuyButton
