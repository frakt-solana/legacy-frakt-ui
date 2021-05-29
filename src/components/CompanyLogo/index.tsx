import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './CompanyLogo.module.scss'
import { URLS } from '../../constants'

const CompanyLogo = ({ className }: any) => {
  return (
    <NavLink to={URLS.ROOT} className={`${styles.root} ${className || ''}`}>
      Fract
    </NavLink>
  )
}

export default CompanyLogo
