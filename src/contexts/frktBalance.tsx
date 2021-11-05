/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext } from 'react';
import { TokenView } from 'frakt-client';
import config from '../config';
import BN from 'bn.js';

export const DECIMALS_PER_FRKT = 1e8;

interface FrktBalanceInterface {
  balance: BN;
  setBalance: (userTokens: TokenView[]) => void;
}

export const FrktBalanceContext = React.createContext({
  balance: new BN(0),
  setBalance: (userTokens: TokenView[]) => {},
});

export const FrktBalanceProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [balance, setBalance] = useState<BN>();

  const changeBalance = (userTokens: TokenView[]) => {
    const frktToken = userTokens.filter(
      ({ mint }) => mint === config.FARMING_TOKEN_MINT,
    )?.[0];

    const amount = frktToken?.amount
      ? frktToken.amount === -1
        ? frktToken.amountBN
        : new BN(Number(frktToken.amount))
      : new BN(0);

    setBalance(amount);
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
