import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './CompanyLogo.module.scss'
import { URLS } from '../../constants'
import { useArts } from '../../contexts/artDetails'

const CompanyLogo = ({ className }: any) => {
  const { updateCounter, counter, arts } = useArts();

  useEffect(() => {
    let timeoutId = setTimeout(async function getCounter() {
      await updateCounter();
      timeoutId = setTimeout(getCounter, 10000);
    }, 10000);
  }, [])
  return (
    <>
      <NavLink to={URLS.ROOT} className={`${styles.root} ${className || ''}`}>
        Frakt
      </NavLink>
      <div className={styles.generatedCounter}>
        <p>{`${counter || arts?.length || 0} / 10 000`}</p>
      </div>
    </>
  )
}

export default CompanyLogo
