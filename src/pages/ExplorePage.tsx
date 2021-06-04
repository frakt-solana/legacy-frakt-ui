import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import AppLayout from '../components/AppLayout'
import ArtsList from '../components/ArtsList'
import ArtsSort from '../components/ArtsSort'
import { useWallet } from '../contexts/wallet'
import {
  getAllMintedArts,
  getAllUserMintedArts,
} from '../mocks/mock_functions'
import { shortenAddress } from '../utils/utils'

const getHeaderText = ({ walletKey, userAddress }) => {
  return `${walletKey}` === userAddress
    ? "My Fract's"
    : userAddress
    ? `Collection of ${shortenAddress(userAddress)}`
    : 'Explore'
}

const ExplorePage = (props: any) => {
  const { userAddress } = useParams<{ userAddress: string }>()
  const { wallet } = useWallet()

  const [headerText, setHeaderText] = useState('Explore')
  const [arts, setArts] = useState([])

  useEffect(() => {
    setHeaderText(getHeaderText({ walletKey: wallet?.publicKey, userAddress }))
  }, [userAddress, wallet])

  useEffect(() => {
    ;`${wallet?.publicKey}` === userAddress
      ? setArts(getAllUserMintedArts(wallet?.publicKey))
      : userAddress
      ? setArts(getAllUserMintedArts(new PublicKey(userAddress)))
      : setArts(getAllMintedArts())
  }, [userAddress, wallet])

  return (
    <AppLayout headerText={headerText}>
      <ArtsSort />
      <ArtsList arts={arts} />
    </AppLayout>
  )
}

export default ExplorePage
