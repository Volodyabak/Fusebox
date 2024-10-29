import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./ConnectWallet.module.scss";
import close from "@assets/close.svg";
import question from "@assets/question.svg";
import walletConnect from "@assets/wallet-connect.png";
import { WalletItem } from "@components/WalletItem/WalletItem";
import { useAuth } from "@context/AuthContext";
import { ConnectButton } from "thirdweb/react";
import { client } from "@assets/clientId";
export const ConnectWalletPage: FC = () => {
  const { auth } = useAuth();

  return (
    <>
      <div className={styles.connectWalletWrap}>
        <div className={styles.connectWalletBG}></div>
        <div className={styles.connectWalletInfo}>
          <div className={styles.connectWalletInfoHeader}>
            <img src={question} alt="question" />
            <h2>Connect Wallet</h2>
            <Link to={auth ? "/airdrop" : "/"}>
              <img src={close} alt="close" />
            </Link>
          </div>

          <WalletItem logo={walletConnect} name="Wallet Connect" />
          <div style={{ width: "100%" }}>
            {auth && <ConnectButton client={client} />}
          </div>
        </div>
      </div>
    </>
  );
};
