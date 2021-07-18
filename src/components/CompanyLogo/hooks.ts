import { useEffect, useRef } from 'react'

import { useArts } from '../../contexts/artDetails'

export const useArtsCounter = () => {
  const { updateCounter, counter, arts } = useArts()

  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(async function getCounter() {
      await updateCounter()
      timerRef.current = setTimeout(getCounter, 1000)
    }, 1000)

    return () => clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    counter && clearTimeout(timerRef.current)
  }, [counter])

  return counter || arts?.length || 0
}
