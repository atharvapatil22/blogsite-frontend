import React from "react";
import styles from "./PageLoader.module.css";

function PageLoader() {
  return (
    <div className={styles.circle_loader_wrapper}>
      <div className={styles.circle}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
}

export default PageLoader;
