import { FC } from 'react';
import styles from './styles.module.scss';
import { ArrowRightIcon } from '../../../icons/ArrowRightIcon';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import {
  imageCollectionsExamples,
  imageExamples,
} from '../ArtExamples/imageExamples';
import { ArrowRightTop } from '../../../icons';
import fraktionArtImage from '../assets/images/fraktion.art.svg';
import SwiperCore, { Autoplay } from 'swiper';
import { ECOSYSTEM_SECTION_ID } from '../constants';
import { useStatistics } from './hooks';

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
  const statistics = useStatistics();

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
              staking.
            </p>
            <ul className={styles.ecoTable}>
              <li className={styles.ecoTableItem}>
                <span className={styles.ecoTableLabel}>Total Supply: </span>
                <span className={styles.ecoTableValue}>
                  {statistics.fraktNFTs.totalSupply}
                </span>
              </li>
              <li className={styles.ecoTableItem}>
                <span className={styles.ecoTableLabel}>Staked NFTs:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.fraktNFTs.stakedNFTs}
                </span>
              </li>
              <li className={styles.ecoTableItem}>
                <span className={styles.ecoTableLabel}>Stakers: </span>
                <span className={styles.ecoTableValue}>
                  {statistics.fraktNFTs.stakersAmout}
                </span>
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
                      {img.includes('Synapses') && 'Synapses'}
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
              the public, utility and burning mechanism for FRKT.
            </p>
            <ul className={styles.ecoTable}>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>
                  Featured authors collections:
                </span>
                <span className={styles.ecoTableValue}>
                  {statistics.sandbox.collectionsAmount}
                </span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Minted NFTs:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.sandbox.totalNFTsAmount}
                </span>
              </li>
            </ul>
          </div>
          <div className={styles.ecoContentBlock}>
            <h5 className={styles.ecoBlockTitle}>$FRKT</h5>
            <p className={styles.ecoBlockSubtitle}>
              Governance and utility token of FRAKT ecosystem. Mint Sandbox
              projects with FRKT or stake FRKT to vote in DAO.
            </p>
            <a
              href="https://medium.com/@frakt_nft/frakt-litepaper-5c87236fb1d1"
              target="_blank"
              rel="noreferrer"
              className={styles.litepaper}
            >
              Litepaper
              <ArrowRightTop className={styles.litepaperIcon} />
            </a>
            <ul className={styles.ecoTable}>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Total Supply:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.frktToken.totalSupply}
                </span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>
                  Circulating Supply:
                </span>
                <span className={styles.ecoTableValue}>
                  {statistics.frktToken.circulatingSupply}
                </span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Staked:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.frktToken.stakedPercentage}
                </span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Holders:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.frktToken.holdersAmount}
                </span>
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
              A platform to make NFTs liquid and accessible.
            </p>
            <p className={styles.ecoBlockText}>
              The FRAKTION Protocol is a set of tools to unlock liquidity from
              NFTs and make use of them in DeFi. Users can fraktionalize, pool
              and farm their illiquid NFTs into liquid tokens to instantly
              unlock liquidity and earn yield from protocol&apos;s volume.
            </p>
            <ul className={styles.ecoTable}>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>TVL:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.fraktion.TVL}
                </span>
              </li>
              <li className={`${styles.ecoTableItem} ${styles.tableItem2}`}>
                <span className={styles.ecoTableLabel}>Locked NFTs:</span>
                <span className={styles.ecoTableValue}>
                  {statistics.fraktion.lockedNFTsAmount}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
