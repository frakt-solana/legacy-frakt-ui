import React, { FC, useState } from 'react';
import styles from './styles.module.scss';
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import { MinusIcon, PlusIcon } from '../../../icons';

const { Panel } = Collapse;

export const SectionFaq: FC = () => {
  const [isCollapsePanelOpened, setIsCollapsePanelOpened] =
    useState<boolean>(false);
  const onCollapsePanelClick = () =>
    setIsCollapsePanelOpened(!isCollapsePanelOpened);

  return (
    <section className={`section ${styles.faq}`}>
      <div className={`container ${styles.faqContainer}`}>
        <h2 className={styles.faqTitle}>FAQ</h2>
        <Collapse
          bordered={false}
          className={styles.faqList}
          onChange={onCollapsePanelClick}
          expandIcon={() =>
            isCollapsePanelOpened ? <MinusIcon /> : <PlusIcon />
          }
        >
          <Panel key="1" header="What is FRAKT?" className={styles.faqItem}>
            FRAKT started by launching the first generative art on Solana and is
            now building infrastructure to push the ecosystem forward.
          </Panel>
          <Panel
            key="2"
            header="Where can I buy frakts?"
            className={styles.faqItem}
          >
            You can only purchase frakts on secondary markets: <br />
            <a href="https://digitaleyes.market/collections/Frakt">
              https://digitaleyes.market/collections/Frakt
            </a>
            <br />
            <a href="https://solanart.io/collections/frakt">
              https://solanart.io/collections/frakt
            </a>
          </Panel>
          <Panel
            key="3"
            header="Where can I see my frakts?"
            className={styles.faqItem}
          >
            You can view all of your frakts on &nbsp;
            <a href="https://frakt.art/">our website</a> after connecting your
            wallet on Collection tab and filtering by Show - My
          </Panel>
          <Panel
            key="4"
            header="What is the points system and how does it work?"
            className={styles.faqItem}
          >
            The points system is meant to reward frakt holders. Points are
            determined by the amount of frakts that you staked and their
            corresponding rarity. Points determine your chances on drops and
            launchpad and yield of $FRKT. For Launchpad and Drops whitelisting
            every point you staked is a lottery ticket and every winning lottery
            ticket is a mint on private sale. For $FRKT yield there is a formula
            described &nbsp;
            <a href="https://medium.com/@frakt_nft/introducing-frakt-staking-c362e7fd6fd3">
              here
            </a>{' '}
            that determines amount of $FRKT you are getting while staking.
          </Panel>
          <Panel
            key="5"
            header="How to stake my frakts?"
            className={styles.faqItem}
          >
            Read this tutorial from
            <a href="https://medium.com/@croaker917/frakt-staking-101-a-step-by-step-guide-4a6762e16e0">
              {' '}
              @Croaker{' '}
            </a>
            <br />
            or this one from &nbsp;
            <a href="https://medium.com/@theonlynom/frakt-and-you-a-staking-story-77b686f04077">
              @Nom - WILL NEVER DM YOU FIRST
            </a>
          </Panel>
          <Panel
            key="6"
            header="What is the FRAKT Sandbox?"
            className={styles.faqItem}
          >
            Sandbox is the easiest way for top artists and creators to release
            new projects. To participate in upcoming launch you need to stake
            frakts for determined period - usually a week prior launch and fill
            the whitelist form. Amount of points staked determines amount of
            lottery tickets you have in upcoming whitelist lottery. Every
            winning ticket gives you guaranteed mint on low price. Wallets with
            500 and more points receive at least one guaranteed mint. After
            private sale is ended there is public sale with fcfs.
          </Panel>
          <Panel
            key="7"
            header="What is FRAKT Sandbox Kurated collection?"
            className={styles.faqItem}
          >
            Sandbox is also a platform to spotlight individual artists,
            incentivize staking and give utility to $FRKT. Every kurated
            collection launching on platform can be minted only with $FRKT.
            Stakers also participate in lottery and have opportunity to win
            guaranteed mints. Since mint price is very low and scarcity is huge,
            we bring more or less same system as with regular Sandbox project.
          </Panel>
          <Panel
            key="8"
            header="What’s the process on getting access before public mint for Sandbox?"
            className={styles.faqItem}
          >
            1. Stake frakts <br />
            2. Wait for whitelist reveal (usually 12h or 24h before private
            sale) <br />
            3. If you are in list and have guaranteed mints: go to specific
            project page on &nbsp;
            <a href="https://sandbox.frakt.art/">sandbox.frakt.art</a> and mint{' '}
            <br />
            4. If not, there is still public sale according to the schedule
          </Panel>
          <Panel
            key="9"
            header="How can I launch a project on Sandbox?"
            className={styles.faqItem}
          >
            Fill <a href="https://forms.gle/Y6mgehiY5gCkDUdb6">the form</a> and
            we will contact you right after!
          </Panel>
          <Panel
            key="10"
            header="Where can I buy $FRKT?"
            className={styles.faqItem}
          >
            Currently on{' '}
            <a href="https://raydium.io/swap/?ammId=H3dhkXcC5MRN7VRXNbWVSvogH8mUQPzpn8PYQL7HfBVg">
              Raydium
            </a>{' '}
            only
          </Panel>
          <Panel
            key="11"
            header="Can I stake $FRKT?"
            className={styles.faqItem}
          >
            Sure! Here: <br />
            <a href="https://frakt.art/stake">https://frakt.art/stake</a>
          </Panel>
        </Collapse>
      </div>
    </section>
  );
};
