import React, { useState, useContext } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import { useConnection } from '../external/contexts/connection';
import config from '../config';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);

interface StakingContextInterface {
  poolConfigAccount: contract.PoolConfigView;
  stakeAccounts: contract.StakeView[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

export const StakingContext = React.createContext({
  poolConfigAccount: null,
  stakeAccounts: [],
  loading: false,
  error: null,
  fetchData: async () => {},
} as StakingContextInterface);

//TODO: Describe type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const StakingProvider = ({ children = null as any }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);

  const [poolConfigAccount, setPoolConfigAccount] =
    useState<contract.PoolConfigView>(null);
  const [stakeAccounts, setStakeAccounts] = useState<contract.StakeView[]>([]);

  const connection = useConnection();

  const fetchData = async (): Promise<void> => {
    if (loading) return;
    try {
      setLoading(true);
      const { stakeAccounts, poolConfigAccount } =
        await contract.getAllProgramAccounts(programPubKey, { connection });

      setPoolConfigAccount(poolConfigAccount);
      setStakeAccounts(stakeAccounts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StakingContext.Provider
      value={{ poolConfigAccount, stakeAccounts, loading, error, fetchData }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = (): StakingContextInterface => {
  const { poolConfigAccount, stakeAccounts, loading, error, fetchData } =
    useContext(StakingContext);
  return {
    poolConfigAccount,
    stakeAccounts,
    loading,
    error,
    fetchData,
  };
};
