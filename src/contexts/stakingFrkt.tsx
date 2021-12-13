import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import BN from 'bn.js';
import { getAllUserTokens, TokenView } from 'frakt-client';
import * as contract from '@frakters/frkt-staking-library';
import { Connection, PublicKey } from '@solana/web3.js';

import { useWallet, WalletAdapter } from '../external/contexts/wallet';
import { useConnection } from '../external/contexts/connection';
import { useFrktBalance } from './frktBalance';
import { notify } from '../external/utils/notifications';
import config from '../config';

const PROGRAMM_PUBLIC_KEY = new PublicKey(
  config.FRKT_STAKING_PROGRAM_PUBLIC_KEY,
);
const FRKT_MINT_PUBLIC_KEY = new PublicKey(config.FARMING_TOKEN_MINT);

const reusableUserStakeAccountsInUse: string[] = [];
export const getFrktStakeInfo = async (
  wallet: WalletAdapter,
  connection: Connection,
): Promise<{
  userStakeAccountsAvailableToUnstake: PublicKey[];
  userStakeAccountsReadyToHarvest: PublicKey[];
  frktToUnstakeAmount: BN;
  reusableUserStakeAccounts: PublicKey[];
  APR: BN;
  balanceTokens: TokenView[];
  frktStakingAmount: BN;
  harvestAmount: BN;
}> => {
  const NOW_UNIX = moment().unix();

  const walletPubKey = wallet.publicKey.toString();

  const [balanceTokens, data] = await Promise.all([
    getAllUserTokens(wallet.publicKey, { connection }),
    contract.getAllProgramAccounts(PROGRAMM_PUBLIC_KEY, { connection }),
  ]);

  const reusableUserStakeAccounts = data.stakeFRKTAccounts
    .filter((stakeWallet) => {
      return (
        !stakeWallet.is_staked &&
        stakeWallet.is_initialized &&
        !reusableUserStakeAccountsInUse.find(
          (el) => el === stakeWallet.stakeAccountPubkey,
        )
      );
    })
    .map((el) => new PublicKey(el.stakeAccountPubkey));

  const userActiveStakeAccounts = data.stakeFRKTAccounts.filter(
    (stakeAccount) => {
      const isStakeOwnerTheSame = walletPubKey === stakeAccount.stake_owner;
      const isStaked = stakeAccount.is_staked;
      return isStakeOwnerTheSame && isStaked;
    },
  );

  const APR = new BN(data.cumulativeAccount.apr);
  const DATE_BN = new BN(NOW_UNIX - data.cumulativeAccount.last_time).mul(APR);
  const CUMULATIVE_BN = new BN(data.cumulativeAccount.cumulative);
  const MIN_HARVEST_THRESHOLD = new BN(1e6); //? 0.01

  const [frktStakingAmount, harvestAmount] = userActiveStakeAccounts.reduce(
    ([frktStakingAmount, harvest], userStakeAccount) => {
      const amountBN = new BN(userStakeAccount.amount);
      const stakedAtCumulativeBN = new BN(
        userStakeAccount.staked_at_cumulative,
      );

      const frktToHarvest = CUMULATIVE_BN.add(DATE_BN)
        .sub(stakedAtCumulativeBN)
        .mul(amountBN)
        .div(new BN('100'))
        .div(new BN('31536000'));

      return [frktStakingAmount.add(amountBN), harvest.add(frktToHarvest)];
    },
    [new BN(0), new BN(0)],
  );
  const userStakeAccountsReadyToHarvest = userActiveStakeAccounts.filter(
    (userStakeAccount) => {
      const amountBN = new BN(userStakeAccount.amount);
      const stakedAtCumulativeBN = new BN(
        userStakeAccount.staked_at_cumulative,
      );

      const frktToHarvest = CUMULATIVE_BN.add(DATE_BN)
        .sub(stakedAtCumulativeBN)
        .mul(amountBN)
        .div(new BN('100'))
        .div(new BN('31536000'));

      return frktToHarvest.cmp(MIN_HARVEST_THRESHOLD) === 1;
    },
  );

  const userStakeAccountsAvailableToUnstake = userActiveStakeAccounts.filter(
    (stakeWallet) => {
      return stakeWallet.stake_end_at < NOW_UNIX;
    },
  );

  const frktToUnstakeAmount = userStakeAccountsAvailableToUnstake.reduce(
    (acc, userStakeAccount) => {
      const amountBN = new BN(userStakeAccount.amount);

      return acc.add(amountBN);
    },
    new BN(0),
  );

  return {
    userStakeAccountsAvailableToUnstake:
      userStakeAccountsAvailableToUnstake.map(
        (el) => new PublicKey(el.stakeAccountPubkey),
      ),
    userStakeAccountsReadyToHarvest: userStakeAccountsReadyToHarvest.map(
      (el) => new PublicKey(el.stakeAccountPubkey),
    ),
    frktToUnstakeAmount,
    reusableUserStakeAccounts,
    APR,
    balanceTokens,
    frktStakingAmount,
    harvestAmount,
  };
};

const unstakeFrkt =
  (
    wallet: WalletAdapter,
    connection: Connection,
    userFrktAccounts: PublicKey[],
    cb: () => any,
  ) =>
  () => {
    return contract
      .unstakeFRKT({
        programPubkey: PROGRAMM_PUBLIC_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUBLIC_KEY,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        connection,
        customerFRKTAccounts: userFrktAccounts,
      })
      .then(() => {
        cb();
        notify({
          message: `FRKT unstaked successfully`,
          type: 'success',
        });
        return true;
      })
      .catch(() => {
        notify({
          message: 'Transaction failed',
          type: 'error',
        });
        return false;
      });
  };

const harvestFrkt =
  (
    wallet: WalletAdapter,
    connection: Connection,
    userFrktAccounts: PublicKey[],
    cb: () => any,
  ) =>
  () => {
    return contract
      .harvestFRKT({
        programPubkey: PROGRAMM_PUBLIC_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUBLIC_KEY,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        connection,
        customerFRKTAccounts: userFrktAccounts,
      })
      .then(() => {
        cb();
        notify({
          message: `FRKT harvest successfully`,
          type: 'success',
        });
        return true;
      })
      .catch(() => {
        notify({
          message: 'Transaction failed',
          type: 'error',
        });
        return false;
      });
  };

const stakeFrkt =
  (
    wallet: WalletAdapter,
    connection: Connection,
    reusableUserStakeAccount: PublicKey,
    cb: () => any,
  ) =>
  (amount: BN) => {
    if (reusableUserStakeAccount)
      reusableUserStakeAccountsInUse.push(reusableUserStakeAccount.toString());
    return contract
      .stakeFRKT({
        amount,
        programPubkey: PROGRAMM_PUBLIC_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUBLIC_KEY,
        stakeAccountGiven: reusableUserStakeAccount,
        connection,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
      })
      .then(() => {
        cb();
        notify({
          message: `FRKT staked successfully`,
          type: 'success',
        });
        return true;
      })
      .catch(() => {
        notify({
          message: 'Transaction failed',
          type: 'error',
        });
        return false;
      });
  };

interface StakingFrktContextState {
  frktStakingAmount: BN;
  APR: BN;
  frktToUnstakeAmount: BN;
  harvestAmount: BN;
  balance: BN;
  stakeFrkt: (amount: BN) => Promise<boolean>;
  harvestFrkt: () => Promise<boolean>;
  unstakeFrkt: () => Promise<boolean>;
  refreshStakingInfo: () => Promise<void>;
}

export const StakingFrktContext = React.createContext<StakingFrktContextState>({
  frktStakingAmount: new BN(0),
  APR: new BN(0),
  frktToUnstakeAmount: new BN(0),
  harvestAmount: new BN(0),
  balance: new BN(0),
  harvestFrkt: async () => await Promise.resolve(true),
  stakeFrkt: async () => await Promise.resolve(true),
  unstakeFrkt: async () => await Promise.resolve(true),
  refreshStakingInfo: () => Promise.resolve(),
});

export const StakingFrktProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { connected, wallet } = useWallet();
  const connection = useConnection();
  const [frktStakingAmount, setFrktStakingAmount] = useState<BN>(new BN(0));
  const [apr, setApr] = useState<BN>(new BN(0));
  const [
    userStakeAccountsAvailableToUnstake,
    setUserStakeAccountsAvailableToUnstake,
  ] = useState<PublicKey[]>([]);
  const [userStakeAccountsReadyToHarvest, setUserStakeAccountsReadyToHarvest] =
    useState<PublicKey[]>([]);
  const [frktToUnstakeAmount, setFrktToUnstakeAmount] = useState<BN>(new BN(0));
  const [reusableUserStakeAccounts, setReusableUserStakeAccounts] = useState<
    PublicKey[]
  >([]);
  const [harvestAmount, setHarvestAmount] = useState<BN>(new BN(0));
  const { balance, setBalance } = useFrktBalance();

  const stakingInfoToState = () =>
    getFrktStakeInfo(wallet, connection).then(
      ({
        userStakeAccountsAvailableToUnstake,
        userStakeAccountsReadyToHarvest,
        frktToUnstakeAmount,
        reusableUserStakeAccounts,
        APR,
        balanceTokens,
        frktStakingAmount,
        harvestAmount,
      }) => {
        setBalance(balanceTokens);
        setFrktStakingAmount(frktStakingAmount);
        setFrktToUnstakeAmount(frktToUnstakeAmount);
        setUserStakeAccountsAvailableToUnstake(
          userStakeAccountsAvailableToUnstake,
        );
        setApr(APR);
        setReusableUserStakeAccounts(reusableUserStakeAccounts);
        setHarvestAmount(harvestAmount);
        setUserStakeAccountsReadyToHarvest(userStakeAccountsReadyToHarvest);
      },
    );

  const afterUnstake = () => {
    setFrktToUnstakeAmount(new BN(0));
    setFrktStakingAmount(new BN(0));
  };

  const afterStakeFrakts = () => {
    if (reusableUserStakeAccounts.length) {
      setReusableUserStakeAccounts(
        reusableUserStakeAccounts.slice(1, reusableUserStakeAccounts.length),
      );
    }
  };

  const afterHarvest = () => {
    setHarvestAmount(new BN(0));
  };

  useEffect(() => {
    connected && stakingInfoToState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <StakingFrktContext.Provider
      value={{
        APR: apr,
        frktStakingAmount,
        harvestAmount,
        refreshStakingInfo: stakingInfoToState,
        harvestFrkt: harvestFrkt(
          wallet,
          connection,
          userStakeAccountsReadyToHarvest,
          afterHarvest,
        ),
        unstakeFrkt: unstakeFrkt(
          wallet,
          connection,
          userStakeAccountsAvailableToUnstake,
          afterUnstake,
        ),
        stakeFrkt: stakeFrkt(
          wallet,
          connection,
          reusableUserStakeAccounts[0],
          afterStakeFrakts,
        ),
        balance,
        frktToUnstakeAmount,
      }}
    >
      {children}
    </StakingFrktContext.Provider>
  );
};

export const useStakingFrkt = (): StakingFrktContextState => {
  return useContext(StakingFrktContext);
};
