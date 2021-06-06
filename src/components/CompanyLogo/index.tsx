import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './CompanyLogo.module.scss'
import { URLS } from '../../constants'

const CompanyLogo = ({ className }: any) => {
  return (
    <>
      <NavLink to={URLS.ROOT} className={`${styles.root} ${className || ''}`}>
        Frakt
      </NavLink>
      <div className={styles.generatedCounter}>
        <p>45 / 10 000</p>
      </div>
    </>
  )
}

export default CompanyLogo
