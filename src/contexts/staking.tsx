/* eslint-disable require-await */
import React, { useState, useContext, useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as contract from 'frakt-client';
import moment from 'moment';
import { sum } from 'lodash';

import { useConnection } from '../external/contexts/connection';
import config from '../config';
import { useWallet } from '../external/contexts/wallet';
import { notify } from '../external/utils/notifications';
import { Frakt } from './frakts';

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY);
const farmingMintPubKey = new PublicKey(config.FARMING_TOKEN_MINT);

interface StakingContextInterface {
  userStakeAccounts: contract.StakeView[];
  userStakeAccountsAvailableToUnstake: contract.StakeView[];
  poolConfigAccount: contract.PoolConfigView;
  stakeAccounts: contract.StakeView[];
  reusableStakeAccounts: contract.StakeView[];
  userFrakts: Frakt[];
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
  stakeFrakts: (artsAndMints: contract.ArtAndMint[]) => Promise<boolean>;
  unstakeFrakts: (artsAndMints: contract.UnstakeParams[]) => Promise<boolean>;
  updateStakeFrakts: (
    artsAndMints: contract.UnstakeParams[],
  ) => Promise<boolean>;
  harvestStakes: (stakesPubkeys: PublicKey[]) => Promise<boolean>;
  secondsSumAfterHarvest: number;
}

export const StakingContext = React.createContext({
  userStakeAccounts: [],
  userStakeAccountsAvailableToUnstake: [],
  poolConfigAccount: null,
  stakeAccounts: [],
  reusableStakeAccounts: [],
  userFrakts: [],
  loading: false,
  error: null,
  fetchData: async () => {},
  stakeFrakts: async () => false,
  unstakeFrakts: async () => false,
  updateStakeFrakts: async () => false,
  harvestStakes: async () => false,
  secondsSumAfterHarvest: 0,
} as StakingContextInterface);

export const StakingProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);

  const [poolConfigAccount, setPoolConfigAccount] =
    useState<contract.PoolConfigView>(null);
  const [stakeAccounts, setStakeAccounts] = useState<contract.StakeView[]>([]);
  const [userFrakts, setUserFrakts] = useState<Frakt[]>([]);

  const connection = useConnection();
  const { wallet } = useWallet();

  const fetchData = async (): Promise<void> => {
    if (loading) return;
    try {
      setLoading(true);
      const { stakeAccounts, poolConfigAccount, artAccounts } =
        await contract.getAllProgramAccounts(programPubKey, { connection });
      const tokens = await contract.getAllUserTokens(wallet.publicKey, {
        connection,
      });
      const tokensMint = tokens.map(({ mint }) => mint);
      const userFrakts = artAccounts.filter((frakt) => {
        return tokensMint.includes(frakt?.metadata?.minted_token_pubkey);
      });

      setUserFrakts(userFrakts as Frakt[]);
      setPoolConfigAccount(poolConfigAccount);
      setStakeAccounts(stakeAccounts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const userStakeAccounts = useMemo((): contract.StakeView[] => {
    return stakeAccounts.filter(
      ({ stake_owner, is_staked }) =>
        stake_owner === `${wallet.publicKey}` && is_staked,
    );
  }, [stakeAccounts, wallet]);

  const reusableStakeAccounts = useMemo((): contract.StakeView[] => {
    return stakeAccounts.filter(({ is_staked }) => !is_staked);
  }, [stakeAccounts]);

  const secondsSumAfterHarvest = useMemo(() => {
    return sum(
      userStakeAccounts.map(
        ({ last_harvested_at }) => moment().unix() - Number(last_harvested_at),
      ),
    );
  }, [userStakeAccounts]);

  const userStakeAccountsAvailableToUnstake = useMemo(() => {
    return userStakeAccounts.filter(({ stake_end_at }) => {
      moment().unix() - Number(stake_end_at) >= 0;
    });
  }, [userStakeAccounts]);

  const stakeFrakts = async (
    artsAndMints: contract.ArtAndMint[],
  ): Promise<boolean> => {
    try {
      void (await contract.stakeBulkFrakts(
        artsAndMints,
        wallet.publicKey,
        programPubKey,
        async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        { connection },
      ));
      notify({
        message: `${artsAndMints.length} Frakts staked successfully`,
        type: 'success',
      });
      return true;
    } catch (error) {
      notify({
        message: 'Transaction failed',
        type: 'error',
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const unstakeFrakts = async (
    fraktsAndStakes: contract.UnstakeParams[],
  ): Promise<boolean> => {
    try {
      void (await contract.unstakeBulkFrakts(
        fraktsAndStakes,
        farmingMintPubKey,
        wallet.publicKey,
        programPubKey,
        async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        { connection },
      ));
      notify({
        message: `${fraktsAndStakes.length} Frakts unstaked successfully`,
        type: 'success',
      });
      return true;
    } catch (error) {
      notify({
        message: 'Transaction failed',
        type: 'error',
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const updateStakeFrakts = async (
    fraktsAndStakes: contract.UnstakeParams[],
  ): Promise<boolean> => {
    try {
      void (await contract.updateStakeBulkFrakts(
        fraktsAndStakes,
        wallet.publicKey,
        programPubKey,
        async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        { connection },
      ));
      notify({
        message: `${fraktsAndStakes.length} Frakts staked successfully`,
        type: 'success',
      });
      return true;
    } catch (error) {
      notify({
        message: 'Transaction failed',
        type: 'error',
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const harvestStakes = async (
    stakesPubkeys: PublicKey[],
  ): Promise<boolean> => {
    try {
      void (await contract.harvestBulkStakes(
        stakesPubkeys,
        wallet.publicKey,
        farmingMintPubKey,
        programPubKey,
        async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        { connection },
      ));
      notify({
        message: `FRKT harvested successfully`,
        type: 'success',
      });
      return true;
    } catch (error) {
      notify({
        message: 'Transaction failed',
        type: 'error',
      });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <StakingContext.Provider
      value={{
        userStakeAccounts,
        userStakeAccountsAvailableToUnstake,
        poolConfigAccount,
        stakeAccounts,
        reusableStakeAccounts,
        loading,
        error,
        fetchData,
        stakeFrakts,
        unstakeFrakts,
        updateStakeFrakts,
        harvestStakes,
        userFrakts,
        secondsSumAfterHarvest,
      }}
    >
      {children}
    </StakingContext.Provider>
  );
};

export const useStaking = (): StakingContextInterface => {
  const {
    userStakeAccounts,
    userStakeAccountsAvailableToUnstake,
    poolConfigAccount,
    stakeAccounts,
    reusableStakeAccounts,
    loading,
    error,
    fetchData,
    stakeFrakts,
    unstakeFrakts,
    updateStakeFrakts,
    userFrakts,
    secondsSumAfterHarvest,
    harvestStakes,
  } = useContext(StakingContext);
  return {
    userStakeAccounts,
    userStakeAccountsAvailableToUnstake,
    poolConfigAccount,
    stakeAccounts,
    reusableStakeAccounts,
    loading,
    error,
    fetchData,
    stakeFrakts,
    unstakeFrakts,
    updateStakeFrakts,
    userFrakts,
    secondsSumAfterHarvest,
    harvestStakes,
  };
};
