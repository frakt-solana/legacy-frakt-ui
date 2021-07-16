import React from 'react'

import styles from './styles.module.scss'

interface ITextSectionProps {
  children: any
  id?: string
}

const TextSection = ({ children, id }: ITextSectionProps) => (
  <div className={styles.root} id={id}>
    {children}
  </div>
)

export default TextSection
