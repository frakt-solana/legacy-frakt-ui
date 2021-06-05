import React, { useEffect, useState, useContext } from 'react';
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey
} from '@solana/web3.js';
import camelcaseKeysDeep from "camelcase-keys-deep";
import * as contract from 'frakt-client';
import { useWallet } from './wallet';
import { useConnection } from './connection';

const programPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
const adminPubKey = new PublicKey("DQfi54Fspjfi6VyMH1iSDyYAcui2hUF1QRbQ1GM7N1uo")

interface IArtsContext {
  currentUserArts: any,
  arts: any,
  getArts: any,
  getCurrentUserArts: any,
  getUserArts: any,
  buyArt: any,
  getArtOwner: any
}

export const ArtsContext = React.createContext({
  currentUserArts: [],
  arts: [],
  getArts: () => { },
  getCurrentUserArts: () => { },
  getUserArts: () => { },
  buyArt: () => { }
})

export const ArtsProvider = ({ children = null as any }) => {
  const [arts, setArts] = useState([])
  const [currentUserArts, setCurrentUserArts] = useState([]);

  const { wallet } = useWallet();
  const connection = useConnection();


  const proccessArts = (arts) => {
    // * тут можно сделать всякие преобразования и подсчёты циферок
    return arts;
  }

  // * optional, might be deleted
  useEffect(() => {

    if (wallet?.publicKey) {
      console.log({ wallet });

      getCurrentUserArts();
    }

  }, [wallet?.publicKey])

  const buyArt = async () => {
    try {
      void await contract.buyArt(wallet.publicKey, programPubKey, adminPubKey,
        async (txn) => {
          let {
            blockhash
          } = await connection.getRecentBlockhash();

          txn.recentBlockhash = blockhash;
          txn.feePayer = wallet.publicKey;
          let signed = await wallet.signTransaction(txn);
          let txid = await connection.sendRawTransaction(signed.serialize());
          return void connection.confirmTransaction(txid)
        }, {
        connection
      })
      return true
    } catch (error) {
      return false
    }
  }

  const getArtOwner = async (mintAddres: PublicKey) => {
    const largestAccounts = (await connection.getTokenLargestAccounts(mintAddress, 'processed')).value;
    const tokenHolderPubkey = largestAccounts[0].address;
    return tokenHolderPubkey;
  }

  const getArts = async () => {
    const arts = await contract.getArts(programPubKey, {
      connection
    });

    console.log({ arts })
    setArts(proccessArts(arts));
    return arts
  }

  const getUserArts = async (userPubKey: PublicKey) => {
    const tokens = await contract.getAllUserTokens(userPubKey, { connection });
    const arts = await contract.getArts(programPubKey, { connection });
    setArts(proccessArts(arts));
    const userArts = contract.getArtTokensFromTokens(arts, tokens);
    return proccessArts(userArts)
  }

  const getCurrentUserArts = async () => {
    const userArts = await getUserArts(wallet.publicKey);
    setCurrentUserArts(userArts);
    return userArts;
  }

  return (
    <ArtsContext.Provider
      value={{
        getCurrentUserArts,
        getArts,
        getUserArts,
        arts,
        currentUserArts,
        buyArt,
        getArtOwner
      } as IArtsContext}
    >
      {children}
    </ArtsContext.Provider>
  )
}

export const useArts = () => {
  const { getArts, getCurrentUserArts, getUserArts, currentUserArts, arts, buyArt, getArtOwner } = useContext(ArtsContext) as IArtsContext;
  return { getArts, getCurrentUserArts, getUserArts, currentUserArts, arts, buyArt, getArtOwner }
}
