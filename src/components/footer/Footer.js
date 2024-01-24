import React from "react";
import styles from "./Footer.module.scss";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return <div className={styles.footer}>&copy; {year} All Rights Reserved</div>;
}
