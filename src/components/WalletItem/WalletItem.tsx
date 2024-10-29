import { FC } from "react";
import styles from "./walletItem.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { ConnectButton } from "thirdweb/react";
import { useDisconnect, useActiveWallet } from "thirdweb/react";
import { client, wallets } from "@assets/clientId";

export const WalletItem: FC<{ logo: string; name: string }> = ({
  logo,
  name,
}) => {
  const { auth, setAuth } = useAuth();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const navigate = useNavigate();

  return (
    <div className={styles.walletsItem}>
      <div className={styles.walletsItemInfo}>
        <img src={logo} alt={name} />
        <p>{name}</p>
      </div>
      {auth ? (
        <button
          className={styles.qrcode}
          onClick={() => {
            if (wallet) {
              disconnect(wallet);
              setAuth(false);
              navigate("/", { replace: true });
            }
          }}
        >
          Disconnect
        </button>
      ) : (
        <>
          <div>
            <ConnectButton client={client} wallets={wallets} />
          </div>
        </>
      )}
    </div>
  );
};
