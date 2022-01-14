import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppLayout from '../../components/AppLayout';

import ArtExamples from './ArtExamples';
import Roadmap from './Roadmap';

import styles from './styles.module.scss';
import { ROADMAP_SECTION_ID } from './constants';
import { URLS } from '../../constants';
import { CustomHeader } from './CustomHeader';
import rainbowWaveImage from './assets/images/rainbowWave.jpg';
import fraktionArtImage from './assets/images/fraktion.art.png';
import howWorkImage from './assets/images/howWork.jpg';
import teamPhotoTim from './assets/images/team/teamPhotoTim.jpg';
import teamPhotoPhil from './assets/images/team/teamPhotoPhil.jpg';
import teamPhotoSid from './assets/images/team/teamPhotoSid.jpg';
import teamPhotoVlad from './assets/images/team/teamPhotoVlad.jpg';
import teamPhotoRoman from './assets/images/team/teamPhotoRoman.jpg';
import teamPhotoVedamire from './assets/images/team/teamPhotoVedamire.jpg';
import teamPhotoViktor from './assets/images/team/teamPhotoViktor.jpg';
import {
  GitHubIcon,
  TwitterIcon,
  ArrowRightIcon,
  ArrowRightTop,
} from '../../icons';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'swiper/modules/thumbs/thumbs';
import SwiperCore, { Autoplay, Navigation, Scrollbar } from 'swiper';
import {
  imageCollectionsExamples,
  imageExamples,
} from './ArtExamples/imageExamples';

SwiperCore.use([Navigation, Scrollbar, Autoplay]);

const sliderBreakpoints = {
  250: {
    slidesPerView: 3.51,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 300,
  },
};

const HomePage = (): JSX.Element => {
  return (
    <AppLayout CustomHeader={CustomHeader} className={styles.homeLayout}>
      <div className={styles.noise} />
      <section className={styles.firstSectionBg}>
        <div className="container">
          <Helmet>
            <title>FRAKT | Generative Art NFT Collection on Solana</title>
          </Helmet>
          <div className={styles.hero}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.mainTitle}>
                A NFT-DeFi ecosystem on Solana
              </h1>
              <div className={styles.subtitleWrapper}>
                <p className={styles.subtitle}>
                  For NFT collectors, investors and creators
                </p>
              </div>
            </div>
            <div className={styles.hero__bg}>
              <SVG_IMAGE />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.whatIsFrakt}>
        <div className={`container ${styles.whatContainer}`}>
          <div className={styles.whatImgWrapper}>
            <img
              src={rainbowWaveImage}
              alt="Rainbow Wave"
              className={styles.rainbowImg}
            />
          </div>
          <div className={styles.whatInfo}>
            <h2 className={styles.whatTitle}>What is FRAKT?</h2>
            <p className={styles.whatSubtitle}>
              First generative art project with a full ecosystem of its own
            </p>
            <p className={styles.whatText}>
              FRAKT is dedicated to pushing the Solana DeFi and NFT ecosystems
              forward, and beyond. We are focused on leading the way in terms of
              innovative community-driven projects aiming at providing
              qualitative tools and products enabling all Solana projects to
              grow and thrive.
            </p>
            <p className={styles.whatText}>Here&apos;s how</p>
          </div>
        </div>
      </section>

      <section className={styles.ecosystem}>
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
                First generative art NFT collection on Solana that gives
                exclusive access to our community, DAO and ability to generate
                FRKT via staking
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
                loopedSlides={20}
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
                Platform that focused on bringing the beauty of Generative Art
                to the public, utility and burning mechanism for FRKT
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
                A platform for creating liquid markets for illiquid NFTs on
                Solana
              </p>
              <p className={styles.ecoBlockText}>
                Trade, shop and earn yield on the most liquid decentralized NFT
                marketplace on Solana. Fraktion allows custodial partial
                ownership of NFTs and helps NFT owners free up liquidity from
                their asset
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

      <section className={styles.howWork}>
        <div className={`container ${styles.howWorkContainer}`}>
          <h2 className={styles.howWorkTitle}>
            How does it all work together?
          </h2>
          <div className={styles.howWorkButton}>
            <NavLink to={'/'} className={styles.howWorkLink}>
              BUY & STAKE FRAKTS
            </NavLink>
            <NavLink to={'/'} className={styles.howWorkLink}>
              BUY & STAKE$FRKT
            </NavLink>
          </div>
          <h4 className={styles.howWorkSubtitle}>FRAKT ECOSYSTEM</h4>
          <img
            src={howWorkImage}
            alt="FRAKT Ecosystem"
            className={styles.howWorkImage}
          />
        </div>
      </section>

      <section className={styles.team}>
        <div className={`container ${styles.teamContainer}`}>
          <h2 className={styles.teamTitle}>Meet the team</h2>
          <ul className={styles.teamList}>
            <li className={styles.teamItem}>
              <img src={teamPhotoTim} alt="Tim" className={styles.teamPhoto} />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Tim</p>
                <div className={styles.teamPosition}>
                  <span>CEO</span>
                  <a href="/" target="_blank">
                    <TwitterIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
            <li className={styles.teamItem}>
              <img
                src={teamPhotoVedamire}
                alt="Vedamire"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Vedamire</p>
                <div className={styles.teamPosition}>
                  <span>CTO</span>
                  <a href="/" target="_blank">
                    <GitHubIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
            <li className={styles.teamItem}>
              <img
                src={teamPhotoVlad}
                alt="Vlad"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Vlad</p>
                <div className={styles.teamPosition}>
                  <span>CDO, UX Lead</span>
                  <a href="/" target="_blank">
                    <GitHubIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
            <li className={styles.teamItem}>
              <img
                src={teamPhotoPhil}
                alt="Phil"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Phil</p>
                <div className={styles.teamPosition}>
                  <span>COO</span>
                  <a href="/" target="_blank">
                    <TwitterIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
            <li className={styles.teamItem}>
              <img
                src={teamPhotoViktor}
                alt="Viktor"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Viktor</p>
                <div className={styles.teamPosition}>
                  <span>Developer</span>
                  <a href="/" target="_blank">
                    <GitHubIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
            <li className={styles.teamItem}>
              <img src={teamPhotoSid} alt="Sid" className={styles.teamPhoto} />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Sid</p>
                <div className={styles.teamPosition}>
                  <span>Art Director</span>
                  <a href="/" target="_blank">
                    <TwitterIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
            <li className={styles.teamItem}>
              <img
                src={teamPhotoRoman}
                alt="Roman"
                className={styles.teamPhoto}
              />
              <div className={styles.teamInfo}>
                <p className={styles.teamName}>Roman</p>
                <div className={styles.teamPosition}>
                  <span>Developer</span>
                  <a href="/" target="_blank">
                    <GitHubIcon width={24} />
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.collection}>
        <h2 className={styles.collection__title}>Collection</h2>
        <ArtExamples />
        <p className={styles.collection__text}>
          Each frakt is one uniquely generated art piece. There are 5 different
          types of shapes and 4 color schemes,{' '}
          <Link to={URLS.RARITY}>each with various rarities</Link>, and a
          limited supply of 10,000 frakts out of infinite possibilities.
        </p>
        <br />
        <p className={styles.collection__text}>
          Every time a frakt is generated, a token hash is used which makes it
          unique. All Frakts are minted on{' '}
          <a
            href="https://solana.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solana network
          </a>{' '}
          and are avaliable only on{' '}
          <Link to={URLS.MARKETPLACE}> marketplaces </Link>
        </p>
      </section>
      <div className={styles.collection} id={ROADMAP_SECTION_ID}>
        <h2 className={styles.collection__title}>Ecosystem</h2>
        <Roadmap />
      </div>
    </AppLayout>
  );
};

const SVG_IMAGE = (): JSX.Element => {
  return (
    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M363.992 347.549l-4.925 5.474-5.188 5.226-5.437 4.966-5.674 4.694-5.899 4.408-6.107 4.114-6.302 3.809-6.48 3.495-6.645 3.174-6.792 2.844-6.923 2.507-7.038 2.164-7.136 1.816-7.216 1.464-7.28 1.109-7.324.75-7.353.39-7.363.028-7.355-.333-7.33-.693-7.288-1.052-7.227-1.408-7.15-1.761-7.053-2.11-6.943-2.452-6.813-2.79-6.668-3.123-6.508-3.445-6.33-3.761-6.137-4.067-5.931-4.363-5.71-4.649-5.474-4.924-5.225-5.187-4.965-5.437-4.693-5.673-4.409-5.896-4.114-6.106-3.81-6.3-3.496-6.48-3.174-6.643-2.844-6.791-2.507-6.923-2.164-7.037-1.817-7.134-1.465-7.216-1.108-7.278-.75-7.324-.392-7.352-.03-7.363.332-7.354.692-7.33 1.052-7.287 1.407-7.227 1.761-7.149 2.11-7.053 2.454-6.942 2.79-6.813 3.121-6.668 3.444-6.508 3.761-6.33 4.066-6.137 4.363-5.93 4.648-5.71 4.923-5.475 5.185-5.227 5.435-4.966 5.673-4.693 5.895-4.411 6.106-4.116 6.3-3.81 6.479-3.497 6.643-3.175 6.79-2.845 6.923-2.508 7.038-2.164 7.135-1.817 7.216-1.464 7.278-1.109 7.325-.75 7.352-.39 7.363-.029 7.355.331 7.33.694 7.287 1.051 7.227 1.408 7.15 1.76 7.053 2.109 6.942 2.454 6.813 2.79 6.668 3.123 6.507 3.446 6.33 3.759 6.138 4.066 5.931 4.363 5.71 4.648 5.476 4.922 5.227 5.185 4.967 5.435 4.695 5.672 4.41 5.897 4.114 6.106 3.81 6.3 3.497 6.48 3.174 6.643 2.845 6.791 2.509 6.923 2.165 7.038 1.817 7.135 1.466 7.215 1.11 7.28.752 7.324.391 7.353.03 7.363-.331 7.356-.691 7.33-1.051 7.288-1.407 7.228-1.76 7.15-2.109 7.056-2.452 6.943-2.79 6.815-3.12 6.67-3.444 6.508-3.76 6.332-4.067 6.14-4.363 5.931-4.649 5.712"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M244.36 401.476l-7.428-.443-7.393-.84-7.346-1.177-7.27-1.583-7.177-1.947-7.06-2.33-6.94-2.652-6.82-2.945-6.672-3.264-6.502-3.59-6.352-3.852-6.12-4.212-5.95-4.453-5.698-4.772-5.532-4.972-5.274-5.252-4.934-5.576-4.649-5.815-4.312-6.069-4.041-6.249-3.707-6.451-3.376-6.629-3.06-6.777-2.676-6.935-2.4-7.032-2.08-7.134-1.668-7.24-1.263-7.318-1.043-7.351-.659-7.398-.305-7.422.087-7.428.507-7.411.91-7.37 1.175-7.33 1.552-7.258 1.942-7.162 2.299-7.054 2.585-6.952 2.898-6.828 3.237-6.676 3.562-6.51 3.846-6.348 4.16-6.15 4.472-5.93 4.774-5.691 4.99-5.508 5.272-5.243 5.6-4.892 5.833-4.61 6.074-4.28 6.235-4.038 6.439-3.702 6.637-3.325 6.773-3.03 6.906-2.704 7.002-2.447 7.133-2.029 7.228-1.652 7.302-1.264 7.348-.937 7.38-.59 7.4-.207 7.396.175 7.378.504 7.348.826 7.31 1.117 7.235 1.538 7.153 1.88 7.052 2.233 6.938 2.566 6.787 2.943 6.576 3.38 6.412 3.668 6.259 3.914 6.026 4.259 5.839 4.505 5.566 4.834 5.398 5.014 5.104 5.313 4.924 5.48 4.632 5.733 4.391 5.923 4.073 6.15 3.759 6.35 3.375 6.564 3.001 6.74 2.731 6.851 2.432 6.965 2.034 7.09 1.685 7.182 1.334 7.253 1.015 7.306.713 7.344.293 7.375.002 7.385-.311 7.384-.696 7.365-1.108 7.318-1.486 7.254-1.844 7.174-2.202 7.074-2.5 6.978-2.826 6.858-3.242 6.674-3.57 6.506-3.948 6.282-4.234 6.09-4.448 5.936-4.732 5.715-5.035 5.453-5.272 5.229-5.526 4.964-5.73 4.734-5.996 4.399-6.243 4.04-6.42 3.756-6.598 3.434-6.733 3.167-6.894 2.807-7.045 2.402-7.141 2.105-7.237 1.754-7.317 1.392-7.383.984-7.426.551-7.44.215-7.44-.118"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M129.002 161.097l4.477-5.855 4.748-5.641 5.002-5.422 5.226-5.216 5.543-4.882 5.727-4.673 6.026-4.284 6.208-4.017 6.429-3.655 6.6-3.334 6.786-2.93 6.901-2.635 7.03-2.262 7.111-1.973 7.192-1.655 7.25-1.39 7.327-.927 7.362-.564 7.38-.205 7.377.26 7.366.452 7.344.769 7.28 1.245 7.227 1.522 7.094 2.059 6.97 2.426 6.858 2.704 6.736 2.991 6.621 3.236 6.423 3.616 6.239 3.924 6.013 4.26 5.85 4.479 5.672 4.71 5.515 4.907 5.227 5.224 4.964 5.484 4.61 5.79 4.307 6.019 4.032 6.21 3.903 6.304 3.512 6.54 3.148 6.73 2.82 6.879 2.487 7.013 2.144 7.133 1.776 7.238 1.375 7.33 1.071 7.385.724 7.435.308 7.468-.001 7.482-.395 7.477-.86 7.44-1.2 7.396-1.523 7.34-1.984 7.23-2.293 7.138-2.786 6.959-3.052 6.84-3.265 6.743-3.661 6.539-3.881 6.414-4.229 6.196-4.485 6.021-4.804 5.777-5.166 5.456-5.352 5.279-5.639 4.976-5.944 4.607-6.12 4.369-6.358 4.011-6.51 3.76-6.643 3.532-6.849 3.12-6.997 2.776-7.133 2.413-7.23 2.114-7.336 1.716-7.431 1.239-7.475.912-7.506.594-7.527.152-7.523-.193-7.512-.451-7.48-.861-7.414-1.302-7.35-1.616-7.28-1.917-7.155-2.346-6.985-2.802-6.87-3.064-6.757-3.302-6.572-3.66-6.339-4.05-6.193-4.268-5.932-4.624-5.626-4.988-5.451-5.171-5.217-5.408-4.855-5.732-4.543-5.977-4.347-6.114-3.972-6.364-3.634-6.557-3.36-6.696-3.042-6.846-2.646-7.006-2.28-7.127-1.842-7.249-1.52-7.313-1.057-7.386-.856-7.4-.571-7.426-.251-7.443.202-7.444.596-7.42.989-7.374 1.372-7.306 1.646-7.244 2.016-7.146 2.43-7.013 2.683-6.913 3.11-6.727 3.43-6.563 3.78-6.359 4.104-6.143 4.39-5.93"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M363.857 350.61l-5.07 5.47-5.424 5.115-5.687 4.811-5.84 4.615-6.022 4.371-6.26 4.022-6.434 3.733-6.704 3.219-6.726 3.155-6.806 3.01-7.04 2.412-7.15 2.072-7.27 1.582-7.305 1.392-7.38.898-7.416.46-7.419.187-7.41-.31-7.375-.672-7.327-.996-7.277-1.265-7.157-1.809-7.139-1.832-7.046-2.17-6.995-2.36-6.904-2.656-6.703-3.139-6.531-3.494-6.291-3.911-6.175-4.098-5.837-4.565-5.733-4.696-5.308-5.17-5.207-5.265-4.959-5.502-4.745-5.697-4.535-5.879-4.405-6.007-3.88-6.362-3.49-6.59-3.248-6.72-3.006-6.844-2.67-6.995-2.306-7.135-2.116-7.216-1.766-7.33-1.075-7.463-.936-7.496-.265-7.55.05-7.557.22-7.563.644-7.549 1.08-7.505 1.274-7.49 1.925-7.351 2.15-7.295 2.618-7.143 3.003-6.99 3.21-6.904 3.422-6.816 3.98-6.51 4.105-6.445 4.702-6.023 4.824-5.927 5.217-5.587 5.41-5.402 5.885-4.881 5.958-4.775 6.297-4.314 6.483-4.01 6.689-3.641 6.854-3.294 6.8-3.405 7.061-2.832 7.177-2.529 7.359-1.93 7.407-1.697 7.452-1.5 7.522-1.13 7.559-.986 7.62-.142 7.608.347 7.551.926 7.505 1.065 7.42 1.499 7.298 1.957 7.259 2.018 7.13 2.414 7.045 2.64 6.877 3.042 6.71 3.388 6.48 3.796 6.162 4.282 6.004 4.463 5.81 4.69 5.593 4.928 5.467 5.06 5.07 5.456 5.008 5.507 4.81 5.694 4.384 6.03 4.03 6.272 3.705 6.467 3.548 6.556 2.872 6.88 2.663 6.95 2.375 7.05 1.934 7.178 1.654 7.242 1.202 7.327 1.044 7.346.546 7.398.298 7.411-.311 7.409-.261 7.409-.74 7.38-.745 7.406-1.353 7.325-1.817 7.228-2.161 7.137-2.617 6.984-2.945 6.852-3.21 6.733-3.404 6.648-3.922 6.36-4.373 6.055-4.582 5.887-4.808 5.701"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M388 190.29l3.004 6.753 2.713 6.892 2.147 7.091 1.682 7.216 1.372 7.28 1.131 7.324.127 7.417.101 7.384-.153 7.374-.103 7.387-.325 7.407-.917 7.365-1.365 7.302-1.951 7.168-1.982 7.168-2.257 7.105-2.856 6.888-3.018 6.833-3.59 6.551-3.582 6.578-3.91 6.409-4.201 6.248-4.186 6.34-4.716 5.967-5.294 5.46-5.713 5.023-5.85 4.865-6.214 4.39-6.32 4.235-6.68 3.639-6.689 3.61-6.813 3.392-6.985 3.048-7.176 2.578-7.2 2.592-7.423 1.856-7.544 1.274-7.596.84-7.609.617-7.62.576-7.635-.35-7.6-.655-7.547-1.046-7.522-1.15-7.568-1.052-7.447-1.72-7.326-2.2-7.253-2.457-7.136-2.804-6.992-3.171-6.746-3.67-6.782-3.652-6.25-4.494-6.084-4.704-5.792-5.05-5.298-5.565-5.295-5.525-4.736-6.011-4.708-6-4.663-6.04-3.65-6.716-3.487-6.757-2.862-7.04-2.788-7.013-2.533-7.086-2.468-7.094-1.92-7.26-1.124-7.428-1.405-7.336-1.135-7.387-.1-7.482-.143-7.444.01-7.441.22-7.448.791-7.41 1.254-7.345 1.878-7.208 2.467-7.02 2.353-7.014 2.964-6.774 2.302-7.048 2.867-6.846 3.052-6.805 3.706-6.473 4.304-6.092 4.605-5.859 4.681-5.797 4.896-5.632 4.786-5.807 5.35-5.288 5.614-5.038 6.117-4.411 6.33-4.094 6.464-3.884 6.795-3.268 6.8-3.237 6.902-3.044 7.177-2.322 7.156-2.405 7.28-2.056 7.477-1.145 7.53-.6 7.51-.528 7.515-.51 7.525.328 7.513.383 7.484.778 7.445 1.106 7.336 1.68 7.33 1.715 7.222 2.141 7.089 2.561 6.768 3.32 6.7 3.404 6.171 4.327 6.144 4.25 5.908 4.539 5.92 4.485 5.62 4.852 5.2 5.296 5.01 5.447 5.009 5.44 4.578 5.81 4.412 5.935 3.782 6.356 3.757 6.354 3.43 6.537 3.05 6.722"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M123.147 330.425l-4.037-6.183-3.798-6.354-3.128-6.71-2.987-6.777-2.551-6.957-2.487-7-2.148-7.128-1.94-7.217-1.347-7.358-.92-7.431-.572-7.477-.473-7.512.305-7.519.737-7.49.757-7.505 1.204-7.459 1.8-7.34 2.052-7.28 2.156-7.274 2.752-7.075 3.218-6.88 3.389-6.806 3.671-6.675 4.255-6.32 4.67-6.015 4.85-5.863 5.327-5.43 5.341-5.399 5.666-5.055 5.823-4.875 5.876-4.842 6.177-4.472 6.56-3.893 6.833-3.379 6.904-3.208 6.937-3.159 7.227-2.42 7.343-2.013 7.396-1.766 7.423-1.67 7.508-1.285 7.58-.764 7.614-.218 7.611.027 7.6.396 7.596.546 7.569.925 7.58 1.048 7.398 1.938 7.383 2.017 7.087 2.894 7.053 2.933 6.86 3.356 6.845 3.396 6.617 3.836 6.577 3.941 6.598 4.004 6.287 4.5 5.81 5.102 5.773 5.177 5.422 5.56 5.106 5.864 4.687 6.21 4.572 6.312 3.593 6.922 3.506 6.934 2.886 7.21 2.54 7.313 2.504 7.298 2.369 7.344 1.742 7.517 1.44 7.575 1.16 7.621.585 7.685.184 7.697-.233 7.685-.416 7.667-.96 7.615-1.6 7.502-1.928 7.398-1.91 7.377-2.55 7.178-2.27 7.267-2.936 7.025-3.489 6.766-3.852 6.55-4.096 6.382-4.329 6.212-4.698 5.928-4.883 5.762-5.12 5.544-5.54 5.119-5.825 4.771-5.891 4.656-6.06 4.424-6.236 4.168-6.508 3.725-6.587 3.575-6.604 3.59-6.917 2.945-7.083 2.522-7.243 2.008-7.349 1.539-7.354 1.444-7.45.8-7.48.21-7.445.34-7.446-.208-7.423-.486-7.4-.722-7.305-1.376-7.204-1.776-7.253-1.542-7.181-1.898-6.972-2.563-6.927-2.693-6.748-3.123-6.478-3.649-6.363-3.832-6.086-4.255-6.038-4.319-5.6-4.874-5.381-5.098-5.224-5.25-4.92-5.533-4.59-5.805-4.303-6.012-3.82-6.325"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M100.072 289.964l-1.572-7.45-1.714-7.423-1.427-7.505-.675-7.61-.431-7.63-.342-7.66.194-7.673.395-7.691.538-7.727.412-7.843 1.378-7.708 1.94-7.6 2.52-7.435 2.58-7.45 3.205-7.21 3.8-6.916 4.142-6.716 4.57-6.428 5.033-6.066 5.284-5.823 5.37-5.724 5.327-5.787 5.845-5.266 6.215-4.822 6.67-4.174 6.567-4.27 6.642-4.172 7.057-3.422 7.187-3.11 7.262-2.914 7.483-2.28 7.613-1.747 7.517-2.072 7.687-1.304 7.732-.948 7.767-.515 7.774-.107 7.753.487 7.71.727 7.612 1.412 7.454 2.058 7.379 2.086 7.157 2.733 7.099 2.707 7.033 2.798 6.713 3.504 6.542 3.745 6.109 4.43 6.255 4.062 5.98 4.443 5.435 5.11 5.355 5.11 5.526 4.89 5.275 5.171 4.877 5.55 4.435 5.903 4.595 5.786 4.412 5.957 3.933 6.291 3.935 6.332 3.17 6.743 2.421 7.047 2.322 7.057 1.935 7.168 2.093 7.135 1.67 7.26 1.41 7.336.944 7.422.542 7.474.07 7.5-.454 7.489-.693 7.473-1.452 7.364-1.573 7.326-2.033 7.208-2.258 7.134-2.393 7.1-3.202 6.773-3.254 6.734-3.464 6.634-3.495 6.653-3.85 6.479-4.352 6.162-4.609 5.992-4.658 6.012-5.095 5.666-5.13 5.726-5.422 5.514-5.834 5.104-6.368 4.409-6.405 4.421-6.762 3.864-6.886 3.698-7.046 3.457-7.298 2.915-7.36 2.89-7.75 1.493-7.803 1.079-7.807.854-7.831.445-7.83.16-7.833.137-7.836-.301-7.769-1.066-7.639-1.759-7.546-2.002-7.49-2.12-7.316-2.634-6.975-3.462-6.961-3.337-6.62-3.968-6.609-3.889-6.144-4.598-6.048-4.644-5.952-4.725-5.843-4.852-5.381-5.358-5.206-5.507-4.884-5.787-4.372-6.177-4.72-5.903-4.316-6.215-4.251-6.295-4.132-6.426-2.999-7.01-2.548-7.175-2.55-7.162-2.389-7.23"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M392.936 311.084l-3.318 6.868-3.266 6.898-4.403 6.253-4.543 6.1-4.262 6.276-4.683 5.973-4.496 6.181-4.713 6.086-5.41 5.455-5.667 5.214-5.958 4.897-6.074 4.805-6.44 4.317-6.854 3.622-7.095 3.109-7.111 3.033-7.406 2.229-7.48 1.868-7.417 2.004-7.64.932-7.512 1.518-7.581 1.265-7.67.49-7.686.158-7.715.244-7.695-.567-7.577-1.486-7.5-1.72-7.405-2.025-7.49-1.736-7.425-2.075-7.584-1.865-7.6-2.115-7.201-3.13-7.093-3.442-7.07-3.613-6.568-4.437-6.765-4.27-5.973-5.28-6.162-5.12-5.479-5.835-5.542-5.812-4.867-6.386-4.502-6.645-4.133-6.878-3.576-7.178-3.29-7.295-3.375-7.254-2.849-7.48-2.66-7.562-1.925-7.782-2.004-7.773-1.05-7.957-.696-7.984-.636-7.987-.34-8.015.782-7.99 1.31-7.903 1.624-7.81 1.316-7.836 2.178-7.643 2.992-7.37 2.52-7.477 3.174-7.223 3.326-7.14 3.242-7.203 4.238-6.66 4.674-6.35 4.809-6.212 5.573-5.561 5.425-5.606 5.324-5.686 5.524-5.511 5.924-5.085 6.156-4.807 6.693-4.034 6.296-4.66 6.648-4.164 6.842-3.89 6.8-4.172 7.643-2.133 7.706-1.75 7.74-1.402 7.89-.385 7.693-1.026 7.77-.126 7.696-.645 7.727-.273 7.658 1.444 7.58 1.279 7.411 2.059 7.379 1.802 7.198 2.396 7.251 2.067 7.12 2.483 7.133 2.486 6.74 3.41 6.586 3.666 6.286 4.147 6.061 4.434 5.779 4.767 5.712 4.8 5.168 5.387 4.613 5.87 5.304 5.15 4.642 5.753 4.753 5.674 3.987 6.235 4.432 5.967 3.54 6.522 3.837 6.399 3.001 6.82 2.85 6.9 2.8 6.957 2.053 7.212 2.322 7.193 1.958 7.338 1.165 7.5.873 7.562 1.146 7.622.309 7.692-.716 7.656-.907 7.638-1.6 7.523-1.957 7.427-1.915 7.44-2.995 7.084-3.38 6.881"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M389.748 193.348l2.332 7.023 2.522 6.955 1.465 7.257 1.575 7.207 1.462 7.243.853 7.34.853 7.36.855 7.413.459 7.48.073 7.526-.625 7.503-.98 7.484-1.075 7.516-1.918 7.34-1.429 7.555-2.13 7.393-3.338 6.91-3.463 6.842-3.575 6.8-3.8 6.704-3.987 6.64-4.255 6.52-4.38 6.527-5.036 6.029-5.356 5.781-5.73 5.436-6.085 5.053-6.497 4.514-6.488 4.569-6.7 4.302-7.249 3.28-7.203 3.37-7.491 2.675-7.603 2.313-7.694 1.965-7.862 1.135-7.763 1.592-7.898.636-7.893.546-7.909-.357-7.868-.55-7.803-1.065-7.721-1.439-7.73-1.286-7.595-1.928-7.373-2.652-7.129-3.222-7.085-3.18-7.3-2.698-7.233-2.972-6.877-3.717-6.657-4.11-6.54-4.321-6.229-4.77-5.478-5.632-5.605-5.446-5.069-5.949-4.92-6.045-4.956-6.023-4.236-6.549-3.968-6.7-3.296-7.056-3.6-6.875-3.329-7.024-2.76-7.27-2.538-7.356-2.138-7.49-1.348-7.67-1.947-7.576-1.197-7.73-1.423-7.768-.454-7.87-.053-7.897.731-7.863.68-7.881.853-7.9 1.551-7.797 1.605-7.827 1.778-7.846 2.552-7.628 3.933-7.03 3.856-7.018 3.892-6.992 4.41-6.678 4.896-6.324 5.097-6.144 4.774-6.443 5.527-5.797 6.22-5.059 6.431-4.738 6.646-4.386 6.72-4.207 6.793-4.048 6.864-3.92 7.449-2.726 7.392-2.692 7.183-3.208 7.493-2.385 7.51-2.389 7.737-1.484 7.644-2.148 7.837-1.177 7.905-.657 7.934-.406 7.947.192 7.888.99 7.877.958 7.868 1.13 7.554 2.54 7.36 2.974 7.431 2.591 7.075 3.467 6.987 3.55 7.056 3.391 6.402 4.536 6.217 4.715 6.155 4.732 5.539 5.459 4.967 5.986 4.716 6.09 4.972 5.741 4.23 6.326 3.784 6.57 3.813 6.453 4.089 6.25 3.4 6.651 2.781 6.93 2.417 7.035"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M102.906 328.002l-3.732-7.273L96 313.196l-3.072-7.577-2.155-7.89-2.075-7.889-1.175-8.077-.586-8.123-.408-8.083.07-8.068-.1-8.027-.006-8.034.64-8.01 1.792-7.853 1.636-7.825 1.284-7.909 2.368-7.648 3.552-7.219 3.36-7.204 4.134-6.8 4.83-6.337 4.472-6.408 4.357-6.426 4.88-6.031 5.423-5.545 5.042-5.806 5.468-5.403 5.353-5.529 5.597-5.309 6.296-4.458 6.774-3.71 6.44-4.148 6.857-3.418 6.568-3.99 7.047-3.035 7.26-2.473 7.187-2.685 7.408-1.998 7.474-1.744 7.604-1.036 7.678-.193 7.656.466 7.576.26 7.518.917 7.373 1.841 7.318 1.494 7.234 1.723 7.216 1.69 7.28 1.528 7.129 2.143 6.934 2.711 6.987 2.64 6.793 3.13 6.174 4.243 6.26 4.037 6.015 4.39 6.073 4.333 5.735 4.78 5.324 5.233 5.408 5.17 5.025 5.554 4.038 6.327 3.597 6.56 3.717 6.418 3.16 6.704 4.132 6.21 3.244 6.69 3.71 6.575 2.913 6.947 1.945 7.266 2.295 7.212 1.446 7.421 1.335 7.469 1.209 7.534.301 7.617.662 7.668.484 7.754-.449 7.739-.574 7.785-1.124 7.744-1.705 7.65-2.172 7.546-1.98 7.682-2.718 7.452-3.605 7.06-4.158 6.745-4.434 6.551-4.59 6.431-4.685 6.376-5.438 5.748-6.048 5.113-5.738 5.366-6.355 4.631-6.481 4.39-6.723 3.97-6.546 4.188-6.71 3.933-7.09 3.2-6.995 3.4-7.384 2.446-7.629 1.576-7.647 1.224-7.531 1.485-7.537 1.453-7.667.458-7.647.321-7.64-.714-7.617.114-7.567-.868-7.599-.592-7.48-1.456-7.53-1.274-7.68-1.002-7.374-2.218-7.312-2.473-7.141-2.954-6.723-3.816-7.242-2.924-7.193-3.214-6.772-4-6.259-4.751-6.471-4.565-6.005-5.166-6-5.252-6.31-5.119-5.87-5.644-5.45-6.085-4.648-6.698-4.342-6.923"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M231.53 410.068l-7.858-.945-7.717-1.76-7.48-2.608-7.468-2.456-7.207-3.138-7.087-3.314-7.043-3.357-6.997-3.46-7.007-3.515-6.751-4.008-6.656-4.22-6.821-4.133-5.831-5.37-5.67-5.537-5.358-5.838-5.083-6.08-4.463-6.548-4.066-6.783-3.767-6.926-3.4-7.093-3.39-7.074-2.506-7.441-2.135-7.526-1.387-7.698-1.5-7.594-.553-7.74-.298-7.69-.001-7.645-.153-7.58-.349-7.573 1.023-7.53 1.149-7.462 2.067-7.283 1.9-7.234 1.8-7.227 2.7-6.952 2.36-7.033 2.722-6.905 3.02-6.786 3.552-6.523 3.64-6.476 4.456-5.95 4.46-5.913 4.603-5.8 4.814-5.635 4.92-5.575 5.253-5.28 5.7-4.799 5.795-4.7 5.858-4.685 6.389-3.917 6.51-3.721 6.658-3.476 6.946-2.86 7.078-2.504 7.055-2.619 7.434-1.241 7.397-1.188 7.422-.873 7.419-.805 7.451-.401 7.468-.476 7.435.93 7.415.723 7.33 1.316 7.322 1.302 7.116 2.176 6.882 2.822 7.073 2.154 7.018 2.398 6.846 2.878 6.69 3.249 6.615 3.449 6.776 3.312 6.526 3.82 5.935 4.66 5.698 4.954 5.387 5.293 4.668 5.949 4.865 5.74 4.874 5.765 4.613 6.003 4.892 5.914 4.039 6.492 3.89 6.628 4.165 6.604 3.465 6.992 3 7.23 3.003 7.321 2.333 7.569 2.31 7.665 1.297 7.875.959 7.95.865 8.016.672 8.103-.049 8.138-.696 8.12-.997 8.117-1.814 7.974-2.669 7.732-2.926 7.617-3.64 7.301-3.076 7.532-4.011 7.077-3.574 7.341-4.067 7.101-4.155 7.12-4.76 6.74-5.373 6.263-5.695 5.982-5.933 5.763-6.632 4.946-6.697 4.815-7.279 3.915-6.919 4.41-7.421 3.51-7.561 3.138-7.841 2.358-7.635 2.759-7.898 1.891-7.999 1.31-8.009.957-7.997.682-8.002.18-7.96.045-7.937-.08-7.9-.703-7.87-.824"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M397.378 187.126l2.52 7.45 1.39 7.784 1.13 7.75 1.053 7.677 1.959 7.48.723 7.69-.762 7.766-.16 7.64-.789 7.593-1.61 7.472-1.084 7.45-.754 7.505-1.807 7.32-2.68 7.058-2.6 7.025-2.32 7.12-3.546 6.61-3.078 6.804-3.571 6.562-3.928 6.356-3.815 6.462-4.88 5.693-5.656 4.975-5.649 4.854-4.858 5.616-4.56 6.097-5.137 5.617-6.047 4.526-6.395 4.02-6.52 3.807-6.67 3.544-7.15 2.49-7.13 2.395-7.192 2.128-7.07 2.537-7.42 1.194-7.43.902-7.368 1.23-7.46.382-7.446 1.089-7.476-.715-7.473-.269-7.247-2.192-7.235-1.621-7.33-1.118-7.108-2.097-7.134-2.016-7.364-1.554-7.483-1.604-7.81-1.327-6.992-3.203-7.128-3.13-6.77-3.834-6.498-4.313-6.076-4.892-5.676-5.353-6.485-4.623-6.397-4.905-6.665-4.916-5.772-5.806-5.336-6.245-4.243-6.987-3.991-7.149-4.57-6.95-3.337-7.563-3.123-7.682-2.915-7.804-3.173-7.835-1.379-8.268-.94-8.323-.93-8.327-.052-8.378.8-8.341.296-8.34.359-8.373 1.801-8.18 2.134-8.075 3.407-7.684 3.223-7.63 3.867-7.314 2.591-7.808 3.292-7.544 3.649-7.399 4.62-6.833 4.913-6.605 5.306-6.278 5.721-5.881 5.862-5.692 4.968-6.628 5.204-6.574 6.347-5.342 6.486-5.212 6.973-4.538 6.95-4.627 7.283-4.1 7.579-3.534 7.543-3.708 7.839-3.053 8.057-2.435 8.28-1.524 8.3-1.255 8.352-.74 8.372-.114 8.338.283 8.277.935 8.27.33 8.253.732 8.342.472 7.93 2.646 7.91 2.46 7.784 2.783 7.863 2.563 7.77 2.894 7.302 3.925 7.52 3.53 6.902 4.613 6.66 4.93 5.892 5.876 5.986 5.637 5.991 5.598 5.052 6.493 4.396 6.952 4.524 6.72 4.771 6.497 2.868 7.697 3.352 7.255 2.502 7.608 3.046 7.26"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M141.437 136.01l5.973-4.9 6.1-4.708 6.614-3.97 6.384-4.232 6.583-3.911 6.817-3.48 6.71-3.73 7.102-2.906 7.334-2.25 7.16-2.818 7.197-3.018 7.5-2.055 7.571-2.06 7.644-2.579 7.87-1.386 7.992-1.559 7.92 1.742 7.82 1.643 7.615 2.427 7.572 2.134 7.705 1.496 7.346 2.777 7.104 3.312 7.002 3.413 6.943 3.467 7.054 3.277 6.5 4.264 6.219 4.645 6.002 4.888 5.458 5.494 5.646 5.21 6.05 4.844 4.222 6.554 4.417 6.267 4.514 6.155 3.852 6.59 3.812 6.582 3.93 6.531 3.529 6.77 4.158 6.578 2.407 7.313 1.787 7.483 1.21 7.586.457 7.668.314 7.6-.034 7.566-1.139 7.535-.991 7.408.917 7.469.429 7.553-.463 7.533-1.235 7.443-.854 7.593-2.112 7.3-2.587 7.148-3.779 6.636-1.863 7.516-3.1 7.01-2.837 7.262-3.314 7.106-5.006 5.957-4.729 6.16-4.454 6.482-5.502 5.557-5.358 5.76-6.112 4.931-6.888 3.85-6.477 4.35-6.663 4.062-7.182 3.087-6.702 4.052-7.292 2.795-7.432 2.364-7.266 2.933-7.57 1.976-7.682 1.485-7.702 1.443-7.8.77-7.8 1.513-7.911.733-8.013.878-7.984-.53-8.157.212-8.218-.238-7.882-2.027-7.834-2.22-7.88-2.194-8.035-2.038-7.714-2.978-7.095-4.231-7.332-3.824-7.693-3.428-6.846-4.773-6.98-4.685-6.9-4.914-6.889-5.086-5.413-6.55-5.843-6.194-5.002-6.882-4.82-7.01-3.308-7.905-3.552-7.669-2.154-8.26-2.545-7.962-3.117-7.724-1.879-8.12-2.25-8.002-2.37-8.025-.934-8.297-1.358-8.256-.34-8.356-.45-8.37.213-8.387.042-8.447 1.268-8.334 2.629-8.046 2.448-8.014 3.397-7.677 3.161-7.682 4.426-7.103 4.016-7.18 5.222-6.456 5.338-6.224 4.783-6.474 6.055-5.458 6.587-4.816 6.458-4.689 6.118-4.84"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M389.804 190.392l3.062 6.819 2.205 7.14 2.664 7.017 2.18 7.198 1.403 7.388.625 7.494 1.464 7.426.59 7.535.696 7.59.649 7.682-.182 7.699-.436 7.738-1.688 7.54-1.716 7.542-2.148 7.442-1.96 7.56-2.346 7.492-2.463 7.54-3.722 6.953-3.52 7.119-3.966 6.91-4.825 6.327-5.187 6.032-5.237 6-5.472 5.812-5.361 6.029-5.995 5.382-6.092 5.36-6.492 4.89-6.893 4.318-7.071 4.056-7.164 3.979-7.544 3.194-7.706 2.8-7.956 1.983-8.06 1.446-8.048 1.367-8.074 1.21-8.131.797-8.168.155-8.165-.111-8.118-.871-8.166-.413-8.087-1.205-8.226-.758-8.153-1.42-8.004-2.128-7.863-2.636-7.992-2.472-7.567-3.52-7.335-3.99-7.027-4.508-7.436-3.955-7.163-4.478-6.744-5.098-6.43-5.511-6.44-5.579-5.792-6.24-5.387-6.6-4.729-7.087-4.486-7.225-3.574-7.73-3.082-7.905-3.316-7.733-3.252-7.758-3.116-7.839-1.61-8.295-1.846-8.191-.772-8.375-.488-8.35-.537-8.307-.138-8.316 1.48-8.257 1.79-8.116 2.262-7.945 2.053-7.869 2.398-7.73 3.069-7.478 2.832-7.473 3.322-7.252 2.803-7.45 3.766-7.01 3.277-7.286 3.581-7.187 4.592-6.566 4.46-6.691 5.527-5.836 5.46-5.867 5.618-5.726 6.233-5.05 6.204-5.069 6.575-4.576 6.877-4.096 7.318-3.269 7.158-3.453 7.11-3.564 7.326-3.112 7.634-2.262 7.74-1.805 7.801-1.407 7.814-1.19 7.89-.452 7.825-.857 7.875.27 7.825.678 7.78.781 7.664 1.542 7.661 1.307 7.487 2.09 7.207 2.945 7.205 2.712 6.907 3.397 7.013 3.033 7.023 3.051 6.542 3.978 6.083 4.657 5.775 4.986 5.324 5.447 5.106 5.558 5.315 5.237 4.86 5.654 4.949 5.546 4.324 6.047 3.84 6.353 4.745 5.75 4.228 6.15 3.458 6.607 3.135 6.768"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M339.031 108.628l7.247 3.944 7.833 3.336 7.543 4 7.721 4.082 6.855 5.23 5.717 6.388 6.142 6.072 4.82 7.14 4.52 7.308 4.675 7.206 3.392 7.91 2.327 8.328 3.551 7.718 3.027 7.945 2.389 8.161 2.371 8.175 1.426 8.392 1.874 8.33 1.613 8.431 1.948 8.517-.257 8.636-1.564 8.537-1.596 8.44-.835 8.51-2.392 8.229-1.923 8.3-3.231 7.906-3.82 7.618-3.962 7.464-4.687 7.033-5.087 6.691-5.017 6.602-4.791 6.672-5.809 5.87-6.996 4.725-6.292 5.089-4.979 6.31-6.119 5.161-6.674 4.437-6.545 4.513-6.721 4.218-6.494 4.607-6.545 4.678-7.171 3.566-7.482 2.858-7.34 3.267-7.45 3.162-7.343 4.094-8.145.87-8.202-.009-8.037.81-8.07.35-8.02-2.423-7.777-2.749-7.67-1.84-7.528-2.148-7.604-1.414-7.42-2.186-7.172-2.901-7.29-2.446-6.263-4.857-6.43-4.103-5.856-4.962-6-4.468-6.137-4.171-6.743-3.408-6.512-3.894-6.507-4.084-6.092-4.686-5.519-5.333-4.286-6.385-4.365-6.26-4.246-6.33-3.869-6.566-4.639-6.188-3.526-6.828-3.66-6.823-3.715-6.901-3.278-7.16-2.51-7.46-.454-7.9-.765-7.77-.719-7.751.447-7.797.496-7.73 1.601-7.62 1.998-7.468 2.131-7.337L101 216.93l3.35-6.847 2.63-6.937 2.305-7.024 1.209-7.547 2.76-6.982 3.32-6.74 4.401-6.109 2.183-7.606 2.67-7.548 3.947-6.777 4.001-6.919 5.872-5.226 5.355-5.78 5.157-6.168 5.768-5.59 6.489-4.683 6.836-4.163 6.935-4.022 7.33-3.246 7.227-3.501 7.369-3.277 7.652-2.55 7.987-1.25 7.901-1.426 7.925-1.267 7.893-2.026 8.063-.914 8.073 1.676 7.96 1.195 7.875 1.401 7.98.513 7.87 1.4 7.798 1.781 7.791 1.913 8.06 1.376 7.636 2.73 7.475 3.178 7.724 2.836 7.255 3.824"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M338.861 117.252l6.094 4.94 6.7 4.154 6.613 4.401 5.672 5.505 4.513 6.57 4.191 6.7 4.72 6.184 4.327 6.461 3.56 6.922 2.008 7.693 3.262 6.901 2.677 7.144 2.543 7.165 1.173 7.577.31 7.685.442 7.503 2.543 7.09 1.739 7.317 1.047 7.449-.323 7.516-.13 7.494.832 7.613.747 7.758.878 7.973.1 8.022-1.175 7.845-2.912 7.343-2.336 7.553-1.828 7.876-2.84 7.524-4.174 6.844-3.915 7.01-4.475 6.673-4.499 6.703-5.439 5.953-5.616 5.773-5.232 6.214-6.05 5.385-6.494 4.84-6.832 4.338-7.094 3.865-7.46 3.112-6.986 3.94-7.742 2.259-7.605 2.39-7.69 2.004-7.958.808-7.96.223-7.505 2.405-7.581 2.934-7.898.801-7.94.727-7.988.266-8.03.027-8.029-.53-7.823-1.892-7.494-3.066-7.075-4.06-7.32-2.844-7.277-2.898-7.14-3.214-7.1-3.318-7.206-3.224-7.078-3.582-6.153-4.984-6.376-4.663-6.019-5.121-5.037-6.136-5.254-5.839-5.304-5.795-6.493-4.966-5.156-6.126-3.719-7.087-2.1-7.901-2.928-7.308-2.45-7.456-2.364-7.424-1.56-7.642-2.29-7.385-.722-7.74-2.016-7.47-2.364-7.526-2.755-7.665-2.958-7.9.044-8.04-.102-8.092-1.076-8.325.675-8.205.623-8.314.877-8.382 2.576-7.94 2.427-8.03 4.386-7.19 4.021-7.289 3.95-7.319 4.28-7.144 5.195-6.515 4.532-7.023 4.99-6.735 5.153-6.687 5.763-6.173 6.33-5.591 6.678-5.173 6.538-5.414 7.535-3.915 7.335-4.186 7.328-4.254 7.325-4.449 7.79-3.525 7.64-4.262 8.226-2.674 8.59-1.131 8.632-.486 8.61.082 8.58 1.378 8.408.59 8.336.85 8.236 1.435 8.032 2.394 7.697 3.476 7.64 2.938 7.271 3.817 6.97 4.213 7.172 3.312 7.068 3.461 7.446 2.735 6.48 4.554 6.37 4.618"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M92.468 179.558l3.592-7.672 3.466-7.775 4.59-7.156 4.682-7.088 5.279-6.654 6.043-5.985 6.335-5.62 6.288-5.57 7.017-4.679 7.517-3.87 7.335-3.868 7.774-2.978 7.87-2.482 7.608-2.636 7.55-2.515 7.369-2.786 7.468-2.475 7.37-2.841 7.815-1.198 7.69-1.625 7.865-.435 7.84-.061 7.775-.934 7.82.105 7.684 2.03 7.562 1.862 7.507 1.672 7.4 1.995 7.203 2.585 6.776 3.695 6.894 3.024 6.86 3.025 6.395 3.951 6.168 4.223 6.457 3.658 5.765 4.701 6.609 3.547 6.053 4.38 5.88 4.654 5.003 5.58 5.525 5.108 4.602 5.93 4.295 6.146 4.693 5.895 4.421 6.142 4.448 6.221 3.888 6.597 4.342 6.517 2.463 7.31 2.42 7.33 2.468 7.36 2.184 7.488 2.11 7.587 1.122 7.773.697 7.839-.28 7.864-.93 7.807-1.647 7.684-1.691 7.61-1.457 7.629-1.354 7.686-2.127 7.508-2.587 7.366-2.1 7.612-2.803 7.387-4 6.798-4.328 6.577-3.96 6.824-5.069 6.044-4.767 6.272-5.677 5.47-5.463 5.652-5.915 5.176-6.29 4.708-6.03 5.054-6.094 5.08-6.521 4.532-6.361 5.018-6.886 4.226-6.891 4.514-7.364 3.623-7.46 3.7-8.037 1.822-8.005 2.04-8.017 2.474-8.246 1.348-8.342.295-8.352.218-8.395.207-8.453-.009-8.558-.004-8.762.236-8.279-2.282-8.067-2.925-8.346-2.152-8.105-2.936-7.896-3.486-7.533-4.212-8.052-3.413-7.33-4.676-7.694-4.283-7.002-5.286-7.01-5.361-6.752-5.74-5.654-6.804-6.129-6.42-5.657-6.858-4.477-7.681-4.302-7.747-3.756-8.014-2.886-8.373-2.176-8.568-3.603-7.996-2.341-8.436-.957-8.746-1.359-8.583-1.339-8.575-1.065-8.625-.722-8.676-1.09-8.74.416-8.755.719-8.742 2.474-8.47 2.36-8.399 3.928-7.915 3.5-7.889 3.573-7.772 3.976-7.539"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M272.796 95.288l7.468 1.793 7.083 3.206 7.36 1.82 6.882 3.27 6.74 3.416 6.892 2.963 6.914 2.975 6.392 3.967 6.362 3.99 5.69 4.934 5.514 5.057 5.14 5.41 5.3 5.172 5.123 5.343 4.667 5.744 4.627 5.768 4.675 5.768 4.797 5.772 4.458 6.081 3.965 6.43 4.016 6.496 4.293 6.524 3.765 6.873 3.3 7.152 1.609 7.635 2.251 7.548 1.987 7.683.93 7.857 1.97 7.907.416 8.026.264 8.09-1.145 7.986.047 8.225-.97 8.138-2.405 7.81-2.086 7.918-2.121 7.978-1.437 8.42-3.125 7.772-2.84 8.048-4.364 7.23-4.62 7.088-4.401 7.33-5.529 6.474-5.394 6.643-5.11 7.083-5.68 6.67-5.674 6.93-7.291 4.901-7.212 5.035-7.65 4.342-8.356 2.905-7.708 4.219-8.304 2.83-7.93 4.013-8.264 3.3-8.75 1.46-8.603 2.263-8.844.789-8.85.475-8.855.741-8.909.384-8.869-.846-8.911-.568-8.825-1.38-8.686-2.081-8.43-2.956-7.947-4.198-7.813-4.19-7.186-5.318-7.248-4.835-6.96-5.153-7.61-4.029-6.845-5.205-6.362-5.778-6.135-5.966-6.68-5.376-6.251-5.886-6.145-6.059-6.076-6.22-3.731-7.928-2.911-8.27-3.258-7.888-3.048-7.895-1.73-8.376-2.348-7.986-1.866-8.082-.663-8.328 1.393-8.599.928-8.227.595-7.984 1.645-7.9.909-7.7 2.06-7.555.868-7.503 2.123-7.305.498-7.523 1.978-7.253 1.518-7.374 2.05-7.255.935-7.77 2.026-7.484 2.586-7.337 3.741-6.778 4.413-6.364 5.342-5.658 4.845-5.946 4.336-6.412 5.028-5.87 5.337-5.615 5.418-5.606 6.419-4.404 6.418-4.354 6.029-5.012 6.975-3.491 7.354-2.645 6.966-3.382 7.357-2.426 7.415-2.165 7.634-1.26 7.56-1.307 7.63-.71 7.508-1.525 7.611-.956 7.668-.498 7.728-.732 7.687.804 7.533 1.808"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M229.981 80.29l8.33-1.102 8.433 1.624 8.348-1.358 8.286 1.41 8.306.682 8.526-.332 8.223 1.785 7.973 2.705 7.158 4.997 6.518 5.968 6.82 4.538 5.56 6.717 6.015 5.242 4.993 6.555 5.054 5.99 5.468 5.157 5.001 5.594 6.307 4.106 5.358 5.19 3.943 6.441 6.426 4.379 5.767 5.125 4.446 6.162 2.603 7.248 4.366 6.235 2.57 7.14 4.526 6.345 3.448 6.899 3.089 7.113 2.693 7.313 2.87 7.389 4.176 7.393-.404 8.03-1.087 7.95-.733 7.838 1.267 7.947-.592 7.895-1.422 7.789-3.836 7.23-2.544 7.379-2.855 7.229-3.418 6.966-4.45 6.432-3.806 6.605-5.05 5.848-3.856 6.44-3.488 6.731-4.805 5.824-2.648 7.683-4.808 6.02-6.235 4.609-5.254 5.618-6.83 3.715-5.862 4.893-5.353 5.83-5.56 5.88-6.465 4.595-7.32 2.941-7.01 3.69-6.671 5.04-7.118 4.422-7.96 1.675-7.79 2.648-8.013 1.866-8.25-.286-8.155.356-8.153-.358-8.019-1.911-7.986-1.187-8.086-.54-7.51-3.437-7.49-2.904-7.303-3.225-7.9-1.509-7.21-3.393-6.91-3.954-7.24-3.3-7.005-3.804-7.99-2.519-8.739-1.978-6.43-5.202-5.375-6.343-7.203-4.507-7.107-4.865-4.854-6.885-3.076-8.078-3.733-7.425-2.1-8.252-2.368-7.878-3.375-7.29-2.912-7.483-.49-8.277-.214-8.139-.565-7.868.031-7.857.616-7.794-2.309-7.443-.943-7.647-4.613-7.833-2.232-8.123-.075-8.128 2.652-7.751-1.03-8.473.778-8.259.314-8.57 2.346-8.029 3.28-7.69 5.407-6.623 3.445-7.544 3.358-7.688 2.889-8.182 2.092-9.11 5.502-6.657 5.728-6.47 5.62-6.637 4.349-8.275 5.456-7.397 7.304-5.177 7.774-4.44 6.897-5.934 9.181-1.735 8.234-3.283 8.968-1.27 9.058-.359 8.61-1.093 8.132-2.721 8.915 1.397 8.39-.673"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M429.891 278.854l-2.374 8.635-2.148 8.64-2.612 8.506-2.149 8.686-4.443 7.81-4.064 7.887-4.942 7.38-6.35 6.425-5.863 6.516-6.221 6.101-5.304 6.711-6.518 5.619-7.207 4.78-7.141 4.613-8.182 3.115-7.786 3.212-7.67 3.038-7.246 3.445-6.928 3.913-7.64 2.426-7.523 2.46-7.651 1.932-7.402 2.559-7.55 2.096-7.883.476-7.963-.824-7.736-.353-7.628-.168-7.574-1.105-7.524-.266-7.497-.69-7.32-1.88-7.51-.64-7.367-1.548-7.306-1.86-6.98-2.863-7.408-1.797-6.824-3.279-6.133-4.545-6.34-4.016-6.204-4.197-5.48-5.156-6.443-3.892-5.803-4.75-5.236-5.366-4.877-5.684-3.87-6.477-4.485-5.906-4.59-5.858-3.78-6.405-4.405-6.084-3.512-6.613-2.796-6.946-2.317-7.112-2.334-7.094-1.435-7.335-3.134-6.988-1.993-7.32-1.22-7.486-.427-7.57-2.576-7.61-1.505-7.807-.388-7.879-.811-8.07 1.825-7.724 1.5-7.789 2.47-7.536 1.688-7.819 3.047-7.358 4.003-6.902 5.29-6.13 5.049-6.086 3.552-6.979 4.173-6.632 4.45-6.488 4.968-6.11 5.537-5.6 5.987-5.111 5.773-5.357 6.216-4.84 6.774-4.034 6.828-3.879 7.73-2.124 7.566-2.085 7.534-1.833 7.703-1.01 7.283-1.912 7.618-.418 7.319-1.299 7.403-.627 7.303-1.358 7.38-1.227 7.46-.3 7.54-.962 7.425 1.343 7.4 1.175 7.716-.31 8.026-.759 7.592 1.516 7.93.843 8.048 1.06 7.792 2.076 7.418 3.071 7.941 2.386 7.899 2.82 7.651 3.49 7.574 3.865 7.876 3.815 7.677 4.362 6.646 5.595 5.645 6.555 6.04 6.308 5.031 7.104 3.64 7.955 4.519 7.402 3.787 7.802 4.052 7.717 3.126 8.128 2.952 8.21 3.175 8.212 3.497 8.27 2.697 8.57 1.695 8.806.744 8.932-.48 8.958-1.252 8.875-.704 8.864-.216 8.97"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M214.92 415.487l-8.016-2.154-7.706-3.12-7.96-2.254-7.648-3.15-7.968-2.52-7.22-4.13-7.77-3.21-7.723-3.513-5.921-6.12-6.224-5.564-6.314-5.43-6.054-5.73-6.21-5.635-6.835-5.25-6.169-5.981-4.745-7.082-4.012-7.523-3.625-7.687-3.326-7.79-4.264-7.392-3.568-7.758-3.194-7.953-3.199-8.038-2.08-8.372-1.609-8.487-1.788-8.515-2.268-8.602-1.41-8.783-.762-8.892-.51-8.993-1.834-9.356-.023-9.303 2.356-8.873 2.881-8.705 3.813-8.347 4.906-7.807 4.662-7.77 5.289-7.336 5.069-7.347 5.02-7.326 5.818-6.719 7.062-5.6 6.977-5.438 7.752-4.445 6.173-5.902 6.633-5.38 6.945-4.958 7.698-3.79 7.834-3.359 7.846-3.112 7.751-3.122 7.32-4.097 7.413-4.155 7.91-2.975 8.407-1.16 8.24-1.628 8.306-1.195 8.234-2.119 8.4-1.366 8.48.498 8.43.705 8.345 1.3 8.162 2.207 8.135 1.915 7.69 3.53 7.111 4.888 7.238 3.84 6.587 5.089 6.711 4.369 6.637 4.304 6.057 5.14 6.525 4.25 6.342 4.52 5.479 5.584 6.458 4.422 5.999 5.03 4.562 6.4 4.744 6.154 4.1 6.6 3.797 6.736 2.453 7.462 2.672 7.168 3.885 6.513 2.242 7.256 1.954 7.291.35 7.704 2.454 7.021.882 7.39 2.549 7.117 1.918 7.325 1.28 7.475 2.052 7.584.164 7.677-.164 7.705-.977 7.641-1.983 7.454-1.825 7.455-.906 7.761-1.693 7.623-2.117 7.556-2.882 7.295-2.74 7.441-2.169 7.932-2.712 7.834-3.815 7.265-3.703 7.534-5.302 6.32-5.386 6.291-5.912 5.807-6.318 5.369-5.36 6.733-6.562 5.305-7.198 4.382-7.95 2.965-7.142 4.492-7.559 3.74-8.19 2.103-8.177 1.916-8.27 1.332-8.396.336-8.013 2.277-8.28.515-8.24 1.083-8.319 1.23-8.367-.116-8.284-1.216-8.113-2.093-8.18-1.413"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M85.323 189.571l1.36-8.771 2.216-8.595 4.356-7.624 4.06-7.784 3.048-8.54 3.722-8.315 5.3-7.257 5.057-7.559 6.738-6.046 6.883-5.822 7.111-5.503 8.06-4.172 7.703-4.468 8.372-3.236 7.657-4.293 8.206-3.164 7.965-3.61 8.689-1.638 8.541-1.685 8.264-2.496 8.59-1.045 8.662-.108 8.592.296 8.46-.334 8.458-.133 8.51-.697 8.406 1.372 8.371 1.294 8.2 2.13 8.174 2.063 8.335 1.564 7.934 2.94 7.359 4.292 6.473 5.882 7.091 4.237 6.177 5.674 6.988 4.198 7.278 3.888 6.265 5.298 6 5.578 5.777 5.792 5.057 6.441 3.94 7.279 4.08 6.993 1.611 8.517 2.529 7.6 1.784 7.803 1.094 7.902 3.814 6.554 3.306 6.844 2.472 7.178 2.926 7.103 1.905 7.415.061 7.72-2.037 7.812-.666 7.486 1.8 7.411.376 7.513 2.543 7.822 1.144 7.938 1.168 8.178-.136 8.125-2.391 7.617-1.44 7.965-2.502 7.663-3.95 7.038-4.328 6.778-5.186 6.19-2.545 7.842-3.473 7.425-5.454 5.99-4.464 6.856-4.718 6.787-5.736 5.872-6.225 5.354-5.602 6.252-7.065 4.335-6.396 5.423-7.728 3.185-8.276 1.822-6.712 5.21-7.675 3.137-7.307 4.535-7.783 3.524-8.21 2.115-8.361 1.424-8.375 1.543-8.53-.34-8.477 1.695-8.661 1.865-8.989 2.756-9.207 1.808-9.002-.735-9.155-.576-9.417-.307-9.215-1.578-8.694-3.23-8.518-3.69-8.026-4.671-7.644-5.25-7.464-5.425-6.582-6.548-6.09-6.943-6.977-5.774-7.516-5.31-7.244-5.767-6.57-6.508-6.245-6.87-6.237-6.993-5.423-7.629-3.96-8.484-2.886-8.935-2.514-8.965-1.987-9.042-.5-9.367-1.215-8.975-1.7-8.79-3.086-8.599-.362-9.028-.316-8.985.455-8.974 1.907-8.854-.39-8.96.7-8.923 2.884-8.54 3.85-8.177 3.879-7.997 4.847-7.504"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M321.331 113.325l6.27 4.263 6.113 4.412 6.54 3.766 5.852 4.746 5.124 5.56 5.41 5.165 4.866 5.68 4.4 6.034 4.655 5.78 3.965 6.276 4.497 5.92 5.09 5.68 4.108 6.344 4.328 6.35 2.598 7.145 3.385 6.893 3.98 6.857 2.987 7.277 3.023 7.413 3.058 7.59 1.885 7.877 1.686 8.019 1.023 8.15.539 8.24.344 8.338-.449 8.336-1.708 8.146-2.476 7.946-1.299 8.338-2.782 7.9-1.565 8.502-2.035 8.493-3.988 7.59-3.973 7.646-5.33 6.765-6.001 6.183-5.868 6.196-5.624 6.398-5.28 6.836-6.204 5.953-7.326 4.566-7.395 4.33-7.46 4.11-7.028 4.818-7.67 3.688-8.228 2.372-7.963 2.791-7.712 3.548-7.908 3.216-8.18 2.443-8.465 1.102-8.364 1.815-8.438 2.05-8.584 2.732-8.78 1.12-8.912.966-8.967.116-8.978-.536-8.838-1.597-8.694-2.268-8.82-1.982-8.69-2.577-9.08-1.927-9.13-2.268-7.574-5.352-7.783-4.891-7-5.997-7.045-5.826-5.865-7.136-6.162-6.63-6.36-6.391-5.144-7.453-5.049-7.42-4.37-7.83-3.618-8.199-2.976-8.415-3.499-8.006-2.974-8.193-1.402-8.723-1-8.674-1.504-8.376-.593-8.5.027-8.483.693-8.421-.01-8.223.499-8.182.747-8.115.88-8.061 2.28-7.851 2.08-7.77 3.087-7.468 3.128-7.328 1.36-7.842 2.695-7.44 3.317-7.184 4.076-6.787 4.077-6.734 4.144-6.675 3.798-6.95 5.033-6.083 5.165-5.952 5.241-5.89 5.416-5.757 5.754-5.436 6.488-4.544 6.42-4.594 6.754-4.081 6.99-3.638 7.037-3.506 6.988-3.643 7.796-1.622 7.423-2.429 7.617-1.72 7.411-2.582 7.86-.384 7.743-.677 7.817.834 7.692 1.033 7.54 2.106 7.434 1.303 7.485.479 7.24 2.063 7.248 1.742 7.5.88 7.059 2.531 7.156 2.268 7.362 1.956 6.837 3.238"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M326.938 98.599l6.54 5.349 6.597 5.008 5.49 6.45 5.821 5.701 6.418 4.883 4.932 6.506 3.73 7.468 4.333 6.64 4.203 6.613 4.861 6.066 4.251 6.509 4.352 6.468.354 8.53 1.6 7.61 1.077 7.641 1.872 7.205 3.154 6.81 3.77 6.8 1.865 7.343-.18 7.648 1.157 7.447 1.42 7.505-1.23 7.553-.23 7.531-.802 7.494.246 7.694-.998 7.57-3.266 7.005-1.294 7.536.038 8.178-.808 8.123-1.723 7.942-3.332 7.255-3.914 6.967-3.6 7.243-3.866 7.191-3.899 7.346-5.409 6.152-5.61 5.99-7.006 4.435-5.335 6.403-6.708 4.746-6.254 5.477-6.428 5.43-7.136 4.361-6.713 5.499-7.958 2.88-7.508 4.214-8.32 1.861-8.127 2.557-8.278 2.103-8.392 1.718-8.69-1.53-8.464-.744-8.344-1.785-8.285-.575-8.486.941-8.332-1.046-8.669.237-8.352-1.674-8.423-1.662-8.553-1.626-8.191-2.816-7.198-4.94-8.463-2.499-7.738-4.006-7.91-3.898-7.03-5.236-7.81-4.376-7.352-5.11-7.205-5.44-7.794-5.128-6.02-6.823-4.162-8.191-5.446-7.237-3.964-8.154-4.75-7.705-3.634-8.28-2.14-8.851-1.855-8.824-2.017-8.682-1.96-8.66-3.361-8.427-1.192-8.875.519-9.007-.456-8.874-.007-8.889 1.448-8.801 1.87-8.672.976-8.755 1.63-8.662 3.963-8.042 3.588-7.998 4.662-7.488 4.486-7.392 3.532-7.759 3.303-7.93 3.286-8.067 3.998-7.75 3.423-8.356 4.366-7.857 4.68-7.81 4.905-7.861 6.416-6.45 5.964-7.15 7.332-5.536 6.63-6.715 7.902-4.884 8.415-3.941 8.856-2.88 8.568-3.379 8.694-3.028 8.89-2.376 9.359-.234 8.694-3.1 9.04-1.541 9.243.748 9.083-.447 9.036 2.097 8.924 1.206 8.875 1.195 8.466 3.46 8.628 1.904 8.57 2.137 7.641 4.99 7.217 5.455 7.245 4.803 6.173 6.604"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M94.804 198.764l3.92-7.084 3.185-7.29 1.657-8.063 5.387-6.193 5.538-5.907 3.184-7.382 7.724-4.046 5.305-5.664 5.41-5.52 5.868-5.026 3.507-7.698 4.968-6.393 6.879-4.017 8.34-1.585 6.507-4.2 7.26-2.8 6.527-4.269 7.908-1.033 7.246-2.447 7.295-2.287 7.278-2.48 6.908-5.078 7.894-.157 7.61-2.925 7.919.24 7.932-2.07 8.146-1.947 8.566-3.319 8.51-.497 8.248 1.537 7.485 4.413 7.723 2.981 7.592 3.211 7.139 4.17 6.452 5.333 6.642 4.626 6.612 4.537 5.393 6.216 5.125 6.246 6.359 4.547 4.147 6.972 2.65 8.1 3.444 6.942 5.052 5.445 5.624 5.118 3.62 6.58 6.504 4.892 4.94 6.036 7.666 5.01 4.78 6.648 6.444 6.31 6.456 6.73 5.783 7.325 3.724 8.085 3.556 8.331 4.033 8.544.064 8.974 3.252 9.036 1.637 9.26-1.105 9.15-.697 9.223-1.018 9.24-4.009 8.518-4.49 8.194-.798 9.44-3.49 8.532-5.776 7.41-4.74 7.791-4.326 8.02-1.657 9.974-3.102 9.394-2.73 10.147-7.137 6.568-8.178 5.386-6.945 6.553-8.782 4.267-7.242 6.105-9.448 2.772-10.237.841-10.039.294-8.267 3.258-9.565-.207-7.726 4.22-8.042 3.658-8.697 1.364-8.952-.433-8.64.518-8.493 1.798-8.55 4.064-8.829-.052-8.75-1.328-8.42-3.473-7.907-5.032-8.063-2.726-7.527-4.333-7.629-3.344-7.037-4.667-6.747-4.88-7.176-3.648-5.886-5.921-5.072-6.792-3.22-8.908-6.652-3.643-4.305-6.547-6.078-4.379-6.14-4.457-3.867-6.598-6.412-4.437-4.755-5.885-6.307-4.959-4.257-6.422-.884-8.18-4.866-6.104-3.645-6.782-5.674-6.211-2.497-7.441-1.928-7.611-1.883-7.64 3.085-8.308-.319-7.655 1.781-7.682 1.41-7.498-.774-7.538.98-7.453-4.045-8.318-.912-8.158-.89-8.425 2.451-7.642"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M316.6 105.789l7.311 2.84 6.279 4.766 7.804 2.271 6.948 3.844 6.727 4.272 5.48 5.804 4.606 6.597 4.107 6.86 6.814 4.389 5.163 5.932 4.402 6.517 5.027 6.13 6.3 5.555 4.252 6.86 6 6.206 5.215 6.82 1.899 8.118 2.62 7.87.077 8.454-.939 8.451 2.086 7.904.006 8.145 1.333 8.088 2.505 8.258-3.238 8.024-1.979 7.95-2.584 7.75-3.48 7.423-2.705 7.482-3.962 6.995-4.02 6.818-4.216 6.6-2.798 7.224-4.465 6.344-4.748 6.085-6.56 4.688-5.178 5.48-5.82 4.831-4.834 5.644-5.702 4.776-4.61 6.027-5.185 5.538-6.042 4.505-5.49 5.466-5.584 5.664-6.767 3.736-6.385 4.74-6.117 5.997-7.543 2.6-7.15 4.198-8.119.639-7.754 2.295-7.817 2.696-7.937 3.734-8.277 1.537-8.394.86-8.668 2.605-9.174 3.856-8.902-.267-9.292.77-9.234-.444-9.572-.125-10.494 1.368-10.283-.305-7.877-5.76-7.243-6.56-7.926-5.16-7.764-5.388-6.068-7.526-6.365-6.888-6.815-6.302-7.006-6.163-4.877-8.067-4.982-7.811-5.091-7.65-6.328-6.88-4.102-8.3-2.252-9.154-1.494-9.267 1.02-9.956-3.457-8.102-4.384-7.95-1.91-8.689-.848-8.867-1.99-8.69-3.015-8.733-3.058-8.978-1.523-9.21-.348-9.29-.734-9.46 2.355-9.079 2.737-8.923 1.103-9.344 2.977-8.856 3.48-8.663 3.262-8.765 4.088-8.412 2.96-9.106 5.09-7.953 5.71-7.512 6.794-6.616 8.66-4.804 6.651-6.327 7.195-5.693 7.582-5.122 7.61-4.933 6.886-5.883 7.287-5.412 8.644-3.093 8.064-3.97 7.735-4.76 8.352-3.47 8.585-2.844 8.788-2.124 9.35.653 8.834-1.025 9.057 1.386 8.798.9 8.643-.903 8.644 1.089 8.265 4.52 8.02 3.599 7.92 2.824 7.197 5.287 7.508 3.02 7.468 2.9 6.9 4.234 6.296 5.226"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M96.766 375.027l-5.034-8.345-4.197-8.794-2.12-9.876-2.203-9.471-2.513-9.057-2.541-8.877-2.58-8.758-3.684-8.374-1.382-9.058.305-9.306-.466-8.985.718-9.017-1.301-8.77.06-8.852.692-8.817 2.556-8.604 3.133-8.351 2.18-8.359 2.186-8.308 3.412-7.924 2.31-8.224 2.998-8.003 3.586-7.757 3.141-8.007 4.252-7.456 5.18-6.857 6.251-5.998 5.929-6.084 5.45-6.427 5.423-6.498 5.923-6.057 6.56-5.358 7.65-3.884 7.351-4.08 7.145-4.297 8.12-2.47 8.115-2.107 8.298-1.261 7.815-2.039 7.546-2.701 7.988-1.085 7.934-.918 7.83-1.216 7.865-.907 7.902-.464 7.914-1.55 8.08-1.77 8.183-.655 8.045 1.226 7.923 1.828 7.823 2.133 7.48 3.203 8.095 1.246 8.156 1.501 7.753 2.75 7.38 3.618 6.834 4.585 6.452 5.082 5.96 5.639 5.465 6.093 4.216 7.285 4.86 6.291 5.105 5.942 4.414 6.48 3.55 7.037 3.286 7.055 3.014 7.084 2.982 6.987 2.662 7.067 3.9 6.495 3.425 6.783 2.086 7.283 2.292 7.222.273 7.667 2.873 7.17 1.649 7.464-.425 7.652-2.201 7.571-1.356 7.4-.472 7.395-.949 7.35.3 7.618-1.856 7.253-2.24 7.135-3.037 6.841-2.253 7.112-2.019 7.295-3.7 6.537-3.406 6.696-3.846 6.465-4.211 6.243-5.068 5.582-3.498 6.964-4.39 6.36-5.155 5.722-4.923 6.127-5.208 6.012-5.579 5.764-5.668 5.943-6.765 4.338-6.13 5.844-6.675 5.21-6.885 5.287-6.829 6.39-8.102 2.945-8.214 2.834-8.386 2.478-8.56 1.938-8.644 2.497-8.845 1.06-8.943.903-9.147 1.579-9.281.831-9.146-.936-9.296-.697-8.833-2.75-9.617-.567-9.682-1.105-9.124-2.894-9.23-2.97-7.805-5.667-8.274-4.825-8.09-5.17-8.874-4.33-6.904-6.826-7.606-6.073-6.388-7.318-6.478-7.226"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M165.361 125.031l5.266-5.595 6.02-4.626 6.383-4.141 6.57-3.941 6.865-3.445 7.552-1.519 7.02-3.28 7.376-2.242 7.43-2.352 7.408-3.675 7.794-1.82 7.936-1.054 8.077-2.07 8.285-1.733 8.418-.94 8.81-1.884 8.859-.62 8.65 1.015 8.391 2.19 8.747 1.503 8.156 3.214 8.382 2.897 7.984 3.83 8.474 3.222 7.882 4.359 7.014 5.608 6.391 6.312 5.675 6.976 6.548 6.045 5.883 6.691 6.622 6.166 6.439 6.48 2.694 8.95 3.415 8.296 3.333 8.233 3.759 7.993 3.33 8.187 2.481 8.483 1.443 8.736 1.665 8.612 4.004 8.24 2.526 8.662 1.794 8.86.682 8.994-.358 9.012.19 9.065-1.031 8.992-1.883 8.853-.047 9.283-1.912 8.95-3.263 8.55-3.461 8.444-5.105 7.676-4.219 7.988-3.96 8.14-4.67 7.758-3.566 8.61-5.339 7.455-6.205 6.75-6.05 6.887-6.101 6.907-6.147 7-6.025 7.401-6.459 7.163-7.167 6.433-7.318 6.52-8.536 4.494-8.149 5.501-8.862 4.09-8.892 4.262-9.446 2.674-9.61 1.99-9.62 1.943-9.558 2.94-9.844 1.213-9.92-.671-9.905.618-9.853-1.051-9.66-2.313-9.79-1.152-9.664-1.967-9.34-3.186-9.547-2.485-9.522-2.754-8.447-5.307-8.784-4.403-7.848-6.025-8.028-5.54-6.78-7.208-6.957-6.71-6.842-6.714-6.573-6.926-6.551-6.905-6.292-7.14-6.283-7.18-5.158-8.027-3.461-9.031-2.557-9.33-3.511-8.63-2.662-8.926-2.037-9.05-2.455-8.797-2.974-8.637-.93-9.13-3.366-8.662-1.334-9.072-1.786-9.084-.316-9.22.8-9.196 2.475-9.002 2.14-8.888 1.069-9.007 5.002-8.113 6.326-7.42 5.149-7.422 4.777-7.319 5.253-6.916 5.888-6.378 6.136-5.976 6.079-5.75 5.662-5.824 5.527-5.789 7.092-4.303 7.091-3.971 6.775-3.99 6.804-3.7 6.984-3.216 6.284-3.966"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M222.48 398.437l-7.76.626-7.863.134-9.106 3.06-8.351-.384-8.346-1.043-8.196-1.868-8.717-1.386-8.651-2.06-8.801-2.353-7.525-4.46-8.128-3.957-8.617-3.794-8.02-4.792-7.9-5.227-4.208-8.37-6.011-6.926-6.25-6.897-7.394-6.457-6.64-7.192-8.265-6.793-2.58-9.427-2.663-9.31-4.768-8.724-2.269-9.495-2.19-9.532.07-9.847-3.065-9.539-.111-9.818 3.55-9.686 4.648-9.276 2.148-9.233 2.683-9.045.042-9.571 3.593-8.765 1.118-9.508 4.121-8.524L77.174 171l5.47-7.668 9.204-5.344 6.884-6.234 6.127-6.493 6.198-6.289 8.658-3.998 8.885-3.25 8.88-2.664 7.283-3.936 6.781-4.321 7.491-3.172 6.496-4.481 8.081-1.687 7.528-2.275 7.105-2.947 6.923-3.409 7.177-2.86 6.909-4.087 7.715-1.325 7.26-3.946 7.372-5.376 8.108-.68 8.107-2.04 8.315-2.515 8.415-.448 8.297 1.287 8.18 1.827 8.359.937 8.265 1.62 7.165 5.049 7.635 3.225 8.123 2.116 7.863 2.93 9.259.727 7.689 3.87 5.79 6.659 5.99 6.094 4.375 7.772 2.49 9.293 3.306 7.876 3.902 6.995 3.999 6.733 4.024 6.609 6.398 5.095 6.408 5.399 5.017 6.407 5.946 6.19 4.422 7.073 3.22 7.627 1.639 8.123 2.128 7.97 2.364 7.973-.114 8.355 3.341 8.038-.138 8.361-.457 8.326-2.987 8.094-4.07 7.722-3.6 7.509 1.354 8.463-2.205 7.767 2.301 9.318-.228 8.858-3.406 7.736-3.318 7.796-4.15 7.384-5.37 6.606-8.166 4.48-9.587 2.84-6.978 4.397-6.144 4.891-5.767 5.153-4.99 6.053-7.366 3.162-6.414 4.21-4.83 6.746-5.837 5.572-6.503 4.669-7.75 2.1-6.54 5.027-7.438 2.99-8.27.069-7.51 2.684-8.158-.672-8.029-1.248-7.687.862-7.761-1.89-7.649.412-7.55-1.52-7.477-1.439-6.87-4.475"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
      <path
        d="M398.041 126.916l5.105 7.98 5.291 7.77 2.965 9.187 3.549 8.62 3.134 8.712 2.495 8.88 2.125 8.894 2.917 8.54 2.613 8.644 1.494 8.912.655 9.01.084 8.997.42 8.894-1.013 8.896-1.353 8.776-3.113 8.518-1.638 8.498-3.252 8.144-1.835 8.323-2.815 8.05-2.93 7.969-4.959 7.13-3.376 7.658-5.108 6.767-5.51 6.373-4.853 6.629-5.053 6.433-4.697 6.687-6.193 5.422-5.802 5.67-6.75 4.617-7.698 3.297-6.774 4.137-7.269 3.273-5.93 5.217-7.007 3.515-6.392 4.737-6.997 3.681-7.055 3.715-7.445 2.814-7.868 1.36-8.085-.01-7.724 1.267-7.9-.341-7.902-2.437-7.61-.993-7.492-1.388-7.363-1.648-7.33-1.208-7.455-.467-7.49-.712-7.198-2.078-7.05-2.516-7.228-2.064-7.244-2.22-7.039-2.829-6.474-3.935-7.087-2.986-6.512-4.007-7.107-3.368-5.457-5.485-6.303-4.566-5.564-5.401-4.025-6.738-5.414-5.544-5.454-5.636-6.305-5.274-6.317-5.563-4.27-6.863-3.973-7.08-2.246-7.807-3.144-7.47-1.866-7.878-1.705-7.896-1.358-7.957.148-8.128-2.195-7.9-.364-8.083.712-8.069.466-8.055-.551-8.226.357-8.221.96-8.197 1.515-8.134-.876-9.063.794-8.788 1.698-8.647 3.139-8.122 2.288-8.738 1.587-9.492 2.45-9.335 4.134-8.417 2.928-9.77 4.278-9.036 4.37-9.413 6.041-8.016 7.498-6.454 7.556-6.481 9.025-4.279 8.985-4.14 8.311-5.394 8.383-5.545 9.299-3.563 9.016-4.527 9.953-1.536 9.616-2.692 10.003-.642 10.053.675 9.794-.937 9.833-.913 9.897-.463 9.88.677 9.665 2.353 9.166 4.44 9.39 2.43 8.888 4.08 8.844 3.792 8.396 4.724 8.064 5.155 7.528 5.907 7.586 5.475 7.223 5.875 7.632 5.16 7.42 5.475 7.845 5.062 7.191 5.928 6.834 6.367 7.876 5.593"
        fill="none"
        stroke="#FFF"
        strokeOpacity=".4"
      />
    </svg>
  );
};

export default HomePage;
