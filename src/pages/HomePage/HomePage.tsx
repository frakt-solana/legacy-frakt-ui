import React from 'react'

import AppLayout from '../../components/AppLayout'

import HeroSection from './sections/HeroSection'
import IntroTextSection from './sections/IntroTextSection'
import ArtExamplesSection from './sections/ArtExamplesSection'
import HowItWorksSection from './sections/HowItWorksSection'
import ScrambleTitleSection from './sections/ScrambleTitleSection'
import BuySection from './sections/BuySection'
import RoadmapSection from './sections/RoadmapSection'
import FooterSection from './sections/FooterSection'

const HomePage = () => {
  return (
    <AppLayout>
      <HeroSection />
      <IntroTextSection />
      <ArtExamplesSection />

      <ScrambleTitleSection texts={['No price increase', 'Forever']} />
      <BuySection />
      <HowItWorksSection />
      <ScrambleTitleSection texts={['Roadmap', 'Roadmap ']} />
      <RoadmapSection />
      <FooterSection />
    </AppLayout>
  )
}

export default HomePage
