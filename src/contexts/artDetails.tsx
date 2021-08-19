import React, { useEffect, useState, useContext } from 'react'
import { keyBy } from 'lodash'
import { PublicKey } from '@solana/web3.js'
import * as contract from 'frakt-client'
import { useWallet } from './wallet'
import { useConnection } from './connection'
import config, { CACHE_URL } from '../config'

const programPubKey = new PublicKey(config.PROGRAM_PUBLIC_KEY)
const adminPubKey = new PublicKey(config.ADMIN_PUBLIC_KEY)

interface IArtsContext {
  currentUserArts: any
  arts: any
  getArts: any
  metadataByMintKey: any
  getCurrentUserArts: any
  getUserArts: any
  upgradeArts: any
  artMetaByMintKey: any
  buyArt: any
  getArtOwner: any
  getArtTokenPubkey: any
  getTokensMetadata: any
  getUserArtsInMigration: any
  updateCounter: any
  counter: number
}

export const getArtRarity = ({
  color_rarity,
  shape_rarity,
}: {
  color_rarity: number
  shape_rarity: number
}): number => (color_rarity * shape_rarity) / 100

export const ArtsContext = React.createContext({
  currentUserArts: [],
  arts: [],
  artMetaByMintKey: {},
  counter: 0,
  getUserArtsInMigration: () => { },
  getArts: () => { },
  getCurrentUserArts: () => { },
  getUserArts: () => { },
  upgradeArts: () => { },
  buyArt: () => { },
})

export const ArtsProvider = ({ children = null as any }) => {
  const [arts, setArts] = useState([])
  const [currentUserArts, setCurrentUserArts] = useState([])
  const [artMetaByMintKey, setMetadata] = useState({})
  const [counter, setCounter] = useState(0)

  const { wallet } = useWallet()
  const connection = useConnection()

  const proccessArts = (arts) => {
    // * тут можно сделать всякие преобразования и подсчёты циферок
    return arts
      .map((art) => ({
        ...art,
        rarity: getArtRarity({
          color_rarity: art.attributes.color_rarity,
          shape_rarity: art.attributes.shape_rarity,
        }),
      }))
      .filter((art) => art.metadata.is_minted === true)
  }

  // * optional, might be deleted
  useEffect(() => {
    if (wallet?.publicKey) {
      getCurrentUserArts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet?.publicKey])

  const buyArt = async () => {
    try {
      void (await contract.buyArt(
        wallet.publicKey,
        programPubKey,
        adminPubKey,
        async (txn) => {
          let { blockhash } = await connection.getRecentBlockhash()

          txn.recentBlockhash = blockhash
          txn.feePayer = wallet.publicKey
          let signed = await wallet.signTransaction(txn)
          let txid = await connection.sendRawTransaction(signed.serialize())
          return void connection.confirmTransaction(txid)
        },
        {
          connection,
        }
      ))
      return true
    } catch (error) {
      return false
    }
  }

  const getArtOwner = async (mintAddress: PublicKey): Promise<String> => {
    const largestTokenAccountOwner = await contract.getLargestTokenAccountOwnerByMint(
      mintAddress,
      { connection }
    )
    return largestTokenAccountOwner
  }

  const getArts = async () => {
    const [rawArts, metadata] = await Promise.all([
      fetch(`${CACHE_URL}/arts.json`, { headers: { "Accept-Encoding": "gzip" } }),
      getTokensMetadata(),
    ])
    const arts = proccessArts(Object.values(await rawArts.json()))
    setArts(arts)
    return arts
  }

  const getUserArts = async (userPubKey: PublicKey) => {
    const tokens = await contract.getAllUserTokens(userPubKey, { connection })
    const [arts, metadata] = await Promise.all([
      fetch(`${CACHE_URL}/arts.json`, { headers: { "Accept-Encoding": "gzip" } }),
      getTokensMetadata(),
    ])
    setArts(Object.values(proccessArts(arts)))
    const userArts = contract.getArtTokensFromTokens(Object.values(arts), tokens)
    const artsInMigration = getUserArtsInMigration(arts, userPubKey)
    return proccessArts([...userArts, ...artsInMigration])
  }

  const getCurrentUserArts = async () => {
    const userArts = await getUserArts(wallet.publicKey)
    setCurrentUserArts(userArts)
    return userArts
  }

  const getUserArtsInMigration = (arts, userPubKey: PublicKey) => {
    const artsInMigration = arts.filter(
      (frakt) =>
        frakt.metadata.first_owner_pubkey === userPubKey.toString() &&
        frakt.metadata.is_old_version === false &&
        frakt.metadata.is_minted === true &&
        frakt.metadata.minted_token_pubkey ===
        '11111111111111111111111111111111'
    )
    return artsInMigration
  }

  const getArtTokenPubkey = async (
    ownerPubkey: String,
    minted_token_pubkey: String
  ): Promise<PublicKey> => {
    const tokenPubkey = await contract.getTokenAddressFromMintAndUser(
      ownerPubkey,
      minted_token_pubkey
    )
    return tokenPubkey
  }

  const updateCounter = async () => {
    const counter = await contract.getCounter(programPubKey, { connection })
    counter?.count && setCounter(counter.count as number)
    return counter?.count
  }

  const upgradeArts = async (arts) => {
    try {
      void (await contract.migrateArtsToNewTokens(
        arts,
        wallet.publicKey,
        programPubKey,
        async (txn) => {
          let { blockhash } = await connection.getRecentBlockhash()

          txn.recentBlockhash = blockhash
          txn.feePayer = wallet.publicKey
          let signed = await wallet.signTransaction(txn)
          let txid = await connection.sendRawTransaction(signed.serialize())
          return void connection.confirmTransaction(txid)
        },
        { connection }
      ))
      return true
    } catch (error) {
      console.log(error)
    }
  }

  const getTokensMetadata = async () => {
    // const creatorsMetas = await contract.getCreatorsMetadataTokens(
    //   adminPubKey,
    //   { connection }
    // )
    try {
      const r = await fetch(`${CACHE_URL}/meta.json`, { headers: { "Accept-Encoding": "gzip" } })
      const meta = await r.json();
      setMetadata(meta);
    } catch (error) {

    }
    // setMetadata(keyBy(creatorsMetas, 'mintAddress'))
  }

  return (
    <ArtsContext.Provider
      value={
        {
          getUserArtsInMigration,
          artMetaByMintKey,
          getCurrentUserArts,
          getArts,
          getUserArts,
          upgradeArts,
          arts,
          currentUserArts,
          counter,
          buyArt,
          getArtOwner,
          getArtTokenPubkey,
          updateCounter,
        } as IArtsContext
      }
    >
      {children}
    </ArtsContext.Provider>
  )
}

export const useArts = () => {
  const {
    getUserArtsInMigration,
    getArts,
    getCurrentUserArts,
    getUserArts,
    upgradeArts,
    currentUserArts,
    arts,
    artMetaByMintKey,
    buyArt,
    getArtOwner,
    getArtTokenPubkey,
    updateCounter,
    counter,
  } = useContext(ArtsContext) as IArtsContext
  return {
    getUserArtsInMigration,
    getArts,
    getCurrentUserArts,
    upgradeArts,
    getUserArts,
    currentUserArts,
    arts,
    artMetaByMintKey,
    buyArt,
    getArtOwner,
    getArtTokenPubkey,
    updateCounter,
    counter,
  }
}
