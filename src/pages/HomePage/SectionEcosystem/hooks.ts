import { useEffect, useState } from 'react';

const LOADING_PLACEHOLDER = '--';

interface Statistics {
  fraktNFTs: {
    totalSupply: string;
    stakedNFTs: string;
    holdersAmout: string;
  };
  frktToken: {
    totalSupply: string;
    circulatingSupply: string;
    stakedPercentage: string;
    holdersAmout: string;
  };
  sandbox: {
    collectionsAmount: string;
    totalNFTsAmount: string;
  };
  fraktion: {
    TVL: string;
    lockedNFTsAmount: string;
  };
}

export const useStatistics = (): Statistics => {
  const [statistics, setStatistics] = useState<Statistics>({
    fraktNFTs: {
      totalSupply: '10 000',
      stakedNFTs: LOADING_PLACEHOLDER,
      holdersAmout: LOADING_PLACEHOLDER,
    },
    frktToken: {
      totalSupply: LOADING_PLACEHOLDER,
      circulatingSupply: LOADING_PLACEHOLDER,
      stakedPercentage: LOADING_PLACEHOLDER,
      holdersAmout: LOADING_PLACEHOLDER,
    },
    sandbox: {
      collectionsAmount: LOADING_PLACEHOLDER,
      totalNFTsAmount: LOADING_PLACEHOLDER,
    },
    fraktion: {
      TVL: LOADING_PLACEHOLDER,
      lockedNFTsAmount: LOADING_PLACEHOLDER,
    },
  });

  const fetchStatistics = async () => {
    try {
      const solanaPrice = await fetchSolanaPrice();

      const [
        fraktNFTsStatistics,
        frktTokensStatistics,
        sandboxStatistics,
        fraktionStatistics,
      ] = await Promise.all([
        fetchFraktNFTsStatistics(),
        fetchFrktTokensStatistics(),
        fetchSandboxStatistics(),
        fetchFraktionStatistics(),
      ]);

      setStatistics((prevState) => ({
        ...prevState,
        fraktNFTs: {
          ...prevState.fraktNFTs,
          holdersAmout: formatNumberWithSpaceSeparator(
            fraktNFTsStatistics.holdersAmout,
          ),
          stakedNFTs: formatNumberWithSpaceSeparator(
            fraktNFTsStatistics.stakedNFTs,
          ),
        },
        frktToken: {
          totalSupply: formatNumberWithSpaceSeparator(
            frktTokensStatistics.totalSupply,
          ),
          circulatingSupply: formatNumberWithSpaceSeparator(
            frktTokensStatistics.circulatingSupply,
          ),
          stakedPercentage: `${frktTokensStatistics.stakedPercentage}%`,
          holdersAmout: formatNumberWithSpaceSeparator(
            frktTokensStatistics.holdersAmout,
          ),
        },
        sandbox: {
          collectionsAmount: formatNumberWithSpaceSeparator(
            sandboxStatistics.collectionsAmount,
          ),
          totalNFTsAmount: formatNumberWithSpaceSeparator(
            sandboxStatistics.totalNFTsAmount,
          ),
        },
        fraktion: {
          TVL: `$ ${formatNumberWithSpaceSeparator(
            fraktionStatistics.TVL * solanaPrice,
          )}`,
          lockedNFTsAmount: formatNumberWithSpaceSeparator(
            fraktionStatistics.lockedNFTs,
          ),
        },
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return statistics;
};

interface FraktNFTsStatistics {
  stakedNFTs: number;
  holdersAmout: number;
}
const fetchFraktNFTsStatistics = (): Promise<FraktNFTsStatistics> => {
  return Promise.resolve({
    stakedNFTs: 7_670,
    holdersAmout: 2_134,
  });
};

const fetchSolanaPrice = (): Promise<number> =>
  fetch('https://api.coingecko.com/api/v3/coins/solana/tickers')
    .then((res) => res.json())
    .then(
      (data) =>
        data.tickers.find((ticker) => ticker.target === 'USD').converted_last
          .usd,
    );

interface FrktTokensStatistics {
  totalSupply: number;
  circulatingSupply: number;
  stakedPercentage: number;
  holdersAmout: number;
}
const fetchFrktTokensStatistics = (): Promise<FrktTokensStatistics> => {
  return Promise.resolve({
    totalSupply: 50_000_000,
    circulatingSupply: 50_000_000,
    stakedPercentage: 76,
    holdersAmout: 15_783,
  });
};

interface SandboxStatistics {
  collectionsAmount: number;
  totalNFTsAmount: number;
}
const fetchSandboxStatistics = (): Promise<SandboxStatistics> => {
  return Promise.resolve({
    collectionsAmount: 6,
    totalNFTsAmount: 43_023,
  });
};

interface FraktionStatistics {
  lockedNFTs: number;
  issuedTokens: number;
  TVL: number;
}
const fetchFraktionStatistics = () =>
  fetch('https://frakt-stats.herokuapp.com/fraktion').then(
    (res) => res.json() as Promise<FraktionStatistics>,
  );

const formatNumberWithSpaceSeparator = (num: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(num)
    .replaceAll(',', ' ');
