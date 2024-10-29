import { FC } from "react";
import styles from "./footer.module.scss";

export const Footer: FC = () => {
  return (
    <div className={styles.footerWrap}>
      <div className={styles.footer}>
        <p>Copyright © 2024, Open Wallet</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};
