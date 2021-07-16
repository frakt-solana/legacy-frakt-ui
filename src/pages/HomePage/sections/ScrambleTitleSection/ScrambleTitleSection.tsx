import React from 'react'

import styles from './styles.module.scss'
import ScrambleText from '../../components/ScrambleText'
import TextSection from '../../components/TextSection'

interface IScrambleTitleSectionProps {
  texts: Array<string>
}

const ScrambleTitleSection = ({ texts }: IScrambleTitleSectionProps) => (
  <TextSection>
    <ScrambleText texts={texts} className={styles.title} />
  </TextSection>
)

export default ScrambleTitleSection
