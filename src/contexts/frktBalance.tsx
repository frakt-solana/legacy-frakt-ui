/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import { TokenView } from 'frakt-client';
import config from '../config';

export const DECIMALS_PER_FRKT = 1e8;

interface FrktBalanceInterface {
  balance: number;
  setBalance: (userTokens: TokenView[]) => void;
}

export const FrktBalanceContext = React.createContext({
  balance: 0,
  setBalance: (userTokens: TokenView[]) => {},
});

export const FrktBalanceProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [balance, setBalance] = useState<number>();

  const changeBalance = (userTokens: TokenView[]) => {
    setBalance(
      Number(
        userTokens.filter(({ mint }) => mint === config.FARMING_TOKEN_MINT)?.[0]
          .amount || 0,
      ),
    );
  };

  return (
    <FrktBalanceContext.Provider
      value={{
        balance,
        setBalance: changeBalance,
      }}
    >
      {children}
    </FrktBalanceContext.Provider>
  );
};

export const useFrktBalance = (): FrktBalanceInterface => {
  const { balance, setBalance } = useContext(FrktBalanceContext);
  return {
    balance,
    setBalance,
  };
};
