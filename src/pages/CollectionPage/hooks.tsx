import { useEffect, useState } from 'react';

import { FILTERS, SORTING } from '../../components/ArtsFilter';
import { useWallet } from '../../external/contexts/wallet';

export const useCollectionFilters = (): {
  filter: string;
  sortBy: string;
  showUserFrakts: boolean;
  onFilterChange: (filter: string) => void;
  onSortChange: (sortBy: string) => void;
  setFilter: (filter: string) => void;
} => {
  const { connected } = useWallet();

  const [filter, setFilter] = useState<string>(FILTERS[0].value);
  const [sortBy, setSortBy] = useState<string>(SORTING[0].value);
  const showUserFrakts = filter === FILTERS[1].value;

  const onFilterChange = (filter: string): void => setFilter(filter);

  const onSortChange = (sortBy: string): void => setSortBy(sortBy);
  useEffect(() => {
    !connected && showUserFrakts && setFilter(FILTERS[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return {
    filter,
    sortBy,
    showUserFrakts,
    onFilterChange,
    onSortChange,
    setFilter,
  };
};
