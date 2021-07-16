import React from 'react'
import TextScramble from '@twistezo/react-text-scramble'

interface IScrambleTextProps {
  texts: Array<string>
  className?: string
}

const ScrambleText = ({ texts, className }: IScrambleTextProps) => (
  <div className={className}>
    <TextScramble
      nextLetterSpeed={100}
      texts={texts}
      pauseTime={2500}
      paused={false}
      letterSpeed={20}
    />
  </div>
)

export default ScrambleText
