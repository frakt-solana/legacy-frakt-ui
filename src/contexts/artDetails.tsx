import React, { useEffect, useState, useContext } from 'react'
import { PublicKey } from '@solana/web3.js'
import * as contract from 'frakt-client'
import { useWallet } from './wallet'
import { useConnection } from './connection'

const programPubKey = new PublicKey(
  '6zcw5qXiCjScAxYLhxhuPgAo69PSoDijpnWTDGmDVDbv'
)
const adminPubKey = new PublicKey(
  '6wPYbuGRXZjVw2tCeTxwRiQU7AzFDTeFEKuUFpJZpcix'
)

interface IArtsContext {
  currentUserArts: any
  arts: any
  getArts: any
  getCurrentUserArts: any
  getUserArts: any
  buyArt: any
  getArtOwner: any
  getArtTokenPubkey: any
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
  counter: 0,
  getArts: () => {},
  getCurrentUserArts: () => {},
  getUserArts: () => {},
  buyArt: () => {},
})

export const ArtsProvider = ({ children = null as any }) => {
  const [arts, setArts] = useState([])
  const [currentUserArts, setCurrentUserArts] = useState([])
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
    const arts = proccessArts(
      await contract.getArts(programPubKey, {
        connection,
      })
    )

    setArts(arts)
    return arts
  }

  const getUserArts = async (userPubKey: PublicKey) => {
    const tokens = await contract.getAllUserTokens(userPubKey, { connection })
    const arts = await contract.getArts(programPubKey, { connection })
    setArts(proccessArts(arts))
    const userArts = contract.getArtTokensFromTokens(arts, tokens)
    return proccessArts(userArts)
  }

  const getCurrentUserArts = async () => {
    const userArts = await getUserArts(wallet.publicKey)
    setCurrentUserArts(userArts)
    return userArts
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

  return (
    <ArtsContext.Provider
      value={
        {
          getCurrentUserArts,
          getArts,
          getUserArts,
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
    getArts,
    getCurrentUserArts,
    getUserArts,
    currentUserArts,
    arts,
    buyArt,
    getArtOwner,
    getArtTokenPubkey,
    updateCounter,
    counter,
  } = useContext(ArtsContext) as IArtsContext
  return {
    getArts,
    getCurrentUserArts,
    getUserArts,
    currentUserArts,
    arts,
    buyArt,
    getArtOwner,
    getArtTokenPubkey,
    updateCounter,
    counter,
  }
}
