import { useWallet, WalletAdapter } from '../external/contexts/wallet';
import { useConnection } from '../external/contexts/connection';
import React, { useContext, useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import * as contract from '@frakters/frkt-staking-library';
import BN from 'bn.js';
import { useFrktBalance } from './frktBalance';
import { notify } from '../external/utils/notifications';
import { getAllUserTokens } from 'frakt-client';
import moment from 'moment';
import config from '../config';

const PROGRAMM_PUB_KEY = new PublicKey(config.FRKT_STAKING_PROGRAM_PUBLIC_KEY);
const FRKT_MINT_PUB_KEY = new PublicKey(config.FARMING_TOKEN_MINT);

const NOW_UNIX = new Date().getTime() / 1000;

const inUse: string[] = [];
// eslint-disable-next-line
export const getStackedInfo = async (
  wallet: WalletAdapter,
  connection: Connection,
) => {
  const walletPubKey = wallet.publicKey.toString();

  const [balanceTokens, data] = await Promise.all([
    getAllUserTokens(wallet.publicKey, { connection }),
    contract.getAllProgramAccounts(PROGRAMM_PUB_KEY, { connection }),
  ]);

  const reusableUserStakeAccounts = data.stakeFRKTAccounts
    .filter((stakeWallet) => {
      return (
        !stakeWallet.is_staked &&
        stakeWallet.is_initialized &&
        !inUse.find((el) => el === stakeWallet.stakeAccountPubkey)
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
  const DATE_BN = new BN(
    moment.utc().valueOf() / 1000 - data.cumulativeAccount.last_time,
  ).mul(APR);
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

      //? transaction fails when stake account has less than 1e6 frkt to harvest
      const nextFrktToHarvest =
        frktToHarvest.cmp(MIN_HARVEST_THRESHOLD) === -1
          ? harvest
          : harvest.add(frktToHarvest);

      return [frktStakingAmount.add(amountBN), nextFrktToHarvest];
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

const unstakeFrakts =
  (
    wallet: WalletAdapter,
    connection: Connection,
    customerFRKTAccounts: PublicKey[],
    cb: () => any,
  ) =>
  () => {
    return contract
      .unstakeFRKT({
        programPubkey: PROGRAMM_PUB_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUB_KEY,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        connection,
        customerFRKTAccounts: customerFRKTAccounts,
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

const harvestFrakts =
  (
    wallet: WalletAdapter,
    connection: Connection,
    customerFRKTAccounts: PublicKey[],
    cb: () => any,
  ) =>
  () => {
    return contract
      .harvestFRKT({
        programPubkey: PROGRAMM_PUB_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUB_KEY,
        sendTxn: async (txn) => {
          const { blockhash } = await connection.getRecentBlockhash();
          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          const signed = await wallet.signTransaction(txn);
          const txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid);
        },
        connection,
        customerFRKTAccounts: customerFRKTAccounts,
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

const stakeFrakts =
  (
    wallet: WalletAdapter,
    connection: Connection,
    reusableWallet: PublicKey,
    cb: () => any,
  ) =>
  (amount: BN) => {
    if (reusableWallet) inUse.push(reusableWallet.toString());
    return contract
      .stakeFRKT({
        amount,
        programPubkey: PROGRAMM_PUB_KEY,
        userPublicKey: wallet.publicKey,
        mintPubkey: FRKT_MINT_PUB_KEY,
        stakeAccountGiven: reusableWallet,
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
  staked: BN;
  apr: BN;
  stakeFrakts: (amount: BN) => Promise<boolean>;
  harvestFrakts: () => Promise<boolean>;
  unstakeFrakts: () => Promise<boolean>;
  balance: BN;
  readyForUnstakingAmount: BN;
  harvest: BN;
  refreshStakingInfo: () => Promise<void>;
}

export const StakingFrktContext = React.createContext<StakingFrktContextState>({
  staked: null,
  apr: null,
  harvestFrakts: async () => await Promise.resolve(true),
  stakeFrakts: async () => await Promise.resolve(true),
  unstakeFrakts: async () => await Promise.resolve(true),
  balance: null,
  readyForUnstakingAmount: null,
  harvest: null,
  refreshStakingInfo: () => Promise.resolve(),
});

export const StakingFrktProvider = ({
  children = null,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { connected, wallet } = useWallet();
  const connection = useConnection();
  const [staked, setStaked] = useState<BN>(null);
  const [apr, setApr] = useState<BN>(null);
  const [readyForUnstaking, setReadyForUnstaking] = useState<PublicKey[]>([]);
  const [userStakeAccountsReadyToHarvest, setUserStakeAccountsReadyToHarvest] =
    useState<PublicKey[]>([]);
  const [readyForUnstakingAmount, setReadyForUnstakingAmount] = useState<BN>(
    new BN(0),
  );
  const [reusableWallets, setReusableWallets] = useState<PublicKey[]>([]);
  const [harvest, setHarvest] = useState<BN>(new BN(0));
  const { balance, setBalance } = useFrktBalance();

  const stakingInfoToState = () =>
    getStackedInfo(wallet, connection).then(
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
        setStaked(frktStakingAmount);
        setReadyForUnstakingAmount(frktToUnstakeAmount);
        setReadyForUnstaking(userStakeAccountsAvailableToUnstake);
        setApr(APR);
        setReusableWallets(reusableUserStakeAccounts);
        setHarvest(harvestAmount);
        setUserStakeAccountsReadyToHarvest(userStakeAccountsReadyToHarvest);
      },
    );

  const afterUnstakeFrakts = () => {
    setReadyForUnstakingAmount(new BN(0));
    setStaked(new BN(0));
  };

  const afterStakeFrakts = () => {
    if (reusableWallets.length) {
      setReusableWallets(reusableWallets.splice(1, reusableWallets.length));
    }
  };

  const afterHarvestFrakts = () => {
    setHarvest(new BN(0));
  };

  useEffect(() => {
    connected && stakingInfoToState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  return (
    <StakingFrktContext.Provider
      value={{
        apr,
        staked,
        harvest,
        refreshStakingInfo: stakingInfoToState,
        harvestFrakts: harvestFrakts(
          wallet,
          connection,
          userStakeAccountsReadyToHarvest,
          afterHarvestFrakts,
        ),
        unstakeFrakts: unstakeFrakts(
          wallet,
          connection,
          readyForUnstaking,
          afterUnstakeFrakts,
        ),
        stakeFrakts: stakeFrakts(
          wallet,
          connection,
          reusableWallets[0],
          afterStakeFrakts,
        ),
        balance,
        readyForUnstakingAmount,
      }}
    >
      {children}
    </StakingFrktContext.Provider>
  );
};

export const useStakingFrkt = (): StakingFrktContextState => {
  return useContext(StakingFrktContext);
};
