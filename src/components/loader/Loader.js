import React from "react";
import ReactDOM from "react-dom";
import styles from "./Loader.module.scss";
import loadimage from "../../assets/loader.gif";

export default function Loader() {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loadimage} alt="loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
}
