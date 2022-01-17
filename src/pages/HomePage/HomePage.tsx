import React from 'react';

import AppLayout from '../../components/AppLayout';

import styles from './styles.module.scss';
import { CustomHeader } from './CustomHeader';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'swiper/modules/thumbs/thumbs';
import { SectionForm } from './SectionForm';
import { SectionFaq } from './SectionFaq';
import { SectionTeam } from './SectionTeam';
import { SectionHowWork } from './SectionHowWork';
import { SectionEcosystem } from './SectionEcosystem';
import { SectionWhatIsFrakt } from './SectionWhatIsFrakt';
import { SectionHeader } from './SectionHeader';

const HomePage = (): JSX.Element => {
  return (
    <AppLayout CustomHeader={CustomHeader} className={styles.homeLayout}>
      <div className={styles.noise} />

      <SectionHeader />

      <SectionWhatIsFrakt />

      <SectionEcosystem />

      <SectionHowWork />

      <SectionTeam />

      <SectionFaq />

      <SectionForm />
    </AppLayout>
  );
};

export default HomePage;
