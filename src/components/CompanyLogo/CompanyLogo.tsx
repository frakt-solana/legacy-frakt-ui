import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.module.scss'
import { URLS } from '../../constants'

interface ICompanyLogoProps {
  className?: string
}

const CompanyLogo = ({ className }: ICompanyLogoProps) => {
  return (
    <>
      <NavLink to={URLS.ROOT} className={`${styles.root} ${className || ''}`}>
        Frakt
      </NavLink>
    </>
  )
}

export default CompanyLogo
