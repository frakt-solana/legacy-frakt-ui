import React, { useState, useEffect, useRef } from 'react';

import { SYMBOLS } from './constants';
import { randomItem, nextItem } from './helpers';

interface ScrambleTextProps {
  texts: Array<string>;
  className?: string;
  letterSpeed?: number;
  nextLetterSpeed?: number;
  paused?: boolean;
  pauseTime?: number;
}

const ScrambleText = ({
  texts,
  className = '',
  letterSpeed = 5,
  nextLetterSpeed = 100,
  paused = false,
  pauseTime = 1500,
}: ScrambleTextProps): JSX.Element => {
  const [currentText, setCurrentText] = useState<string>(texts[0]);

  const [displayedText, setDisplayedText] = useState<string[]>(
    Array(currentText.length)
      .fill(0)
      .map(() => randomItem(SYMBOLS)),
  );

  const leftIndexes = useRef([]);

  const defaultLeftIndexes = (): number[] =>
    (leftIndexes.current = Array(currentText.length)
      .fill(0)
      .map((_, idx) => idx));

  const bakeLetterInterval = useRef(null);
  const bakeTextInterval = useRef(null);
  const timeoutRef = useRef(null);

  const clearTimers = (): void => {
    clearInterval(bakeLetterInterval.current);
    clearInterval(bakeTextInterval.current);
    clearTimeout(timeoutRef.current);
  };

  const bakeLetter = (): void => {
    bakeLetterInterval.current = setInterval(() => {
      if (!paused) {
        const updatedText: string[] = [];

        currentText.split('').forEach((_, i) => {
          if (!leftIndexes.current.includes(i)) {
            updatedText[i] = currentText[i];
            return;
          }

          const randomSymbol = randomItem(SYMBOLS);
          updatedText[i] = randomSymbol;
        });

        setDisplayedText(updatedText);
      }
    }, letterSpeed);
  };

  const bakeText = (): void => {
    defaultLeftIndexes();
    bakeLetter();

    bakeTextInterval.current = setInterval(() => {
      if (!paused) {
        if (leftIndexes.current.length === 0) {
          clearTimers();

          timeoutRef.current = setTimeout(() => {
            setCurrentText(nextItem(texts, currentText));
            defaultLeftIndexes();
          }, pauseTime);
        }

        leftIndexes.current = leftIndexes.current.slice(1);
      }
    }, nextLetterSpeed);
  };

  useEffect(() => {
    !paused && bakeText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentText, paused]);

  useEffect(() => clearTimers, []);

  return <div className={className}>{displayedText}</div>;
};

export default ScrambleText;
