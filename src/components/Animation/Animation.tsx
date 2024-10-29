import { FC } from "react";
import styles from "./animation.module.scss";

export const Animation: FC = () => {
  return (
    <div className={styles.mainAnimation}>
      <iframe
        src="https://my.spline.design/itsraiiningg-44199be5472f5e03402e059f9d847896/"
        frameBorder="0"
        width="105%"
        height="105%"
        title="iframe"
      ></iframe>
    </div>
  );
};
