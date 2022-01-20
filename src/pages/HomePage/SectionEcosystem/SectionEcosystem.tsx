import React, { FC } from 'react';
import styles from './styles.module.scss';
import { ArrowRightIcon } from '../../../icons/ArrowRightIcon';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import {
  imageCollectionsExamples,
  imageExamples,
} from '../ArtExamples/imageExamples';
import { ArrowRightTop } from '../../../icons';
import fraktionArtImage from '../assets/images/fraktion.art.png';
import SwiperCore, { Autoplay } from 'swiper';
import { ECOSYSTEM_SECTION_ID } from '../constants';

SwiperCore.use([Autoplay]);

const sliderBreakpoints = {
  250: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  350: {
    slidesPerView: 2.3,
  },
  400: {
    slidesPerView: 2.7,
  },
  450: {
    slidesPerView: 3.2,
  },
  500: {
    slidesPerView: 3.51,
  },
  600: {
    slidesPerView: 4.2,
  },
  700: {
    slidesPerView: 4.8,
  },
  1023: {
    slidesPerView: 3.51,
  },
};

export const SectionEcosystem: FC<{
  navRef: { current: HTMLParagraphElement };
}> = ({ navRef }) => {
  return (
    <section className={`section ${styles.ecosystem}`}>
      <p
        className="itemForIntersectionMenu"
        id={ECOSYSTEM_SECTION_ID}
        ref={navRef}
      >
        Ecosystem
      </p>
      <div className={`container ${styles.ecoContainer}`}>
        <div className={styles.ecoTitleWrapper}>
          <div className={styles.ecoTitleArrow}>
            <h2 className={styles.ecoTitle}>Our ecosystem</h2>
            <ArrowRightIcon className={styles.ecoArrowIcon} />
          </div>
          <div className={styles.ecoSubtitle}>
            The FRAKT ecosystem is a set of NFT and DeFi ecosystem products,
            currently consisting of:
          </div>
        </div>
        <div className={styles.ecoContentWrapper}>
          <div className={styles.ecoContentBlock}>
            <h5 className={styles.ecoBlockTitle}>Frakts</h5>
            <Swiper
              breakpoints={sliderBreakpoints}
              className={styles.ecoSlider}
              loop={true}
              loopedSlides={20}
              speed={2400}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
            >
              {imageExamples.map((img) => (
                <SwiperSlide key={img} className={styles.ecoSlide}>
                  <div
                    className={styles.ecoSlideImage}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <p className={styles.ecoBlockSubtitle}>
              First generative art NFT collection on Solana that gives exclusive
              access to our community, DAO and ability to generate FRKT via
              staking
            </p>
            <ul className={styles.ecoTable}>
              <li className={styles.ecoTableItem}>
                <span className={styles.ecoTableLabel}>Total Supply: </span>
                <span className={styles.ecoTableValue}>10 000</span>
              </li>
              <li className={styles.ecoTableItem}>
                <span className={styles.ecoTableLabel}>Staked NFTs:</span>
                <span className={styles.ecoTableValue}>7670</span>
              </li>
              <li className={styles.ecoTableItem}>
                <span className={styles.ecoTableLabel}>Holders: </span>
                <span className={styles.ecoTableValue}>2000</span>
              </li>
            </ul>
          </div>
          <div className={styles.ecoContentBlock}>
            <h5 className={styles.ecoBlockTitle}>Sandbox</h5>
            <Swiper
              breakpoints={sliderBreakpoints}
              className={styles.ecoSlider}
              loop={true}
              loopedSlides={16}
              speed={2400}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
            >
              {imageCollectionsExamples.map((img) => (
                <SwiperSlide key={img} className={styles.ecoSlide}>
                  <div
                    className={styles.ecoSlideImage}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <div className={styles.ecoSlideInfo}>
                    <p className={styles.ecoSlideLabel}>Collection:</p>
                    <span className={styles.ecoSlideName}>
                      {img.includes('Moments') && 'Moments'}
                      {img.includes('Nations') && 'Wealth of Nations'}
                      {img.includes('Maze') && 'Broken Maze'}
                      {img.includes('Cingular') && 'Cingular'}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <p className={styles.ecoBlockSubtitle}>
              Platform that focused on bringing the beauty of Generative Art to
              the public, utility and burning mechanism for FRKT
            </p>
            <ul className={styles.ecoTable}>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>
                  Featured authors collections:
                </span>
                <span className={styles.ecoTableValue}>5</span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Minted NFTs:</span>
                <span className={styles.ecoTableValue}>5500</span>
              </li>
            </ul>
          </div>
          <div className={styles.ecoContentBlock}>
            <h5 className={styles.ecoBlockTitle}>$FRKT</h5>
            <p className={styles.ecoBlockSubtitle}>
              Governance and utility token of FRAKT ecosystem. Mint Sandbox
              projects with FRKT or stake FRKT to vote in DAO, reduce fees and
              earn rewards on fraktion.art
            </p>
            <a href="#" target="_blank" className={styles.litepaper}>
              Litepaper
              <ArrowRightTop className={styles.litepaperIcon} />
            </a>
            <ul className={styles.ecoTable}>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Total Supply:</span>
                <span className={styles.ecoTableValue}>50 000 000</span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>
                  Circulating Supply:
                </span>
                <span className={styles.ecoTableValue}>50 000 000</span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Staked:</span>
                <span className={styles.ecoTableValue}>76%</span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Holders:</span>
                <span className={styles.ecoTableValue}>2000</span>
              </li>
            </ul>
          </div>
          <div className={styles.ecoContentBlock}>
            <h5 className={styles.ecoBlockTitle}>Fraktion.art</h5>
            <img
              src={fraktionArtImage}
              alt="Fraktion Art"
              className={styles.fraktionArtImage}
            />
            <p className={styles.ecoBlockSubtitle}>
              A platform for creating liquid markets for illiquid NFTs on Solana
            </p>
            <p className={styles.ecoBlockText}>
              Trade, shop and earn yield on the most liquid decentralized NFT
              marketplace on Solana. Fraktion allows custodial partial ownership
              of NFTs and helps NFT owners free up liquidity from their asset
            </p>
            <ul className={styles.ecoTable}>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>TVL:</span>
                <span className={styles.ecoTableValue}>50 000 $</span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Locked NFTs:</span>
                <span className={styles.ecoTableValue}>35</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
