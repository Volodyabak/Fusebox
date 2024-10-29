import React from "react";
import styles from "./MainPage.module.scss";
import appStore from "@assets/app-store.svg";
import googlePlay from "@assets/google-play.svg";
import openwallet from "@assets/openwallet.svg";
import { Animation } from "@components/Animation/Animation";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <>
      <Animation />
      <div className={styles.mainWrapper}>
        <p className={styles.mainTitle}>
          Your Gateway to <br />
          <span> effortless Crypto Airdrops</span> <br /> with{" "}
          <span>openwallet</span>
        </p>
        <div className={styles.downloadSection}>
          <div className={styles.downloadSectionLeft}>
            <p>Download</p>
            <img src={openwallet} alt="openwallet" />
          </div>
          <div className={styles.downloadLinks}>
            <Link
              to="https://play.google.com/store/apps/details?id=com.finverselabs.openwallet&pli=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={googlePlay} alt="Google Play" />
            </Link>
            <Link
              to="https://apps.apple.com/ee/app/open-wallet-keyless-mastery/id6502636684"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={appStore} alt="App Store" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
