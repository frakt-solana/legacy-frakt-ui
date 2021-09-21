import React from 'react'

import AppLayout from '../../components/AppLayout'
import styles from './styles.module.scss'

import SOLANART_LOGO from './images/solanart.webp'
import DIGITALEYES_LOGO from './images/digitaleyes.svg'
import MARKT_LOGO from './images/markt.png'

const MARKETPLACES = [
  {
    name: 'Solanart',
    imageSrc: SOLANART_LOGO,
    href: 'https://solanart.io/collections/frakt',
  },
  {
    name: 'Digital eyes',
    imageSrc: DIGITALEYES_LOGO,
    href: 'https://digitaleyes.market/collections/Frakt',
  },
  {
    name: 'markt.frakt',
    imageSrc: MARKT_LOGO,
    href: 'https://markt.frakt.art/',
  },
]

const MarketplacesPage = () => (
  <AppLayout headerText='Select marketplace'>
    <div className={styles.root}>
      {MARKETPLACES.map(({ href, name, imageSrc }, idx) => (
        <div className={styles.itemWrapper} key={idx}>
          <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.item}
          >
            <img alt={name} src={imageSrc} />
            {name}
          </a>
        </div>
      ))}
    </div>
  </AppLayout>
)

export default MarketplacesPage
