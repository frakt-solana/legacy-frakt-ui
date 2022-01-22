import { FC, useEffect, useRef, useState } from 'react';

import AppLayout from '../../components/AppLayout';

import styles from './styles.module.scss';
import { CustomHeader } from './CustomHeader';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'swiper/modules/thumbs/thumbs';
import { SectionFaq } from './SectionFaq';
import { SectionTeam } from './SectionTeam';
// import { SectionHowWork } from './SectionHowWork';
import { SectionEcosystem } from './SectionEcosystem';
import { SectionWhatIsFrakt } from './SectionWhatIsFrakt';
import { SectionHeader } from './SectionHeader';
import { SectionFooter } from './SectionFooter';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const HomePage = (): JSX.Element => {
  const [menuLinksData, setMenuLinksData] = useState<
    { sectionRef: { current: HTMLParagraphElement } }[]
  >([]);
  const [activeLink, setActiveLink] = useState<string>('');

  const sectionRef1 = useRef<HTMLParagraphElement>();
  const sectionRef2 = useRef<HTMLParagraphElement>();
  const sectionRef3 = useRef<HTMLParagraphElement>();
  const sectionRef4 = useRef<HTMLParagraphElement>();
  const sectionRef5 = useRef<HTMLParagraphElement>();

  useEffect(() => {
    setMenuLinksData([
      { sectionRef: sectionRef1 },
      { sectionRef: sectionRef2 },
      { sectionRef: sectionRef3 },
      { sectionRef: sectionRef4 },
      { sectionRef: sectionRef5 },
    ]);
  }, [sectionRef1, sectionRef2, sectionRef3, sectionRef4, sectionRef5]);

  const intersectionCallback = (currentItemText: string) => {
    currentItemText !== activeLink && setActiveLink(currentItemText);
  };

  useIntersectionObserver(null, menuLinksData, intersectionCallback);

  const customHeaderWithLinks: FC = () => {
    return (
      <CustomHeader menuLinksData={menuLinksData} activeLink={activeLink} />
    );
  };

  return (
    <AppLayout
      CustomHeader={customHeaderWithLinks}
      className={styles.homeLayout}
    >
      <SectionHeader />

      <SectionWhatIsFrakt navRef={sectionRef1} />

      <SectionEcosystem navRef={sectionRef2} />

      {/* <SectionHowWork /> */}

      <SectionTeam navRef={sectionRef3} />

      <SectionFaq navRef={sectionRef4} />

      {/*<SectionForm navRef={sectionRef5} />*/}

      <SectionFooter />
    </AppLayout>
  );
};

export default HomePage;
