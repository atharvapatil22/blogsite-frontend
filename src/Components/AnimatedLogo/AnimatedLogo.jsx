import React from "react";
import styles from "./AnimatedLogo.module.css";

function AnimatedLogo() {
  return (
    <div className={styles.splash_loader_wrapper}>
      <div className={styles.splash_container}>
        <div className={styles.splash_loader}>
          <img
            className={styles.splash_logo}
            src={require("../../assets/cogito_logo.png")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default AnimatedLogo;
