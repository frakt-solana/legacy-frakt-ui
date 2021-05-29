import React from 'react'

import AppLayout from '../components/AppLayout'
import ArtsList from '../components/ArtsList'
import ArtsSort from '../components/ArtsSort'

const ExplorePage = (props: any) => {
  return (
    <AppLayout headerText='Explore'>
      <ArtsSort />
      <ArtsList />
    </AppLayout>
  )
}

export default ExplorePage
