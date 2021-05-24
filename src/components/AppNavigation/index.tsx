import React from 'react'
import { NavLink } from 'react-router-dom'
import { URLS } from '../../constants'

const AppNavigation = ({ className }: any) => {
  return (
    <ul className={className || ''}>
      <li>
        <NavLink to={URLS.EXPLORE}>Explore</NavLink>
      </li>
      <li>
        <NavLink to={URLS.MY_FACTS}>My FRACT'S</NavLink>
      </li>
    </ul>
  )
}

export default AppNavigation
