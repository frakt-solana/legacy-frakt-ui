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

export const ArtsContext = React.createContext({
  currentUserArts: [],
  arts: [],
  getArts: () => { },
  getCurrentUserArts: () => { },
  buyArt: () => { }
})

export const ArtsProvider = ({ children = null as any }) => {
  const [arts, setArts] = useState([])
  const [currentUserArts, setCurrentUserArts] = useState([]);

  const { wallet } = useWallet();
  const connection = useConnection();
  const programPubKey = new PublicKey("6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv")
  const adminPubKey = new PublicKey("DQfi54Fspjfi6VyMH1iSDyYAcui2hUF1QRbQ1GM7N1uo")

  const proccessArts = (arts) => {
    // * тут можно сделать всякие преобразования и подсчёты циферок
    return arts.map(camelcaseKeysDeep)
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

  const getArts = async () => {
    const arts = await contract.getArts(programPubKey, {
      connection
    });

    console.log({ arts })
    setArts(proccessArts(arts));
    return arts
  }

  const getCurrentUserArts = async () => {
    const arts = await contract.getArts(programPubKey, {
      connection
    })
    setArts(proccessArts(arts))
    const userArtsWithNotMinted = arts.filter(art => art.metadata.first_owner_pubkey == wallet.publicKey.toBase58())
    setCurrentUserArts(proccessArts(userArtsWithNotMinted))
    console.log({ userArtsWithNotMinted, arts })
    return userArtsWithNotMinted;
  }

  return (
    <ArtsContext.Provider
      value={{
        getCurrentUserArts,
        getArts,
        arts,
        currentUserArts,
        buyArt
      }}
    >
      {children}
    </ArtsContext.Provider>
  )
}

export const useArts = () => {
  const { getArts, getCurrentUserArts, currentUserArts, arts, buyArt } = useContext(ArtsContext)
  return { getArts, getCurrentUserArts, currentUserArts, arts, buyArt }
}
