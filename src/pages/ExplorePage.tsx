import React from 'react'

import AppLayout from '../components/AppLayout'
import ArtContent from '../components/ArtContent'
import ArtsList from '../components/ArtsList'
import ArtsSort from '../components/ArtsSort'
import { useArtDetails } from '../contexts/artDetails'

const ExplorePage = (props: any) => {
  const { visible } = useArtDetails()

  return (
    <AppLayout headerText={!visible && 'Explore'}>
      {visible ? (
        <ArtContent />
      ) : (
        <>
          <ArtsSort />
          <ArtsList />
        </>
      )}
    </AppLayout>
  )
}

export default ExplorePage
