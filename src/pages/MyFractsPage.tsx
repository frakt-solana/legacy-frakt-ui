import React from 'react'
import { Redirect } from 'react-router'

import AppLayout from '../components/AppLayout'
import { URLS } from '../constants'
import { useWallet } from '../contexts/wallet'

const MyFractsPage = (props: any) => {
  const { connected } = useWallet()

  if (!connected) {
    return <Redirect to={URLS.ROOT} />
  }

  return <AppLayout headerText="My Fract's">MyFracts Page</AppLayout>
}

export default MyFractsPage
