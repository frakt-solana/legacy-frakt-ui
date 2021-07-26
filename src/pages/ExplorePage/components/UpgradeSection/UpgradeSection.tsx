import React from 'react'
import Button from '../../../../components/Button'
import { Tooltip } from 'antd'

import { pluralize } from '../../helpers'
import styles from './styles.module.scss'

interface IUpgradeSectionProps {
  oldFraktsAmount: number
  tooltipText: string
  onUpgradeClick: (args: any) => any
}

const UpgradeSection = ({
  tooltipText,
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
      them to the new standart for free.{' '}
      <Tooltip color={'#1e1e1e'} title={tooltipText}>
        <span className={styles.questionText}>Why do I need it?</span>
      </Tooltip>
    </div>
  )
}

export default UpgradeSection
