import React from 'react'

import styles from './styles.module.scss'

interface IUserLevelProps {
  points: number
}

const getLevel = (points) => {
  if (points < 100) return 1
  else if (points < 500) return 2
  else if (points < 1000) return 3
  else if (points < 2500) return 4
  else if (points < 4000) return 5
  else return 6
}

const UserLevel = ({ points }: IUserLevelProps) => {
  const level = getLevel(points)

  return (
    <div className={styles.root}>
      Launchpd: <b>{points}</b> points | LEVEL <b>{level}</b>
    </div>
  )
}

export default UserLevel
