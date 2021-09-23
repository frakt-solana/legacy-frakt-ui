import { useEffect, useState } from 'react'

import { FILTERS, SORTING } from '../../components/ArtsFilter'
import { useWallet } from '../../contexts/wallet'

export const useCollectionFilters = () => {
  const { connected } = useWallet()

  const [filter, setFilter] = useState<string>(FILTERS[0].value)
  const [sortBy, setSortBy] = useState<string>(SORTING[0].value)
  const showUserFrakts = filter === FILTERS[1].value

  const onFilterChange = (filter: string) => setFilter(filter)

  const onSortChange = (sortBy: string) => setSortBy(sortBy)
  useEffect(() => {
    !connected && showUserFrakts && setFilter(FILTERS[0].value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected])

  return {
    filter,
    sortBy,
    showUserFrakts,
    onFilterChange,
    onSortChange,
    setFilter,
  }
}
