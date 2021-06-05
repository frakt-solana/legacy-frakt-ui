import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useArts } from '../../contexts/artDetails'
import { notify } from '../../utils/notifications'
import Button from '../Button'

export interface BuyButtonProps
    extends ButtonProps,
    React.RefAttributes<HTMLElement> {
    className?: string
}

export const BuyButton = ({ className }: BuyButtonProps) => {
    const { buyArt } = useArts();

    const onBuy = async () => {
        const success = await buyArt();

        if (success) {
            notify({ message: 'Success', description: 'Your frakt will be generated within seconds', type: 'success' })
        }
    }

    return (
        <Button showArrow={false} className={className} onClick={onBuy}>
            Buy frakt
        </Button>
    )
}
