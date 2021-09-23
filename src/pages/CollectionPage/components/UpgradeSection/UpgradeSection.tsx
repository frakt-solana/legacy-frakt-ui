import React from 'react'
import Button from '../../../../components/Button'
import { Tooltip } from 'antd'

import { pluralize } from '../../helpers'
import styles from './styles.module.scss'

interface IUpgradeSectionProps {
  oldFraktsAmount: number
  onUpgradeClick: (args: any) => any
}

const UpgradeSection = ({
  oldFraktsAmount,
  onUpgradeClick,
}: IUpgradeSectionProps) => {
  return (
    <div className={styles.root}>
      It seems that you have{' '}
      <span className={styles.boldText}>
        {pluralize(oldFraktsAmount, 'frakt')}{' '}
      </span>
      of old standard.{' '}
      <Button className={styles.upgradeButton} onClick={onUpgradeClick}>
        Upgrade
      </Button>{' '}
      {oldFraktsAmount > 5 ? '5 of ' : ''} them to the new standart.{' '}
      <Tooltip color={'#1e1e1e'} title={TOOLTIP_TEXT}>
        <span className={styles.questionText}>Why do I need this?</span>
      </Tooltip>
    </div>
  )
}

const TOOLTIP_TEXT =
  'This update is needed for full Phantom wallet support, high resolution image and ability to trade your frakt later on Marketplace. Please, if you have more than 5 old standard tokens, repeat this operation after transaction confirmation'

export default UpgradeSection
