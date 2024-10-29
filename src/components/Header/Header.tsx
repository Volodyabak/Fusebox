import { FC, useEffect, useState } from "react";
import styles from "./header.module.scss";
import logo from "@assets/logo.svg";
import plus from "@assets/plus.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useConnectModal } from "thirdweb/react";
import { client, wallets } from "@assets/clientId";

export const Header: FC = () => {
  const [hideButton, setHideButton] = useState(false);
  const { connect } = useConnectModal();
  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/connect-wallet") {
      setHideButton(true);
    } else {
      setHideButton(false);
    }
  }, [location]);

  useEffect(() => {
    navigate("/airdrop");
  }, [auth]);

  return (
    <div className={styles.headerWrap}>
      <div className={styles.header}>
        <Link to={"/airdrop"} className={styles.logo}>
          <img src={logo} alt="its raining" className={styles.logo} />
        </Link>
        {!hideButton && (
          <>
            {auth ? (
              <>
                {" "}
                <Link className={styles.connectButton} to="/connect-wallet">
                  <img
                    src={plus}
                    alt="plus"
                    style={{ order: 0, flexShrink: 0 }}
                    width="16px"
                    height="16px"
                  />
                  My Wallet
                </Link>
              </>
            ) : (
              <>
                <div
                  style={{ cursor: "pointer" }}
                  className={styles.connectButton}
                  onClick={async () => {
                    await connect({ client, wallets, size: "compact" });
                  }}
                >
                  <img
                    src={plus}
                    alt="plus"
                    style={{ order: 0, flexShrink: 0 }}
                    width="16px"
                    height="16px"
                  />
                  Connect Wallet
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
