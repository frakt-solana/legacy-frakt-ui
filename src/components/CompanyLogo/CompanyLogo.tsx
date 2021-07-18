import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.module.scss'
import { URLS } from '../../constants'
import { useArtsCounter } from './hooks'

interface ICompanyLogoProps {
  className?: string
}

const CompanyLogo = ({ className }: ICompanyLogoProps) => {
  const artsCounter = useArtsCounter()

  return (
    <>
      <NavLink to={URLS.ROOT} className={`${styles.root} ${className || ''}`}>
        Frakt
      </NavLink>
      <div
        className={styles.generatedCounter}
      >{`${artsCounter} / 10 000 sold`}</div>
    </>
  )
}

export default CompanyLogo
