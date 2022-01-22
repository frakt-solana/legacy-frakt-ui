import { useEffect, useState } from 'react';

const LOADING_PLACEHOLDER = '--';

interface Statistics {
  fraktNFTs: {
    totalSupply: string;
    stakedNFTs: string;
    stakersAmout: string;
  };
  frktToken: {
    totalSupply: string;
    circulatingSupply: string;
    stakedPercentage: string;
    holdersAmount: string;
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
      stakersAmout: LOADING_PLACEHOLDER,
    },
    frktToken: {
      totalSupply: LOADING_PLACEHOLDER,
      circulatingSupply: LOADING_PLACEHOLDER,
      stakedPercentage: LOADING_PLACEHOLDER,
      holdersAmount: LOADING_PLACEHOLDER,
    },
    sandbox: {
      collectionsAmount: '6',
      totalNFTsAmount: '12 588',
    },
    fraktion: {
      TVL: LOADING_PLACEHOLDER,
      lockedNFTsAmount: LOADING_PLACEHOLDER,
    },
  });

  const fetchStatistics = async () => {
    try {
      const solanaPrice = await fetchSolanaPrice();
      const { fraktNFTs, frktToken, sandbox, fraktion } =
        await fetchRawStatistics();

      setStatistics((prevState) => ({
        ...prevState,
        fraktNFTs: {
          ...prevState.fraktNFTs,
          stakedNFTs: formatNumberWithSpaceSeparator(fraktNFTs.stakedNFTs),
          stakersAmout: formatNumberWithSpaceSeparator(fraktNFTs.stakersAmout),
        },
        frktToken: {
          totalSupply: formatNumberWithSpaceSeparator(frktToken.totalSupply),
          circulatingSupply: formatNumberWithSpaceSeparator(
            frktToken.circulatingSupply,
          ),
          stakedPercentage: `${formatNumberWithSpaceSeparator(
            frktToken.stakedPercentage,
          )}%`,
          holdersAmount: formatNumberWithSpaceSeparator(
            frktToken.holdersAmount,
          ),
        },
        sandbox: {
          collectionsAmount: formatNumberWithSpaceSeparator(
            sandbox.collectionsAmount,
          ),
          totalNFTsAmount: formatNumberWithSpaceSeparator(
            sandbox.totalNFTsAmount,
          ),
        },
        fraktion: {
          TVL: `$ ${formatNumberWithSpaceSeparator(
            fraktion.TVL * solanaPrice,
          )}`,
          lockedNFTsAmount: formatNumberWithSpaceSeparator(
            fraktion.lockedNFTsAmount,
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

const fetchSolanaPrice = async (): Promise<number> => {
  const { tickers } = await (
    await fetch('https://api.coingecko.com/api/v3/coins/solana/tickers')
  ).json();

  return tickers.find((ticker) => ticker.target === 'USD').converted_last.usd;
};

interface RawStatistics {
  fraktNFTs: {
    totalSupply: number;
    stakedNFTs: number;
    stakersAmout: number;
  };
  frktToken: {
    totalSupply: number;
    circulatingSupply: number;
    stakedPercentage: number;
    holdersAmount: number;
  };
  sandbox: {
    collectionsAmount: number;
    totalNFTsAmount: number;
  };
  fraktion: {
    TVL: number;
    lockedNFTsAmount: number;
  };
}

const fetchRawStatistics = async (): Promise<RawStatistics> => {
  const {
    fraktion,
    holders: frktHolders,
    nft: fraktNFTs,
    supply: frktSupply,
  } = (await (await fetch('https://fraktdao.com/api?group=hourly?')).json()).at(
    -1,
  );

  return {
    fraktNFTs: {
      totalSupply: 10_000,
      stakedNFTs: fraktNFTs.stacked,
      stakersAmout: fraktNFTs.wallets,
    },
    frktToken: {
      totalSupply: frktSupply.total,
      circulatingSupply: frktSupply.circulating,
      stakedPercentage: (frktSupply.circulating / frktSupply.total) * 100,
      holdersAmount: frktHolders,
    },
    sandbox: {
      collectionsAmount: 6,
      totalNFTsAmount: 12_588,
    },
    fraktion: {
      TVL: fraktion.TVL,
      lockedNFTsAmount: fraktion.lockedNFTs,
    },
  };
};

const formatNumberWithSpaceSeparator = (num: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(num)
    .replaceAll(',', ' ');
