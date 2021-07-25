import React from 'react'

import BuyButton from '../../../../components/BuyButton'
import styles from './styles.module.scss'

interface INoFraktsBlockProps {
  myFracts?: boolean
  type?: string
}

const NoFraktsBlock = ({
  type = 'explore',
  myFracts = false,
}: INoFraktsBlockProps) => {
  const message = myFracts
    ? "Unfortunately, you don't have any frakts yet"
    : type === 'user'
    ? "This account doesn't have any frakts yet"
    : ''

  return (
    <div className={styles.root}>
      <p className={styles.message}>{message}</p>
      {myFracts && <BuyButton />}
    </div>
  )
}

export default NoFraktsBlock
