import React, { useState, useEffect, useRef } from 'react'

import { SYMBOLS } from './constants'
import { randomItem, nextItem } from './helpers'

interface IScrambleTextProps {
  texts: Array<string>
  className?: string
  letterSpeed?: number
  nextLetterSpeed?: number
  paused?: boolean
  pauseTime?: number
}

const ScrambleText = ({
  texts,
  className = '',
  letterSpeed = 5,
  nextLetterSpeed = 100,
  paused = false,
  pauseTime = 1500,
}: IScrambleTextProps) => {
  const [currentText, setCurrentText] = useState<string>(texts[0])

  const [displayedText, setDisplayedText] = useState<string[]>(
    Array(currentText.length)
      .fill(0)
      .map(() => randomItem(SYMBOLS))
  )

  const leftIndexes = useRef([])

  const defaultLeftIndexes = () =>
    (leftIndexes.current = Array(currentText.length)
      .fill(0)
      .map((_, idx) => idx))

  const bakeLetterInterval = useRef(null)
  const bakeTextInterval = useRef(null)
  const timeoutRef = useRef(null)

  const clearTimers = () => {
    clearInterval(bakeLetterInterval.current)
    clearInterval(bakeTextInterval.current)
    clearTimeout(timeoutRef.current)
  }

  const bakeLetter = () => {
    bakeLetterInterval.current = setInterval(() => {
      if (!paused) {
        const updatedText: string[] = []

        currentText.split('').forEach((_, i) => {
          if (!leftIndexes.current.includes(i)) {
            updatedText[i] = currentText[i]
            return
          }

          const randomSymbol = randomItem(SYMBOLS)
          updatedText[i] = randomSymbol
        })

        setDisplayedText(updatedText)
      }
    }, letterSpeed)
  }

  const bakeText = () => {
    defaultLeftIndexes()
    bakeLetter()

    bakeTextInterval.current = setInterval(() => {
      if (!paused) {
        if (leftIndexes.current.length === 0) {
          clearTimers()

          timeoutRef.current = setTimeout(() => {
            setCurrentText(nextItem(texts, currentText))
            defaultLeftIndexes()
          }, pauseTime)
        }

        leftIndexes.current = leftIndexes.current.slice(1)
      }
    }, nextLetterSpeed)
  }

  useEffect(() => {
    !paused && bakeText()
  }, [currentText, paused]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => clearTimers, [])

  return <div className={className}>{displayedText}</div>
}

export default ScrambleText
