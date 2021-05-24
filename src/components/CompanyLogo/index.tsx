import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './CompanyLogo.module.scss'
import { URLS } from '../../constants'

const CompanyLogo = (props: any) => {
  return (
    <NavLink to={URLS.ROOT} className={styles.root}>
      Fract
    </NavLink>
  )
}

export default CompanyLogo
