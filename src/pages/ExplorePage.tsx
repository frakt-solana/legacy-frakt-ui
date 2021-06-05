import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import AppLayout from '../components/AppLayout'
import ArtsList from '../components/ArtsList'
import ArtsSort from '../components/ArtsSort'
import { useArts } from '../contexts/artDetails'
import { useWallet } from '../contexts/wallet'
// import {
//   getAllMintedArts,
//   getAllUserMintedArts,
// } from '../mocks/mock_functions'
import { shortenAddress } from '../utils/utils'

const getHeaderText = ({ walletKey, userAddress }) => {
  return `${walletKey}` === userAddress
    ? "My Fract's"
    : userAddress
      ? `Collection of ${shortenAddress(userAddress)}`
      : 'Explore'
}

const sortArts = (sortBy: 'created_at' | 'rarity', arts) => {
  const newArts = [...arts];
  if (sortBy === 'rarity') {
    newArts.sort((a, b) => (-(a.rarity - b.rarity)))
    return newArts
  }

  if (sortBy === 'created_at') {
    newArts.sort((a, b) => (a.metadata.created_at - b.metadata.created_at))
    return newArts;
  }
}

const ExplorePage = (props: any) => {
  const { userAddress } = useParams<{ userAddress: string }>()
  const { wallet } = useWallet()
  const { getUserArts, getArts } = useArts();
  const [headerText, setHeaderText] = useState('Explore')
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSortChange = (sortBy: 'created_at' | 'rarity') => {
    setArts(sortArts(sortBy, arts))
  }

  useEffect(() => {
    setHeaderText(getHeaderText({ walletKey: wallet?.publicKey, userAddress }))
  }, [userAddress, wallet])

  const loadArts = async () => {
    setLoading(true);
    setArts(sortArts('created_at', `${wallet?.publicKey}` === userAddress
      ? await getUserArts(wallet?.publicKey)
      : userAddress
        ? await getUserArts(new PublicKey(userAddress))
        : await getArts()));
    setLoading(false);
  }

  useEffect(() => {
    loadArts();
  }, [userAddress, wallet])

  return (
    <AppLayout headerText={headerText}>
      <ArtsSort onChange={onSortChange} />
      <ArtsList arts={arts} />
    </AppLayout>
  )
}

export default ExplorePage
